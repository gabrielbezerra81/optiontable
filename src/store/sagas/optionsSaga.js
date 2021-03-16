import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { api } from "../../config/axios";

import { SERVER_ERROR } from "../../constants/errorsMessages";

import { optionsActions } from "../ducks";

const { loadingOptions, setFieldValues, loadPagination } = optionsActions;

export function* loadOptions({ payload }) {
  try {
    yield put(loadingOptions(true));

    const { option } = payload;

    const { data } = yield call(
      api.get,
      `/stocks/options/expirations/${option}`
    );

    if (!data) {
      yield put(setFieldValues({ field: "calls", values: [] }));
      yield put(setFieldValues({ field: "puts", values: [] }));
      yield put(setFieldValues({ field: "strikes", values: [] }));

      yield put(setFieldValues({ field: "allCalls", values: [] }));
      yield put(setFieldValues({ field: "allPuts", values: [] }));
      yield put(setFieldValues({ field: "allStrikes", values: [] }));

      return toast.warn("Não há dados disponíveis para este ativo.");
    }

    const calls = data.options.filter(({ type }) => type === "CALL");
    const puts = data.options.filter(({ type }) => type === "PUT");
    const strikes = data.options
      .filter((item, index) => index % 2 === 0)
      .map(option => {
        return {
          id: option.id,
          strike: option.strike
        };
      });

    yield put(setFieldValues({ field: "allCalls", values: calls }));
    yield put(setFieldValues({ field: "allPuts", values: puts }));
    yield put(setFieldValues({ field: "allStrikes", values: strikes }));

    yield put(setFieldValues({ field: "calls", values: calls }));
    yield put(setFieldValues({ field: "puts", values: puts }));
    yield put(setFieldValues({ field: "strikes", values: strikes }));

    yield put(loadPagination());
  } catch (error) {
    toast.error(SERVER_ERROR);
  } finally {
    yield put(loadingOptions(false));
  }
}

export function* loadReactiveOptions({ payload }) {
  const { mainOption, tableOptions } = payload;

  const reactiveOptionURL = `http://173.249.37.183:8090/quotes/symbols?symbols=${mainOption.toUpperCase()}${
    tableOptions ? "," + tableOptions.join(",") : ""
  }`;

  yield put(setFieldValues({ field: "option", values: mainOption }));

  yield put(
    setFieldValues({ field: "reactiveOptionURL", values: reactiveOptionURL })
  );
}

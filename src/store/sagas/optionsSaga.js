import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { api } from "../../config/axios";

import { SERVER_ERROR } from "../../constants/errorsMessages";

import { optionsActions } from "../ducks";

const { loadingOptions, setFieldValues } = optionsActions;

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

      yield put(setFieldValues({ field: "isDataNotEmpty", values: false }));

      return toast.warn("Não há dados disponíveis para esta opção.");
    }

    const calls = data.options.filter(({ type }) => type === "CALL");
    const puts = data.options.filter(({ type }) => type === "PUT");
    const strikes = data.options.map(option => {
      return {
        id: option.id,
        strike: option.strike
      };
    });

    yield put(setFieldValues({ field: "calls", values: calls }));
    yield put(setFieldValues({ field: "puts", values: puts }));
    yield put(setFieldValues({ field: "strikes", values: strikes }));

    yield put(setFieldValues({ field: "isDataNotEmpty", values: true }));
  } catch (error) {
    toast.error(SERVER_ERROR);
  } finally {
    yield put(loadingOptions(false));
  }
}

export function* loadNavbarOptions({ payload }) {
  try {
    yield put(loadingOptions(true));

    const { option } = payload;

    yield put(setFieldValues({ field: "option", values: option }));

    const source = new EventSource(
      `http://173.249.37.183:8090/quotes/symbols?symbols=${option.toUpperCase()}`
    );

    let data = {};

    source.onmessage = function* loadSource(event) {
      if (typeof event.data !== "undefined") {
        console.log(data.type);
      }
    };

    console.log(data);
  } catch (error) {
    toast.error(SERVER_ERROR);
  } finally {
    yield put(loadingOptions(false));
  }
}

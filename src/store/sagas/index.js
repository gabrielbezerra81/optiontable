import { all, takeLatest, takeEvery } from "redux-saga/effects";

import { OptionsTypes } from "../ducks";

import { loadOptions, loadReactiveOptions } from "./optionsSaga";

export default function* rootSaga() {
  return yield all([
    //---------Otions Actions-------------
    takeLatest(OptionsTypes.LOAD_OPTIONS, loadOptions),
    takeEvery(OptionsTypes.LOAD_REACTIVE_OPTIONS, loadReactiveOptions)
  ]);
}

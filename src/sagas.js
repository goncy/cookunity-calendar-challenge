import {put, takeEvery, call, select} from "redux-saga/effects";
import * as R from "ramda";

import api from "./resources";

function* bootWatcher() {
  yield takeEvery("app/BOOT", function* initWorker() {
    yield put({type: "reminders/SET", payload: yield call(api.get)});
    yield put({type: "app/BOOTED"});
  });
}

function* persistWatcher() {
  yield takeEvery(
    ["reminders/ADD", "reminders/UPDATE", "reminders/DELETE"],
    function* persistWorker() {
      yield call(api.set, yield select(R.propOr([], "reminders")));
    }
  );
}

export default [bootWatcher, persistWatcher];

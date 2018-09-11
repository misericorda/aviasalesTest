import axios from "axios";
import {put, takeEvery, all} from "redux-saga/effects";

import {METRICS_GET_DATA,} from "../actions/actionTypes";
import {startMetricsLoading, stopMetricsLoading, setMetricsData} from "../actions/metrics";

import {PERIODS_AVAILABLE, API_URL} from "../../constants";

const ERRORS_TO_COUNT = [500, 501, 502];
const EVENTS = ["bookings", "clicks", "searches"];

const parseMetricsData = (data) => {
  /*
  Parse initial data received from the server
  I"ve done this because:
  a) don"t want to clutter presentational components with logic
  b) no point in recalculating values (e.g. percent change) with every rerender, if data didn"t change
  c) all calculations are done in one place, easier to change later
  */
  let result = {};
  let statsData = data.data[0];
  PERIODS_AVAILABLE.map(([period,]) => {
    let errorsDispersion = {other: 0};
    let errorData = data["errors_" + period] || [];
    errorData.map(({count, code}) => {
      ~ERRORS_TO_COUNT.indexOf(code)
        ? errorsDispersion["e" + code] = count
        : errorsDispersion["other"] += count;
    });
    let events = {};
    EVENTS.map(event => {
      let current = statsData[`${event}_current_${period}`] || 0;
      let previous = statsData[`${event}_previous_${period}`] || 0;
      let percentChange = -parseInt((previous - current) / previous * 100) || 0;
      events[event] = {
        current,
        previous,
        percentChange
      };
    });
    result[period] = {
      errorsDispersion,
      timeouts: (statsData["timeout_" + period] || 0).toFixed(2),
      zeroes: (statsData["zeroes_" + period] || 0).toFixed(2),
      errors: (statsData["errors_" + period] || 0).toFixed(2),
      ctr: (statsData["ctr_" + period] || 0).toFixed(2),
      str: (statsData["str_" + period] || 0).toFixed(2),
      price: parseInt(statsData["avg_price_" + period] || 0),
      ...events,
    };
  });
  return result;
};

function* getMetricsData() {
  yield put(startMetricsLoading());
  let response, parsedData;
  try {
    response = yield axios(API_URL);
    parsedData = parseMetricsData(response.data);
  } catch (e) {
    console.log(e);
    yield put(stopMetricsLoading());
    return;
  }
  yield put(setMetricsData(parsedData));
  yield put(stopMetricsLoading());
}

function* watchGetMetrics() {
  yield takeEvery(METRICS_GET_DATA, getMetricsData);
}

export default function* auth() {
  yield all([
    watchGetMetrics(),
  ]);
}
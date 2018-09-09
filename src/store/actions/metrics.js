import {
  METRICS_GET_DATA,
  METRICS_LOADING_START,
  METRICS_LOADING_STOP,
  METRICS_SET_DATA
} from "./actionTypes";

export const setMetricsData = (data) => ({
  type: METRICS_SET_DATA,
  payload: data
});

export const startGetMetricsData = () => ({
  type: METRICS_GET_DATA,
});

export const startMetricsLoading = () => ({
  type: METRICS_LOADING_START,
});

export const stopMetricsLoading = () => ({
  type: METRICS_LOADING_STOP,
});
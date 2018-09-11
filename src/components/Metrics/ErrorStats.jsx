import React from "react";
import {StatusIcon} from "../ui/Icons";

const ErrorStats = ({data = {}}) => {
  return (
    <div className="error_stats">
      <div className="error_stats__values d-flex justify-content-between">
        <ErrorStat name="Errors" value={data.errors || 0}/>
        <ErrorStat name="Zeroes" value={data.zeroes || 0}/>
        <ErrorStat name="Timeouts" value={data.timeouts || 0}/>
      </div>
      <ErrorDispersionBar {...data.errorsDispersion}/>
    </div>
  );
};

const ErrorStat = ({name, value, avgPercent = 0.11}) => (
  <div className="error_stat d-flex flex-column">
    <div className="error_stat__title d-flex align-items-center flex-row">
      <span className="util__fixed-20">
        <StatusIcon round color={value < avgPercent ? "success" : "warning"}/>
      </span>
      <span>{`${name}: ${value}%`}</span>
    </div>
    <div className="error_stat__avg">
      <span className="util__fixed-20"> </span>
      <span>{`Average: ${avgPercent}%`}</span>
    </div>
  </div>
);

const ErrorDispersionBar = ({e500 = 0, e501 = 0, e502 = 0, other = 0}) => {
  const total = e500 + e501 + e502 + other;
  // Check for 0 value, because 0/0 results in NaN and width won't change
  const l500 = e500 === 0 ? 0 : parseInt((e500 / total) * 100);
  const l501 = e501 === 0 ? 0 : parseInt((e501 / total) * 100);
  const l502 = e502 === 0 ? 0 : parseInt((e502 / total) * 100);
  const lOther = 100 - (l500 + l501 + l502);
  return (
    <div className="error_stats_bar">
      <div className="error_stats_bar__bar d-flex">
        <div className="error_stats_bar_value bg-warning" style={{width: l500 + "%"}}></div>
        <div className="error_stats_bar_value bg-info" style={{width: l501 + "%"}}></div>
        <div className="error_stats_bar_value bg-primary" style={{width: l502 + "%"}}></div>
        <div className="error_stats_bar_value bg-secondary" style={{width: lOther + "%"}}></div>
      </div>
      <div className="error_stats_bar__legend d-flex">
        <div className="error_stats_bar__legend__item"><StatusIcon color="warning"/><span>Error 500: {e500}</span></div>
        <div className="error_stats_bar__legend__item"><StatusIcon color="info"/><span>Error 501: {e501}</span></div>
        <div className="error_stats_bar__legend__item"><StatusIcon color="primary"/><span>Error 502: {e502}</span></div>
        <div className="error_stats_bar__legend__item"><StatusIcon color="secondary"/><span>Other: {other}</span></div>
      </div>
    </div>
  );
};


export default ErrorStats;
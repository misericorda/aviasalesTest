import React, {Component} from 'react';
import {TrendIcon, NextIcon} from "../ui/Icons"
import {PERIODS_VERBOSE} from "../../constants"


const EventStats = ({selectedPeriod, data}) => {

  const renderSearchesInfo = () => {
    // No data for mobile/web traffic parts in test json file
    return (
      <div className="d-flex flex-column">
        <h3>Mobile Traffic: 100%</h3>
        <h3>Web Traffic: 100%</h3>
        <p className="text-muted">You get 100% traffic on mobile and desktop devices.</p>
        <p>Help: <a href="#">Searches</a>, <a href="#">Pessimisation</a></p>
      </div>
    )
  };

  const renderClicksInfo = () => (
    <div className="d-flex flex-column">
      <h3>CTR: {(data['ctr_' + selectedPeriod] || 0).toFixed(2)}%</h3>
      <p className="text-muted">Conversion from searches to clicks on all devices.</p>
      <p>Help: <a href="#">CTR</a>, <a href="#">Clicks</a></p>
    </div>
  );

  const renderBookingInfo = () => (
    <div className="d-flex flex-column">
      <h3>STR: {(data['str_' + selectedPeriod] || 0).toFixed(2)}%</h3>
      <h3>Avg. Check: {parseInt(data['avg_price_' + selectedPeriod] || 0).toLocaleString()} ₽</h3>
      <p className="text-muted">Conversion from clicks to bookings on all devices.</p>
      <p>Help: <a href="#">STR</a>, <a href="#">Bookings</a>, <a href="#">Avg. Check</a></p>
    </div>
  );

  return (
    <div className="event_stats">
      <EventStat name="searches" icon="filter" data={data} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderSearchesInfo}/>
      <EventStat name="clicks" icon="click" data={data} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderClicksInfo}/>
      <EventStat name="bookings" icon="shopping-cart" data={data} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderBookingInfo}/>
    </div>
  )
};

const EventStat = ({name, icon, data, selectedPeriod, infoBlockRenderer = f => f}) => {
  let current = data[`${name}_current_${selectedPeriod}`] || 0;
  let previous = data[`${name}_previous_${selectedPeriod}`] || 0;
  let percentChange = parseInt((current - previous) / current * 100) || 0;
  let badge;
  let iconStatus = current >= previous ? 'success' : 'warning';
  if (percentChange) {
    badge = <span className={percentChange > 0 ? 'badge badge-success' : 'badge badge-danger'}>{percentChange}%</span>
  }
  return (
    <div className="event_stat d-flex">
      <div className="event_stat__icon">
        <TrendIcon name={icon} status={iconStatus}/>
        {name !== 'bookings' && <NextIcon/>}
      </div>
      <div className="event_stats__main d-flex w-100">
        <div className="event_stat__changes d-flex w-50">
          <div className="event_stat__stats">
            <h3 className="text-capitalize">{name} {badge}</h3>
            <span className="event_stat__numbers">
              {current.toLocaleString()} <span
              className="event_stat__numbers__sub">{PERIODS_VERBOSE[selectedPeriod]}</span>
          </span>
            <span className="event_stat__numbers text-muted">
              {previous.toLocaleString()}<span className="event_stat__numbers__sub">Previous</span>
          </span>
          </div>
        </div>
        <div className="event_stat__info w-50">
          {infoBlockRenderer()}
        </div>
      </div>
    </div>
  )
};

export default EventStats;
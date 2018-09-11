import React from "react";
import {TrendIcon, NextIcon} from "../ui/Icons";
import {PERIODS_VERBOSE} from "../../constants";


const EventStats = ({data = {}, selectedPeriod}) => {

  const renderSearchesInfo = () => {
    // No data for mobile/web traffic parts in test json file
    return (
      <div className="d-flex flex-column">
        <h3>Mobile Traffic: 100%</h3>
        <h3>Web Traffic: 100%</h3>
        <p className="text-muted">You get 100% traffic on mobile and desktop devices.</p>
        <p>Help: <a href="#">Searches</a>, <a href="#">Pessimisation</a></p>
      </div>
    );
  };

  const renderClicksInfo = () => (
    <div className="d-flex flex-column">
      <h3 className={data.clicks && data.clicks.percentChange < 0 ? "text-danger" : ""}>CTR: {data.ctr}%</h3>
      <p className="text-muted">Conversion from searches to clicks on all devices.</p>
      <p>Help: <a href="#">CTR</a>, <a href="#">Clicks</a></p>
    </div>
  );

  const renderBookingInfo = () => (
    <div className="d-flex flex-column">
      <h3>STR: {data.ctr}%</h3>
      <h3>Avg. Check: {data.price ? data.price.toLocaleString() : 0} ₽</h3>
      <p className="text-muted">Conversion from clicks to bookings on all devices.</p>
      <p>Help: <a href="#">STR</a>, <a href="#">Bookings</a>, <a href="#">Avg. Check</a></p>
    </div>
  );

  return (
    <div className="event_stats">
      <EventStat name="searches" icon="filter" {...data.searches} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderSearchesInfo}/>
      <EventStat name="clicks" icon="click" {...data.clicks} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderClicksInfo}/>
      <EventStat name="bookings" icon="shopping-cart" {...data.bookings} selectedPeriod={selectedPeriod}
                 infoBlockRenderer={renderBookingInfo}/>
    </div>
  );
};

const EventStat = ({name, icon, previous = 0, current = 0, percentChange = 0, selectedPeriod, infoBlockRenderer = f => f}) => {
  let badge;
  let iconStatus = percentChange >= 0 ? "success" : "danger";
  if (percentChange) {
    badge = percentChange > 0
      ? <span className="badge badge-success">+{percentChange}%</span>
      : <span className="badge badge-danger">{percentChange}%</span>;
  }
  return (
    <div className="event_stat d-flex">
      <div className="event_stat__icon">
        <TrendIcon name={icon} status={iconStatus}/>
        {name !== "bookings" && <NextIcon/>}
      </div>
      <div className="event_stat__content d-flex w-100">
        <div className="event_stat__changes d-flex w-50">
          <div className="event_stat__stats">
            <div className="event_stat__title d-flex align-items-center">
              <span className={`text-capitalize ${percentChange < 0 ? "text-danger" : ""}`}>{name}</span>
              {badge}
            </div>
            {/*<h3 className={`text-capitalize ${percentChange < 0 ? "text-danger" : ""}`}>{name} {badge}</h3>*/}
            <div className="event_stat__numbers mb-1">
              {current.toLocaleString()} <span
              className="event_stat__numbers__sub">{PERIODS_VERBOSE[selectedPeriod]}</span>
            </div>
            <div className="event_stat__numbers text-muted">
              {previous.toLocaleString()}<span className="event_stat__numbers__sub">Previous</span>
            </div>
          </div>
        </div>
        <div className="event_stat__info w-50">
          {infoBlockRenderer()}
        </div>
      </div>
    </div>
  );
};

export default EventStats;
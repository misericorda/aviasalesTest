import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const LoadingSpinner = () => <FontAwesomeIcon icon="circle-notch" spin size="6x"/>;

export const NextIcon = () => <div className="icon__next">{getIcon("next")}</div>;

export const TrendIcon = ({name, status = "success"}) => (
  <div className="icon__trend">
    {getIcon(name)}
    <span className={`icon__status bg-${status}`}> </span>
  </div>
);

export const StatusIcon = ({color = "success", round, className = ""}) => {
  let cName = "status-icon bg-" + color;
  cName = round ? cName + " rounded-circle" : cName;
  cName = className ? cName + " " + className : cName;
  return <span className={cName}> </span>;
};

const getIcon = name => {
  switch (name) {
    case "click":
      return (
        <svg width="15" height="21" viewBox="0 0 15 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M4.25 4.5V8.24001C3.03998 7.42999 2.25 6.06 2.25 4.5C2.25 2.00999 4.26001 0 6.75 0C9.23999 0 11.25 2.00999 11.25 4.5C11.25 6.06 10.46 7.42999 9.25 8.24001V4.5C9.25 3.12 8.13 2 6.75 2C5.37 2 4.25 3.12 4.25 4.5ZM9.54999 10.61L14.09 12.87C14.62 13.09 15 13.63 15 14.25C15 14.31 14.99 14.38 14.98 14.45L14.23 19.72C14.12 20.45 13.54 21 12.79 21H6C5.59003 21 5.21002 20.83 4.94 20.56L0 15.62L0.789978 14.82C0.98999 14.62 1.27002 14.49 1.58002 14.49C1.64001 14.49 1.69116 14.4989 1.74231 14.5078C1.76782 14.5122 1.79333 14.5167 1.82001 14.52L5.25 15.24V4.5C5.25 3.67 5.91998 3 6.75 3C7.58002 3 8.25 3.67 8.25 4.5V10.5H9.01001C9.20001 10.5 9.38 10.54 9.54999 10.61Z"
                fill="white"/>
        </svg>
      );
    case "next":
      return (
        <svg width="11" height="82" viewBox="0 0 11 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.220392"
                d="M4.14264 77L0.224365 0.593994H10.2244L5.5 77H9.22437L4.72437 82L0.224365 77H4.14264Z"
                fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="29.2244" y1="71.094" x2="29.2244" y2="-6.906"
                            gradientUnits="userSpaceOnUse">
              <stop stopColor="#2196F3"/>
              <stop offset="1" stopColor="#A9D9FF"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return <FontAwesomeIcon icon={name}/>;
  }
};
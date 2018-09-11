import React from "react";

export const PeriodSelector = ({selected, onChange, choices}) => {
  const renderButton = ([name, verbose]) => (
    <a key={name} value="last-hour" onClick={() => onChange(name)}
       href="javascript: void(0)" className={selected === name ? "periods__btn active" : "periods__btn"}>{verbose}</a>
  );

  return (
    <nav className="periods d-inline-block">
      {choices.map(renderButton)}
    </nav>
  );
};
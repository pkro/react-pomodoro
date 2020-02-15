import React from 'react';

export default function ToggleButton({ onClick, buttonText, id }) {
  return (
    <button className="toggleButton" type="button" onClick={onClick} id={id || " toggleButton"}>
      {buttonText}
    </button >
  );
}

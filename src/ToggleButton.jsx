import React from 'react';

export default function ToggleButton({ onClick, buttonText }) {
  return (
    <button className="toggleButton" type="button" onClick={onClick}>
      {buttonText}
    </button>
  );
}

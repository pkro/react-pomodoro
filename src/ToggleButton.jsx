import React from 'react';

export default function ToggleButton({ onClick, buttonText, id = 'toggleButton' }) {
  return (
    <button className="toggleButton" type="button" onClick={onClick} id={id}>
      {buttonText}
    </button >
  );
}

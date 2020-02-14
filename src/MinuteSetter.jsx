import React from 'react';

export default function MinuteSetter({ minutes, onChange }) {
  return (
    <>
      <input type="text" cols={2} rows={1} value={minutes} onChange={onChange} />
    </>
  );
}
import React from 'react';

export const RankSelector = ({ value, handleRankChange }) => (
  <select value={value} onChange={(e) => handleRankChange(e)}>
    {[1,2,3].map(num => {
      return <option key={num} value={num}>{num}</option>
    })}
  </select>
)
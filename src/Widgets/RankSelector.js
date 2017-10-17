import React from 'react';

// default name is rankValue
export const RankSelector = ({ handleChange, value }) => (
  <select name="rankValue" value={value} onChange={(e) => handleChange(e)}>
    {[1,2,3].map((num, i) => {
      return <option key={num} value={i}>{num}</option>
    })}
  </select>
)
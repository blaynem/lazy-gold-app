import React from 'react';

// default name is rankValue
// this just returns back the rank of 1, 2, or 3 for the user to select from.
// needs to use the index value for the value prop
export const RankSelector = ({ handleChange, value }) => (
  <select name="rankValue" value={value} onChange={(e) => handleChange(e)}>
    {[1,2,3].map((num, i) => {
      return <option key={num} value={i}>{num}</option>
    })}
  </select>
)
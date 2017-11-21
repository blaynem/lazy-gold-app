import React from 'react';

// default name is rankValue
// this returns the rank of depending on how many available ranks there are..
// needs to use the index value for the value prop, otherwise if user presses 2, will use zeroth index,
// when we really need the 2nd item in array
export const RankSelector = ({ availableRanks, handleChange, value }) => (
  <span>
    Rank:&nbsp;
    <select name="rankValue" value={value} onChange={(e) => handleChange(e)}>
      {availableRanks.map((item, i) => {
        return <option key={item.Rank} value={i}>{item.Rank}</option>
      })}
    </select>
  </span>
)
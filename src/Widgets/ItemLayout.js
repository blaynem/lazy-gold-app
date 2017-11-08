import React from 'react';

import { RankSelector } from '../Widgets/RankSelector';

// imports the RankSelector and ObliterumYield selector/Fields.
// Otherwise this is just being used to visualize our table rows
export const ItemLayout = ({ ahPrice, ahProfit, craftingCost, handleChange, name, obliterumProfit, obliterumYield, rankValue }) => (
  <li>
    <h3>{name}</h3>
    <RankSelector value={rankValue} handleChange={handleChange}/>
    <h3>AH Price: {ahPrice}</h3>
    <h3>Crafting Cost: {craftingCost}</h3>
    <h3>Obliterum Yield: {obliterumYield}</h3>
    <h3>Obliterum Profit: {obliterumProfit}</h3>
    <h3>AH Profit: {ahProfit}</h3>
  </li>
)
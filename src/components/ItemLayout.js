import React from 'react';

import { RankSelector } from '../Widgets/RankSelector';

// imports the RankSelector and ObliterumYield selector/Fields.
// Otherwise this is just being used to visualize our table rows
export const ItemLayout = ({
  ahPrice,
  ahProfit,
  availableRanks,
  craftingCost,
  handleChange,
  name,
  obliterumProfit,
  obliterumYield,
  rankValue }) => (
  <li>
    <p>{name}</p>
    <RankSelector
      availableRanks={availableRanks}
      value={rankValue}
      handleChange={handleChange}/>
    <p>AH Price: {ahPrice}</p>
    <p>Crafting Cost: {craftingCost}</p>
    <p>Obliterum Yield: {obliterumYield}</p>
    <p>Obliterum Profit: {obliterumProfit}</p>
    <p>AH Profit: {ahProfit}</p>
  </li>
)
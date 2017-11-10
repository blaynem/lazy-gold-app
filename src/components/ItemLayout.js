import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { convertToGold } from '../utils';

import { RankSelector } from '../Widgets/RankSelector';

const parsePrices = (price) => {
  const priceObj = convertToGold(price)
  return (
    <span className="prices">
      {priceObj.gold}<span className="prices-gold">g</span>
      {priceObj.silver}<span className="prices-silver">s</span>
      {priceObj.copper}<span className="prices-copper">c</span>
    </span>
  )
}
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
  <ListGroupItem header={name}>
    <RankSelector
      availableRanks={availableRanks}
      value={rankValue}
      handleChange={handleChange}/>
    <span>AH Price: {parsePrices(ahPrice)}</span>
    <span>Crafting Cost: {parsePrices(craftingCost)}</span>
    <span>Obliterum Yield: {obliterumYield}</span>
    <span>Obliterum Profit: {parsePrices(obliterumProfit)}</span>
    <span>AH Profit: {parsePrices(ahProfit)}</span>
  </ListGroupItem>
)
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { convertToGold } from '../utils';

import { RankSelector } from '../Widgets/RankSelector';

const renderPrices = (price) => {
  const priceObj = convertToGold(price)
  // converts the pricing we recieved into an object so we can use the fancy coloring on leters.
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
  <ListGroupItem
    bsStyle={ahProfit > 1 ? "success" : "danger"}
    header={name}>
    <RankSelector
      availableRanks={availableRanks}
      value={rankValue}
      handleChange={handleChange}/>
    <span>AH Price: {renderPrices(ahPrice)}</span>
    <span>Crafting Cost: {renderPrices(craftingCost)}</span>
    <span>Obliterum Yield: <span>{obliterumYield}</span></span>
    <span>Obliterum Profit: {renderPrices(obliterumProfit)}</span>
    <span>AH Profit: {renderPrices(ahProfit)}</span>
  </ListGroupItem>
)
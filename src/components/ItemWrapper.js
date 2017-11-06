import React, { Component } from "react";

// NEED TO REPLACE THIS WITH THE NAMESINOBJ FILE
import { names } from '../constants/namesInObj';

import { ItemLayout } from '../Widgets/ItemLayout'

class ItemWrapper extends Component {
  constructor(props){
    super(props)

    this.state = { rankValue: 0, obliterumYield: 1.5 }
  }
  // handles the change of the fields via the name and value that
  // is passed through the event
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  calculateCraftingCost = () => {
    const { craftingInfo, recipeItemsData, itemData, itemName } = this.props
    const { rankValue } = this.state
    // we get the materials from the recipeRank const defined on bottom of page
    // const materials = recipeRank[rankValue]
    const materials = craftingInfo.RecipeRank[rankValue]
    // to calculate, we iterate over the reagants of the materials needed:
    // mat total price consists of the materials current marketValue and the amount needed to create the item
    const costToCraft = (materials.Reagents).reduce( (acc, matItem) => {
      console.log(matItem)
      const matPrice = recipeItemsData[matItem.Id].MarketValue
      const total = matPrice * matItem.Amount
      return acc + total
    }, 0)
    // we divide by the amount that is crafted per rank in order to get the price.
    // Ex: Rank 1 only yields us 1, rank 3 yields us roughly 1.5
    return costToCraft / materials.Yield
  }
  render() {
    console.log("crafting info", this.props)
    const { rankValue, obliterumYield } = this.state
    const { itemData, itemName, obliterum } = this.props
    // ahprice recieved from database
    const ahPrice = itemData.MarketValue
    // calculated crafting cost
    const craftingCost = this.calculateCraftingCost()
    // obliterum price on the AH
    const obliterumAHPrice = obliterum.MarketValue
    // obliterum profit is the price, times the yield for obliterating the item, divided by 100.
    // we then take out the AH (5%) cut, and subtract the crafting costs
    const obliterumProfit = (obliterumAHPrice * obliterumYield / 100) * .95 - craftingCost
    // ahProfit is calculated by the current price in the AH,
    // minus the AH (5%) cut, and subtract the crafting costs    
    const ahProfit = ahPrice * .95 - craftingCost
    return (
      <ItemLayout
        name={itemName}
        rankValue={rankValue}
        handleChange={this.handleChange}
        ahPrice={ahPrice}
        obliterumYield={obliterumYield}
        obliterumProfit={obliterumProfit}
        craftingCost={craftingCost}
        ahProfit={ahProfit}
      />
    )
  }
}

export default ItemWrapper
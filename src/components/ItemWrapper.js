import React, { Component } from "react";
import { connect } from 'react-redux'

import { ItemLayout } from './ItemLayout'

class ItemWrapper extends Component {
  constructor(props){
    super(props)

    const highestRankCraft = ( this.props.craftingInfo.RecipeRank.length - 1)
    this.state = { rankValue: highestRankCraft }
  }
  // handles the change of the fields via the name and value that
  // is passed through the event
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  calculateCraftingCost = () => {
    const { craftingInfo, recipeItemsData } = this.props
    const { rankValue } = this.state
    // we get the materials from the recipeRank const defined on bottom of page
    // const materials = recipeRank[rankValue]
    const materials = craftingInfo.RecipeRank[rankValue]
    // to calculate, we iterate over the reagants of the materials needed:
    // mat total price consists of the materials current marketValue and the amount needed to create the item
    const costToCraft = (materials.Reagents).reduce( (acc, matItem) => {
      const matPrice = recipeItemsData[matItem.Id].MarketValue
      const total = matPrice * matItem.Amount
      return acc + total
    }, 0)
    // we divide by the amount that is crafted per rank in order to get the price.
    // Ex: Rank 1 only yields us 1, rank 3 yields us roughly 1.5
    return costToCraft / materials.Yield
  }
  render() {
    const { rankValue } = this.state
    const {
      craftingInfo,
      craftingInfo: { ObliterumYield, RecipeRank },
      itemData,
      itemName,
      obliterumData
    } = this.props
    if (itemData === undefined || craftingInfo === undefined){
      console.error(`Couldn't find data for item: ${itemName}`)
      return null
    }
    // ahprice recieved from database
    const ahPrice = itemData.MarketValue
    // calculated crafting cost
    const craftingCost = this.calculateCraftingCost()
    // obliterum price on the AH
    const obliterumAHPrice = obliterumData.MarketValue
    // obliterum profit is the price, times the yield for obliterating the item, divided by 100.
    // we then take out the AH (5%) cut, and subtract the crafting costs
    const obliterumProfit = (obliterumAHPrice * ObliterumYield / 100) * .95 - craftingCost
    // ahProfit is calculated by the current price in the AH,
    // minus the AH (5%) cut, and subtract the crafting costs    
    const ahProfit = ahPrice * .95 - craftingCost
    return (
      <ItemLayout
        ahPrice={ahPrice}
        ahProfit={ahProfit}
        craftingCost={craftingCost}
        handleChange={this.handleChange}
        name={itemData.Name}
        obliterumProfit={obliterumProfit}
        obliterumYield={ObliterumYield}
        rankValue={rankValue}
        availableRanks={RecipeRank}
      />
    )
  }
}

const mapStateToProps = state => ({
  obliterumData: state.items.data[124125]
})

export default connect(mapStateToProps, null)(ItemWrapper)
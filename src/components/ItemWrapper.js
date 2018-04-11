import React, { Component } from "react";
import { connect } from 'react-redux'

import { ItemLayout } from './ItemLayout'

class ItemWrapper extends Component {
  constructor(props){
    super(props)

    const highestRankCraft = ( this.props.itemData.recipe.RecipeRank.length - 1)
    this.state = { rankValue: highestRankCraft }
  }
  // handles the change of the fields via the name and value that
  // is passed through the event
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  render() {
    const { rankValue } = this.state
    const {
      itemData,
      obliterumData
    } = this.props

    const { Name } = itemData
    const { ObliterumYield, RecipeRank } = itemData.recipe
    if (itemData === undefined || itemData.recipe === undefined){
      console.error(`Couldn't find data for item: ${itemData.Name}`)
      return null
    }
    // ahprice recieved from database
    const ahPrice = itemData.MarketValue
    // calculated crafting cost
    const craftingCost = RecipeRank[rankValue].costOfRank
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
        name={Name}
        obliterumProfit={obliterumProfit}
        obliterumYield={ObliterumYield}
        rankValue={rankValue}
        availableRanks={RecipeRank}
      />
    )
  }
}

const mapStateToProps = state => ({
  obliterumData: state.rawData.data.find( item => item.Id === 124125)
})

export default connect(mapStateToProps, null)(ItemWrapper)
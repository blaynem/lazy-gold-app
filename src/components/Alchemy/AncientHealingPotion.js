import React, { Component } from "react";

import { itemNames } from '../../constants/itemNames';

import { ItemLayout } from '../../Widgets/ItemLayout'

class AncientHealingPotion extends Component {
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
    const { data } = this.props
    const { rankValue } = this.state
    // we get the materials from the recipeRank const defined on bottom of page
    const materials = recipeRank[rankValue]
    // to calculate, we iterate over the reagants of the materials needed:
    // mat total price consists of the materials current marketValue and the amount needed to create the item
    const costToCraft = (materials.reagents).reduce( (acc, matItem) => {
      const matPrice = data[matItem.id].MarketValue
      const total = matPrice * matItem.amount
      return acc + total
    }, 0)
    // we divide by the amount that is crafted per rank in order to get the price.
    // Ex: Rank 1 only yields us 1, rank 3 yields us roughly 1.5
    return costToCraft / materials.yield
  }
  render() {
    const { ancientHealingPotion, obliterum } = itemNames
    const { rankValue, obliterumYield } = this.state
    const { data } = this.props
    // ahprice recieved from database
    const ahPrice = data[ancientHealingPotion].MarketValue
    // calculated crafting cost
    const craftingCost = this.calculateCraftingCost()
    // obliterum price on the AH
    const obliterumAHPrice = data[obliterum].MarketValue
    // obliterum profit is the price, times the yield for obliterating the item, divided by 100.
    // we then take out the AH (5%) cut, and subtract the crafting costs
    const obliterumProfit = (obliterumAHPrice * obliterumYield / 100) * .95 - craftingCost
    // ahProfit is calculated by the current price in the AH,
    // minus the AH (5%) cut, and subtract the crafting costs    
    const ahProfit = ahPrice * .95 - craftingCost
    return (
      <ItemLayout
        name={data[ancientHealingPotion].Name}
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

export default AncientHealingPotion

// Yseralline Seed = 128304
// Crystal Vial = 3371
const recipeRank = [
  {
    yield: 1,
    reagents: [
      {
        id: 128304,
        amount: 4
      },
      {
        id: 3371,
        amount: 1
      }
    ]
  },
  {
    yield: 1,
    reagents: [
      {
        id: 128304,
        amount: 4
      },
      {
        id: 3371,
        amount: 1
      }
    ]
  },
  {
    yield: 1.5,
    reagents: [
      {
        id: 128304,
        amount: 4
      },
      {
        id: 3371,
        amount: 1
      }
    ]
  }
]
import React, { Component } from "react";
import { ItemLayout } from '../../Widgets/ItemLayout'
import { RankSelector } from '../../Widgets/RankSelector';
import { ObliterumYield } from '../../Widgets/ObliterumYield';

class AncientHealingPotion extends Component {
  constructor(props){
    super(props)

    this.state = { selectedRank: 3, obliterumYield: 1.5 }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  renderCraftingCost = () => {
    return <div>tbd</div>
  }
  renderProfit = () => {
    return <div>tbd</div>
  }
  render() {
    const ancientHealingPotion = 127834, yseralSeed = 128304, crystalVial = 3371, obliterum = 124125
    const { selectedRank, obliterumYield } = this.state
    const { data } = this.props
    console.log(data)
    return (
      <li>
        <h3>{data[ancientHealingPotion].Name}</h3>
        <RankSelector value={selectedRank} handleChange={this.handleChange}/>
        <h3>AH Price: {data[ancientHealingPotion].MarketValue}</h3>
        <h3>Crafting Cost: {this.renderCraftingCost()}</h3>
        <ObliterumYield value={obliterumYield} handleChange={this.handleChange}/>
        <h3>Obliterum Profit: {data[obliterum].MarketValue}</h3>
        <h3>AH Profit: {this.renderProfit()}</h3>
      </li>
    )
  }
}

export default AncientHealingPotion

const RecipeRank = {
  "1": {
    Yield: 1,
    Reagents: [
      {
        Id: 128304,
        Amount: 4
      },
      {
        Id: 3371,
        Amount: 1
      }
    ]
  },
  "2": {
    Yield: 1,
    Reagents: [
      {
        Id: 128304,
        Amount: 4
      },
      {
        Id: 3371,
        Amount: 1
      }
    ]
  },
  "3": {
    Yield: 1.5,
    Reagents: [
      {
        Id: 128304,
        Amount: 4
      },
      {
        Id: 3371,
        Amount: 1
      }
    ]
  }
}
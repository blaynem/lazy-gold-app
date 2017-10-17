import React from "react";

export const AncientHealingPotion = props => {
  console.log(props)
  return (
    <div>Test thing</div>
  )
}

const craftingInfo = {
  RecipeRank: {
    One: {
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
    Two: {
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
    Three: {
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
}
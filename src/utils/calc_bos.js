import { calcWeightedAverage } from './index'

export const calcBloodOfSargeras = (itemDump) => {
  const bloodTraderValues = [
    { Id:124104, amountPerBlood: 10 },
    { Id:124103, amountPerBlood: 10 },
    { Id:124105, amountPerBlood: 3 },
    { Id:124109, amountPerBlood: 10 },
    { Id:124440, amountPerBlood: 10 },
    { Id:123919, amountPerBlood: 5 },
    { Id:124441, amountPerBlood: 3 },
    { Id:124102, amountPerBlood: 10 },
    { Id:123918, amountPerBlood: 10 },
    { Id:124119, amountPerBlood: 10 },
    { Id:124112, amountPerBlood: 10 },
    { Id:124101, amountPerBlood: 10 },
    { Id:124115, amountPerBlood: 10 },
    { Id:124113, amountPerBlood: 10 },
    { Id:124108, amountPerBlood: 10 },
    { Id:124111, amountPerBlood: 10 },
    { Id:124121, amountPerBlood: 10 },
    { Id:124437, amountPerBlood: 10 },
    { Id:124120, amountPerBlood: 10 },
    { Id:124118, amountPerBlood: 10 },
    { Id:124110, amountPerBlood: 10 },
    { Id:124107, amountPerBlood: 10 },
    { Id:124117, amountPerBlood: 10 },
  ]

  let maxPrice = 0;
  bloodTraderValues.forEach(itemObj => {
    const itemData = itemDump.find(item => item.Id === itemObj.Id)
    if ( !itemData ) return;
    const calcItemValue = ( calcWeightedAverage(itemData) ) * itemObj.amountPerBlood;
    if ( calcItemValue > maxPrice ) maxPrice = calcItemValue;
  })
  return {
    Id:124124,
    MarketValue:maxPrice,
    MinBuyout: maxPrice,
    Name:"Blood of Sargeras",
  }
}
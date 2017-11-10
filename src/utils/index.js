export const convertToGold = (price) => {
  const priceFix = Math.round(price).toString()
  const gold = priceFix.slice(0, -3)
  const silver = priceFix.slice(-4).slice(0,2)
  const copper = priceFix.slice(-2)
  return { gold, silver, copper}
}
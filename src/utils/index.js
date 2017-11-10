export const convertToGold = (price) => {
  const gold = Math.floor(price / 10000)
  const silver = Math.floor(( price - gold * 10000 ) / 100)
  const copper = Math.floor(( (price - gold * 10000) - silver * 100 ))
  return { gold, silver, copper}
}
module.exports = function(parsedData){
  console.log(parsedData, "PARSED DATA")
  let dataRes = parsedData.rates.GBP
  let conversionRate = 1 / dataRes
  let customerEUR = 19.99 * conversionRate
  let cheeseAmount = customerEUR / 3.24
  return cheeseAmount
}

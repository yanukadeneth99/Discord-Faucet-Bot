module.exports = async(networkName)=> {
  if(networkName == 'mumbai') {
    return `https://${networkName}.polygonscan.com/tx/`
  } 
  return `https://${networkName}.etherscan.io/tx/`
}
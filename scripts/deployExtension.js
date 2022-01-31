async function main() {
  const contractFactory = await hre.ethers.getContractFactory('ExtensionMint');
  const mainContract = "0xdFB4078042254e8093a7ba74DB9316a3d107d4aB";

  const name = 'ManifoldExtension'; // Contract name
  const symbol = 'MFEXT'; // Contract Symbolk


  const contract = await contractFactory.deploy(name, symbol,mainContract);
  await contract.deployed();
  console.log("Yout need this address for minting!");
  console.log("Contract deployed to:", contract.address);
  console.log("validate Command;",
  'npx hardhat verify ' + contract.address + ' "' + name + '" "'+symbol + '" "' + mainContract + '" --show-stack-traces --network rinkeby'

  )

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
async function main() {
  const contractFactory = await hre.ethers.getContractFactory('ExtensionMint');
  const mainContract = "0xdFB4078042254e8093a7ba74DB9316a3d107d4aB";
  const contract = await contractFactory.deploy(mainContract);
  await contract.deployed();
  console.log("Yout need this address for minting!");
  console.log("Contract deployed to:", contract.address);
  
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
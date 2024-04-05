const hre = require("hardhat");

async function main() {
    const NFTMinter = await hre.ethers.getContractFactory('NFTMinter')
    const nftminter = await NFTMinter.deploy()

    await nftminter.waitForDeployment();

    console.log(`CONTRACT DEPLOYED AT ADDRESS : ${nftminter.target}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
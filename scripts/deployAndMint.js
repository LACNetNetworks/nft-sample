const { ethers } = require("ethers");
const {
  LacchainProvider,
  LacchainSigner,
} = require("@lacchain/gas-model-provider");
const contractAbi = require("../artifacts/contracts/MyNft.sol/MyNft.json");

async function main() {
  //RPC and nodeAddress
  const yourRPCNode = "http://146.148.73.191";
  const nodeAddress = "0xa6e41a7fa1aafc4322118a90796085b3f60a0907";

  //Wallet private key
  const privateKey =
    "0x40399e8f46d96f02350021125d012eed9b4fe9983fd2a04886c30118a6be47b0";

  //Mainnet
  const trustedForwarder = "0xEAA5420AF59305c5ecacCB38fcDe70198001d147";
  //Testnet
  //const trustedForwarder = "0xa4B5eE2906090ce2cDbf5dfff944db26f397037D";

  console.log("Starting deploy of contract: ", contractAbi.contractName);

  // current date and time + 5 miutes
  const now = new Date();

  const expiration_date = now.getTime() + 5 * 60 * 1000;

  const provider = new LacchainProvider(yourRPCNode);

  const signer = new LacchainSigner(
    privateKey,
    provider,
    nodeAddress,
    expiration_date
  );

  console.log(`Create Factory ${contractAbi.contractName}...`);

  const contractFactory = new ethers.ContractFactory(
    contractAbi.abi,
    contractAbi.bytecode,
    signer
  );

  console.log(`Deploying ${contractAbi.contractName}...`);

  const contract = await contractFactory.deploy(
    "0x98F34d67411ad0dFcbc11230cd1D88400c6441Ad",
    trustedForwarder
  );
  const receipt = await contract.deploymentTransaction()?.wait();

  console.log("Contract deployed!");

  const contractAddress = receipt?.contractAddress;
  console.log(
    `${contractAbi.contractName} Contract Address: `,
    contractAddress
  );

  deployedContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  //const gasEstimate = 500000;

  //public Wallet address
  const publicWalletAddress = "0x98F34d67411ad0dFcbc11230cd1D88400c6441Ad";

  const mintTx = await deployedContract.mint(
    publicWalletAddress
    //{ gasLimit: gasEstimate }
  );

  console.log(`Transaction hash: ${mintTx.hash}`);
  await mintTx.wait();
  console.log(`${contractAbi.contractName} token minted`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

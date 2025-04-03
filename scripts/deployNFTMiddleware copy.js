const { ethers } = require("ethers");
const {
  LacchainProvider,
  LacchainSigner,
} = require("@lacchain/gas-model-provider");
const contractAbi = require("../artifacts/contracts/LACNETnft.sol/LACNETnft.json");

const originalSend = FetchRequest.prototype.send;

FetchRequest.prototype.send = async function () {
  let TOKEN = "{{YOUR_TOKEN}}";
  this.setHeader("Authorization", `Bearer ${TOKEN}`);
  return originalSend.call(this); // call the real thing
};

async function main() {
  //MIDDLEWARE MAINNET
  const yourRPCNode = "{{YOUR_MIDDLEWARE_RPC_IP_OR_URL}}";
  const nodeAddress = "{{YOUR_NODE_ADDRESS}}";
  const privateKey = "{{YOUR_PRIVATE_KEY_ADDRESS}}";
  const contractOwner = "{{YOUR_CONTRACT_OWNER}}";
  //MAINNET
  const trustedForwarder = "0xEAA5420AF59305c5ecacCB38fcDe70198001d147";
  //TESTNET
  //const trustedForwarder = "0xa4B5eE2906090ce2cDbf5dfff944db26f397037D";

  console.log("Starting deploy of contract: ", contractAbi.contractName);

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
    contractOwner,
    trustedForwarder
  );
  const receipt = await contract.deploymentTransaction()?.wait();
  console.log("Contract deployed!");
  const contractAddress = receipt?.contractAddress;
  console.log(
    `${contractAbi.contractName} Contract Address: `,
    contractAddress
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

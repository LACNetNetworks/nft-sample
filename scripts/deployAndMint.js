const { ethers } = require("ethers");
const {
  LacchainProvider,
  LacchainSigner,
} = require("@lacchain/gas-model-provider");
const contractAbi = require("../artifacts/contracts/MyNft.sol/MyNft.json");

async function main() {
  //RPC and nodeAddress
  const yourRPCNode = "{{YOUR_RPC_ADDRESS_IP}}";
  const nodeAddress = "{{YOUR_NODE_ADDRESS}}";

  //Wallet private key
  const privateKey = "{{YOUR_PRIVATE_KEY}}}";

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

  const contractOwner = "{{YOUR_WALLET_PUBLIC_ADDRESS}}";

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

  deployedContract = new ethers.Contract(
    contractAddress,
    contractAbi.abi,
    signer
  );

  //const gasEstimate = 500000;

  //public Wallet address
  const publicWalletAddressMintReceive = "{{ANY_WALLET_PUBLIC_ADDRESS}}";

  const mintTx = await deployedContract.mint(
    publicWalletAddressMintReceive
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

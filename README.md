# LACNet NFT Sample

## Prerequisites

- Node.js version >= 18
- Hardhat >= 2.22.18

## Installation and Compilation

1. Install dependencies:

   ```sh
   npm install
   ```

2. Install Hardhat:

   ```sh
   npm install --save-dev hardhat
   ```

3. Compile the smart contracts:

   ```sh
   npx hardhat compile
   ```

4. Update the deployment script deployAndMint.js with the required variables:

```sh
const yourRPCNode = "{{YOUR_RPC_ADDRESS_IP}}";
const nodeAddress = "{{YOUR_NODE_ADDRESS}}";
const privateKey = "{{YOUR_PRIVATE_KEY}}";
const contractOwner = "{{YOUR_WALLET_PUBLIC_ADDRESS}}";
const publicWalletAddressMintReceive = "{{ANY_WALLET_PUBLIC_ADDRESS}}";
```

Make sure to replace the placeholder values with the actual values before running the script.

## Deployment and Minting

5. Deploy and mint the NFT:
   ```sh
   node ./scripts/deployAndMint.js
   ```

The result should be:

```sh
    Starting deploy of contract:  MyNft
    Create Factory MyNft...
    Deploying MyNft...
    Contract deployed!
    MyNft Contract Address:  0xD9F869CDfc90C85B0DcE6F25b6DDF702e0AdAe56
    Transaction hash: 0x49cc2a8b32d290d495feff8e453447daec909a4518208499ceb3c0a6c4ca2fd4
    MyNft token minted
```

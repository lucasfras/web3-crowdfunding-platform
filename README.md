# Web3 CrowdFunding Platform


## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

A Web3 Crowdfunding platform including a frontend built in ReactJS and a backend consisting of a smart contract running on the Goerli Ethereum Testnet. The frontend is fully responsive, allowing clients to use it on both desktop and mobile devices without any issues.

Campaigns are created with a specified target amount and time. Once the target time has been reached, the owner has the option to end the campaign and receive all funds that have been donated to their campaign.

![](https://github.com/lucasfras/web3-crowdfunding-platform/crowdfunding.gif)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install all the dependencies needed for the project.

In frontend folder run

```
npm install
```

And run it in the web3 folder as well

```
npm install
```


## 🎈 Usage <a name="usage"></a>

In the frontend you can use
```
npm run dev
```
To run the project and make your changes or use
```
npm run build
```
To start building the project for production


### If you want to use your own smart contract follow the steps below:

First of all set all the environment variables, creating a .env file in web3 folder and set it.

```
MAINNET_RPC_URL=
GOERLI_RPC_URL=
PRIVATE_KEY=
```

Then, comple and deploy the contract to blockchain using:
```
npx hardhat compile
npx hardhat run --network goerli scripts/deploy.js
or if you want deploy to mainnet
npx hardhat run --network mainnet scripts/deploy.js
```

Now, get the address that the contract is deployed and change it on the frontend. In frontend/src/context/index.jsx line 325 set the contractAdrress variable with your contract address.
```
const contractAdrress = "yourcontractaddress";
```

## ⛏️ Built Using <a name = "built_using"></a>

- [ReactJS](https://www.mongodb.com/) - Web Framework 
- [Hardhat](https://hardhat.org/) - Server Framework (web3)
- [Vite](https://vitejs.dev/) - Web Framework
- [Ethers](https://docs.ethers.org/) - Library to interact with blockchain

## ✍️ Authors <a name = "authors"></a>

- [@lucasfras](https://github.com/lucasfras)
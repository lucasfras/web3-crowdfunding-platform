import React, { useContext, createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const StateContext = createContext();


export const StateContextProvider = ( {children} ) => {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();
  
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaigns",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "target",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountCollected",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_target",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_image",
          "type": "string"
        }
      ],
      "name": "createCampaign",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "donateToCampaign",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "endCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getActive",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "donators",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "donations",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding.Campaign[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCampaigns",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "target",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "donators",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "donations",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "isActive",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding.Campaign[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getDonators",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfActive",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfCampaigns",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

    useEffect(() => {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    
      
    }, []);
    
  const contractAdrress = '0x02F55e43B847De47B8f6a751AB0679258c8EB452';
  const connect = async () => {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        if(!accounts.length){
            console.log("user does not have an account connected to the web3 provider")
        } else {
          const signer = provider.getSigner();
          const chainId = await signer.getChainId();
          if(chainId === 5){
              setAccount(accounts[0])
              setContract(new ethers.Contract(contractAdrress, contractAbi, signer));
            }else{
              alert('Select Goerli Network');
            }

        }
    } catch (err) {
        console.log('Error while connecting to metamask', err)
    }
    }

    const publishCampaign = async (form) => {
    try {
      const date = new Date(form.deadline).getTime() / 1000;
      const publish = await contract.createCampaign(account, form.title, form.description, form.target, date, form.image);
      await publish.wait()
    }catch(error) {
      console.log(error);
    }
    }

    const getCampaigns = async () => {
      let data;
      try{
        data = await contract.getCampaigns();        
        const parsedCampaings = data.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          image: campaign.image,
          isActive: campaign.isActive,
          pId: i
        }));
      return parsedCampaings;
        
      }catch(err){
        console.log(err);
      }
    }
    const getUserCampaigns = async () => {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner.toLowerCase() === account);
      return filteredCampaigns;
    }

    const donate = async(pid, amount) => {
      const data = await contract.donateToCampaign(pid, {value: ethers.utils.parseEther(amount)});
      await data.wait();
      return data;
    }
    

    const endCampaign = async (pid) => {
      try{
        const endCampaign = await contract.endCampaign(pid);
        endCampaign.wait();
      } catch (err) {
        console.log(err)
      }
    }

    const getDonations = async (pid) => {
      const donations = await contract.getDonators(pid);
      const numberOfDonations = donations[0].length;
      const parsedDonations = [];
      for(let i = 0; i < numberOfDonations; i++){
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });

      }
      return parsedDonations;
    }

    return (
        <StateContext.Provider
            value={
                {
                    account,
                    contract,
                    createCampaign: publishCampaign,
                    connect,
                    getCampaigns,
                    getUserCampaigns,
                    donate,
                    getDonations,
                    endCampaign,

                }
            }
        >
            {children}
        </StateContext.Provider>
    );
  }


export const useStateContext = () => useContext(StateContext);
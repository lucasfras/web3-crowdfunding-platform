import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { ethers } from 'ethers';

import { DisplayCampaigns } from '../components';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { account , contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async() => {
    setLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setLoading(false);
  }


  useEffect(() => {
    if(contract){
      fetchCampaigns();
    }

  }, [account, contract])

  

  return (
    <>
      <DisplayCampaigns 
        title="All Campaigns"
        loading={loading}
        campaigns={campaigns}
      />
    </>
      
  )
}

export default Home
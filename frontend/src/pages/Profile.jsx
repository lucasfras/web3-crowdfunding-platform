import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { ethers } from 'ethers';

import { DisplayCampaigns } from '../components';

const Profile = () => {

  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { account , contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async() => {
    setLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setLoading(false);
  }


  useEffect(() => {
    if(contract){
      fetchCampaigns();
    }

  }, [account, contract])

  

  return (

    <DisplayCampaigns 
      title="My Campaigns"
      loading={loading}
      campaigns={campaigns}
    />
      
  )
}

export default Profile
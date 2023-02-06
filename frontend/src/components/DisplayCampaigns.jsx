import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';

import { CampaignCard } from './index.js';


const DisplayCampaigns = ({ title, loading, campaigns }) => {
    const navigate = useNavigate();
    const [showEnded, setShowEnded] = useState(true);
    const handleClick = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    }
  return (
    <div className="font-epilogue text-[18px] text-white">
        <div className="flex flex-row justify-between items-center">
            <h1 className="font-semibold text-[18px] text-left">{title}: {campaigns ? campaigns.length : '0'}</h1>
            <div className="flex justify-center items-center mb-4 hover:cursor-pointer" onClick={() => setShowEnded((prev) => (!prev))}>
                <input id="" type="checkbox" checked={showEnded} className="w-5 h-5 bg-gray-100 border-gray-300 hover:cursor-pointer rounded focus:ring-blue500 focus:ring-2"/>
                <label htmlFor="isActive-checkbox" className="ml-2 text-sm hover:cursor-pointer font-medium">Show ended</label>
            </div>
        </div>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {loading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}
            {!loading && campaigns.length === 0 && (
                <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">There's no campaigns to show</p>
            )}

            {!loading && campaigns.length > 0 && campaigns.map((campaign) => {
                if(campaign.isActive === false && showEnded === false){
                    return;
                }
                return (
                    <CampaignCard
                        key={campaign.id}
                        {...campaign}
                        handleClick={() => handleClick(campaign)}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default DisplayCampaigns
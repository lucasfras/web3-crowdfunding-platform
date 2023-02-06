import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


import { useStateContext } from '../context'
import { CustomButton, CountBox, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'

const CampaignDetails = () => {
  const { state } = useLocation();
  const { getDonations , contract, account, donate, endCampaign } = useStateContext();
  
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);



  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, account])
  

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);

  }

  const handleDonate = async () =>{
    setLoading(true);
    await donate(state.pId, amount);
    setLoading(false);
  }

  const handleEnd = async () =>{
    setLoading(true);
    console.log(remainingDays);
    await endCampaign(state.pId);
    setLoading(false);
  }




  return (
    <div>
      {loading && (<Loader />)}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}>
            </div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap sm:justify-between justify-center gap-[30px]">
          <CountBox 
            title="Days Left"
            value={remainingDays}
          />
          <CountBox 
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox 
            title="Total Backers"
            value={donators.length}
          />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px] text-white font-epilogue">
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" className="w-full h-full object-contain rounded-full"/>
              </div>
              <div>
                <h4 className="font-semibold text-[14px] break-all">{state.owner}</h4>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((donator, index) => (
                <div key={`${donator.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{index+1}. {donator.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">{donator.donation}</p>
                </div>
              )) : (
                <p className="text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet, be the first one</p>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[18px] uppercase">Fund</h4>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              <p className="font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the campaign
              </p>
              <div className="mt-[30px]">
                <input 
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-md"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className="text-[14px] leading-[22px]">Back it because you believe in it.</h4>
                  <p className="mt-[20px] leading-[22px] text-[#808191]">Support the project</p>
                </div>
                {remainingDays > 0 && (
                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                  />
                )}
                {state.owner.toLowerCase() === account && remainingDays === 0 && (
                  <CustomButton
                  btnType="button"
                  title="End Campaign"
                  styles="w-full bg-[#d11717] mt-[30px]"
                  handleClick={handleEnd}
                />
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
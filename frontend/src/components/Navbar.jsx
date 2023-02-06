import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { menu, search } from '../assets';

import { useStateContext } from '../context';

import { navlinks } from '../constants';


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { contract, account, connect } = useStateContext();

  const connectWallet = () => {
    connect();
    return;
  }

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[20px]">
          <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"/>

        <div className="w-[72px] h-full rounded-[20px] bg-[#4ecd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={account ? 'Create campaign' : 'Connect your Wallet'}
          styles={account ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(account) navigate('create-campaign')
            else connectWallet()
          }}
        />
        {account && (
        <Link to="/profile">
          <div className="w-[52px] h-[52px] flex justify-center items-center cursor-pointer">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="object-contain rounded-full"/>
          </div> 
        </Link>
        )}
      </div>
      {/* small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="object-contain rounded-full"/>
        </div>
          <div className="flex mx-4 flex-row items-center justify-center gap-5">
            <CustomButton
              btnType="button"
              title={account ? 'Create campaign' : 'Connect your Wallet'}
              styles={account ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if(account){
                  navigate('create-campaign')
                }else{
                  connectWallet()
                }
              }}
            />
              <img 
                src={menu}
                alt="menu"
                className="w-[32px] h-[32px] hover:cursor-pointer"
                onClick={() => setToggleDrawer(!toggleDrawer)}
              />
          </div>
        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] shadow-secondary py-4 ${(!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0')} transation-all duration-700`}>
          <ul className="mb-4">
            {navlinks.map((link) => {
              if(link.disabled){
                return;
              }
              
              return (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive == link.name ? 'bg-[#3a3a43] text-[#1dc071]' : 'text-white cursor-pointer '} items-center justify-center `}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`mx-[20px] w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />
                  {link.name.charAt(0).toUpperCase() + link.name.slice(1)}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
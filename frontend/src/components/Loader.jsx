import React from 'react'

import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex flex-col items-center justify-center">
        <p className="mt-[20px] font-epilogue font-bold text-[20px] text-center text-white">Transaction is in progress...</p>
        <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
    </div>
  )
}

export default Loader
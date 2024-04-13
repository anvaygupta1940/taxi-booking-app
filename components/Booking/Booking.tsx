"use client"
import React, { useContext, useState } from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Car from './Car'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'

const Booking = () => {
    const [amount, setAmount] = useState();
    const screenHeight = window.innerHeight * 0.72;
    const router = useRouter();
    const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);


    return (
        <div className=' p-5'>
            <h2 className=' text-[25px] font-semibold'>Booking</h2>
            <div className=' p-3 border-[2px] rounded-md h-[screenHeight]' >
                <AutoCompleteAddress></AutoCompleteAddress>
                <Car></Car>
                <Cards></Cards>
                <button
                    className={`w-full mt-3 bg-yellow-400 rounded-md cursor-pointer 
                    text-[18px] font-semibold p-1 ${!carAmount ? 'bg-gray-200' : null}`}
                    disabled={!carAmount}
                    onClick={() => router.push('/payment')}
                >Book</button>
            </div>
        </div>
    )
}

export default Booking

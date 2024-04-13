"use client"
import React, { useContext, useState } from 'react'
import CarsList from '@/data/CarsList'
import Image from 'next/image'
import { DirectionDataContext } from '@/context/DirectionDataContext'
import { SelectedCarAmountContext } from '@/context/SelectedCarAmountContext'


const Car = () => {
    const [selectedCar, setSelectedCar] = useState<any>();
    const { directionData, setDirectionData } = useContext(DirectionDataContext);
    const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);


    const getCost = (charges: any) => {
        // return (charges * directionData.routes[0].distance * 0.000621371).toFixed(2);
        return (charges * directionData.routes[0].distance * 0.0001).toFixed(2);

    }
    return (
        <div className=' mt-3'>
            <h2 className=' font-semibold text-[20px] '>Select Car</h2>
            <div className=' grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-2'>
                {CarsList.map((item, index) => (
                    <div key={index}
                        onClick={() => {
                            setSelectedCar(index);
                            setCarAmount(getCost(item.charges));
                        }}
                        className={`border-[2px] m-2 p-1 rounded-md
                         hover:border-yellow-400 cursor-pointer
                         ${index === selectedCar ? 'border-yellow-400' : null}`}>
                        <Image src={item.image}
                            alt={item.name}
                            height={90}
                            width={75}
                            className=' w-full'>
                        </Image>
                        {/* <div className=' flex items-center justify-between '> */}
                        <p className=' text-gray-500 text-[10px]'>{item.name}</p>
                        {
                            directionData?.routes ?
                                <span className=' float-right text-black font-medium'>{getCost(item.charges)} $</span>
                                : null
                        }
                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Car

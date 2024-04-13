"use client"
import CardsList from '@/data/CardsList'
import Image from 'next/image'
import React, { useState } from 'react'

const Cards = () => {

    const [selectedCard, setSelectedCard] = useState<any>();
    return (
        <div className=' mt-3'>
            <h2 className=' text-[20px] font-semibold'>Payment Methods</h2>
            <div className=' grid grid-cols-5 p-2'>
                {CardsList.map((item, index) => (
                    <div key={index}
                        className={`w-[50px] flex justify-center items-center border-[1px]
                        rounded-md cursor-pointer hover:border-yellow-400
                       hover:scale-110 transition-all mt-2 ${selectedCard === index ? 'border-[2px] border-yellow-400' : null}`}
                        onClick={() => setSelectedCard(index)}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={30}
                            height={50}>
                        </Image>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cards

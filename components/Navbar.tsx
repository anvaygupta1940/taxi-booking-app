import React from 'react'
import { UserButton } from "@clerk/nextjs";


const Navbar = () => {
    return (
        <div className=' flex justify-between items-center p-3 px-10 border-b-[2px] shadow-lg'>
            <div className=' flex gap-8'>
                <div className='flex gap-2 font-extrabold items-center'>
                    <h1 className=' py-2 px-3 bg-orange-500 rounded-md'>TAXI</h1>
                    <h1 className=' text-orange-500 text-[30px]'>GO</h1>
                </div>
                <div className='hidden  md:flex items-center gap-7'>
                    <h2 className=' hover:bg-gray-100 p-2 rounded-md cursor-pointer'>Home</h2>
                    <h2 className=' hover:bg-gray-100 p-2 rounded-md cursor-pointer'>History</h2>
                    <h2 className=' hover:bg-gray-100 p-2 rounded-md cursor-pointer'>Help</h2>

                </div>
            </div>
            <UserButton></UserButton>
        </div >
    )
}

export default Navbar

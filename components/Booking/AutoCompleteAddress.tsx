"use client"
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import React, { useContext, useEffect, useState } from 'react'

const MAPBOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = '01598c74-d8b7-4491-88ec-9010ef805aed'


const AutoCompleteAddress = () => {

    const [source, setSource] = useState<any>();
    const [destination, setDestination] = useState<any>();
    const [sourceChanging, setSourceChanging] = useState<any>(false);
    const [destinationChanging, setDestinationChanging] = useState<any>(false);
    const [addressList, setAddressList] = useState<any>([]);

    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);


    // for updating address list
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList();
            // console.log("addressList>> ", addressList);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [source, destination]);

    // function for address list
    const getAddressList = async () => {
        setAddressList([]);
        const query = sourceChanging ? source : destination;
        const res = await fetch('/api/search-address?q=' + query, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await res.json();
        setAddressList(result);
    }

    // on clicking/selecting source address
    const onSourceAddressClick = async (item: any) => {
        setSource(item.full_address);
        setAddressList([]);
        setSourceChanging(false);

        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id
            + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

        const result = await res.json();
        // console.log(result);

        setSourceCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });

        // console.log("Source Coordinates >>> ", sourceCoordinates);
    }

    // on clicking/selecting destination address
    const onDestinationAddressClick = async (item: any) => {
        setDestination(item.full_address);
        setAddressList([]);
        setDestinationChanging(false);

        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id +
            "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

        const result = await res.json();
        setDestinationCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });
        // console.log("Source Coordinates >>> ", sourceCoordinates);
        // console.log("Destination coordinates >>>", destinationCoordinates);
    }


    return (
        <div className=''>
            <div className='relative mt-3'>
                <label className=' text-gray-400'>Where From?</label>
                <input type='text'
                    className=' w-full bg-white border-[1px] p-1 rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => { setSource(e.target.value); setSourceChanging(true) }}
                    value={source}>
                </input>
                {addressList?.suggestions && sourceChanging ?
                    <div className=' bg-white p-1 rounded-md shadow-md w-full absolute z-20'>
                        {/* {console.log("inside source container")} */}
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className=' p-2 hover:bg-gray-100 cursor-pointer '
                                onClick={() => { onSourceAddressClick(item) }}>{item.full_address}</h2>
                        ))}
                    </div>
                    : null}
            </div>
            <div className='relative mt-3'>
                <label className=' text-gray-400'>Where To?</label>
                <input type='text'
                    className=' w-full bg-white border-[1px] p-1 rounded-md outline-none focus:border-yellow-300'
                    onChange={(e) => { setDestination(e.target.value); setDestinationChanging(true); }}
                    value={destination}>
                </input>
                {addressList?.suggestions && destinationChanging ?
                    <div className=' bg-white p-1 rounded-md shadow-md w-full absolute '>
                        {/* {console.log("inside destination container")} */}
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className=' p-2 hover:bg-gray-100 cursor-pointer'
                                onClick={() => { onDestinationAddressClick(item) }}>{item.full_address}</h2>
                        ))}
                    </div>
                    : null}
            </div>
        </div >
    )
}

export default AutoCompleteAddress

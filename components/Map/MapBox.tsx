"use client"
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapBoxRoute from './MapBoxRoute';
import DistanceTime from './DistanceTime';


const session_token = '01598c74-d8b7-4491-88ec-9010ef805aed'
const MAPBOX_DIRECTION_URL = "https://api.mapbox.com/directions/v5/mapbox/driving/"



const MapBox = () => {
    const mapRef = useRef<any>();
    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);
    const { directionData, setDirectionData } = useContext(DirectionDataContext);


    // use to fly to source marker location
    useEffect(() => {
        // useffect work when sourceCoordinates changes
        // but if conditon when there is some value in sourceCoordinates
        if (sourceCoordinates) {
            mapRef.current?.flyTo({
                center: [sourceCoordinates.lng,
                sourceCoordinates.lat
                ],
                duration: 2500
            })
        }
    }, [sourceCoordinates]);
    // use to fly to destination marker location
    useEffect(() => {
        if (destinationCoordinates) {
            mapRef.current?.flyTo({
                center: [destinationCoordinates.lng,
                destinationCoordinates.lat
                ],
                duration: 2500
            })
        }

        // if both source and destination coordinates are there , then only call direct coordinates api
        if (sourceCoordinates && destinationCoordinates) {
            getDirectionCoordinates();
        }
    }, [destinationCoordinates]);

    const getDirectionCoordinates = async () => {
        const res = await fetch(MAPBOX_DIRECTION_URL +
            sourceCoordinates.lng + ',' +
            sourceCoordinates.lat + ';' +
            destinationCoordinates.lng + ',' +
            destinationCoordinates.lat +
            "?annotations=maxspeed&overview=full&geometries=geojson&access_token=" +
            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await res.json();
        // console.log(result);
        setDirectionData(result);
    }
    return (
        <div className=' p-5'>
            <h2 className=' text-[25px] font-semibold'>Map</h2>
            <div className=' rounded-lg overflow-hidden'>
                {userLocation ?
                    <Map
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        initialViewState={{
                            longitude: userLocation?.lng,
                            latitude: userLocation?.lat,
                            zoom: 14
                        }}
                        style={{ width: "100%", height: 500, borderRadius: "10px" }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Markers></Markers>
                        {directionData?.routes ?
                            <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates}
                            ></MapBoxRoute>
                            : null
                        }
                    </Map> : null
                }
            </div>
            <div className=' absolute z-20 hidden md:block bottom-[120px] right-[20px]'>
                <DistanceTime></DistanceTime>
            </div>
        </div>
    )
}

export default MapBox;

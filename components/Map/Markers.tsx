import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext } from 'react'
import Map, { Marker } from 'react-map-gl';

const Markers = () => {

    const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCordiContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCordiContext);

    return (
        <div>
            {userLocation ?
                <Marker longitude={userLocation?.lng} latitude={userLocation?.lat} anchor="bottom">
                    <img src="./pin.png" className=' w-10 h-10' />
                </Marker> : null
            }

            {sourceCoordinates ?
                <Marker longitude={sourceCoordinates?.lng} latitude={sourceCoordinates?.lat} anchor="bottom">
                    <img src="./pin.png" className=' w-10 h-10' />
                </Marker> : null
            }

            {destinationCoordinates ?
                <Marker longitude={destinationCoordinates?.lng} latitude={destinationCoordinates?.lat} anchor="bottom">
                    <img src="./pin.png" className=' w-10 h-10' />
                </Marker> : null
            }

        </div>
    )
}

export default Markers

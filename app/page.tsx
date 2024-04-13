"use client"
import Booking from "@/components/Booking/Booking";
import MapBox from "@/components/Map/MapBox";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>();
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>();
  const [directionData, setDirectionData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>();


  useEffect(() => {
    getUserLocation();
  }, [])
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      // console.log(pos);
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    })
  }
  return (

    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <SourceCordiContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
        <DestinationCordiContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
          <DirectionDataContext.Provider value={{ directionData, setDirectionData }}>
            <SelectedCarAmountContext.Provider value={{ carAmount, setCarAmount }}>
              <div className=" grid grid-cols-1 md:grid-cols-3">
                <div className="">
                  <Booking></Booking>
                </div>
                <div className=" col-span-2">
                  <MapBox></MapBox>
                </div>
              </div>
            </SelectedCarAmountContext.Provider>
          </DirectionDataContext.Provider>
        </DestinationCordiContext.Provider>
      </SourceCordiContext.Provider>
    </UserLocationContext.Provider>
  )
}

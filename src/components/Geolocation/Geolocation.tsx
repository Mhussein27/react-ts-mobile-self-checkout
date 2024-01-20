import React, { useState, useEffect } from 'react';
import Html5QrcodePlugin from "../../utilities/Html5QrcodePlugin";
import { useGeolocated } from "react-geolocated";

const Geolocation = () => {
    const [location, setLocation] = useState(null);
    const [qrScanned, setQrScanned] = useState(false);
    const [scannedQRData, setScannedQRData] = useState(null);
    const [address, setAddress] = useState("");

    const {
        coords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
        getPosition
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        if (coords) {
            setLocation(coords);
            //reverseGeocode(coords.latitude, coords.longitude);
        }
    }, [coords]);
    /*
    //This need account and API key and to call it write  <p>Address: {address}</p>
      const reverseGeocode = (latitude, longitude) => {
        // I need to add my api key 
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
          .then(response => response.json())
          .then(data => {
            if (data.results.length > 0) {
              setAddress(data.results[0].formatted_address);
            }
          })
          .catch(error => {
            console.error('Error fetching and parsing data', error);
          });
      };
    */

    // to generate QR from Latitude, longitude (y, x)  https://opencagedata.com/tools/geo-qr-code-generator?
    const decodeLocationFromQR = (qrData) => {
        const [prefix, coordinates] = qrData.split(":");
        if (prefix === "geo" && coordinates) {
            const [latitude, longitude] = coordinates.split(",");
            if (latitude && longitude) {
                const decodedLocation = {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                };
                console.log("Decoded Location: ", decodedLocation);
                return decodedLocation;
            }
        }
        return null;
    };

    const onQRScan = (decodedText, decodedResult) => {
        const decodedLocation = decodeLocationFromQR(decodedText);
        if (decodedLocation) {
            setScannedQRData(decodedLocation);
            setQrScanned(true);
        }
    };



    //  accept all the differences within the same area , if you want to narrow you can make it 0.0001
    const isLocationMatch = () => {
        if (location && scannedQRData) {
            //return location.latitude === scannedQRData.latitude && location.longitude === scannedQRData.longitude; // this line check exact area

            const latMatch = Math.abs(location.latitude - scannedQRData.latitude) < 0.001;
            const longMatch = Math.abs(location.longitude - scannedQRData.longitude) < 0.001;
            return latMatch && longMatch;
        }
        return false;
    };

    return (
        <div>
            {!location && (
                <button onClick={getPosition}>Get Location</button>
            )}
            {location && !qrScanned && (
                <div>
                    <p>Your Current Latitude: {location.latitude}, Your Current Longitude: {location.longitude} </p>
                    <p>Please Scan QR of the Shop</p>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={onQRScan}
                    />
                </div>
            )}
            {qrScanned && (
                <div>
                     {/*
                    <p>Scanned QR Location is : {JSON.stringify(scannedQRData)}</p>
                     */}
                    <div>
                        <p>Scanned Latitude: {scannedQRData.latitude}, Scanned Longitude: {scannedQRData.longitude}</p>
                    </div>
                    <div>
                        <p>Current Latitude: {location.latitude}, Current Longitude: {location.longitude} </p>
                    </div>

                    {isLocationMatch() ? (
                        <p>Location Matched!</p>
                    ) : (
                        <p>Location Not Matched!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Geolocation;
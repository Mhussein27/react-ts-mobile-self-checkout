import React, { useState, useEffect } from 'react';
import Html5QrcodePlugin from "../../utilities/Html5QrcodePlugin";
import { useGeolocated } from "react-geolocated";
import stores from '../../data/stores.json';

const Geolocation = () => {
    const [location, setLocation] = useState(null);
    const [qrScanned, setQrScanned] = useState(false);
    const [scannedQRData, setScannedQRData] = useState(null);
    const [matchedStore, setMatchedStore] = useState(null);
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


    const isLocationMatch = () => {
        if (location && scannedQRData) {
          console.log("scannedQRData.latitude", scannedQRData.latitude);
          console.log("scannedQRData.longitude", scannedQRData.longitude);
      
          const latMatch = Math.abs(location.latitude - scannedQRData.latitude) < 0.01;
          const longMatch = Math.abs(location.longitude - scannedQRData.longitude) < 0.01;
          console.log("latMatch", latMatch);
          console.log("longMatch", longMatch);
      
          
    if (latMatch && longMatch) {
      const matchingStore = stores.find(store => store.latitude === scannedQRData.latitude);

      if (matchingStore) {
        return `Location Matched! Store Name: ${matchingStore.storeName}`;
      } else {
        return "Location Not Matched!";
      }
    } else {
      return "Location data incomplete";
    }
  }
  return "Location data incomplete";
}


    useEffect(() => {
        isLocationMatch();
    }, [location, scannedQRData]);

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
                    <div>
                        <p>Scanned Latitude: {scannedQRData.latitude}, Scanned Longitude: {scannedQRData.longitude}</p>
                    </div>
                    <div>
                        <p>Current Latitude: {location.latitude}, Current Longitude: {location.longitude} </p>
                    </div>

                    {isLocationMatch()}
                </div>
            )}
        </div>
    );
};

export default Geolocation;
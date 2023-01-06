import React, { useEffect, useState } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { StoreItem } from "../components/StoreItem"
import Items from "../data/items.json"
import { Fab, TextareaAutosize } from '@material-ui/core'



// the below code is not working 
//I want to Scan Barcode and take it as input then loop on all items to filter the item with that barcode to retun the corresponding StoreItem card !



export function Scan() {

  
  const [barcode, setbarcode] = React.useState("");
  
  return (

    

    <div>
      <span>Scan</span>
      <center>

        <div style={{ marginTop: 10 }}>
          <BarcodeScannerComponent
            width={400}
            height={400}
            onUpdate={(err, result) => {
              if (result) setbarcode(result.toString);
            }}
          />
        </div>

      </center>
      <TextareaAutosize
        style={{ fontSize: 18, width: 320, height: 50, marginTop: 1 }}
        rowsMax={4}
        defaultValue={barcode}
        value={barcode}
      />
      <div>
      {Items.filter(item =>item.id ===2).map(item=> <StoreItem{...item} />)}
      </div>
        <div>
                {Items.filter(item => item.barcode === barcode).map(item =>
                (<span key={item.id}>
                    <StoreItem{...item} />
                </span>
                ))}
            </div>

    </div>

  );
}
export default Scan;

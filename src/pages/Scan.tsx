import React, { useEffect, useState } from 'react'
import Html5QrcodePlugin from "../utilities/Html5QrcodePlugin"
import ResultContainerPlugin  from "../utilities/ResultContainerPlugin.jsx"
import Items from "../data/items.json" // this is list of item(s) in JSON format, each item has parameter like id, name, price, barcode, imgUrl 

import { StoreItem } from "../components/StoreItem" // this is refer to function StoreItem({ id, name, price, barcode, imgUrl } to render item in Card format with couple of buttons


//I want to Scan Barcode and take it as input then loop on all items to filter the item with that barcode to retun the corresponding StoreItem card !
/* Sample for the needed logic below
const [barcode, setBarcode] = React.useState("");
if (result) setBarcode(result.toString);
<div>
{Items.filter(item => item.barcode === barcode).map(item =>
(<span key={item.id}>
    <StoreItem{...item} />
</span>
))}
</div>
*/


interface StateInterface {
  decodedResults: Array<any>;
}

interface StateInterface {
  decodedResults: Array<any>;
}

class Scan extends React.Component<{}, StateInterface> {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    };
    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }
  render() {
    console.log(this.state);
    return (
      <div className="Scan">
        <section className="Scan-section">
          <div className="Scan-section-title">
            {" "}
            {this.state.decodedResults.length}
          </div>
          <br />
          <br />
          <br />
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
          />
          <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log("Scan [result]", decodedResult);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}
export default Scan;
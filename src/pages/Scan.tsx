import React, { useEffect, useState } from 'react'
//https://codesandbox.io/s/react-typescript-forked-lhvt0k?file=/src/Scan.tsx:1271-1364
import Html5QrcodePlugin from "../utilities/Html5QrcodePlugin"
import ResultContainerPlugin from "../utilities/ResultContainerPlugin.jsx"
import Items from "../data/items.json" // this is list of item(s) in JSON format, each item has parameter like id, name, price, barcode, imgUrl 

import { StoreItem } from "../components/StoreItem" // this is refer to function StoreItem({ id, name, price, barcode, imgUrl } to render item in Card format with couple of buttons

interface StateInterface {
  decodedResults: Array<any>;
  decodedText: string 
}

//https://beta.reactjs.org/reference/react/Component
class Scan extends React.Component<{}, StateInterface> {
  constructor(props) {
    super(props);

    this.state = {
      decodedResults: [],
      decodedText : ""
      
    };
    // This binding is necessary to make `this` work in the callback.
    //bind(this) means that when you use this inside onNewScanResult, it'll point to the actual class instance, so you have access to setState etc
    //decodedText is a parameter that onNewScanResult receives when called
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }
  onNewScanResult(decodedText, decodedResult) {
    console.log("Scan [result] =", decodedText);

    /*
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      decodedText : decodedText ;
      return state;
    }); 
    */

    this.setState((state, props) => ({decodedResults: [...state.decodedResults,decodedText ] , decodedText: decodedText}) )

    this.setState((state)=>console.log("here is state inside setState:" + state))

    this.setState((state)=>console.log("here is this.state inside setState:" + this.state))
  
  }
  
  render() {
    console.log("this.state =" + this.state);
    console.log("Before calling decodedText");
    console.log(this.state.decodedText);
    console.log(" After calling decodedText");
    return (
      <div className="Scan">
        <section className="Scan-section">
          <div className="Scan-section-title">
            {" "}
            {this.state.decodedResults.length}
          </div>
          <br /><br /><br />
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
          />
          <ResultContainerPlugin results={this.state.decodedResults} />
          <div>
            {Items.filter(item => item.barcode === this.state.decodedText).map(item =>
            (<span key={item.id}>
              <StoreItem{...item} />
            </span>
            ))}
          </div>
        </section>
      </div>
    );
  }

}
export default Scan;

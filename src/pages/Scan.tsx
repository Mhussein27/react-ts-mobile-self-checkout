import React, { useEffect, useState } from 'react'
import Html5QrcodePlugin from "../utilities/Html5QrcodePlugin"
import ResultContainerPlugin from "../utilities/ResultContainerPlugin.jsx"
import Items from "../data/items.json"
import { StoreItem } from "../components/StoreItem"
import { Row } from 'react-bootstrap'

interface StateInterface {
  decodedResults: Array<any>;
  decodedText: string
}

class Scan extends React.Component<{}, StateInterface> {
  constructor(props) {
    super(props);

    this.state = {
      decodedResults: [],
      decodedText: ""
    };

    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log("Scan [result] =", decodedText);

    this.setState({
      decodedResults: [...this.state.decodedResults, decodedText],
      decodedText: decodedText
    });

    console.log("here is state inside setState:" + this.state);

    console.log("here is this.state inside setState:" + this.state);

    const matchingItems = Items.filter(item => item.barcode === decodedText);

    this.setState({
      matchingItems: matchingItems
    });
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
          <div className="qr-scanner-container">
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={this.onNewScanResult}
            />
            <style jsx>{`
              .qr-scanner-container {
                width: 100%;
                height: 100%;
                max-width: 600px;
                max-height: 600px;
                margin: 0 auto;
              }

              @media (min-width: 768px) {
                .qr-scanner-container {
                  width: 600px;
                  height: 600px;
                }
              }
            `}</style>
          </div>
          <ResultContainerPlugin results={this.state.decodedResults} />
          <div>The barcode you are trying to Scan is  : {this.state.decodedText}</div>
          <div className="g-3" >
            <Row md={2} xs={1} lg={3} className="g-3"  >
              {this.state.matchingItems && this.state.matchingItems.map(item =>
              (<span key={item.id}>
                <StoreItem{...item} />
              </span>
              ))}
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

export default Scan
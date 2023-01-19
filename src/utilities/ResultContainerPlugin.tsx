import React from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";

// more non-exported types wee
type QrcodeSuccessCallback = Parameters<InstanceType<typeof Html5QrcodeScanner>["render"]>[0];
type Html5QrcodeResult = Parameters<QrcodeSuccessCallback>[1];

function filterResults(results: Html5QrcodeResult[]) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (results[i].decodedText !== results[i - 1].decodedText) {
      filteredResults.push(results[i]);
    }
  }
  return filteredResults;
}

class ResultContainerTable extends React.Component<{ data: Html5QrcodeResult[] }> {
  render() {
    const results = filterResults(this.props.data);
    return (
      <table className={'Qrcode-result-table'}>
        <thead>
            {/*
          <tr>
            <td>#</td>
            <td>Decoded Text</td>
            <td>Format</td>
          </tr>
           */}
        </thead>
        <tbody>
          {
            results.map((result, i) => {
              console.log(result);
              return (<tr key={i}>
                {/*<td>{i}</td>*/}
                <td>{result.decodedText}</td>
                {/* <td>{result.result.format?.formatName}</td> */}
              
              </tr>);
            })
          }
        </tbody>
      </table>
    );
  }
}

class ResultContainerPlugin extends React.Component<{ results: Html5QrcodeResult[] }> {
  render() {
    const results = filterResults(this.props.results);
    return (<div className='Result-container'>
      {/*<div className='Result-header'>Scanned results ({results.length})</div>*/}
      <div className='Result-section'>
        <ResultContainerTable data={this.props.results} />
      </div>
    </div>);
  }
}

export default ResultContainerPlugin;

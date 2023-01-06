import { Html5QrcodeScanner } from "html5-qrcode";
import React from 'react';

// would be nice if these were exported but ah well
type Html5QrcodeScannerConfig = NonNullable<ConstructorParameters<typeof Html5QrcodeScanner>[1]>;
type QrcodeSuccessCallback = Parameters<InstanceType<typeof Html5QrcodeScanner>["render"]>[0];
type QrcodeErrorCallback = NonNullable<Parameters<InstanceType<typeof Html5QrcodeScanner>["render"]>[1]>;

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps extends Html5QrcodeScannerConfig {
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback?: QrcodeErrorCallback;
}

class Html5QrcodePlugin extends React.Component<Html5QrcodePluginProps> {
  html5QrcodeScanner?: Html5QrcodeScanner;

  render() {
    return <div id={qrcodeRegionId} />;
  }

  componentWillUnmount() {
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    this.html5QrcodeScanner?.clear().catch(error => {
      console.error("Failed to clear html5QrcodeScanner. ", error);
    });
  }

  componentDidMount() {
    // Creates the configuration object for Html5QrcodeScanner.
    function createConfig(props: Html5QrcodePluginProps) {
      const config: Html5QrcodeScannerConfig = { fps: props.fps };
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
      }
      return config;
    }

    const config = createConfig(this.props);
    const verbose = this.props.verbose === true;

    // Suceess callback is required.
    if (!(this.props.qrCodeSuccessCallback)) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId, config, verbose);
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback);
  }
};

export default Html5QrcodePlugin;
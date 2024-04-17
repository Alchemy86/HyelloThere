import Script from "next/script";

const Mava = () => (

    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script 
        strategy="beforeInteractive"
        defer 
        src="https://widget.mava.app" 
        widget-version="v2" 
        id="MavaWebChat" 
        enable-sdk="true" 
        data-token="fa51bf79dafb75d99f19c09f4e2b9a76b6f4a896ab1f78e552afed2cafd64099"/>


  );

export default Mava;

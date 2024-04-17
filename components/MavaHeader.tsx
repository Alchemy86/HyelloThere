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
        data-token={process.env.MAVA_TOKEN}/>

  );

export default Mava;

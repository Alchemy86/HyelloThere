// components/CustomHead.js

import Head from 'next/head';

const Mava = () => (
  <Head>
    {/* Mava Widget */}
    <script
      defer
      src="https://widget.mava.app"
      widget-version="v2"
      id="MavaWebChat"
      enable-sdk="false"
      data-token="fa51bf79dafb75d99f19c09f4e2b9a76b6f4a896ab1f78e552afed2cafd64099"
    ></script>
  </Head>
);

export default Mava;

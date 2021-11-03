import { Carousel } from "react-carousel-minimal";
import React, { useState } from "react";

export default function SeePDF(props) {
    

  var data = [
    {
      image:
        "https://lh3.googleusercontent.com/proxy/ae60779mwvvWrzy-2z0Bc4LN8hFm3UBRx_ZcUEmvMrb8Of0MycD3n5tOpJ2sG2CEu4AtpGWa49HwaBP6Wgiq1rExrAC3gJwscjpgAXpQbJ44pADsaJEm8ALPEKH2_w",
      caption: "Agromin",
    },
  ];


  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Carousel
      data={data}
      time={5000}
      width="850px"
      height="500px"
      captionStyle={captionStyle}
      radius="10px"
      slideNumber={true}
      slideNumberStyle={slideNumberStyle}
      captionPosition="bottom"
      automatic={true}
      dots={true}
      pauseIconColor="black"
      pauseIconSize="40px"
      slideBackgroundColor="darkgrey"
      slideImageFit="cover"
      thumbnails={true}
      thumbnailWidth="100px"
      style={{
        textAlign: "center",
        maxWidth: "850px",
        maxHeight: "500px",
        margin: "40px auto",
      }}
    />
  );
}

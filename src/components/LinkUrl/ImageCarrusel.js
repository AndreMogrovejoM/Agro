import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import ImageGallery from "react-image-gallery";
import "./carrusel.css";
import DownloadImage from "../../assets/images/products/DownloadImage";
import "../../components/v3dApp/app.css";
import CloseIcon from "../../assets/images/products/CloseIcon";

let ListaTemporalImages = [];
let currentIndexIMG = 0;

const saveImg = (name, url) => {
  const urlArr = url;
  const lastLetter =
    url.charAt(url.length - 3) +
    url.charAt(url.length - 2) +
    url.charAt(url.length - 1);
  // console.log(lastLetter);
  (async () => {
    const blob = await fetch(urlArr).then((r) => r.blob());
    saveAs(blob, name + "." + lastLetter);
  })();
};

const App = (props) => {
  useEffect(() => {
    onPlay();
  }, [props.listaImg]); // <-- empty dependency array

  const onPlay = () => {
    currentIndexIMG = 0;
    ListaTemporalImages = [];
    const obj = {
      original: "value1",
      thumbnail: "value2",
      description: "value3",
      originalHeight: "value4",
      originalWidth: "value5",
    };
    const w = window.screen.width;
    console.log(w);

    if (w >= 1700) {
      obj.originalHeight = "680px";
      obj.originalWidth = "600px";
    } else {
      obj.originalHeight = "500px";
      obj.originalWidth = "600px";
    }

    for (let index = 0; index < props.listaImg.length; index++) {
      obj.original = props.listaImg[index].image;
      obj.thumbnail = props.listaImg[index].image;
      obj.description = props.listaImg[index].caption;
      const obj2 = Object.keys(obj)
        .slice(0, 5)
        .reduce((result, key) => {
          result[key] = obj[key];

          return result;
        }, {});
      ListaTemporalImages.push(obj2);
    }
  };

  const downloadIMG = (currentIndex) => {
    currentIndexIMG = currentIndex;
  };

  return (
    <div>
      <div className="BackGroundWhiteM">
        <ImageGallery
          items={ListaTemporalImages}
          // showBullets={true}
          showIndex={true}
          showThumbnails={false}
          lazyLoad={true}
          onSlide={downloadIMG}
          thumbnailPosition={"left"}
          // showPlayButton={false}

          showFullscreenButton={false}
          showPlayButton={false}
        />
        <DownloadImage
          classStyle="DownloadImag"
          onclick={() =>
            saveImg(
              ListaTemporalImages[currentIndexIMG].description,
              ListaTemporalImages[currentIndexIMG].original
            )
          }
        />
        <CloseIcon id="buttonImg" className="buttonCloseIMG" />
      </div>
    </div>
  );
};

export default App;

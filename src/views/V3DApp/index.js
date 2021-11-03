import React from "react";
// import { Carousel } from "react-carousel-minimal";
import * as v3dAppAPI from "../../components/v3dApp/app";
import "../../components/v3dApp/app.css";

import PDFViewer from "../../components/pdf/PdfViewer";
import Iframe from "react-iframe";
import OpenLink from "../../components/LinkUrl/Link";
import Informacion from "../../components/LinkUrl/Informacion";
import OpenSR from "../../components/LinkUrl/showRoom";
import CloseIcon from "../../assets/images/products/CloseIcon";

import ImgCarrusel from "../../components/LinkUrl/ImageCarrusel";

// import { getStandData } from "../../services/Feria3D";
import "../../components/LinkUrl/closeButton.css";
import "../../components/LinkUrl/staff.css";
import "../../components/LinkUrl/exel.css";

class V3DApp extends React.Component {
  #app = null;

  constructor(props) {
    super(props);

    this.state = {
      buttonActive: null,
      buttonsIndex: [0, 1],
      displayColorPicker: false,
      displayColorPicker2: false,
      xoffset: 73,
      yoffset: 25,
      delta: 10,
      opacity: 1,
      contadorPdf: 0,
      BeginPlaye: 0,
      hideMap: true,
      hasPdf: false,
      hasPdfReceptor: false,
      hasVideo: false,
      hasVideoReceptor: false,
      id_videoPlay: 0,
      jsonDataStands: [],
      urlCalentyTemporal: "",
    };
  }

  componentDidMount() {
    v3dAppAPI.SetJsonStands();
    v3dAppAPI.createApp().then((app) => {
      this.#app = app;
    });
    setTimeout(
      function () {
        this.setState({ jsonDataStands: v3dAppAPI.getVarID_UrlFacebbok() });
        // console.log(this.state.jsonDataStands);
        this.InstanciarPositionPlayerMap();
        // console.log(this.state.jsonDataStands[0].staff.length);
        // console.log(this.state.jsonDataStands[0].staff[0].calendify);
        // console.log(this.state.jsonDataStands[0].staff[0].calendify.name);
        // console.log(this.state.jsonDataStands[0].staff[0].whatsapp);
        // console.log(this.state.jsonDataStands[0].staff[0].whatsapp.name);
      }.bind(this),
      10000
    );
  }

  componentWillUnmount() {
    if (this.#app !== null) {
      this.#app.dispose();
      this.#app = null;
    }
  }

  changePositionPlayerMap() {
    this.setState({ hideMap: !this.state.hideMap });
  }

  plussPdf(t) {
    this.setState({ contadorPdf: t });
  }

  idVideoPlayF(t) {
    this.setState({ id_videoPlay: t });
  }

  InstanciarPositionPlayerMap = () => {
    if (this.state.BeginPlaye === 0) {
      let t = 0;
      setInterval(() => {
        if (this.state.opacity === 0.8) {
          t = 1;
        } else if (this.state.opacity === 1) {
          t = 0.8;
        }
        let posX = v3dAppAPI.getPositionPlayerX();
        let posY = v3dAppAPI.getPositionPlayerY();

        const posXcR = 50;
        if (posX > 0 && posY > 0) {
          posX = posXcR + posX / 2;
          posY = posXcR - Math.abs(posY / 2);
        }

        if (posX < 0 && posY > 0) {
          posX = posXcR - Math.abs(posX / 2);
          posY = posXcR - Math.abs(posY / 2);
        }
        if (posX < 0 && posY < 0) {
          posX = posXcR - 5 - Math.abs(posX / 2);
          posY = posXcR + Math.abs(posY / 2);
        }
        if (posX > 0 && posY < 0) {
          posX = posXcR + posX / 2;
          posY = posXcR + Math.abs(posY / 2);
        }

        this.setState({ xoffset: posX + 14, yoffset: posY + 1, opacity: t });
      }, 300);
      this.setState({ BeginPlaye: 1 });
    }
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    v3dAppAPI.getColor(color);
  };

  render() {
    const self = this;
    // const iframeurl = "https://uso-del-agua-en-operaciones.vercel.app/";

    let temporalPdfPicker = v3dAppAPI.getVarOpenPdf();
    let temporalVideoPicker = v3dAppAPI.getVarOpenVideo();
    let temporalHideImage = v3dAppAPI.getVarOpen_Img();
    let temporalGoogleMeet = v3dAppAPI.getVarGoogleMeet();
    let temporalHideCalendy = v3dAppAPI.getVarCalendy();
    let temporalHideXLS = v3dAppAPI.getVar_XLS();
    let temporalHideStaff = v3dAppAPI.getVar_Staff();
    const temporalHiIframe = v3dAppAPI.getVar_Iframe();

    const idPdf = v3dAppAPI.getVarID_pdf();
    const idImg = v3dAppAPI.getVarID_Img();
    const idVideo = v3dAppAPI.getVarID_video();
    const idXLS = v3dAppAPI.getVarID_XLS();
    const idStaff = v3dAppAPI.getVarID_Staff();
    const idtipoStaff = v3dAppAPI.getVarShow_id_tipoStaff() - 1;

    function toggleActiveStyle(index) {
      if (self.state.buttonActive === self.state.buttonsIndex[index]) {
        return "buttons active";
      } else {
        return "buttons";
      }
    }

    const handleHidePdf = (event) => {
      const target = event.target;
      if (target.id !== "HidePdf") {
        return;
      }
      this.plussPdf(0);
      temporalPdfPicker = false;
      v3dAppAPI.setVarOpenPdf(false);
    };

    const handleVideoClic = (event) => {
      const target = event.target;
      if (target.id !== "buttonVideo") {
        return;
      }
      temporalVideoPicker = false;
      v3dAppAPI.setVarOpenVideo(false);
    };

    const handleGoogleMeet = (event) => {
      const target = event.target;
      if (target.id !== "ShowRRoom") {
        return;
      }
      temporalGoogleMeet = false;
      v3dAppAPI.setVarGoogleMeet(false);
    };

    const handleCalendy = (event) => {
      const target = event.target;
      this.setState({
        urlCalentyTemporal:
          this.state.jsonDataStands[idStaff].staff[idtipoStaff].calendify.link,
      });

      if (target.id !== "calendy") {
        return;
      }
      temporalHideCalendy = !temporalHideCalendy;
      v3dAppAPI.setVarShowCalendy(!v3dAppAPI.getVarCalendy());
    };

    const deleteTemporal = (event) => {
      temporalHideCalendy = !temporalHideCalendy;
      v3dAppAPI.setVarShowCalendy(!v3dAppAPI.getVarCalendy());
    };

    const HideImage = (event) => {
      const target = event.target;
      if (target.id !== "buttonImg") {
        return;
      }
      temporalHideImage = false;
      v3dAppAPI.setVarOpen_Img(false);
    };

    const HideXLS = (event) => {
      const target = event.target;
      if (target.id !== "buttonXLS") {
        return;
      }
      temporalHideXLS = false;
      v3dAppAPI.setVarShow_XLS(false);
    };

    const HideStaff = (event) => {
      const target = event.target;
      if (target.id !== "buttonStaff") {
        return;
      }
      temporalHideStaff = false;
      v3dAppAPI.setVarShow_Staff(false);
    };

    function open(url, temporal = "_self") {
      const win = window.open(url, temporal);
      if (win != null) {
        win.focus();
      }
    }

    return (
      <div id={v3dAppAPI.CONTAINER_ID}>
        <div id="preloader_screen">
          <div className="skill">
            <div className="outer">
              <div className="inner">
                <div id="percentage">50%</div>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="160px"
              height="160px"
              className="preloader_circle"
            >
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stopColor="#e91e63" />
                  <stop offset="100%" stopColor="#673ab7" />
                </linearGradient>
              </defs>
              <circle
                id="circle"
                cx="80"
                cy="80"
                r="70"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="containerColorPicker">
          <button id="showRoom" key={2} className={toggleActiveStyle(0)}>
            <img
              className="immgEsquina"
              src="./documents/003-conferencias.svg"
              alt="iamgenConferiancia"
            />
          </button>
          <button id="map" key={1} className={toggleActiveStyle(0)}>
            <svg
              className="immgEsquina"
              stroke="currentColor"
              fill="#fff"
              strokeWidth="0"
              viewBox="0 0 576 512"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"></path>
            </svg>
          </button>
        </div>

        <div
          id="fullscreen_button"
          className="fullscreen-button fullscreen-open"
          title="Toggle fullscreen mode"
        ></div>

        <div>
          <Informacion />
        </div>

        <div className="btnp"></div>

        <div id="hideElement" className="minimpaFeria3D">
          <div className="marginInside_gps1">
            <button id="location1" className="ButtonCss">
              <img
                id="teleportMap"
                className="img_positionMap"
                alt="posicion 1"
                src="./documents/01-inicio.png"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div className="marginInside_gps2">
            <button id="location2" className="ButtonCss">
              <img
                id="teleportMap2"
                className="img_positionMap"
                alt="posicion 2"
                src="./documents/001-food-stand.svg"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div className="marginInside_gps4">
            <button id="location3" className="ButtonCss">
              <img
                id="teleportMap3"
                className="img_positionMap"
                alt="posicion 4"
                src="./documents/001-food-stand.svg"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div className="marginInside_gps5">
            <button id="location4" className="ButtonCss">
              <img
                id="teleportMap4"
                className="img_positionMap"
                alt="posicion 5"
                src="./documents/001-noticias.svg"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div className="marginInside_gps6">
            <button id="location5" className="ButtonCss">
              <img
                id="teleportMap5"
                className="img_positionMap"
                src="./documents/001-food-stand.svg"
                alt="my image2"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div className="marginInside_gps7">
            <button id="location6" className="ButtonCss">
              <img
                id="teleportMap6"
                className="img_positionMap"
                src="./documents/003-conferencias.svg"
                alt="my image2"
                onClick={() => this.changePositionPlayerMap}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </button>
          </div>

          <div
            style={{
              borderColor: "red",
              position: "absolute",
              left: `${this.state.xoffset}%`,
              top: `${this.state.yoffset}%`,
              width: "10%",
              height: "10%",
            }}
          >
            <button
              id="location4"
              className="ButtonCssPlayer"
              style={{ opacity: this.state.opacity }}
            >
              <img
                id="teleportMap"
                src="./documents/008-alfiler.svg"
                alt="my image3"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: this.state.opacity,
                }}
              />
            </button>
          </div>
        </div>

        <div id="ElementShowRoom" className="BackGroundWhiteTemporal">
          <OpenSR />
        </div>

        <div id="mensajeDenegacion" className="BackGroundWhiteTemporal">
          <div className="backgroundDenegacion">
            <div>
              <p className="pAccDene"> Acceso denegado</p>
            </div>
            <img
              id="closeACD"
              alt=" posicion cerrar 8"
              className="buttonCloseACD"
              src="./documents/close.svg"
            ></img>
          </div>
        </div>

        {temporalPdfPicker !== false && (
          <div
            id="HidePdf"
            className="BackGroundWhite"
            onClick={(e) => handleHidePdf(e)}
          >
            <div className="stileIMG">
              {this.state.jsonDataStands[idPdf].pdfs.length >= 1 && (
                <div className="ButtonPosition_1">
                  <div className="borderButton">
                    <img
                      alt=" posicion cerrar 1"
                      src="./documents/img_pdf/pdf.png"
                      onClick={() => this.plussPdf(0)}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <p className="colorTextPDF">
                    {this.state.jsonDataStands[idPdf].pdfs[0].description}
                  </p>
                </div>
              )}
              {this.state.jsonDataStands[idPdf].pdfs.length >= 2 && (
                <div className="ButtonPosition_2">
                  <div className="borderButton">
                    <img
                      alt=" posicion cerrar 2"
                      src="./documents/img_pdf/pdf.png"
                      onClick={() => this.plussPdf(1)}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <p className="colorTextPDF">
                    {this.state.jsonDataStands[idPdf].pdfs[1].description}
                  </p>
                </div>
              )}
              {this.state.jsonDataStands[idPdf].pdfs.length >= 3 && (
                <div className="ButtonPosition_3">
                  <div className="borderButton">
                    <img
                      alt=" posicion cerrar 3"
                      src="./documents/img_pdf/pdf.png"
                      onClick={() => this.plussPdf(2)}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <p className="colorTextPDF">
                    {this.state.jsonDataStands[idPdf].pdfs[2].description}
                  </p>
                </div>
              )}
              {this.state.jsonDataStands[idPdf].pdfs.length >= 4 && (
                <div className="ButtonPosition_4">
                  <div className="borderButton">
                    <img
                      alt=" posicion cerrar 4"
                      src="./documents/img_pdf/pdf.png"
                      onClick={() => this.plussPdf(3)}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <p className="colorTextPDF">
                    {this.state.jsonDataStands[idPdf].pdfs[3].description}
                  </p>
                </div>
              )}
            </div>
            {this.state.jsonDataStands[idPdf].pdfs.length >= 1 && (
              <div className="BackGroundWhitePDF">
                <PDFViewer
                  pdf={
                    this.state.jsonDataStands[idPdf].pdfs[
                      this.state.contadorPdf
                    ].file
                  }
                />
              </div>
            )}
            {this.state.jsonDataStands[idPdf].pdfs.length === 0 && (
              <p className="Colorh4">No existen archivos PDF</p>
            )}
            <img
              alt=" resconder pdf"
              id="HidePdf"
              className="buttonClosePDF"
              src="./documents/close.svg"
              onClick={(e) => handleHidePdf(e)}
            ></img>
          </div>
        )}
        {temporalVideoPicker !== false && (
          <div
            id="buttonVideo"
            className="BackGroundWhiteYoutube"
            onClick={(e) => handleVideoClic(e)}
          >
            {this.state.jsonDataStands[idVideo].url_video && (
              <div>
                <iframe
                  className="BackGroundIframe"
                  src={this.state.jsonDataStands[idVideo].url_video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  display="initial"
                  playing={true}
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {this.state.jsonDataStands[idVideo].url_video === null && (
              <h4 className="Colorh4">No existe video para reproducir</h4>
            )}
            <img
              alt=" posicion cerrar 4"
              id="buttonVideo"
              className="buttonCloseSR"
              src="./documents/close.svg"
              onClick={(e) => handleVideoClic(e)}
            ></img>
          </div>
        )}
        {temporalGoogleMeet !== false && (
          <div
            id="ShowRRoom"
            className="BackGroundWhite"
            onClick={(e) => handleGoogleMeet(e)}
          >
            <iframe
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              src="https://meet.jit.si/AutomaticGodsInformNervously"
              width="100%"
              title="showrrom"
            ></iframe>
            <img
              alt=" posicion cerrar 6"
              id="ShowRRoom"
              className="buttonCloseSR"
              src="./documents/close.svg"
              onClick={(e) => handleGoogleMeet(e)}
            ></img>
          </div>
        )}
        {temporalHideImage !== false && (
          <div
            id="buttonImg"
            className="BackGroundWhite"
            onClick={(e) => HideImage(e)}
          >
            {this.state.jsonDataStands[idImg].images.length >= 1 && (
              <ImgCarrusel listaImg={this.state.jsonDataStands[idImg].images} />
            )}
            {this.state.jsonDataStands[idImg].images.length === 0 && (
              <h4 className="Colorh4">No existen imágenes para mostar</h4>
            )}
          </div>
        )}
        {temporalHideCalendy !== false && (
          <div
            id="calendy"
            className="BackGroundWhite"
            onClick={(e) => handleCalendy(e)}
          >
            <OpenLink value={this.state.urlCalentyTemporal} />
            <img
              id="closeCalendy"
              alt=" posicion cerrar 8"
              className="buttonCloseCalendy"
              src="./documents/close.svg"
              onClick={(e) => deleteTemporal(e)}
            ></img>
          </div>
        )}
        {temporalHideXLS !== false && (
          <div
            id="buttonXLS"
            className="BackGroundWhite"
            onClick={(e) => HideXLS(e)}
          >
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <link rel="stylesheet" href="style.css" />
              <link
                href="https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:wght@300&display=swap"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
              />
              <title>Login Form</title>
            </head>
            <div className="bodyXLS">
              <div className="containerXLS">
                <h3>Archivos excel</h3>
                <div className="shapeXLS">
                  {this.state.jsonDataStands[idXLS].excels.length >= 1 && (
                    <div className="xlsx_img1">
                      <img
                        alt=" posicion cerrar 9"
                        src="./documents/img_pdf/xlsx_icon.svg"
                        onClick={() =>
                          open(this.state.jsonDataStands[idXLS].excels[0].file)
                        }
                      />
                      <p className="colorTextXLS">
                        {this.state.jsonDataStands[idXLS].excels[0].description}
                      </p>
                    </div>
                  )}
                  {this.state.jsonDataStands[idXLS].excels.length >= 2 && (
                    <div className="xlsx_img2">
                      <img
                        alt=" posicion cerrar 10"
                        src="./documents/img_pdf/xlsx_icon.svg"
                        onClick={() =>
                          open(this.state.jsonDataStands[idXLS].excels[1].file)
                        }
                      />
                      <p className="colorTextXLS">
                        {this.state.jsonDataStands[idXLS].excels[1].description}
                      </p>
                    </div>
                  )}

                  {this.state.jsonDataStands[idXLS].excels.length === 0 && (
                    <p className="Colorh3">
                      No existen archivos XLS para mostrar
                    </p>
                  )}
                </div>
                <CloseIcon id="buttonXLS" className="buttonClosexls" />
              </div>
            </div>
          </div>
        )}

        {temporalHideStaff !== false && (
          <div
            id="buttonStaff"
            className="BackGroundWhite"
            onClick={(e) => HideStaff(e)}
          >
            <div className="BackGroundWhite">
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <link rel="stylesheet" href="style.css" />
                <link
                  href="https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:wght@300&display=swap"
                  rel="stylesheet"
                />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <title>Login Form</title>
              </head>

              <div className="bodyStaff">
                <div className="containerStaff">
                  <div className="shapeStaff">
                    <div className="imageStaff">
                      {this.state.jsonDataStands[idStaff].staff[idtipoStaff]
                        .user.evidence_image == null && (
                        <img
                          className="imagesUsusarioDefault"
                          alt=" posicion cerrar 9"
                          src="./images/usuario.png"
                        />
                      )}
                      {this.state.jsonDataStands[idStaff].staff[idtipoStaff]
                        .user.evidence_image != null && (
                        <img
                          className="imagesUsusarioDefault"
                          alt=" posicion cerrar 9"
                          src={
                            this.state.jsonDataStands[idStaff].staff[
                              idtipoStaff
                            ].user.evidence_image
                          }
                        />
                      )}
                    </div>
                  </div>
                  <h3>
                    {
                      this.state.jsonDataStands[idStaff].staff[idtipoStaff].user
                        .first_name
                    }{" "}
                    {
                      this.state.jsonDataStands[idStaff].staff[idtipoStaff].user
                        .last_name
                    }{" "}
                  </h3>
                  <p>
                    {
                      this.state.jsonDataStands[idStaff].staff[idtipoStaff].user
                        .email
                    }
                  </p>
                  <p>
                    {
                      this.state.jsonDataStands[idStaff].staff[idtipoStaff].user
                        .mobile
                    }
                  </p>
                  <div className="iconsStaff">
                    <div className="iconoCalendy">
                      <img
                        className="iconoWatsap"
                        alt=" posicion cerrar 9"
                        src="./documents/whatsapp.svg"
                        onClick={() =>
                          open(
                            // this.state.jsonDataStands[0].staff[id_tipoStaff].whatsapp.link,
                            this.state.jsonDataStands[idStaff].staff[
                              idtipoStaff
                            ].whatsapp.link,
                            "_bank"
                          )
                        }
                      />
                    </div>
                    <div className="iconoCalendy">
                      <img
                        id="calendy"
                        className="iconoCalendy"
                        alt=" posicion cerrar 10"
                        src="./documents/calendario.svg"
                        onClick={(e) => {
                          handleCalendy(e);
                          v3dAppAPI.setVarShow_Staff(false);
                        }}
                      />
                    </div>
                  </div>
                  <CloseIcon id="buttonStaff" className="closeIconStaff" />
                </div>
              </div>
            </div>
          </div>
        )}

        {temporalHiIframe !== false && (
          <div id="Iframe" className="BackGroundWhiteTemporalIframe">
            <div>
              <Iframe
                url={v3dAppAPI.getVarLinkVercelEquipo()}
                // width="450px"
                // height="450px"
                id="buttonIframe"
                className="BackGroundIframe"
                display="initial"
                position="absolute"
              />
            </div>
          </div>
        )}

        <img
          alt=" posicion cerrar 12"
          id="CloseIframe"
          className="buttonCloseIframe"
          src="./documents/close.svg"
        ></img>
      </div>
    );
  }
}

export default V3DApp;

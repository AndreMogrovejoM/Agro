import React from "react";
import * as v3dAppAPI from "../../components/Auditorio/app.js";
import "../../components/Auditorio/app.css";
import Informacion from "../../components/Auditorio/linkUrl/Informacion";
import PDFViewer from "../../components/pdf/PdfViewer";

class Auditorio extends React.Component {
  #app = null;

  constructor(props) {
    super(props);

    this.state = {
      opacity: 1,
      temporalPdfPicker: false,
    };
  }

  componentDidMount() {
    v3dAppAPI.createApp().then((app) => {
      this.#app = app;
    });

    setTimeout(
      function () {
        this.InstanciarPositionPlayerMap();
      }.bind(this),
      1000
    );
  }

  componentWillUnmount() {
    if (this.#app !== null) {
      this.#app.dispose();
      this.#app = null;
    }
  }

  InstanciarPositionPlayerMap = () => {
    let t = 0;
    setInterval(() => {
      if (this.state.opacity === 0.8) {
        t = 1;
      } else if (this.state.opacity === 1) {
        t = 0.8;
      }
      this.setState({ opacity: t });
    }, 300);
  };

  render() {
    let temporalVideoPicker = v3dAppAPI.getVideoYoutube();
    // let temporalPdfPicker = v3dAppAPI.getPdf();
    // let temporalPdfPicker = true;

    const handleVideoClic = (event) => {
      const target = event.target;
      if (target.id !== "buttonVideo") {
        return;
      }
      temporalVideoPicker = false;
      v3dAppAPI.setVideoYoutube(false);
    };
    const handleHidePdf = (event) => {
      const target = event.target;
      if (target.id !== "HidePdf") {
        return;
      }
      this.setState({ temporalPdfPicker: false });
      // v3dAppAPI.setVarOpenPdf(false);
    };
    const openpdf = (event) => {
      // const target = event.target;
      // if (target.id !== "HidePdf") {
      //   return;
      // }
      this.setState({ temporalPdfPicker: true });
      // v3dAppAPI.setVarOpenPdf(false);
    };

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
          <button id="button_feria3d" className="buttons">
            <img
              id="feria3d"
              className="imagenAuditorio"
              src="./documents/001-food-stand.svg"
              alt="iamgenConferiancia"
            />
          </button>

          <button id="button_pdf" className="buttons">
            <img
              id="cronogramaPDF"
              className="imagenAuditorio"
              src="./documents/calendario.svg"
              alt="iamgenConferiancia"
              onClick={(e) => openpdf(e)}
            />
          </button>
        </div>

        <div>
          <Informacion />
        </div>

        <div
          id="fullscreen_button"
          className="fullscreen-button fullscreen-open"
          title="Toggle fullscreen mode"
        ></div>

        {temporalVideoPicker !== false && (
          <div
            id="buttonVideo"
            className="BackGroundWhite"
            onClick={(e) => handleVideoClic(e)}
          >
            <div>
              <iframe
                // style={{
                //   position: "absolute",
                //   top: "5%",
                //   left: "15%",
                //   textAlign: "center",
                //   border_radius: "10px",
                //   border_color: "#fff",
                //   width: "70%",
                //   height: "90%",
                // }}

                className="BackGroundIframe"
                src="https://www.youtube.com/embed/QsmoBucKuV0?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                display="initial"
                playing={true}
                allowFullScreen
              ></iframe>
            </div>
            <img
              alt=" posicion cerrar 4"
              id="buttonVideo"
              className="buttonCloseSR"
              src="./images/close.svg"
              onClick={(e) => handleVideoClic(e)}
              // style={{ opacity: this.state.opacity }}
            ></img>
          </div>
        )}

        {this.state.temporalPdfPicker !== false && (
          <div
            id="HidePdf"
            className="BackGroundWhite"
            onClick={(e) => handleHidePdf(e)}
          >
            <div className="stileIMG">
              <div className="ButtonPosition_1"></div>
            </div>
            <PDFViewer pdf={"./documents/cronograma.pdf"} />
            <img
              alt=" resconder pdf"
              id="HidePdf"
              className="buttonClosePDF"
              src="./documents/close.svg"
              onClick={(e) => handleHidePdf(e)}
            ></img>
          </div>
        )}
      </div>
    );
  }
}

export default Auditorio;

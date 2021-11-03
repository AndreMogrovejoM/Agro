import "./showrrom.css";
// import { getStandData } from "../../services/Feria3D";
import React from "react";
// import * as v3dAppAPI from "../../components/v3dApp/app";
import CloseIcon from "../../assets/images/products/CloseIcon";
const jsonShowRoom = [
  {
    titulo: "Stand 001",
    descripcion: "descripcion del show Room",
    hora: "08:30",
    fecha: "2014-06-12",
    imagen: "https://i.ytimg.com/vi/GRatOTD6raQ/maxresdefault.jpg",
  },
];
// var urlFacebook = null;

// async function SetJsonStands() {
//   if (urlFacebook === null) {
//     try {
//       const response = await getStandData();
//       urlFacebook = response.data;
//       console.log(urlFacebook);
//     } catch (error) {
//       console.log("error");
//     }
//   }
// }

const Box = ({ title, data, hour, description }) => {
  return (
    <div className="boxT1">
      <div>
        <img className="imageSR" src="./favicon.png" alt="iamgen" />
      </div>

      <div className="tituloDescripcion">
        <h4 className="colorTitulo">{title}</h4>
        <h4 className="Descripcion"> {description}</h4>
      </div>

      <div className="boxContentInformation">
        <div className="date">
          <div>
            <label className="input2" htmlFor="date">
              Fecha:
            </label>
          </div>
          <div>
            <input className="input3" type="date" defaultValue={data} />
          </div>
        </div>
        <div className="time">
          <div>
            <label className="input2" htmlFor="time">
              Hora: &nbsp;
            </label>
          </div>
          <div>
            <input className="input3" type="time" defaultValue={hour} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: "end" }}>
        <button className="button_Subscriberse">
          <b>Suscribirse</b>
        </button>
      </div>
    </div>
    // </div>
  );
};

const App = () => {
  // SetJsonStands();
  // console.log(url.value);
  return (
    <div className="backgroundSR">
      <div className="containerSR">
        <Box
          title={jsonShowRoom[0].titulo}
          description={jsonShowRoom[0].descripcion}
          data={jsonShowRoom[0].fecha}
          hour={jsonShowRoom[0].hora}
        />
        <Box
          title={jsonShowRoom[0].titulo}
          description={jsonShowRoom[0].descripcion}
          data={jsonShowRoom[0].fecha}
          hour={jsonShowRoom[0].hora}
        />
        <Box
          title={jsonShowRoom[0].titulo}
          description={jsonShowRoom[0].descripcion}
          data={jsonShowRoom[0].fecha}
          hour={jsonShowRoom[0].hora}
        />
        <Box
          title={jsonShowRoom[0].titulo}
          description={jsonShowRoom[0].descripcion}
          data={jsonShowRoom[0].fecha}
          hour={jsonShowRoom[0].hora}
        />
      </div>
      <CloseIcon id="CloseShowRoom" className="closeIcon" />
    </div>
  );
};

export default App;

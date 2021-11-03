import React from "react";
import "./informacion.css";

const App = (props) => {
  return (
    <div>
      <img
        alt="Info de informacion"
        id="informacion"
        className="buttonInformacion"
        src="./images/info.svg"
      ></img>

      <div id="bgInformacion" className="BackGroundWhiteInfo">
        <article className="all-browsers">
          <h1>Cómo usar</h1>
          <article className="browser">
            <h2>Rotación de cámara</h2>
            <p>
              Haga clic y arrastre el fondo para rotar la vista de la cámara.
            </p>
          </article>
          <article className="browser">
            <h2>Movimiento de cámara</h2>
            <p>
              Use las Teclas direccionales o en su defecto WASD para mover la
              camara.
            </p>
          </article>
          <article className="browser">
            <h2>Interacción con la pantalla</h2>
            <p>
              Haga clic sobre el monitor del auditorio para poder ver la
              transmisión.
            </p>
          </article>
          {/* <article className="browser">
            <h2>Interacción con los Stands</h2>
            <p>
              Los stands presentan iconos de redes sociales, video, staff,
              Excel, pdfs e imágenes, haga clic en cada una de ellas para que se
              le redireccione a su página correspondiente o se le muestre una
              ventana con dicha información
            </p>
          </article> */}
        </article>

        <img
          alt="cerrar icono de informacion"
          id="CerrarInformacion"
          className="buttonCloseInformacion"
          src="./images/close.svg"
        ></img>
      </div>
    </div>
  );
};

export default App;

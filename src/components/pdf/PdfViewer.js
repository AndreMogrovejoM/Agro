import React, { Component } from "react";
// import pdfFile from "./chart.pdf";
import "../../components/v3dApp/app.css";

export default class PDFViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pdf: props.pdf,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pdf !== prevState.pdf) {
      this.setState({ pdf: prevProps.pdf });
    }
  }

  handlePrint = () => {
    // is getElementById an anti pattern even if I'm not modyfying the DOM?
    const node = document.getElementById("print-file");
    node.contentWindow.focus();
    node.contentWindow.print();
  };

  render() {
    return (
      // <div className="pdfFile">
      <object data={this.state.pdf} type="application/pdf">
        <iframe
          title="pdf document"
          id="print-file"
          src={`https://docs.google.com/viewer?url=${this.state.pdf}&embedded=true`}
        />
      </object>
      // </div>
    );
  }
}

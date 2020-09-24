import React, { Component, Fragment, useLayoutEffect } from "react";
import "./App.css";
import sampleData from "./xmls/items_list.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTNList();
  }

  getTNList() {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(sampleData, "application/xml");
    const telephonesList = doc.getElementsByTagName("TelephoneNumberId");
    let tnUL = document.createElement("ul");
    let tns = [];
    for (let i = 0; i < telephonesList.length; i++) {
      tns.push(telephonesList[i].firstChild.nodeValue);
      let li = document.createElement("li");
      li.textContent = telephonesList[i].firstChild.nodeValue;
      tnUL.appendChild(li);
      console.log(tnUL);
    }

    return tnUL.outerHTML;
  }
  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.getTNList() }}></div>
      </div>
    );
  }
}

export default App;

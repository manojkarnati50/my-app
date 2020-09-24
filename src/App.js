import React, { Component } from "react";
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
    let tns = [];
    for (let i = 0; i < telephonesList.length; i++) {
      if (!tns.includes(telephonesList[i].firstChild.nodeValue))
        tns.push(telephonesList[i].firstChild.nodeValue);
    }

    return tns;
  }

  getVoiceRootTN() {}

  render() {
    return (
      <div>
        <h1 className="title">Voice Order Details</h1>
        <div>
          <ul>
            {this.getTNList().map((item) => (
              <li>
                <a href="">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

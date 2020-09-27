import React, { Component } from "react";
import "./App.css";
import sampleData from "./xmls/items_list.js";
import VoiceOrderDetails from "./VoiceOrderDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "Voice Order Details",
      telephonesList: [],
    };
  }

  componentDidMount() {
    this.setState({
      telephonesList: this.getTNList(),
      selectedPhoneNumber: this.getTNList()[0],
    });
  }
  getTNList() {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(sampleData, "application/xml");
    const telephoneNodes = doc.getElementsByTagName("TelephoneNumberId");
    let tns = [];
    for (let i = 0; i < telephoneNodes.length; i++) {
      if (!tns.includes(telephoneNodes[i].firstChild.nodeValue))
        tns.push(telephoneNodes[i].firstChild.nodeValue);
    }
    return tns;
  }

  setTelePhoneHandler(item) {
    this.setState({
      selectedPhoneNumber: item,
    });
    this.getVoiceRootTN(this.selectedPhoneNumber);
  }
  getVoiceRootTN(test) {
    console.log(test);
    let rootItem = "";
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(sampleData, "application/xml");
    const itemNodes = doc.getElementsByTagName("Item");
    for (let i = 0; i < itemNodes.length; i++) {
      let itemNode = itemNodes[i];
      let tn = itemNode.getElementsByTagName("TelephoneNumberId")[0]
        .textContent;
      let heiLevel = itemNode.getElementsByTagName("HierarchyLevel")[0]
        .textContent;
      let provCode = itemNode.getElementsByTagName("ProvisioningCode")[0]
        .textContent;
      if ("ROOT" === heiLevel && "SBPP" === provCode && test === tn) {
        rootItem = itemNode;
      }
      console.log("in app.js");
      console.log(rootItem);
      return rootItem;
    }
  }

  render() {
    return (
      <div>
        <h1 className="title">Voice Order Details</h1>
        <div>
          <h3>Telephone Numbers</h3>
          <ul>
            {this.state.telephonesList.map((item) => (
              <li key={item}>
                <p onClick={() => this.setTelePhoneHandler(item)}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <VoiceOrderDetails
          selectedPhoneNumber={this.state.selectedPhoneNumber}
        ></VoiceOrderDetails>
      </div>
    );
  }
}

export default App;

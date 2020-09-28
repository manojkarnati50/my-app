import React, { Component } from "react";
import "./App.css";
import sampleData from "./xmls/items_list.js";
import VoiceOrderDetails from "./VoiceOrderDetails";
import "./layout.css";
import logo from "./images/back.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "Voice Order Details",
      telephonesList: [],
      serviceIdentifier: "",
      ParentServiceIdentifier: "",
      EquipmentId: "",
      TelephoneNumberId: "",
      WorkPlanItemIdentifier: "",
      JobExists: "",
      AccountStageCode: "",
      Restore: "",
      Action: "",
      AccountId: "",
      Status: "",
      HierarchyLevel: "",
      ProvisioningCode: "",
      ProvisioningCodeDescription: "",
      Type: "",
      SubType: "",
      StageCode: "",
      Identifier: "",
      Name: "",
      Value: "",
      customAction: "",
      BeforeValue: "",
    };
    this.setTelePhoneHandler = this.setTelePhoneHandler.bind(this);
    this.getLeafItemNodes = this.getLeafItemNodes(this);
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
  }
  getVoiceRootTN(telephone) {
    alert("telephone" + telephone);
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
      if ("ROOT" === heiLevel && "SBPP" === provCode && telephone === tn) {
        rootItem = itemNode;
      }
      console.log("in app.js");
      console.log(rootItem);
      return rootItem;
    }
  }

  getLeafItemNodes = (props) => {
    let leafItems = [];
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
      if (
        "LEAF" === heiLevel &&
        "SBPP" === provCode &&
        props.selectedPhoneNumber === tn
      ) {
        leafItems.push(itemNode);
      }
      console.log(this.leafItems);
      return leafItems;
    }
  };

  render() {
    let logoDiv = (
      <div class="box-1">
        <img src={logo} alt="Logo" />
      </div>
    );
    let telephonesListDiv = (
      <div class="box-2">
        <ul>
          <span class="heading">TelephoneNumbers</span>
          {this.state.telephonesList.map((item) => (
            <li key={item}>
              <p onClick={() => this.setTelePhoneHandler(item)}>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    );
    let screenNameDiv = <div class="box-3">{this.state.screenName}</div>;
    let serviceIdentifierTable = (
      <table>
        <tr>
          <th>ServiceIdentifier</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>ParentServiceIdentifier</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>EquipmentId</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>TelephoneNumberId</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>WorkPlanItemIdentifier</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>TelephoneNumberICallingCardId UserDefinedIdentifier</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>AccountStageCode </th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>JobExists</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>Restore</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>Action</th>
          <th>eightchar</th>
        </tr>
      </table>
    );
    let accountIdTable = (
      <table>
        <tr>
          <th>AccountId</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>Status</th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th>HierarchyLevel</th>
          <th>ROOT</th>
        </tr>
        <tr>
          <th>ProvisioningCode</th>
          <th>LINE</th>
        </tr>
        <tr colspan="2">
          <th>ProvisioningCodeDescription</th>
          <th></th>
          <th>eightchar</th>
        </tr>
        <tr>
          <th rowspan="4">LineOfBusines</th>

          <tr>
            <th>Type</th>
            <th>T</th>
          </tr>
          <tr>
            <th>SubType</th>
            <th>LOCAL</th>
          </tr>
          <tr>
            <th>StageCode</th>
            <th>C</th>
          </tr>
        </tr>
      </table>
    );
    let customfieldsTable = (
      <table>
        <tr rowspan="5">
          <th>Custom Fields</th>
        </tr>
        <tr>
          <th>Identifier</th>
          <th>Name</th>
          <th>Value</th>
          <th>Action</th>
          <th>Before Value</th>
        </tr>
        <tr></tr>
      </table>
    );
    return (
      <div class="pallete">
        <div class="row-container">
          <div class="col-container">
            {logoDiv}
            {telephonesListDiv}
          </div>
          <div class="col-container">
            <div class="container-2">
              <div class="col-container">
                {screenNameDiv}
                <div class="row-container">
                  <div>{serviceIdentifierTable}</div>
                  <div>{accountIdTable}</div>
                </div>
                <div>{customfieldsTable}</div>
              </div>
            </div>
            <div class="container-3">
              <div class="col-container">
                <div class="row-container">
                  <div>{serviceIdentifierTable}</div>
                  <div>{accountIdTable}</div>
                </div>
                <div>{customfieldsTable}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

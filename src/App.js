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
      selectedPhoneNumber: "",
      screenName: "Voice Order Details",
      telephonesList: [],
      Identifier: "",
      Name: "",
      Value: "",
      customAction: "",
      BeforeValue: "",
      rootItem: [
        {
          ServiceIdentifier: "",
          ParentServiceIdentifier: "",
          EquipmentId: "",
          TelephoneNumberId: "",
          WorkPlanItemIdentifier: "",
          AccountStageCode: "",
          Job: "",
          Restore: "",
          Action: "",
          AccountId: "",
          HierarchyLevel: "",
          Status: "",
          ProvisioningCode: "",
          ProvisioningCodeDescription: "",
          LineOfBusiness: [{ Type: "", SubType: "", StageCode: "" }],
          Type: "",
          SubType: "",
          StageCode: "",
          CustomField: [
            {
              Identifier: "",
              Name: "",
              Value: "",
              customAction: "",
              BeforeValue: "",
            },
          ],
        },
      ],
      leafItems: [
        {
          ServiceIdentifier: "",
          ParentServiceIdentifier: "",
          EquipmentId: "",
          TelephoneNumberId: "",
          WorkPlanItemIdentifier: "",
          AccountStageCode: "",
          Job: "",
          Restore: "",
          Action: "",
          AccountId: "",
          HierarchyLevel: "",
          Status: "",
          ProvisioningCode: "",
          ProvisioningCodeDescription: "",
          Type: "",
          sType: "",
          SubType: "",
          CustomField: [
            {
              Identifier: "",
              Name: "",
              Value: "",
              customAction: "",
              BeforeValue: "",
            },
          ],
        },
      ],
    };
    this.setTelePhoneHandler = this.setTelePhoneHandler.bind(this);
    this.getRootNode = this.getRootNode.bind(this);
    this.getLeafNodes = this.getLeafNodes.bind(this);
  }

  componentDidMount() {
    this.setState({
      telephonesList: this.getTNList(),
      //selectedPhoneNumber: this.getTNList()[0],
    });
    //this.getRootNode(this.state.selectedPhoneNumber);
    this.getLeafNodes(this.state.selectedPhoneNumber);
  }
  setTelePhoneHandler(item) {
    this.setState({
      selectedPhoneNumber: item,
    });
    this.getRootNode(item);
    this.getLeafNodes(item);
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
    this.getRootNode(tns[0]);
    this.getLeafNodes(tns[0]);

    return tns;
  }

  getRootNode(telephone) {
    let rootItem = "";
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(sampleData, "application/xml");
    const itemNodes = doc.getElementsByTagName("Item");

    for (let i = 0; i < itemNodes.length; i++) {
      let itemNode = itemNodes[i];
      let tn, heiLevel, provCode;
      if (itemNode.getElementsByTagName("TelephoneNumberId")[0])
        tn = itemNode.getElementsByTagName("TelephoneNumberId")[0].textContent;
      if (itemNode.getElementsByTagName("HierarchyLevel")[0])
        heiLevel = itemNode.getElementsByTagName("HierarchyLevel")[0]
          .textContent;
      if (itemNode.getElementsByTagName("ProvisioningCode")[0])
        provCode = itemNode.getElementsByTagName("ProvisioningCode")[0]
          .textContent;
      if (heiLevel === "ROOT" && provCode === "SBPP" && tn === telephone) {
        let sid,
          psid,
          eqid,
          tnsid,
          wpiid,
          asc,
          job,
          restore,
          action,
          accid,
          hlvl,
          status,
          prov,
          pdesc,
          type,
          stype,
          stagecode;
        if (itemNode.getElementsByTagName("Job")[0])
          job = itemNode.getElementsByTagName("Job")[0].textContent;
        if (itemNode.getElementsByTagName("ServiceIdentifier")[0])
          sid = itemNode.getElementsByTagName("ServiceIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("ParentServiceIdentifier")[0])
          psid = itemNode.getElementsByTagName("ParentServiceIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("EquipmentId")[0])
          eqid = itemNode.getElementsByTagName("EquipmentId")[0].textContent;
        if (itemNode.getElementsByTagName("TelephoneNumberId")[0])
          tnsid = itemNode.getElementsByTagName("TelephoneNumberId")[0]
            .textContent;
        if (itemNode.getElementsByTagName("WorkPlanItemIdentifier")[0])
          wpiid = itemNode.getElementsByTagName("WorkPlanItemIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("AccountStageCode")[0])
          asc = itemNode.getElementsByTagName("AccountStageCode")[0]
            .textContent;
        if (itemNode.getElementsByTagName("Restore")[0])
          restore = itemNode.getElementsByTagName("Restore")[0].textContent;
        if (itemNode.getElementsByTagName("Action")[0])
          action = itemNode.getElementsByTagName("Action")[0].textContent;
        if (itemNode.getElementsByTagName("AccountId")[0])
          accid = itemNode.getElementsByTagName("AccountId")[0].textContent;
        if (itemNode.getElementsByTagName("Status")[0])
          status = itemNode.getElementsByTagName("Status")[0].textContent;
        if (itemNode.getElementsByTagName("HierarchyLevel")[0])
          hlvl = itemNode.getElementsByTagName("HierarchyLevel")[0].textContent;
        if (itemNode.getElementsByTagName("ProvisioningCode")[0])
          prov = itemNode.getElementsByTagName("ProvisioningCode")[0]
            .textContent;
        if (itemNode.getElementsByTagName("ProvisioningCodeDescription")[0])
          pdesc = itemNode.getElementsByTagName(
            "ProvisioningCodeDescription"
          )[0].textContent;

        const lobNode = itemNode.getElementsByTagName("LineOfBusiness")[0];
        console.log(lobNode.getElementsByTagName("Type")[0].textContent);
        if (lobNode) {
          if (lobNode.getElementsByTagName("Type")[0])
            type = lobNode.getElementsByTagName("Type")[0].textContent;

          if (lobNode.getElementsByTagName("SubType")[0])
            stype = lobNode.getElementsByTagName("SubType")[0].textContent;
          if (lobNode.getElementsByTagName("StageCode")[0])
            stagecode = lobNode.getElementsByTagName("StageCode")[0]
              .textContent;
        }
        const customFieldNodes = itemNode.getElementsByTagName("CustomField");

        var tableHeaderRowCount = 3;
        var table = document.getElementById("customfieldstable");
        var rowCount = table.rows.length;
        for (var purge = tableHeaderRowCount; purge < rowCount; purge++) {
          table.deleteRow(tableHeaderRowCount);
        }
        for (let k = 0; k < customFieldNodes.length; k++) {
          const customNode = itemNode.getElementsByTagName("CustomField")[k];
          let tableElement = document.getElementById("customfieldstable");
          const rowElement = document.createElement("tr");

          for (let c = 0; c < customNode.childNodes.length; c++) {
            let columnElement = document.createElement("th");
            let textElement = document.createTextNode(
              customNode.childNodes[c].textContent
            );
            columnElement.appendChild(textElement);
            rowElement.appendChild(columnElement);
          }
          tableElement.appendChild(rowElement);
        }

        this.setState({
          rootItem: [
            {
              ServiceIdentifier: sid,
              ParentServiceIdentifier: psid,
              EquipmentId: eqid,
              TelephoneNumberId: tnsid,
              WorkPlanItemIdentifier: wpiid,
              AccountStageCode: asc,
              Restore: restore,
              Action: action,
              AccountId: accid,
              Status: status,
              HierarchyLevel: hlvl,
              ProvisioningCode: provCode,
              ProvisioningCodeDescription: pdesc,
              Type: type,
              SubType: stype,
              StageCode: stagecode,
              LineOfBusines: [
                {
                  Type: type,
                  SubType: stype,
                  StageCode: stagecode,
                },
              ],
            },
          ],
        });
      }
    }
    return rootItem;
  }

  getLeafNodes = (telephone) => {
    let leafItems = [];
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(sampleData, "application/xml");
    const itemNodes = doc.getElementsByTagName("Item");

    for (let i = 0; i < itemNodes.length; i++) {
      let itemNode = itemNodes[i];
      let tn, heiLevel, provCode;
      if (itemNode.getElementsByTagName("TelephoneNumberId")[0])
        tn = itemNode.getElementsByTagName("TelephoneNumberId")[0].textContent;
      if (itemNode.getElementsByTagName("HierarchyLevel")[0])
        heiLevel = itemNode.getElementsByTagName("HierarchyLevel")[0]
          .textContent;
      if (itemNode.getElementsByTagName("ProvisioningCode")[0])
        provCode = itemNode.getElementsByTagName("ProvisioningCode")[0]
          .textContent;
      if (heiLevel === "LEAF" && provCode === "CLIST" && tn === telephone) {
        let sid,
          psid,
          eqid,
          tnsid,
          wpiid,
          asc,
          job,
          restore,
          action,
          accid,
          hlvl,
          status,
          prov,
          pdesc,
          type,
          stype,
          stagecode;
        if (itemNode.getElementsByTagName("Job")[0])
          job = itemNode.getElementsByTagName("Job")[0].textContent;
        if (itemNode.getElementsByTagName("ServiceIdentifier")[0])
          sid = itemNode.getElementsByTagName("ServiceIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("ParentServiceIdentifier")[0])
          psid = itemNode.getElementsByTagName("ParentServiceIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("EquipmentId")[0])
          eqid = itemNode.getElementsByTagName("EquipmentId")[0].textContent;
        if (itemNode.getElementsByTagName("TelephoneNumberId")[0])
          tnsid = itemNode.getElementsByTagName("TelephoneNumberId")[0]
            .textContent;
        if (itemNode.getElementsByTagName("WorkPlanItemIdentifier")[0])
          wpiid = itemNode.getElementsByTagName("WorkPlanItemIdentifier")[0]
            .textContent;
        if (itemNode.getElementsByTagName("AccountStageCode")[0])
          asc = itemNode.getElementsByTagName("AccountStageCode")[0]
            .textContent;
        if (itemNode.getElementsByTagName("Restore")[0])
          restore = itemNode.getElementsByTagName("Restore")[0].textContent;
        if (itemNode.getElementsByTagName("Action")[0])
          action = itemNode.getElementsByTagName("Action")[0].textContent;
        if (itemNode.getElementsByTagName("AccountId")[0])
          accid = itemNode.getElementsByTagName("AccountId")[0].textContent;
        if (itemNode.getElementsByTagName("Status")[0])
          status = itemNode.getElementsByTagName("Status")[0].textContent;
        if (itemNode.getElementsByTagName("HierarchyLevel")[0])
          hlvl = itemNode.getElementsByTagName("HierarchyLevel")[0].textContent;
        if (itemNode.getElementsByTagName("ProvisioningCode")[0])
          prov = itemNode.getElementsByTagName("ProvisioningCode")[0]
            .textContent;
        if (itemNode.getElementsByTagName("ProvisioningCodeDescription")[0])
          pdesc = itemNode.getElementsByTagName(
            "ProvisioningCodeDescription"
          )[0].textContent;

        const lobNode = itemNode.getElementsByTagName("LineOfBusiness")[0];
        console.log(lobNode.getElementsByTagName("Type")[0].textContent);
        if (lobNode) {
          if (lobNode.getElementsByTagName("Type")[0])
            type = lobNode.getElementsByTagName("Type")[0].textContent;

          if (lobNode.getElementsByTagName("SubType")[0])
            stype = lobNode.getElementsByTagName("SubType")[0].textContent;
          if (lobNode.getElementsByTagName("StageCode")[0])
            stagecode = lobNode.getElementsByTagName("StageCode")[0]
              .textContent;
        }
        const customFieldNodes = itemNode.getElementsByTagName("CustomField");

        var tableHeaderRowCount = 3;
        var table = document.getElementById("leafCustomfieldsTable");
        var rowCount = table.rows.length;
        for (var purge = tableHeaderRowCount; purge < rowCount; purge++) {
          table.deleteRow(tableHeaderRowCount);
        }
        for (let k = 0; k < customFieldNodes.length; k++) {
          const customNode = itemNode.getElementsByTagName("CustomField")[k];
          let tableElement = document.getElementById("leafCustomfieldsTable");
          console.log(tableElement);
          const rowElement = document.createElement("tr");
          console.log(customNode.childNodes);

          for (let c = 0; c < customNode.childNodes.length; c++) {
            let columnElement = document.createElement("th");
            let textElement = document.createTextNode(
              customNode.childNodes[c].textContent
            );
            columnElement.appendChild(textElement);
            rowElement.appendChild(columnElement);
            console.log(rowElement);
          }
          tableElement.appendChild(rowElement);
        }

        this.setState({
          leafItems: [
            {
              ServiceIdentifier: sid,
              ParentServiceIdentifier: psid,
              EquipmentId: eqid,
              TelephoneNumberId: tnsid,
              WorkPlanItemIdentifier: wpiid,
              AccountStageCode: asc,
              Restore: restore,
              Action: action,
              AccountId: accid,
              Status: status,
              HierarchyLevel: hlvl,
              ProvisioningCode: provCode,
              ProvisioningCodeDescription: pdesc,
              Type: type,
              SubType: stype,
              StageCode: stagecode,
              LineOfBusines: [
                {
                  Type: type,
                  SubType: stype,
                  StageCode: stagecode,
                },
              ],
            },
          ],
        });
      }
    }
    return leafItems;
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
          <th>{this.state.rootItem[0].ServiceIdentifier}</th>
        </tr>
        <tr>
          <th>ParentServiceIdentifier</th>
          <th>{this.state.rootItem[0].ParentServiceIdentifier}</th>
        </tr>
        <tr>
          <th>EquipmentId</th>
          <th>{this.state.rootItem[0].EquipmentId}</th>
        </tr>
        <tr>
          <th>TelephoneNumberId</th>
          <th>{this.state.rootItem[0].TelephoneNumberId}</th>
        </tr>
        <tr>
          <th>WorkPlanItemIdentifier</th>
          <th>{this.state.rootItem[0].WorkPlanItemIdentifier}</th>
        </tr>
        <tr>
          <th>TelephoneNumberICallingCardId UserDefinedIdentifier</th>
          <th>some random value</th>
        </tr>
        <tr>
          <th>AccountStageCode </th>
          <th>{this.state.rootItem[0].AccountStageCode}</th>
        </tr>
        <tr>
          <th>JobExists</th>
          <th>{this.state.rootItem[0].Job}</th>
        </tr>
        <tr>
          <th>Restore</th>
          <th>{this.state.rootItem[0].Restore}</th>
        </tr>
        <tr>
          <th>Action</th>
          <th>{this.state.rootItem[0].Action}</th>
        </tr>
      </table>
    );
    let accountIdTable = (
      <table>
        <tr>
          <th>AccountId</th>
          <th>{this.state.rootItem[0].AccountId}</th>
        </tr>
        <tr>
          <th>Status</th>
          <th>{this.state.rootItem[0].Status}</th>
        </tr>
        <tr>
          <th>HierarchyLevel</th>
          <th>{this.state.rootItem[0].HierarchyLevel}</th>
        </tr>
        <tr>
          <th>ProvisioningCode</th>
          <th>{this.state.rootItem[0].ProvisioningCode}</th>
        </tr>
        <tr colspan="2">
          <th>ProvisioningCodeDescription</th>
          <th>{this.state.rootItem[0].ProvisioningCodeDescription}</th>
        </tr>
        <tr>
          <th rowspan="4">LineOfBusines</th>

          <tr>
            <th>Type</th>
            <th>{this.state.rootItem[0].Type}</th>
          </tr>
          <tr>
            <th>SubType</th>
            <th>{this.state.rootItem[0].SubType}</th>
          </tr>
          <tr>
            <th>StageCode</th>
            <th>{this.state.rootItem[0].StageCode}</th>
          </tr>
        </tr>
      </table>
    );
    let customfieldsTable = (
      <table id="customfieldstable">
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
    let leafServiceIdentifierTable = (i) => (
      <table>
        <tr>
          <th>ServiceIdentifier</th>
          <th>{this.state.leafItems[i].ServiceIdentifier}</th>
        </tr>
        <tr>
          <th>ParentServiceIdentifier</th>
          <th>{this.state.leafItems[i].ParentServiceIdentifier}</th>
        </tr>
        <tr>
          <th>EquipmentId</th>
          <th>{this.state.leafItems[i].EquipmentId}</th>
        </tr>
        <tr>
          <th>TelephoneNumberId</th>
          <th>{this.state.leafItems[i].TelephoneNumberId}</th>
        </tr>
        <tr>
          <th>WorkPlanItemIdentifier</th>
          <th>{this.state.leafItems[i].WorkPlanItemIdentifier}</th>
        </tr>
        <tr>
          <th>TelephoneNumberICallingCardId UserDefinedIdentifier</th>
          <th>some random value</th>
        </tr>
        <tr>
          <th>AccountStageCode </th>
          <th>{this.state.leafItems[i].AccountStageCode}</th>
        </tr>
        <tr>
          <th>JobExists</th>
          <th>{this.state.leafItems[i].Job}</th>
        </tr>
        <tr>
          <th>Restore</th>
          <th>{this.state.leafItems[i].Restore}</th>
        </tr>
        <tr>
          <th>Action</th>
          <th>{this.state.leafItems[i].Action}</th>
        </tr>
      </table>
    );
    let leafAccountIdTable = (i) => (
      <table>
        <tr>
          <th>AccountId</th>
          <th>{this.state.leafItems[i].AccountId}</th>
        </tr>
        <tr>
          <th>Status</th>
          <th>{this.state.leafItems[i].Status}</th>
        </tr>
        <tr>
          <th>HierarchyLevel</th>
          <th>{this.state.leafItems[i].HierarchyLevel}</th>
        </tr>
        <tr>
          <th>ProvisioningCode</th>
          <th>{this.state.leafItems[i].ProvisioningCode}</th>
        </tr>
        <tr colspan="2">
          <th>ProvisioningCodeDescription</th>
          <th>{this.state.leafItems[i].ProvisioningCodeDescription}</th>
        </tr>
        <tr>
          <th rowspan="4">LineOfBusines</th>

          <tr>
            <th>Type</th>
            <th>{this.state.leafItems[i].Type}</th>
          </tr>
          <tr>
            <th>SubType</th>
            <th>{this.state.leafItems[i].SubType}</th>
          </tr>
          <tr>
            <th>StageCode</th>
            <th>{this.state.leafItems[i].StageCode}</th>
          </tr>
        </tr>
      </table>
    );
    let leafCustomfieldsTable = (
      <table id="leafCustomfieldsTable">
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
    for (let i = 0; i < this.state.leafItems.length; i++) {
      leafServiceIdentifierTable(i);
      leafAccountIdTable(i);
    }
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
                  <div>{leafServiceIdentifierTable}</div>
                  <div>{leafAccountIdTable}</div>
                </div>
                <div>{leafCustomfieldsTable}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

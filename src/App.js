import React, { Component } from "react";
import "./App.css";
import sampleData from "./xmls/items_list.js";
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

          for (let c = 0; c < 5; c++) {
            let columnElement = document.createElement("th");
            let textElement = customNode.childNodes[c]
              ? document.createTextNode(customNode.childNodes[c].textContent)
              : document.createTextNode("");
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

          for (let c = 0; c < 5; c++) {
            let columnElement = document.createElement("th");
            let textElement = customNode.childNodes[c]
              ? document.createTextNode(customNode.childNodes[c].textContent)
              : document.createTextNode("");
            columnElement.appendChild(textElement);
            rowElement.appendChild(columnElement);
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
        <ul class="flex-ul">
          <span class="flex-heading">TelephoneNumbers</span>
          {this.state.telephonesList.map((item) => (
            <li class="flex-li" key={item}>
              <a onClick={() => this.setTelePhoneHandler(item)}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    );
    let screenNameDiv = <div class="box-3">{this.state.screenName}</div>;
    let serviceIdentifierTable = (
      <table>
        <tr>
          <th class="rightAlign">ServiceIdentifier</th>
          <th class="leftAlign">{this.state.rootItem[0].ServiceIdentifier}</th>
        </tr>
        <tr>
          <th class="rightAlign">ParentServiceIdentifier</th>
          <th class="leftAlign">
            {this.state.rootItem[0].ParentServiceIdentifier}
          </th>
        </tr>
        <tr>
          <th class="rightAlign">EquipmentId</th>
          <th class="leftAlign">{this.state.rootItem[0].EquipmentId}</th>
        </tr>
        <tr>
          <th class="rightAlign">TelephoneNumberId</th>
          <th class="leftAlign">{this.state.rootItem[0].TelephoneNumberId}</th>
        </tr>
        <tr>
          <th class="rightAlign">WorkPlanItemIdentifier</th>
          <th class="leftAlign">
            {this.state.rootItem[0].WorkPlanItemIdentifier}
          </th>
        </tr>
        <tr>
          <th class="rightAlign">
            TelephoneNumberICallingCardId UserDefinedIdentifier
          </th>
          <th class="leftAlign"></th>
        </tr>
        <tr>
          <th class="rightAlign">AccountStageCode </th>
          <th class="leftAlign">{this.state.rootItem[0].AccountStageCode}</th>
        </tr>
        <tr>
          <th class="rightAlign"> JobExists</th>
          <th class="leftAlign">{this.state.rootItem[0].Job}</th>
        </tr>
        <tr>
          <th class="rightAlign">Restore</th>
          <th class="leftAlign">{this.state.rootItem[0].Restore}</th>
        </tr>
        <tr>
          <th class="rightAlign">Action</th>
          <th class="leftAlign">{this.state.rootItem[0].Action}</th>
        </tr>
      </table>
    );
    let accountIdTable = (
      <table>
        <tr>
          <th class="rightAlign">AccountId</th>
          <th class="leftAlign">{this.state.rootItem[0].AccountId}</th>
        </tr>
        <tr>
          <th class="rightAlign">Status</th>
          <th class="leftAlign">{this.state.rootItem[0].Status}</th>
        </tr>
        <tr>
          <th class="rightAlign">HierarchyLevel</th>
          <th class="leftAlign">{this.state.rootItem[0].HierarchyLevel}</th>
        </tr>
        <tr>
          <th> class="rightAlign"ProvisioningCode</th>
          <th class="leftAlign">{this.state.rootItem[0].ProvisioningCode}</th>
        </tr>
        <tr colspan="2">
          <th class="rightAlign">ProvisioningCodeDescription</th>
          <th class="leftAlign">
            {this.state.rootItem[0].ProvisioningCodeDescription}
          </th>
        </tr>
        <tr>
          <th class="rightAlign" rowspan="4">
            LineOfBusines
          </th>

          <tr>
            <th class="rightAlign">Type</th>
            <th class="leftAlign">{this.state.rootItem[0].Type}</th>
          </tr>
          <tr>
            <th class="rightAlign">SubType</th>
            <th class="leftAlign">{this.state.rootItem[0].SubType}</th>
          </tr>
          <tr>
            <th class="rightAlign">StageCode</th>
            <th class="leftAlign">{this.state.rootItem[0].StageCode}</th>
          </tr>
        </tr>
      </table>
    );
    let customfieldsTable = (
      <table id="customfieldstable">
        <tr rowspan="5">
          <th colspan="5" style={{ textAlign: "center" }}>
            Custom Fields
          </th>
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

    let leafServiceIdentifierTable = (
      <table>
        <tr>
          <th class="rightAlign">ServiceIdentifier</th>
          <th class="leftAlign">{this.state.leafItems[0].ServiceIdentifier}</th>
        </tr>
        <tr>
          <th class="rightAlign">ParentServiceIdentifier</th>
          <th class="leftAlign">
            {this.state.leafItems[0].ParentServiceIdentifier}
          </th>
        </tr>
        <tr>
          <th class="rightAlign">EquipmentId</th>
          <th class="leftAlign">{this.state.leafItems[0].EquipmentId}</th>
        </tr>
        <tr>
          <th class="rightAlign">TelephoneNumberId</th>
          <th class="leftAlign">{this.state.leafItems[0].TelephoneNumberId}</th>
        </tr>
        <tr>
          <th class="rightAlign">WorkPlanItemIdentifier</th>
          <th class="leftAlign">
            {this.state.leafItems[0].WorkPlanItemIdentifier}
          </th>
        </tr>
        <tr>
          <th class="rightAlign">
            TelephoneNumberICallingCardId UserDefinedIdentifier
          </th>
          <th class="leftAlign">some random value</th>
        </tr>
        <tr>
          <th class="rightAlign">AccountStageCode </th>
          <th class="leftAlign">{this.state.leafItems[0].AccountStageCode}</th>
        </tr>
        <tr>
          <th class="rightAlign">JobExists</th>
          <th class="leftAlign">{this.state.leafItems[0].Job}</th>
        </tr>
        <tr>
          <th class="rightAlign">Restore</th>
          <th class="leftAlign">{this.state.leafItems[0].Restore}</th>
        </tr>
        <tr>
          <th class="rightAlign">Action</th>
          <th class="leftAlign">{this.state.leafItems[0].Action}</th>
        </tr>
      </table>
    );
    let leafAccountIdTable = (
      <table>
        <tr>
          <th class="rightAlign">AccountId</th>
          <th class="leftAlign">{this.state.leafItems[0].AccountId}</th>
        </tr>
        <tr>
          <th class="rightAlign">Status</th>
          <th class="leftAlign">{this.state.leafItems[0].Status}</th>
        </tr>
        <tr>
          <th class="rightAlign">HierarchyLevel</th>
          <th class="leftAlign">{this.state.leafItems[0].HierarchyLevel}</th>
        </tr>
        <tr>
          <th class="rightAlign">ProvisioningCode</th>
          <th class="leeftAlign">{this.state.leafItems[0].ProvisioningCode}</th>
        </tr>
        <tr>
          <th class="rightAlign">ProvisioningCodeDescription</th>
          <th class="leftAlign">
            {this.state.leafItems[0].ProvisioningCodeDescription}
          </th>
        </tr>
        <tr>
          <th class="rightAlign" rowspan="4">
            LineOfBusines
          </th>

          <tr>
            <th class="rightAlign">Type</th>
            <th class="leftAlign">{this.state.leafItems[0].Type}</th>
          </tr>
          <tr>
            <th class="rightAlign">SubType</th>
            <th class="leftAlign">{this.state.leafItems[0].SubType}</th>
          </tr>
          <tr>
            <th class="rightAlign">StageCode</th>
            <th class="leftAlign">{this.state.leafItems[0].StageCode}</th>
          </tr>
        </tr>
      </table>
    );
    let leafCustomfieldsTable = (
      <table id="leafCustomfieldsTable">
        <tr>
          <th colspan="5" style={{ textAlign: "center" }}>
            Custom Fields
          </th>
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
      <div>
        <div class="pallete">
          <div class="row-container">
            <div class="container-1">
              <div class="col-container">
                {logoDiv}
                {telephonesListDiv}
              </div>
            </div>

            <div class="col-container">
              {screenNameDiv}
              <div class="container-2">
                <div class="col-container">
                  <div class="row-container">
                    <div class="box-4">{serviceIdentifierTable}</div>
                    <div class="box-5">{accountIdTable}</div>
                  </div>
                  <div class="box-6">{customfieldsTable}</div>
                </div>
              </div>

              <div class="container-3">
                <div class="col-container">
                  <div class="row-container">
                    <div class="box-4">{leafServiceIdentifierTable}</div>
                    <div class="box-5">{leafAccountIdTable}</div>
                  </div>
                  <div class="box-6">{leafCustomfieldsTable}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import sampleData from "./xmls/items_list.js";

export const domParser = new DOMParser();
export const doc = domParser.parseFromString(sampleData, "application/xml");

export const getItemNodes = (telephoneId) => {
  console.log("telephone Number: " + telephoneId);
  const itemNodes = doc.getElementsByTagName("Item");
  const itemList = [];

  for (let i = 0; i < itemNodes.length; i++) {
    if (itemNodes[i].getElementsByTagName("TelephoneNumberId")[0] != null) {
      if (
        telephoneId ===
        itemNodes[i].getElementsByTagName("TelephoneNumberId")[0].firstChild
          .nodeValue
      ) {
        itemList.push(itemNodes[i]);
      }
    }
  }
  console.log(itemList.length);
  return itemList;
};

export const getRootItemNode = () => {
  let rootItem = "";
  const itemNodes = doc.getElementsByTagName("Item");

  for (let i = 0; i < itemNodes.length; i++) {
    let itemNode = itemNodes[i];
    let tn = itemNode.getElementsByTagName("TelephoneNumberId")[0].textContent;
    let heiLevel = itemNode.getElementsByTagName("HierarchyLevel")[0]
      .textContent;
    let provCode = itemNode.getElementsByTagName("ProvisioningCode")[0]
      .textContent;
    if ("ROOT" === heiLevel && "SBPP" === provCode && "4029377413" === tn) {
      rootItem = itemNode;
    }
    return rootItem;
  }
};

export const getLeafItemNodes = (itemList) => {
  let leafItems = [];
  const itemNodes = doc.getElementsByTagName("Item");

  for (let i = 0; i < itemNodes.length; i++) {
    let itemNode = itemNodes[i];
    let tn = itemNode.getElementsByTagName("TelephoneNumberId")[0].textContent;
    let heiLevel = itemNode.getElementsByTagName("HierarchyLevel")[0]
      .textContent;
    let provCode = itemNode.getElementsByTagName("ProvisioningCode")[0]
      .textContent;
    if ("LEAF" === heiLevel && "SBPP" === provCode && "4029377413" === tn) {
      leafItems.push(itemNode);
    }
    return leafItems;
  }
};

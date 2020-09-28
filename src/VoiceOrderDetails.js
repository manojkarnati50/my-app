import React, { Component } from "react";
import { getItemNodes, getLeafItemNodes, getRootItemNode } from "./utils";

class VoiceOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNodes: [],
      selected: this.props.selectedPhoneNumber,
    };
  }
  componentDidMount() {
    this.setState({
      itemNodes: getItemNodes(this.props.selectedPhoneNumber),
      rootItem: getRootItemNode(),
      leafItems: getLeafItemNodes(this.props.itemNodes),
    });
  }

  render() {
    //console.log("inside render" + this.props.selectedPhoneNumber);
    return (
      <div>
        selected Telephone Number: {this.props.selectedPhoneNumber}{" "}
        {this.state.selected}
      </div>
    );
  }
}

export default VoiceOrderDetails;

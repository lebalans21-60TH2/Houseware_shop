import React from "react";
import { Collapse, Checkbox, Spin } from "antd";
const Panel = Collapse.Panel;
class CollapseList extends React.Component {
  state = {
    checked: []
  };
  handleFilter = item => () => {
    const { checked } = this.state;
    const currentChecked = checked.indexOf(item);
    const newChecked = [...checked];
    if (currentChecked === -1) {
      //not find
      newChecked.push(item);
    } else {
      // looked
      newChecked.splice(currentChecked, 1); // delete
      
    }
    this.setState({ checked: newChecked }, () => {
      this.props.filters(newChecked);
    });
  };

  render() {
    const { lists } = this.props;
    const showLists = lists
      ? lists.map((item, i) => (
          <li key={i}>
            {item.name}
            <span>
              <Checkbox
                style={{ float: "right" }}
                onChange={this.handleFilter(item._id)}
                checked={this.state.checked.indexOf(item._id) !== -1}
              />
            </span>
          </li>
        ))
      : "";
    return (
      <div className="categories animated wow slideInUp" data-wow-delay=".5s">
        <Collapse defaultActiveKey={["1", "3"]}>
          <Panel header={this.props.header} key={this.props.index}>
            <ul className="cate">
              {showLists ? (
                showLists
              ) : (
                <center>
                  <Spin />
                </center>
              )}
            </ul>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default CollapseList;

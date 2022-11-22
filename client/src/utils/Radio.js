import React from "react";
import { Collapse, Spin, Radio } from "antd";
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
class CollapseRadio extends React.Component {
  state = {
    value: 0
  };
  handleChange = e => {
    this.props.filters(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    const { lists } = this.props;
    const showLists = lists
      ? lists.map((item, i) => (
          <li key={i}>
            <Radio value={item._id} /> {item.name}
          </li>
        ))
      : "";
    return (
      <div className="categories animated wow slideInUp" data-wow-delay=".5s">
        <Collapse defaultActiveKey={["3"]}>
          <Panel header={this.props.header} key={this.props.index}>
            <RadioGroup onChange={this.handleChange} value={this.state.value}>
              <ul className="cate">
                {showLists ? (
                  showLists
                ) : (
                  <center>
                    <Spin />
                  </center>
                )}
              </ul>
            </RadioGroup>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default CollapseRadio;

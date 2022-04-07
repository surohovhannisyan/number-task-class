import React from "react";
import "./style.css";

interface IDataRecord {
  label: string;
  value: number;
}

interface IAppProps {
  size?: number;
}

export default class App extends React.Component<
  IAppProps,
  { list: IDataRecord[] }
> {
  state = {
    list: Array.from({ length: this.props.size ?? 200 }, (_el, index) => ({
      label: `label ${index + 1}`,
      value: App.generateValue(),
    })),
  };

  static generateValue() {
    return Math.round(100 + Math.random() * 900);
  }

  handleUpdate = (index: number) => {
    this.setState((prevState) => {
      const newList = prevState.list.map((item, i) => {
        if (index === i) {
          return { ...item, value: App.generateValue() };
        }
        return item;
      });
      return { ...prevState, list: newList };
    });
  };

  render() {
    return (
      <div>
        <h1>Test app</h1>
        {this.state.list.map((el, index) => (
          <Row
            data={el}
            index={index}
            key={el.label}
            onUpdate={this.handleUpdate}
          />
        ))}
      </div>
    );
  }
}

interface IRowProps {
  data: IDataRecord; // TODO
  index: number;
  onUpdate: (index: number) => void;
}

class Row extends React.PureComponent<IRowProps> {
  renderCount = 0;

  handleUpdate = () => {
    this.props.onUpdate(this.props.index);
  };

  render() {
    const {
      data: { label, value },
    } = this.props;

    this.renderCount++;
    return (
      <div>
        <span className="label">{label}:</span>
        <span>{value}</span> <span>({this.renderCount})</span>
        <button className="button" onClick={this.handleUpdate}>
          Update
        </button>
      </div>
    );
  }
}

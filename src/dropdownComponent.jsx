import React from 'react'

export default class Dropdown extends React.Component {
  handleOptionChange = (e) => {
    const option = e.target.value;
    this.props.onOptionChange(option);
  }

  render() {
    return (
      <select
        className={'dropdown'}
        onChange={this.handleOptionChange}
      >
        <option value="1">All</option>
        <option value="2">Completed</option>
        <option value="3">Doing</option>
      </select>
    );
  }
}
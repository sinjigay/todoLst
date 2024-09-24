import React from 'react'

export default class Todo extends React.Component {
  state = {
    isHovered: false,
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  handleClick = (e) => {
    const completed = e.target.checked
    this.props.onCompleted(completed, this.props.task)
  }

  handleButtonClick = (e) => {
    const task = e.target.value
    this.props.onButtonClick(task)
  }


  render() {
    const { creationTime, completed, task, subtitle } = this.props
    const { isHovered } = this.state

    return (
      <li
        className="flex flex-row gap-8 p-2 items-center border border-gray-200 rounded dark:border-gray-700 w-70"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={this.handleClick}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex flex-row justify-between">
            <p className="break-words whitespace-normal">{task}</p>
            <p className="whitespace-nowrap text-slate-400">{creationTime}</p>
          </div>
          <p className="text-slate-400 break-words whitespace-normal">{subtitle}</p>
        </div>
        {isHovered && (
          <button
            className="mr-3"
            value={task}
            onClick={this.handleButtonClick}
          >
            🗑️
          </button>
        )}
      </li>
    )
  }
}
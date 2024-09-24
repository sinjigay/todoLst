import React from 'react'
import { removeIdentical } from './helper.js'
import Todo from './todoComponent.jsx'
import Dropdown from './dropdownComponent.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      mistake: '',
      title: '',
      subtitle: '',
      todoList: [],
      filter: () => true,
    }
  }

  handleTitle = (e) => this.setState({ title: e.target.value })

  handleSubtitle = (e) => this.setState({ subtitle: e.target.value })

  handleAddTodo = () => {
    const { title, subtitle, todoList } = this.state

    const task = title.trim()
    const description = subtitle.trim()
    if (!task) {
      this.setState({ mistake: 'Wrong input' })
      return
    }

    const newTodoItem = {
      completed: false,
      task: task,
      description: description,
      creationTime: new Date().toLocaleString(),
    }

    const newTodoList = [newTodoItem, ...todoList]
    const distinctTodoList = removeIdentical(newTodoList)

    this.setState({ todoList: distinctTodoList, title: '', subtitle: '', mistake: '' })
  }

  handleSetCompleted = (completed, task) => {
    const newTodoList = this.state.todoList.map((todo) =>
      todo.task === task ? { ...todo, completed } : todo,
    )

    this.setState({
      todoList: newTodoList.sort((a, b) => a.completed - b.completed),
    })
  }

  onOptionChange = (option) => {

    const filterOptions = {
      '1': () => true,
      '2': (todo) => todo.completed,
      '3': (todo) => !todo.completed,
    }

    const filter = filterOptions[option]
    this.setState({ filter })
  }

  deleteTodo = (task) => {
    const newTodoList = this.state.todoList.filter(todo => todo.task !== task)
    this.setState({ todoList: newTodoList })
  }

  render() {
    const { title, subtitle, mistake } = this.state
    return (
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <h1 className="text-4xl font-extrabold dark:text-white">TODO LIST</h1>
        <div className="flex flex-col gap-3">
          <p>Task</p>
          <input
            className={'input'}
            value={title}
            onChange={this.handleTitle}
          />
          <p>Description</p>
          <div className="flex flex-row gap-2">
            <input
              className={'input'}
              value={subtitle}
              onChange={this.handleSubtitle}
            />
            <button
              className={'btn'}
              onClick={this.handleAddTodo}>
              Save
            </button>
          </div>
        </div>
        <p className="text-red-700 text-xs">{mistake}</p>
        <Dropdown
          onOptionChange={this.onOptionChange}
        />
        <ul className="flex flex-col gap-3">
          {this.state.todoList.filter(this.state.filter).map((todo) => (
            <Todo
              key={todo.creationTime}
              task={todo.task}
              completed={todo.completed}
              onCompleted={this.handleSetCompleted}
              creationTime={todo.creationTime}
              subtitle={todo.description}
              onButtonClick = {this.deleteTodo}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
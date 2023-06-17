import React from 'react'
import TodoForm from '../todoForm/TodoForm'
import './Todo.css'

const Todo = () => {
  return (
    <div className='todo'>
        <div className='todo-list'>
            <div className='form-content'>
                <TodoForm/>
            </div>
        </div>
    </div>
  )
}

export default Todo
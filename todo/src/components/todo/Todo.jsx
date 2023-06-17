import React from 'react'
import { useState } from 'react'
import TodoForm from '../todoForm/TodoForm'
import TodoList from '../todoList/TodoList'
import './Todo.css'

const Todo = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Titulo",
            content: "Clique ou arraste o arquivo para esta área para fazer upload",
            isFavorite: false,
        },
        {
            id: 2,
            title: "Titulo",
            content: "Clique ou arraste o arquivo para esta área para fazer upload",
            isFavorite: false,
        }
    ])

    const addTodo = (title, content) => {
        const newTodos = [...todos, {
            id: Math.floor (Math.random() * 1000),
            title,
            content,
            isFavorite: false,
        }]
        setTodos(newTodos)
    }

  return (
    <div className='todo'>
        <div className='todo-form'>
            <TodoForm addTodo={addTodo}/>
        </div>
        <div className='todo-list'>
            <div className='list-content'>
                {todos.map((todo) => (
                    <TodoList key={todo.id} todo={todo}/>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default Todo
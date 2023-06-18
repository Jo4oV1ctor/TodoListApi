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

    const addTodo = (title, content, isFavorite) => {
        const newTodos = [...todos, {
            id: Math.floor (Math.random() * 1000),
            title,
            content,
            isFavorite
        }]
        setTodos(newTodos)
    }

    const removeTodo = (id) => {
        const newTodos = [...todos]
        const filteredTodos = newTodos.filter((todo) => todo.id !== id ? todo: null)
        setTodos(filteredTodos)
    }

    const updateFavorite = (id, isFavorite) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isFavorite };
          }
          return todo;
        });
        setTodos(updatedTodos);
      };

  return (
    <div className='todo'>
        <div className='todo-form'>
            <TodoForm addTodo={addTodo}/>
        </div>
        {todos.some((todo) => todo.isFavorite) &&(
            <div className='favorites'>
            <h2>Favoritos</h2>
            <div className="todo-list-favoritos">
                {todos
                .filter((todo) => todo.isFavorite)
                .map((todo) => (
                    <TodoList 
                    key={todo.id} 
                    todo={todo} 
                    removeTodo={removeTodo} 
                    updateFavorite={updateFavorite}/>
                ))}
            </div>
        </div>)}
        <div className='todo-list-noFavorite'>
            <h2>Não favoritos</h2>
            <div className='list-content'>
                {todos
                .filter((todo) => !todo.isFavorite)
                .map((todo) => (
                    <TodoList 
                    key={todo.id} 
                    todo={todo} 
                    removeTodo={removeTodo} 
                    updateFavorite={updateFavorite}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Todo
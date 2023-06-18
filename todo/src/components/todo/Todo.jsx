import React from 'react'
import { useState, useEffect} from 'react'
import TodoForm from '../todoForm/TodoForm'
import TodoList from '../todoList/TodoList'
import './Todo.css'

const Todo = () => {
    const [todos, setTodos] = useState([])
    
    const getData = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("http://localhost:3030/todos", requestOptions)
        .then((response) => response.json())
        .then((result) => setTodos(result))
        .catch((error) => console.error(error));
    };

    useEffect(() => {
        getData();
      }, []);

    const addTodo = (title, content, isFavorite) => {      
            const todo = {
            id: 0,
            title,
            content,
            isFavorite
        }
        console.log(todo)
        postTodo(todo)
    }

    const postTodo = (todo) => {
        fetch("http://localhost:3030/todos", {method:"POST", body:JSON.stringify(todo), headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(() => getData())
        .catch((error) => console.error(error));
    };

    const removeTodo = (id) => {
        deleteTodo(id)
    }

    const deleteTodo = (id) => {
        fetch(`http://localhost:3030/todos/${id}`, {method:"DELETE"})
        .then(() => getData())
        .catch((error) => console.error(error));
    }

    const updateFavorite = (id, isFavorite) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isFavorite };
          }
          return todo;
        });
        updateTodo(id, updatedTodos[0]);
      };

      const updateTodo = (id, todo) => {
        fetch(`http://localhost:3030/todos/${id}`, {method:"PUT", body:JSON.stringify({...todo}), headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(() => getData())
        .catch((error) => console.error(error));
      }

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
                    updateFavorite={updateFavorite}
                    updateTodo={updateTodo}
                    />
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
                    updateTodo={updateTodo}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Todo
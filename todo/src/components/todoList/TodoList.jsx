import React from 'react'
import './todoList.css'

const TodoList = ({todo}) => {
  return (
    <div className='_todo-list'>
        <div className='header'>
            <div className='input-title'>
                <input type="text" placeholder={todo.title}/>
            </div>
            <div  className="checkbox-is-favorite">
                <input type="checkbox" id="isFavorite"></input>
                <label for="isFavorite"></label>
            </div>
        </div>
        <div className='content'>
            <div className='input-content'>
                <input placeholder={todo.content}/>
            </div>
        </div>
        <div className='footer'>
            <div className='footer-icons'>
                <div className='write-icon'>
                    <button>P</button>
                </div>
                <div className='color-select-icon'>
                    <button>C</button>
                </div>
                <div className='delete'>
                    <button>X</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoList
import React, { useState } from 'react'
import './todoList.css'

const TodoList = ({todo, removeTodo, updateFavorite}) => {

    const [favorite, setFavorite] = useState(false)
    const [selectedColor, setSelectedColor] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleCheckboxChange = () => {
        updateFavorite(todo.id, !todo.isFavorite);
      };
    

      const handleColorChange = (e) => {
        const color = e.target.value;
        setSelectedColor(color);
        setBackgroundColor(color);
      };

  return (
    <div className='_todo-list' style={{ backgroundColor: backgroundColor }}>
        <div className='header'>
            <div className='input-title'>
                <input type="text" placeholder={todo.title}/>
            </div>
            <div  className="checkbox-is-favorite">
                <input 
                type="checkbox"
                checked={todo.isFavorite}
                onChange={handleCheckboxChange}
                />
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
                    <select value={selectedColor} onChange={handleColorChange}>
                        <option value="">C</option>
                        <option value='red' style={{ backgroundColor: 'red' }}></option>
                        <option value='blue' style={{ backgroundColor: 'blue' }}></option>
                        <option value='green' style={{ backgroundColor: 'green' }}></option>
                    </select>
                </div>
                <div className='delete'>
                    <button onClick={() => removeTodo(todo.id)}>X</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TodoList
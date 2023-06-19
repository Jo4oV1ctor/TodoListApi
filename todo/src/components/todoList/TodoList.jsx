import React, { useState, useEffect } from 'react'
import './todoList.css'
import { FaPencilAlt} from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { GiPaintBucket } from 'react-icons/gi';

const TodoList = ({ todo, removeTodo, updateFavorite, updateTodo }) => {
    const [selectedColor, setSelectedColor] = useState(todo.color || '');
    const [backgroundColor, setBackgroundColor] = useState(todo.color || '');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(todo.content);
    const [isTitleEditMode, setIsTitleEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [dragging, setDragging] = useState(false);
    const [droppedImage, setDroppedImage] = useState(null);

  
    useEffect(() => {
      if (todo.color) {
          setSelectedColor(todo.color);
          setBackgroundColor(todo.color);
      }
    }, [todo.color]);

    const handleCheckboxChange = () => {
      updateFavorite(todo.id, !todo.isFavorite, selectedColor);
    };

    const handleEditClick = () => {
        setIsEditMode(true);
      };

    const handleTitleEditClick = () => {
      setIsTitleEditMode(true);
    };
    
    const handleSaveClick = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape'){
          setIsEditMode(false);
          setEditedContent(todo.content);
          console.log("foi")     
      }else if(e.key === 'Enter'){
          todo.content = editedContent
          updateTodo(todo.id, todo)
          setIsEditMode(false);
      }
    };

    const handleTitleSaveClick = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        setIsTitleEditMode(false);
        setEditedTitle(todo.title);
      } else if (e.key === 'Enter') {
        todo.title = editedTitle;
        updateTodo(todo.id, todo);
        setIsTitleEditMode(false);
      }
    };
    
    const handleContentChange = (e) => {
      setEditedContent(e.target.value);
    };
  
    const handleTitleChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setDragging(true);
    };
  
    const handleDragEnter = (e) => {
      e.preventDefault();
      setDragging(true);
    };
  
    const handleDragLeave = () => {
      setDragging(false);
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setDroppedImage(reader.result);
      };
      reader.readAsDataURL(file);
    };
      
    const handleColorChange = (e) => {
        const color = e.target.value;
        setSelectedColor(color);
        setBackgroundColor(color);
        updateFavorite(todo.id, todo.isFavorite, color);
    };

  return (
    <div 
    className={`_todo-list ${dragging ? 'dragging' : ''}`}
    style={{ backgroundColor: backgroundColor }}
    onDragOver={handleDragOver}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}>
      <div className='header'>
        <div className='input-title'>
          {isTitleEditMode ? (
            <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onKeyDown={handleTitleSaveClick}
            placeholder={todo.title}
            />
              ) : (
                <h3 onClick={handleTitleEditClick}>{todo.title}</h3>
            )
          }
        </div>
        <div className="checkbox-is-favorite">
          <input
          type="checkbox"
          checked={todo.isFavorite}
          onChange={handleCheckboxChange}
          />
        </div>
      </div>
      <div className='content' onClick={handleEditClick} onKeyDown={handleSaveClick}>
          <div className='input-content'>
          {isEditMode ? (
              <div>
                  <textarea 
                  value={editedContent}
                  onChange={handleContentChange}
                  placeholder={todo.content}
                  />
              </div>
              ) : (
              <div className='text-content'>
                  <div className='dropped-image-wrapper'>
                  {droppedImage && <img src={droppedImage} alt='Imagem' />}
                  </div>
                  <div className='content-text'>{todo.content}</div>
              </div>
              )}
          </div>
        </div>
    <div className='footer'>
      <div className='footer-icons'>
        <div className='write-icon'>
          {isEditMode ? (
            <>
              
            </>
            ) : (
              <button onClick={handleEditClick}><FaPencilAlt /></button>
            )}
        </div>
      <div className='color-select-icon'>
        <span>
          <GiPaintBucket />
        </span>
        <select value={selectedColor} onChange={handleColorChange}>
          <option value=""></option>
          <option value="#f4c284" style={{ backgroundColor: "#f4c284" }}></option>
          <option value="#fefda6" style={{ backgroundColor: "#fefda6" }}></option>
          <option value='#96fdfd' style={{ backgroundColor: '#96fdfd' }}></option>
          <option value='#ccfd9b' style={{ backgroundColor: '#ccfd9b' }}></option>
          <option value='#fd96c9' style={{ backgroundColor: '#fd96c9' }}></option>
          <option value='#9696fd' style={{ backgroundColor: '#9696fd' }}></option>
        </select>
          </div>
            <div className='delete'>
              <button onClick={() => removeTodo(todo.id)}><FaTimes /></button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default TodoList
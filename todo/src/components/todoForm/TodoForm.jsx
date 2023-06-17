import { useState } from 'react'
import './TodoForm.css'

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleKeyPress = (e) =>{
    if(e.key === 'Enter'){
      e.preventDefault();
      if(!title || !content) return;
      console.log(title)
      console.log(content)
      addTodo(title, content);
      setTitle("");
      setContent("");
    }
  }

  return (
    <>
      <div className='form'>
        <div className='head-content'>
          <div className='title'>
            <input 
            type="text" 
            placeholder='Título'
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="isFavorite">
                <input type="checkbox" id="isFavorite"></input>
                <label for="isFavorite"></label>
          </div>
        </div>
        <div className='form-body'>
          <div className='form-content'>
            <input 
            type="text" 
            placeholder='Criar nota' 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoForm
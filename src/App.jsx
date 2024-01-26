import { useState } from 'react'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {

    e.preventDefault();
    // const abc = ["abc", "xyz"];
    // const lmn = [...abc, "lmn"];
    // console.log("lmn : ", lmn);

    //todos values always equal to what was at last render
    setTodos((currentTodos) => {
      return [...currentTodos, {id: crypto.randomUUID(), title: newItem, completed: false}]
    });

    setNewItem("");
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return {...todo, completed};
        }
        return todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => currentTodos.filter(todo => todo.id != id));
  }

  //Q: Why this printing 2 times
  console.log("outside todos : ", todos)

  return (
    <>
      <form className='new-item-form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input type='text' id='item' value={newItem}
            onChange={e => setNewItem(e.target.value)}/>
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List:</h1>
      <ul className='list'>
        {
          todos.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input type='checkbox' checked={todo.completed}
                   onChange={e => toggleTodo(todo.id, e.target.checked)}/>{todo.title}
                </label>
                <button onClick={e => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default App

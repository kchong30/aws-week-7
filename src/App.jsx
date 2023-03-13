import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [userInput, setUserInput] = useState("")
  const [editInput, setEditInput] = useState("")
  const [idInput, setIdInput] = useState("")

  useEffect( () => {
    axios.get("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos")
    .then((response) => {
      setTodos(response.data)
    })
  }, [])

  const handleAddTodo = async (event) => {
    event.preventDefault();
    console.log("i'm here")
    const result = await axios.post("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos", 
    {
        "todo": userInput
    })
    .then (function (response) {
      console.log(response);
    })
    .catch (function (error) {
     console.log(error);
    })

    axios.get("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos")
    .then((response) => {
      setTodos(response.data)
    })
  };

  const handleDelete= async (id) => {
    event.preventDefault();
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos/" + id;
    console.log (url);
    const result = await axios.delete(url);
    axios.get("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos")
    .then((response) => {
      setTodos(response.data)
    })
  }

  const handleEdit = async (id) => {
    event.preventDefault();
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos/" + id;
    const result = await axios.put(url,   {
      "todo": editInput
  })
  .then (function (response) {
    console.log(response);
  })
  .catch (function (error) {
   console.log(error);
  })

  axios.get("https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos")
  .then((response) => {
    setTodos(response.data)
  })
  }

  const handleFilter = async (event) => {
    event.preventDefault();
    const searchId = idInput
    const url = "https://9fqm32scil.execute-api.us-west-2.amazonaws.com/todos/" + searchId
    console.log(url);
    axios.get(url)
    .then((response) => {
      setTodos(response.data)
    })
  }


  return (
    <div className="App">
      <div>
        <h1>Add To Your List!</h1>
        <form onSubmit={handleAddTodo}>
          <input type = "text" value = {userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button type = "submit">
            Add To List
          </button>
        </form>
      </div>
      <div>
        <h1>Search Todo By Id</h1>
        <form onSubmit={handleFilter}>
          <input type = "text" value = {idInput} onChange={(e) => setIdInput(e.target.value)} />
          <button type = "submit">
            Search!
          </button>
        </form>
      </div>
      {todos.map((todo) =>{
        return(
          <div key = {todo.id} className="todo">
            <h1>{todo.todo} - ID: {todo.id}</h1>
            <form id = "edit-field" onSubmit={() =>handleEdit(todo.id)}>
              <label>Edit Todo: </label>
              <input type = "text"  onChange={(e) => setEditInput(e.target.value)} />
              <button type = "submit">
                Click to Edit!
              </button>
            </form>
            <form onSubmit={() => handleDelete(todo.id)}>
              <button type = "submit">
                Delete Todo
              </button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default App

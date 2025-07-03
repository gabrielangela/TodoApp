import { useEffect, useState } from 'react'
import TodoForm from '../components/TodoForm'
import TodoCard from '../components/TodoCard'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)

  // GET todos from JSON server
  async function fetchTodos() {
    try {
      const res = await fetch('http://localhost:3001/todos')
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }

  // POST new todo to JSON server
  async function addTodo(newTodo) {
    try {
      const res = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      })
      const data = await res.json()
      setTodos(prev => [...prev, data])
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  // DELETE todo task
  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      })
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  // EDIT todo task
  function handleEdit(todo) {
    setEditTodo(todo)
  }

  async function updateTodo(updatedTodo) {
    try {
      const res = await fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo)
    })

    const data = await res.json()
    setTodos(prev => prev.map(todo => (todo.id === data.id ? data : todo)))
    setEditTodo(null)
  } catch (err) {
    console.error("Error updating todo:", err)
  }}


  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoForm 
      onSubmit={addTodo}
      editData={editTodo}
      onUpdate={updateTodo}
      />
      <div className="mt-4 space-y-4">
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={() => handleEdit(todo)}
            onDelete={() => {
                if (confirm("Are you sure you want to delete this task?")) {
                    deleteTodo(todo.id)
                }
            }}
            onCheck={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

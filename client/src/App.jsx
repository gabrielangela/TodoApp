import { useEffect } from 'react'
import Home from './pages/Home'

useEffect(() => {
  async function fetchTodos() {
    try {
      const response = await fetch(
        "https://jelly-thrilling-cartwheel.glitch.me/todos",
        {
          method: "GET",
        }
      );
      const result = await response.json();
      console.log(result);
    } catch(error) {
      console.log(error);
    }
  }
  fetchTodos();
}, [])

function App() {
  return <Home />
}

export default App
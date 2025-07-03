import { useEffect, useState } from 'react';

export default function TodoForm({ onSubmit, editData, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setTitle(editData.title)
      setDescription(editData.description)
    }
  }, [editData])
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) return;

    const todo = {
      title,
      description,
      isDone: editData?.isDone || false,
    }

    if (editData) {
      todo.id = editData.id
      onUpdate(todo)
    } else {
      onSubmit(todo)
    }

    setTitle("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout, loading, token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Search + Filter
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    fetchTasks();
  }, [isAuthenticated, loading]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks.');
      console.error('Error fetching tasks:', err);
    }
  };

  // ✅ Add Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      toast.success('Task added successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Error adding task!');
      console.error('Error adding task:', err);
    }
  };

  // ✅ Delete Task
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task deleted.');
      fetchTasks();
    } catch (err) {
      toast.error('Error deleting task!');
      console.error('Error deleting task:', err);
    }
  };

  // ✅ Start Editing
  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // ✅ Save Edit (Update Task)
  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${editingTask.id}/`,
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      toast.success('Task updated successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Error updating task!');
      console.error('Error updating task:', err);
    }
  };

  // ✅ Toggle Completion
  const handleToggleComplete = async (task: Task) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}/`,
        { is_completed: !task.is_completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(task.is_completed ? 'Task marked as pending.' : 'Task completed!');
      fetchTasks();
    } catch (err) {
      toast.error('Error updating status!');
      console.error('Error toggling completion:', err);
    }
  };

  // ✅ Filter + Search
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.is_completed
        : !task.is_completed;
    return matchesSearch && matchesFilter;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">{user?.username}</span>
          </h1>
          <button
            onClick={() => {
              toast.success('Logged out successfully!');
              logout();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Add New Task */}
        <form onSubmit={handleAddTask} className="mb-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Add a New Task</h2>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Task Description</label>
            <textarea
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'completed' | 'pending')
            }
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Task List */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Tasks</h2>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-start justify-between border p-3 rounded-md hover:bg-gray-50"
              >
                {editingTask?.id === task.id ? (
                  <form onSubmit={handleUpdateTask} className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTask(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between w-full">
                    <div>
                      <p
                        className={`font-medium text-gray-800 ${
                          task.is_completed ? 'line-through text-green-600' : ''
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-gray-600 text-sm">{task.description}</p>
                      )}
                    </div>
                    <div className="flex gap-3 mt-3 sm:mt-0 sm:ml-4">
                      <button
                        onClick={() => handleToggleComplete(task)}
                        className={`${
                          task.is_completed
                            ? 'text-yellow-600 hover:text-yellow-800'
                            : 'text-green-600 hover:text-green-800'
                        } font-semibold`}
                      >
                        {task.is_completed ? '↩️ Undo' : '✅ Done'}
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}








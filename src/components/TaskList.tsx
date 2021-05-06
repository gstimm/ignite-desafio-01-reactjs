import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash2, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showTrashBlock, setShowTrashBlock] = useState(false);

  function handleCreateNewTask() {
    if (!newTaskTitle) {
      return;
    }

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(oldTaskState => [...oldTaskState, newTask]);

    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    const newTaskCompleted = tasks.map(
      task => task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );

    setTasks(newTaskCompleted);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  function handleRemoveAllTasksComplete() {
    const filteredNotCompleteTasks = tasks.filter(task => task.isComplete !== true);

    setTasks(filteredNotCompleteTasks);
  }

  function handleRemoveAllTasks() {
    setTasks([]);
  }

  useEffect(() => {
    if (tasks.length < 1 && showTrashBlock === true) {
      setShowTrashBlock(false);
    } else if (tasks.length >= 1 && showTrashBlock === false) {
      setShowTrashBlock(true);
    }
  }, [tasks]);

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        {
          showTrashBlock ?
          <div className="input-trash-group">
            <div>
              <button type="button" onClick={() => handleRemoveAllTasksComplete()}>
                <FiTrash2 size={16}/> 
              </button>
              <span>Limpar concluídas</span>
            </div>
            <div>
              <button type="button" onClick={() => handleRemoveAllTasks()}>
                <FiTrash2 size={16}/> 
              </button>
              <span>Limpar toda lista</span>
            </div>
          </div>
            : null
        }
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash2 size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
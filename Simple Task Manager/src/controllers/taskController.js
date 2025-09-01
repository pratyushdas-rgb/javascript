const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

const readTasks = async () => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeTasks = async (tasks) => {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const tasks = await readTasks();

    // Generate sequential ID
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => parseInt(t.id))) : 0;
    const newId = maxId + 1;

    const newTask = {
      id: newId,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title && !description && completed === undefined) {
      return res.status(400).json({ error: 'At least one field (title, description, or completed) is required' });
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title !== undefined ? title : tasks[taskIndex].title,
      description: description !== undefined ? description : tasks[taskIndex].description,
      completed: completed !== undefined ? completed : tasks[taskIndex].completed,
      updatedAt: new Date().toISOString()
    };



    await writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }



    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    res.status(204).send();


  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {


  console.error(err.stack);

  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


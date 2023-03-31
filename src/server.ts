import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log('Hello from Express!');
  res.status(200).json({ message: 'Hello from Express!' });
});

export default app;
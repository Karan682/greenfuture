import express from 'express';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ message: 'This is a protected dashboard route.' });
});

router.get('/reward', (req, res) => {
  res.json({ message: 'This is a protected rewards route.' });
});

router.get('/collaboration', (req, res) => {
    res.json({ message: 'This is a protected rewards route.' });
  });

  router.get('/feedback', (req, res) => {
    res.json({ message: 'This is a protected rewards route.' });
  });

  router.get('/idea-submission', (req, res) => {
    res.json({ message: 'This is a protected rewards route.' });
  });

export default router;

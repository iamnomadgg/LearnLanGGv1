import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LessonList from './components/LessonList';
import LessonForm from './components/LessonForm';
import Reader from './components/Reader';
import Editor from './components/Editor';
import { Button, Container, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          LearnLangg
        </Typography>

        <Button variant="contained" component={Link} to="/add" sx={{ mb: 3 }}>
          Add New Lesson
        </Button>

        <Routes>
          <Route path="/" element={<LessonList />} />
          <Route path="/add" element={<LessonForm />} />
          <Route path="/editor/:lessonId" element={<Editor />} />
          <Route path="/reader/:lessonId" element={<Reader />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

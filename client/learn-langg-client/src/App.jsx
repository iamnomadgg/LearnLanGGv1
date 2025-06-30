import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LessonList from './components/LessonList';
import LessonForm from './components/LessonForm';
import LessonDetail from './components/LessonDetail';
import EditLesson from './components/EditLesson';
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
          <Route path="/lessons/:id/edit" element={<EditLesson />} />
          <Route path="/lessons/:id" element={<LessonDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

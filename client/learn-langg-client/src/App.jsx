import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Library from './components/Library';
import Importer from './components/Importer';
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

        <Button variant="contained" component={Link} to="/import" sx={{ mb: 3 }}>
          Add New Lesson
        </Button>

        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/lib" element={<Library />} />
          <Route path="/import" element={<Importer />} />
          <Route path="/edit/:lessonId" element={<Editor />} />
          <Route path="/read/:lessonId" element={<Reader />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

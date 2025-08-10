import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/home-page';
import { ContactPage } from './pages/Contact/contact-page';
import { PromptsPage } from './pages/Prompts/prompts-page';
import { PromptDetailPage } from './pages/Prompts/prompt-detail-page';

const theme = createTheme({
  palette: { primary: { main: '#1976d2' }, secondary: { main: '#dc004e' } },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/:slug" element={<PromptDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

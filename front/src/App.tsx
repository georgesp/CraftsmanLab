import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHtmlLang } from './hooks';
import { HomePage } from './pages/Home/home-page';
import { ContactPage } from './pages/Contact/contact-page';
import { PromptsPage } from './pages/Prompts/prompts-page';
import { PromptDetailPage } from './pages/Prompts/prompt-detail-page';
import { TipsPage } from './pages/Tips/tips-page';
import { TipDetailPage } from './pages/Tips/tip-detail-page';
import { telerikTheme } from './theme/theme';

function App() {
  // Automatically update HTML lang attribute when language changes
  useHtmlLang();

  return (
  <ThemeProvider theme={telerikTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/:slug" element={<PromptDetailPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/tips/:slug" element={<TipDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

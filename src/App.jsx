import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WordOfTheDay from './pages/WordOfTheDay';
import Categories from './pages/Categories';
import Quiz from './pages/Quiz';
import History from './pages/History';
import Subscribe from './pages/Subscribe';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word-of-the-day" element={<WordOfTheDay />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Layout>
  );
}

export default App;

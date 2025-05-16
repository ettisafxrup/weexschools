import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './index.css';
import WelcomePage from './Components/WelcomePage';
import Navbar from './Components/common/TitleBar';
import Home from './Components/Index';

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

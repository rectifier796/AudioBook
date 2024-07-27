import './App.css';
import Home from './components/Home';
import BookDetails from './components/BookDetails';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/book/:slug" element={<BookDetails/>} />
    </Routes>
  </Router>
  );
}

export default App;

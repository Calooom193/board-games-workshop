import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AllReviews } from './components/AllReviews';
import { Header } from './components/Header';
import { Nav } from './components/Nav';

function App() {
  const [reviews, setReviews] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<AllReviews reviews={reviews} setReviews={setReviews} />}
          />
          <Route
            path="/reviews"
            element={<AllReviews reviews={reviews} setReviews={setReviews} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

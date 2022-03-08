import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getReviews } from './Api';
import './App.css';
import { AllReviews } from './components/AllReviews';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { SingleCategory } from './components/SingleCategory';
import { SingleReview } from './components/SingleReview';

function App() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews().then(({ reviews }) => {
      setReviews(reviews);
    });
  }, []);

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
          <Route
            path="/categories"
            element={<Categories reviews={reviews} />}
          />
          <Route
            path="/reviews/:category_name"
            element={<SingleCategory reviews={reviews} />}
          />
          <Route path="/review/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

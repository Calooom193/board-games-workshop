import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AllReviews } from './components/AllReviews';
import { Header } from './components/Header';
import { SingleCategory } from './components/SingleCategory';
import { SingleReview } from './components/SingleReview';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllReviews />} />
          <Route path="/reviews/:category" element={<SingleCategory />} />
          <Route path="/review/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

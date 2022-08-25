import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCategories } from './Api';
import { AllReviews } from './components/AllReviews';
import { ErrorPage } from './components/ErrorPage';
import { Header } from './components/Header';
import { PostReview } from './components/PostReview';
import { SingleCategory } from './components/SingleCategory';
import { SingleReview } from './components/SingleReview';
import { UserContext } from './contexts/User';

function App() {
  const [sortSelected, setSortSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState('ASC');
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <BrowserRouter>
        <div className="App">
          <Header
            setCategorySelected={setCategorySelected}
            setSortSelected={setSortSelected}
          />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/"
              element={
                <AllReviews
                  sortSelected={sortSelected}
                  setSortSelected={setSortSelected}
                  categorySelected={categorySelected}
                  setCategorySelected={setCategorySelected}
                  categories={categories}
                  order={order}
                  setOrder={setOrder}
                />
              }
            />
            <Route
              path="/reviews/:category"
              element={
                <SingleCategory
                  sortSelected={sortSelected}
                  setSortSelected={setSortSelected}
                  categorySelected={categorySelected}
                  setCategorySelected={setCategorySelected}
                  categories={categories}
                  order={order}
                  setOrder={setOrder}
                />
              }
            />
            <Route path="/review/:review_id" element={<SingleReview />} />
            <Route
              path="/review/post-review"
              element={<PostReview categories={categories} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

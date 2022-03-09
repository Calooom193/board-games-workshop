import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../Api';

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  return (
    <div className="categories">
      <ul className="category-list">
        {categories.map(({ description, slug }) => {
          return (
            <li key={slug}>
              <Link to={`/reviews/${slug}`}>
                <h3>{slug}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

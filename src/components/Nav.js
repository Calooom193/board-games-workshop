import { useEffect, useState } from 'react';
import { getCategories } from '../Api';
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('Select a category...');
  let navigate = useNavigate();

  useEffect(() => {
    getCategories().then(({ categories }) => {
      setCategories(categories);
    });
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    if (selected === 'Select a category...') return;
    selected === 'All' ? navigate(`/`) : navigate(`/reviews/${selected}`);
  }, [selected]);

  return (
    <div className="nav">
      <form>
        <label htmlFor="search">Change category: </label>
        <select id="search" onChange={handleChange}>
          <option disabled selected>
            Select a category...
          </option>
          <option>All</option>
          {categories.map((c) => {
            return <option key={c.slug}>{c.slug}</option>;
          })}
        </select>
      </form>
    </div>
  );
};

// export const Categories = () => {
//   return (
//     <div className="categories">
//       <ul className="category-list">
//         {categories.map(({ description, slug }) => {
//           return (
//             <li key={slug}>
//               <Link to={`/reviews/${slug}`}>
//                 <h3>{slug}</h3>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

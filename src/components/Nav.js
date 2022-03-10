import { useEffect, useState } from 'react';
import { getCategories } from '../Api';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Nav = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
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
    if (!selected) return;
    selected === 'All' ? navigate(`/`) : navigate(`/reviews/${selected}`);
  }, [selected]);

  return (
    <div className="nav">
      <FormControl fullWidth>
        <InputLabel id="category-select">Change category</InputLabel>
        <Select
          labelId="category-select"
          id="category-select"
          value={selected}
          label="Change category"
          onChange={handleChange}
        >
          <MenuItem value={'All'}>All</MenuItem>
          {categories.map((c) => {
            return (
              <MenuItem value={c.slug} key={c.slug}>
                {c.slug}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

{
  /* <form>
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
      </form> */
}

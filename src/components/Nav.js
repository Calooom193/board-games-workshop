import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Nav = ({
  sortSelected,
  setSortSelected,
  categorySelected,
  setCategorySelected,
  categories,
}) => {
  let navigate = useNavigate();

  const handleSortChange = (e) => {
    setSortSelected(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategorySelected(e.target.value);
  };

  useEffect(() => {
    if (!categorySelected) return;
    categorySelected === 'All'
      ? navigate(`/`)
      : navigate(`/reviews/${categorySelected}`);
  }, [categorySelected]);

  return (
    <div className="nav">
      <FormControl fullWidth>
        <InputLabel id="category-select">Change category</InputLabel>
        <Select
          labelId="category-select"
          id="category-select"
          defaultValue={''}
          value={categorySelected}
          label="Change category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={'All'}>ALL</MenuItem>
          {categories.map((c) => {
            return (
              <MenuItem value={c.slug} key={c.slug}>
                {c.slug.toUpperCase().replace(/-/g, ' ')}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div className="sort-by">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="sort-by-select">Sort by</InputLabel>
          <Select
            labelId="sort-by-select"
            id="sort-by-select"
            defaultValue={''}
            value={sortSelected}
            label="Sort"
            onChange={handleSortChange}
          >
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'votes'}>Votes</MenuItem>
            <MenuItem value={'owner'}>Author</MenuItem>
            <MenuItem value={'created_at'}>Date</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

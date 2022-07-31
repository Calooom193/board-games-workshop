import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const Nav = ({
  sortSelected,
  setSortSelected,
  categorySelected,
  setCategorySelected,
  categories,
  order,
  setOrder,
}) => {
  let navigate = useNavigate();

  const handleSortChange = (e) => {
    setSortSelected(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategorySelected(e.target.value);
  };

  const handleOrder = () => {
    setOrder(order === 'ASC' ? 'DESC' : 'ASC');
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
        <div className="order-toggle">
          {order === 'ASC' ? (
            <svg
              onClick={handleOrder}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
              width="24px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              onClick={handleOrder}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
              width="24px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

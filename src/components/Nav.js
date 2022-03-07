import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className="nav">
      <Link to={'/reviews'}>
        <h3>All Reviews</h3>
      </Link>
      <Link to={'/categories'}>
        <h3>Categories</h3>
      </Link>
    </div>
  );
};

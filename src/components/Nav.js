import { Link } from 'react-router-dom';
import { Categories } from './Categories';

export const Nav = () => {
  return (
    <div className="nav">
      <Link to={'/reviews'}>
        <h3>All Reviews</h3>
      </Link>
      <Categories />
    </div>
  );
};

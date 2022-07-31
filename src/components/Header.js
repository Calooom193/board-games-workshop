import { useNavigate } from 'react-router-dom';

export const Header = ({ setCategorySelected, setSortSelected }) => {
  let navigate = useNavigate();
  return (
    <div className="header">
      <h1
        onClick={() => {
          setCategorySelected('');
          setSortSelected('');
          navigate('/');
        }}
      >
        Board Games Workshop
      </h1>
    </div>
  );
};

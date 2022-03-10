import { useNavigate } from 'react-router-dom';

export const Header = () => {
  let navigate = useNavigate();
  return (
    <div className="header">
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        Board Games Workshop
      </h1>
    </div>
  );
};

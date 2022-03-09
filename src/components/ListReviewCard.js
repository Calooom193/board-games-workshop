import { Link } from 'react-router-dom';

export const ListReviewCard = ({
  review_id,
  owner,
  title,
  review_img_url,
  category,
  created_at,
  votes,
}) => {
  return (
    <div className="list-review-card">
      <h3>{title}</h3>
      <p>Author: {owner}</p>{' '}
      <p>Published: {String(created_at).substring(0, 10)}</p>
      <h4>Up votes: {votes}</h4>
      <Link className="view-button" to={`/review/${review_id}`}>
        View Review
      </Link>
      <br />
      <img className="list-img" src={review_img_url} alt={title} />
      <br />
      <Link to={`/reviews/${category}`}>{category}</Link>
    </div>
  );
};

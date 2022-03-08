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
      <p>Author: {owner}</p> <p>{created_at}</p>
      <h4>Up votes: {votes}</h4>
      <img className="list-img" src={review_img_url} alt={title} />
      <p>category: {category}</p>
      {/* turn category into link to category page */}
    </div>
  );
};

export const SortBy = () => {
  return (
    <form className="sortby-form">
      <label htmlFor="sortby">Sort by: </label>
      <select id="sortby">
        <option disabled selected>
          Sort...
        </option>
        <option>title</option>
        <option>owner</option>
        <option>votes</option>
        <option>date</option>
      </select>
    </form>
  );
};

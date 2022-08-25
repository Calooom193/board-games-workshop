import { GoHomeButton } from './GoHomeButton';

export const ErrorPage = ({ error }) => {
  if (error)
    return (
      <div className="error-page">
        <GoHomeButton />
        <h2>{error.message}</h2>
      </div>
    );
  return (
    <div className="generic-error">
    <GoHomeButton/>
      <h2>ERROR</h2>
      <p>Page does not exist.</p>
    </div>
  );
};

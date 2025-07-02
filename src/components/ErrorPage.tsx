import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>This page doesn't exist.</h1>
      <Link to="/">Return to the home page.</Link>
    </div>
  );
};

export default ErrorPage;

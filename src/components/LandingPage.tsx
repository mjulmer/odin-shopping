import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <p>Home page</p>
      <Link to="/shop">Shop</Link>
    </>
  );
}

export default LandingPage;

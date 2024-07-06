import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const history = useHistory();
  const { isAuthenticated, userName, userEmail, logout } = useAuth(); // Get isAuthenticated, userName, and logout function from context

  const handleSignOut =  async() => {
    await logout(); // Clear authentication state
    history.push('/login'); // Redirect to login page
  };

  // const handleSignOut =  () => {
  //   logout(); // Clear authentication state
  //   history.push('/login'); // Redirect to login page
  // };

  return (
    <nav className="navbar">
      <h1>BLOG (quick article for your favourite news)</h1>
      <div className="links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">New Blog</Link>
        {isAuthenticated && (
          <p className="user-name">Welcome - {userName} ,  contact - {userEmail}  </p>
        )}
        {isAuthenticated && (
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import { Link } from 'react-router-dom'
import './Homepage.css'

const Homepage = ({ user, setUser }) => {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">Futsal Booking</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {user ? (
            <button 
              onClick={() => setUser(null)} 
              className="nav-button logout"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-button login">Login</Link>
              <Link to="/register" className="nav-button register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Rest of your component remains the same */}
      <div className="hero">
        <h1>Welcome to Futsal Booking System</h1>
        <p>Book your futsal court easily and quickly</p>
        {user ? (
          <button className="book-now">Book Now</button>
        ) : (
          <Link to="/login" className="book-now">Login to Book</Link>
        )}
      </div>

      <footer>
        <p>&copy; 2025 Futsal Booking System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Homepage












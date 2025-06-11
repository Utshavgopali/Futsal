import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>FUTSAL</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main-content">
        <section id="home" className="hero">
          <div className="hero-content">
            <h2>Welcome to Futsal App</h2>
            <p>Book courts, join matches, and enjoy the game!</p>
            <button className="cta-button">Book Now</button>
          </div>
        </section>

        <section id="about" className="about-section">
          <h2>About Futsal</h2>
          <p>Futsal is the fastest-growing indoor soccer format worldwide.</p>
        </section>

        <section id="contact" className="contact-section">
          <h2>Contact Us</h2>
          <p>Email: info@futsalapp.com</p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2023 Futsal App. All rights reserved.</p>
      </footer>
    </div>
  )
}
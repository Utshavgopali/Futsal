import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AuthModal from './components/AuthModal';
import CourtsPage from './components/CourtsPage';
import BookingPage from './components/BookingPage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import HomePage from './components/HomePage';
import { courts, timeSlots } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    playerName: '',
    phone: '',
    email: ''
  });

  const handleLogin = (name, user) => {
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleRegister = (name, user) => {
    setIsLoggedIn(true);
    setUserName(name);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentView('home');
  };

  const handleBooking = () => {
    if (
      !selectedCourt ||
      !selectedDate ||
      !selectedTimeSlot ||
      !bookingForm.playerName ||
      !bookingForm.phone
    ) {
      alert('Please fill all required fields');
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      playerName: bookingForm.playerName,
      phone: bookingForm.phone,
      status: 'confirmed'
    };

    setBookings([...bookings, newBooking]);
    alert('Booking confirmed successfully!');
    setCurrentView('profile');
    setBookingForm({ playerName: '', phone: '', email: '' });
    setSelectedCourt(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const selectCourtForBooking = (court) => {
    setSelectedCourt(court);
    setCurrentView('booking');
  };

  const appState = {
    currentView,
    setCurrentView,
    selectedCourt,
    setSelectedCourt,
    showAuthModal,
    setShowAuthModal,
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    bookings,
    setBookings,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    currentUser,
    setCurrentUser,
    bookingForm,
    setBookingForm,
    handleLogin,
    handleRegister,
    handleLogout,
    handleBooking,
    selectCourtForBooking,
    courts,
    timeSlots
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage {...appState} />;
      case 'courts':
        return <CourtsPage {...appState} />;
      case 'booking':
        return <BookingPage {...appState} />;
      case 'profile':
        return <ProfilePage {...appState} />;
      case 'contact':
        return <ContactPage {...appState} />;
      default:
        return <HomePage {...appState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogout={handleLogout}
      />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;

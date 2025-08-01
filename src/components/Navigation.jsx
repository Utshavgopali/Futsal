import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';

const Navigation = ({ 
  currentView, 
  setCurrentView, 
  showAuthModal,
  setShowAuthModal,
  isLoggedIn, 
  userName, 
  handleLogout 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-2">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-800">FutsalKTM</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === 'home' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('courts')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === 'courts' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Courts
              </button>
              <button
                onClick={() => setCurrentView('contact')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentView === 'contact' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Contact
              </button>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`px-3 py-2 text-sm font-medium transition-colors flex items-center ${
                      currentView === 'profile' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <User className="w-4 h-4 mr-1" />
                    {userName}
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                      <button
                        onClick={() => {
                          setCurrentView('profile');
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        <User className="w-4 h-4 inline mr-2" />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-green-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                  currentView === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentView('courts'); setMobileMenuOpen(false); }}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                  currentView === 'courts' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Courts
              </button>
              <button
                onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                  currentView === 'contact' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Contact
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => { 
                    setCurrentView('profile'); 
                    setMobileMenuOpen(false); 
                  }}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                    currentView === 'profile' ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  Profile ({userName})
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-base font-medium w-full text-left text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-base font-medium w-full text-left bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Register
                  </button>
                </div>
              )}
              
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

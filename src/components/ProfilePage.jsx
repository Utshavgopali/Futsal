import React from 'react';
import { User, Calendar, MapPin, Clock, Phone, CheckCircle, XCircle, Mail, Edit } from 'lucide-react';

const ProfilePage = ({ isLoggedIn, userName, currentUser, bookings, setCurrentView }) => {
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your profile and bookings.</p>
          <button
            onClick={() => setCurrentView('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate >= today && booking.status === 'confirmed';
  });

  const pastBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    return bookingDate < today || booking.status !== 'confirmed';
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {userName}!</h1>
                <p className="text-gray-600">Manage your futsal bookings</p>
                {currentUser && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      {currentUser.email}
                    </div>
                    {currentUser.phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2" />
                        {currentUser.phone}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button className="flex items-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{bookings.length}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{upcomingBookings.length}</div>
            <div className="text-gray-600">Upcoming Games</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{pastBookings.length}</div>
            <div className="text-gray-600">Games Played</div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Bookings</h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.courtName}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span>{booking.playerName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-600 font-semibold">Confirmed</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No upcoming bookings</p>
              <button
                onClick={() => setCurrentView('courts')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Book a Court
              </button>
            </div>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking History</h2>
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6 opacity-75">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.courtName}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span>{booking.playerName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="flex items-center">
                        {booking.status === 'confirmed' ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="text-gray-500 font-semibold">Completed</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-500 mr-2" />
                            <span className="text-red-500 font-semibold">Cancelled</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No booking history yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
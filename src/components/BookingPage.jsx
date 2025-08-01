import React from 'react';
import { MapPin, Star, Users, Calendar, Clock, ArrowLeft } from 'lucide-react';

const BookingPage = ({
  selectedCourt,
  setShowAuthModal,
  selectedDate,
  setSelectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  bookingForm,
  setBookingForm,
  handleBooking,
  setCurrentView,
  timeSlots,
  isLoggedIn
}) => {
  if (!selectedCourt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No court selected</p>
          <button
            onClick={() => setCurrentView('courts')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Courts
          </button>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const selectedSlot = timeSlots.find(slot => slot.time === selectedTimeSlot);
  const totalPrice = selectedSlot ? selectedSlot.price : selectedCourt.price;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('courts')}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courts
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Court Information */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedCourt.image}
              alt={selectedCourt.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedCourt.name}</h2>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg text-gray-600">{selectedCourt.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{selectedCourt.location}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="w-5 h-5 mr-2" />
                <span>{selectedCourt.capacity}</span>
              </div>

              <p className="text-gray-600 mb-4">{selectedCourt.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCourt.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="text-3xl font-bold text-green-600">
                Rs. {totalPrice}/hour
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Book Your Slot</h3>
            
            {!isLoggedIn && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 mb-2">Please login to make a booking.</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-green-600 hover:text-green-700 font-semibold underline"
                >
                  Login / Register here
                </button>
              </div>
            )}

            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  max={maxDateString}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={!isLoggedIn}
                />
              </div>

              {/* Time Slot Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        disabled={!slot.available || !isLoggedIn}
                        className={`p-3 text-sm rounded-lg border transition-colors ${
                          selectedTimeSlot === slot.time
                            ? 'bg-green-600 text-white border-green-600'
                            : slot.available
                            ? 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-300'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-medium">{slot.time}</div>
                        <div className="text-xs">Rs. {slot.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Player Details */}
              {selectedTimeSlot && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Player Name *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.playerName}
                      onChange={(e) => setBookingForm({...bookingForm, playerName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter player name"
                      disabled={!isLoggedIn}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter phone number"
                      disabled={!isLoggedIn}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter email address"
                      disabled={!isLoggedIn}
                    />
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedTimeSlot && bookingForm.playerName && bookingForm.phone && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Court:</span>
                      <span>{selectedCourt.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{selectedTimeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Player:</span>
                      <span>{bookingForm.playerName}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-800 border-t pt-2">
                      <span>Total:</span>
                      <span>Rs. {totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedTimeSlot || !bookingForm.playerName || !bookingForm.phone || !isLoggedIn}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {!isLoggedIn ? 'Login Required' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
import { useState } from 'react';
import { Calendar, Users, Clock } from 'lucide-react';

interface BookingFormProps {
  restaurantId: string;
  restaurantName: string;
  seatPrice: number;
  onBook: (booking: BookingData) => void;
}

export interface BookingData {
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
}

export function BookingForm({ restaurantId, restaurantName, seatPrice, onBook }: BookingFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);

  const totalPrice = guests * seatPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({
      restaurantId,
      restaurantName,
      date,
      time,
      guests,
      totalPrice
    });
    setDate('');
    setTime('');
    setGuests(2);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="mb-4">Book a Table</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Calendar size={18} />
            <span>Date</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Clock size={18} />
            <span>Time</span>
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select time</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="6:30 PM">6:30 PM</option>
            <option value="7:00 PM">7:00 PM</option>
            <option value="7:30 PM">7:30 PM</option>
            <option value="8:00 PM">8:00 PM</option>
            <option value="8:30 PM">8:30 PM</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <Users size={18} />
            <span>Number of Guests</span>
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            min="1"
            max="20"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price per seat:</span>
            <span>${seatPrice}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span>Total Price:</span>
            <span className="text-orange-600">${totalPrice}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}

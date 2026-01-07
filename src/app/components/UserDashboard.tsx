import { Tag, Calendar, Users, MapPin } from 'lucide-react';

interface RedeemedOffer {
  id: string;
  restaurantName: string;
  offerTitle: string;
  discount: string;
  redeemedAt: string;
}

interface Booking {
  id: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
}

interface UserDashboardProps {
  redeemedOffers: RedeemedOffer[];
  bookings: Booking[];
}

export function UserDashboard({ redeemedOffers, bookings }: UserDashboardProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="mb-6">My Redeemed Offers</h2>
        {redeemedOffers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {redeemedOffers.map((offer) => (
              <div 
                key={offer.id}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="text-green-600" size={20} />
                      <h4 className="text-green-900">{offer.offerTitle}</h4>
                    </div>
                    <p className="text-gray-700 mb-2">{offer.restaurantName}</p>
                    <p className="text-gray-600">Redeemed on {offer.redeemedAt}</p>
                  </div>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                    <div>{offer.discount}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No offers redeemed yet. Browse restaurants to find great deals!</p>
        )}
      </div>

      <div>
        <h2 className="mb-6">My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="mb-3">{booking.restaurantName}</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 mb-1">Total</p>
                    <p className="text-orange-600">${booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookings yet. Book a table at your favorite restaurant!</p>
        )}
      </div>
    </div>
  );
}

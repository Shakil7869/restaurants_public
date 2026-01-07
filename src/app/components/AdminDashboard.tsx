import { Store, Tag, Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Restaurant {
  id: string;
  name: string;
  seatPrice: number;
}

interface Offer {
  id: string;
  restaurantId: string;
  title: string;
}

interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
}

interface RedeemedOffer {
  id: string;
  restaurantName: string;
  offerTitle: string;
  discount: string;
  redeemedAt: string;
}

interface AdminDashboardProps {
  restaurants: Restaurant[];
  offers: Offer[];
  bookings: Booking[];
  redeemedOffers: RedeemedOffer[];
}

const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];

export function AdminDashboard({ 
  restaurants, 
  offers, 
  bookings,
  redeemedOffers 
}: AdminDashboardProps) {
  // Calculate statistics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalGuests = bookings.reduce((sum, booking) => sum + booking.guests, 0);
  const totalOffers = offers.length;
  const totalBookings = bookings.length;

  // Bookings by restaurant
  const bookingsByRestaurant = restaurants.map(restaurant => ({
    name: restaurant.name,
    bookings: bookings.filter(b => b.restaurantId === restaurant.id).length,
    revenue: bookings
      .filter(b => b.restaurantId === restaurant.id)
      .reduce((sum, b) => sum + b.totalPrice, 0)
  }));

  // Offers by restaurant for pie chart
  const offersByRestaurant = restaurants.map(restaurant => ({
    name: restaurant.name,
    value: offers.filter(o => o.restaurantId === restaurant.id).length
  })).filter(item => item.value > 0);

  // Recent bookings (last 5)
  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Recent redeemed offers (last 5)
  const recentRedemptions = [...redeemedOffers].slice(-5).reverse();

  return (
    <div className="space-y-6">
      <h2>Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Store className="text-orange-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3>{restaurants.length}</h3>
          <p className="text-gray-600 mt-1">Total Restaurants</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3>{totalBookings}</h3>
          <p className="text-gray-600 mt-1">Total Bookings</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Tag className="text-purple-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3>{totalOffers}</h3>
          <p className="text-gray-600 mt-1">Active Offers</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3>${totalRevenue.toFixed(2)}</h3>
          <p className="text-gray-600 mt-1">Total Revenue</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="mb-4">Bookings by Restaurant</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsByRestaurant}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#ea580c" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Offers Distribution */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="mb-4">Offers Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={offersByRestaurant}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {offersByRestaurant.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="mb-4">Revenue by Restaurant</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingsByRestaurant}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#16a34a" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="mb-4">Recent Bookings</h3>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="text-gray-900">{booking.restaurantName}</h4>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600">${booking.totalPrice}</div>
                    <div className="text-gray-500">{booking.time}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          )}
        </div>

        {/* Recent Offer Redemptions */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="mb-4">Recent Offer Redemptions</h3>
          {recentRedemptions.length > 0 ? (
            <div className="space-y-3">
              {recentRedemptions.map((redemption) => (
                <div 
                  key={redemption.id}
                  className="flex justify-between items-start p-4 bg-orange-50 rounded-lg border border-orange-100"
                >
                  <div className="flex-1">
                    <h4 className="text-gray-900">{redemption.offerTitle}</h4>
                    <p className="text-gray-600 mt-1">{redemption.restaurantName}</p>
                    <p className="text-gray-500 mt-1">{redemption.redeemedAt}</p>
                  </div>
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-lg">
                    {redemption.discount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No offers redeemed yet</p>
          )}
        </div>
      </div>

      {/* Restaurant Performance Table */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="mb-4">Restaurant Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Restaurant</th>
                <th className="text-left py-3 px-4">Total Bookings</th>
                <th className="text-left py-3 px-4">Active Offers</th>
                <th className="text-left py-3 px-4">Seat Price</th>
                <th className="text-left py-3 px-4">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => {
                const restaurantBookings = bookings.filter(b => b.restaurantId === restaurant.id);
                const restaurantOffers = offers.filter(o => o.restaurantId === restaurant.id);
                const revenue = restaurantBookings.reduce((sum, b) => sum + b.totalPrice, 0);
                
                return (
                  <tr key={restaurant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{restaurant.name}</td>
                    <td className="py-3 px-4">{restaurantBookings.length}</td>
                    <td className="py-3 px-4">{restaurantOffers.length}</td>
                    <td className="py-3 px-4">${restaurant.seatPrice}</td>
                    <td className="py-3 px-4 text-green-600">${revenue.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

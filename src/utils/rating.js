const RATINGS_KEY = 'driver_ratings';
const ORDER_RATINGS_KEY = 'order_ratings';

// Save rating
export const saveRating = (ratingData) => {
  // Save to driver's ratings list
  const allRatings = JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}');
  
  if (!allRatings[ratingData.driverId]) {
    allRatings[ratingData.driverId] = [];
  }
  
  allRatings[ratingData.driverId].push({
    ...ratingData,
    id: `rating_${Date.now()}`
  });
  
  localStorage.setItem(RATINGS_KEY, JSON.stringify(allRatings));
  
  // Mark order as rated
  const orderRatings = JSON.parse(localStorage.getItem(ORDER_RATINGS_KEY) || '{}');
  orderRatings[ratingData.orderId] = true;
  localStorage.setItem(ORDER_RATINGS_KEY, JSON.stringify(orderRatings));
  
  // Update driver's average rating
  updateDriverRating(ratingData.driverId);
};

// Check if order has been rated
export const isOrderRated = (orderId) => {
  const orderRatings = JSON.parse(localStorage.getItem(ORDER_RATINGS_KEY) || '{}');
  return orderRatings[orderId] === true;
};

// Get driver's ratings
export const getDriverRatings = (driverId) => {
  const allRatings = JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}');
  return allRatings[driverId] || [];
};

// Calculate and update driver's average rating
export const updateDriverRating = (driverId) => {
  const ratings = getDriverRatings(driverId);
  
  if (ratings.length === 0) return 5; // Default rating
  
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / ratings.length;
  
  // Update in users database
  const usersDb = JSON.parse(localStorage.getItem('users_database') || '{}');
  const driver = Object.values(usersDb).find(u => u.id === driverId);
  
  if (driver) {
    driver.rating = parseFloat(average.toFixed(1));
    driver.totalRatings = ratings.length;
    usersDb[driver.email] = driver;
    localStorage.setItem('users_database', JSON.stringify(usersDb));
  }
  
  return average;
};

// Get driver's average rating
export const getDriverAverageRating = (driverId) => {
  const usersDb = JSON.parse(localStorage.getItem('users_database') || '{}');
  const driver = Object.values(usersDb).find(u => u.id === driverId);
  return driver?.rating || 5;
};

// Get all ratings with details
export const getAllRatingsWithDetails = () => {
  const allRatings = JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}');
  const result = [];
  
  Object.keys(allRatings).forEach(driverId => {
    allRatings[driverId].forEach(rating => {
      result.push({
        ...rating,
        averageRating: getDriverAverageRating(driverId)
      });
    });
  });
  
  return result.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
};
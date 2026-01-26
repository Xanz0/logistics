const NOTIFICATIONS_KEY = 'user_notifications';

// Get all notifications for current user
export const getNotifications = (userId) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  return all[userId] || [];
};

// Add notification
export const addNotification = (userId, notification) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  
  if (!all[userId]) {
    all[userId] = [];
  }
  
  const newNotification = {
    id: `notif_${Date.now()}`,
    ...notification,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  all[userId].unshift(newNotification);
  
  // Keep only last 50 notifications
  if (all[userId].length > 50) {
    all[userId] = all[userId].slice(0, 50);
  }
  
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  return newNotification;
};

// Mark notification as read
export const markAsRead = (userId, notificationId) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  
  if (all[userId]) {
    const notif = all[userId].find(n => n.id === notificationId);
    if (notif) {
      notif.read = true;
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
    }
  }
};

// Mark all as read
export const markAllAsRead = (userId) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  
  if (all[userId]) {
    all[userId].forEach(n => n.read = true);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  }
};

// Delete notification
export const deleteNotification = (userId, notificationId) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  
  if (all[userId]) {
    all[userId] = all[userId].filter(n => n.id !== notificationId);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
  }
};

// Clear all notifications
export const clearAllNotifications = (userId) => {
  const all = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  all[userId] = [];
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(all));
};

// Get unread count
export const getUnreadCount = (userId) => {
  const notifications = getNotifications(userId);
  return notifications.filter(n => !n.read).length;
};

// Notification types
export const NotificationTypes = {
  ORDER_CREATED: 'order_created',
  ORDER_ACCEPTED: 'order_accepted',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  DRIVER_ASSIGNED: 'driver_assigned',
  RATING_RECEIVED: 'rating_received'
};

// Create notification based on order status change
export const createOrderNotification = (order, type, recipientId) => {
  let title = '';
  let message = '';
  let icon = '📦';
  
  switch(type) {
    case NotificationTypes.ORDER_CREATED:
      title = 'New Order Created';
      message = `Order "${order.name}" has been created`;
      icon = '✅';
      break;
      
    case NotificationTypes.ORDER_ACCEPTED:
      title = 'Order Accepted';
      message = `Driver ${order.driverName} accepted your order "${order.name}"`;
      icon = '🚚';
      break;
      
    case NotificationTypes.ORDER_DELIVERED:
      title = 'Order Delivered';
      message = `Your order "${order.name}" has been delivered`;
      icon = '✅';
      break;
      
    case NotificationTypes.ORDER_CANCELLED:
      title = 'Order Cancelled';
      message = `Order "${order.name}" has been cancelled`;
      icon = '❌';
      break;
      
    case NotificationTypes.DRIVER_ASSIGNED:
      title = 'Driver Assigned';
      message = `You have been assigned to order "${order.name}"`;
      icon = '🚗';
      break;
      
    case NotificationTypes.RATING_RECEIVED:
      title = 'Rating Received';
      message = `You received a rating for order "${order.name}"`;
      icon = '⭐';
      break;
  }
  
  return addNotification(recipientId, {
    title,
    message,
    icon,
    type,
    orderId: order.id,
    orderName: order.name
  });
};
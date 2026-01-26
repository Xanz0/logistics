import { useState, useEffect } from 'react';
import { getUser } from '../utils/auth.js';
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  getUnreadCount 
} from '../utils/notifications';
import '../styles/notifications.css';

export default function NotificationCenter({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = getUser();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    if (user) {
      const notifs = getNotifications(user.id);
      setNotifications(notifs);
      setUnreadCount(getUnreadCount(user.id));
    }
  };

  const handleMarkAsRead = (notifId) => {
    markAsRead(user.id, notifId);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(user.id);
    loadNotifications();
  };

  const handleDelete = (notifId) => {
    deleteNotification(user.id, notifId);
    loadNotifications();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notifications</h3>
          <div className="notification-actions">
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="mark-all-btn">
                Mark all as read
              </button>
            )}
            <button onClick={onClose} className="close-btn">✕</button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <p>🔔</p>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
              >
                <div className="notif-icon">{notif.icon}</div>
                <div className="notif-content">
                  <h4>{notif.title}</h4>
                  <p>{notif.message}</p>
                  <span className="notif-time">{formatTime(notif.timestamp)}</span>
                </div>
                <div className="notif-actions">
                  {!notif.read && (
                    <button 
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="mark-read-btn"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(notif.id)}
                    className="delete-notif-btn"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
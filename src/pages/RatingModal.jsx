import { useState } from 'react';
import '../styles/rating.css';

export default function RatingModal({ order, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        orderId: order.id,
        driverId: order.driverId,
        driverName: order.driverName,
        rating,
        comment,
        timestamp: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      alert('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Rate Your Driver</h2>
        <p className="driver-info">
          Driver: <strong>{order.driverName}</strong>
        </p>
        <p className="order-info">Order: {order.name}</p>

        <form onSubmit={handleSubmit}>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                ★
              </button>
            ))}
          </div>

          <div className="rating-labels">
            {rating === 1 && <span>😞 Poor</span>}
            {rating === 2 && <span>😐 Fair</span>}
            {rating === 3 && <span>🙂 Good</span>}
            {rating === 4 && <span>😊 Very Good</span>}
            {rating === 5 && <span>🤩 Excellent</span>}
          </div>

          <textarea
            placeholder="Share your experience (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={submitting || rating === 0}>
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
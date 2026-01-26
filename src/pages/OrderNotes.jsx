import { useState, useEffect } from 'react';
import { getUser } from '../utils/auth';
import '../styles/notes.css';

const NOTES_KEY = 'order_notes';

// Get notes for an order
const getOrderNotes = (orderId) => {
  const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
  return all[orderId] || [];
};

// Add note to order
const addOrderNote = (orderId, note) => {
  const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
  
  if (!all[orderId]) {
    all[orderId] = [];
  }
  
  const newNote = {
    id: `note_${Date.now()}`,
    ...note,
    timestamp: new Date().toISOString()
  };
  
  all[orderId].push(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  return newNote;
};

export default function OrderNotes({ orderId, onClose }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [sending, setSending] = useState(false);
  const user = getUser();

  useEffect(() => {
    loadNotes();
  }, [orderId]);

  const loadNotes = () => {
    const orderNotes = getOrderNotes(orderId);
    setNotes(orderNotes);
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!newNote.trim()) return;
    
    setSending(true);
    
    try {
      addOrderNote(orderId, {
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        message: newNote.trim()
      });
      
      setNewNote('');
      loadNotes();
    } catch (error) {
      alert('Failed to send note');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="notes-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notes-header">
          <h3>💬 Order Notes & Comments</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="no-notes">
              <p>No comments yet</p>
              <small>Start a conversation!</small>
            </div>
          ) : (
            notes.map((note) => (
              <div 
                key={note.id} 
                className={`note-item ${note.userId === user?.id ? 'own-note' : ''}`}
              >
                <div className="note-avatar">
                  {note.userRole === 'customer' ? '👤' : '🚗'}
                </div>
                <div className="note-content">
                  <div className="note-header-info">
                    <strong>{note.userName}</strong>
                    <span className="note-role">{note.userRole}</span>
                  </div>
                  <p className="note-message">{note.message}</p>
                  <span className="note-time">{formatTime(note.timestamp)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSend} className="notes-input-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            disabled={sending}
          />
          <button type="submit" disabled={sending || !newNote.trim()}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
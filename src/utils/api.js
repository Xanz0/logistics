import { getToken, refreshToken } from './auth';

const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

// Common headers with JWT token
const getHeaders = () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Enhanced fetch with token refresh
const fetchWithAuth = async (url, options = {}) => {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers
    }
  });
  
  // If token expired, refresh and retry
  if (response.status === 401) {
    try {
      const newToken = await refreshToken();
      if (newToken) {
        response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newToken}`,
            ...options.headers
          }
        });
      }
    } catch (refreshError) {
      console.warn('Token refresh failed:', refreshError);
      // Continue without refresh
    }
  }
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${response.status} - ${errorText}`);
  }
  
  return response;
};

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const res = await fetchWithAuth(BASE_URL);
    const orders = await res.json();
    
    // Merge with local storage data if needed
    const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
    return orders.map(order => ({
      ...order,
      ...(extraData[order.id] || {})
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Add new order with validation
export const addOrder = async (order) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const orderWithMetadata = {
      ...order,
      createdBy: user?.email || 'unknown',
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const res = await fetchWithAuth(BASE_URL, {
      method: "POST",
      body: JSON.stringify(orderWithMetadata)
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// Edit order with permissions check
export const editOrder = async (id, updated) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...updated,
        updatedBy: user?.email || 'unknown',
        updatedAt: new Date().toISOString()
      })
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error editing order:', error);
    throw error;
  }
};

// Delete order
export const deleteOrder = async (id) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Fetch single order
export const fetchOrder = async (id) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`);
    const order = await res.json();
    
    // Merge with local storage data if needed
    const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
    return {
      ...order,
      ...(extraData[order.id] || {})
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// ✅ Alternative simple functions (fallback)
export const fetchOrdersSimple = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const deleteOrderSimple = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete order");
  return res.json();
};

export const addOrderSimple = async (order) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error("Failed to add order");
  return res.json();
};
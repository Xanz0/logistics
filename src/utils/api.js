import { getToken, getUser, refreshToken } from './auth.js'; // ✅ Import qatorini qo'shing

const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

// Get headers with auth token
const getHeaders = () => {
  const token = getToken(); // ✅ Endi mavjud
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
  
  if (response.status === 401) {
    try {
      const newToken = await refreshToken(); // ✅ Endi mavjud
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
    }
  }
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${response.status} - ${errorText}`);
  }
  
  return response;
};

// ✅ Fetch all orders
export const fetchOrders = async () => {
  try {
    const res = await fetchWithAuth(BASE_URL);
    const orders = await res.json();
    
    const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
    // Filter user's orders if logged in
    const user = getUser(); // ✅ Endi mavjud
    if (user) {
      const userOrders = orders.filter(order => 
        order.customerId === user.id || 
        order.customerEmail === user.email ||
        order.userId === user.id ||
        !order.customerId // Agar customerId yo'q bo'lsa, hammasini ko'rsatish
      );
      
      return userOrders.map(order => ({
        ...order,
        ...(extraData[order.id] || {})
      }));
    }
    
    // If no user, return all orders
    return orders.map(order => ({
      ...order,
      ...(extraData[order.id] || {})
    }));
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// ✅ Fetch orders for specific customer
export const fetchCustomerOrders = async (customerId) => {
  try {
    const allOrders = await fetchOrders();
    return allOrders.filter(order => order.customerId === customerId);
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
};

// ✅ Add new order
export const addOrder = async (order) => {
  try {
    const user = getUser(); // ✅ Endi mavjud
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const orderWithMetadata = {
      ...order,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      createdAt: new Date().toISOString(),
      status: 'pending',
      driverAssigned: false
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

// ✅ Edit order
export const editOrder = async (id, updated) => {
  try {
    const user = getUser(); // ✅ Endi mavjud
    
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

// ✅ Delete order
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

// ✅ Fetch single order
export const fetchOrder = async (id) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`);
    const order = await res.json();
    
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

// ✅ Assign driver to order
export const assignDriver = async (orderId, driverId, driverName, driverPhone) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        driverAssigned: true,
        driverId: driverId,
        driverName: driverName,
        driverPhone: driverPhone,
        status: 'in-progress',
        assignedAt: new Date().toISOString()
      })
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error assigning driver:', error);
    throw error;
  }
};

// ✅ Complete order
export const completeOrder = async (orderId) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        status: 'delivered',
        delivered: true,
        deliveredAt: new Date().toISOString()
      })
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};

// ✅ Get order statistics
export const getOrderStats = async () => {
  try {
    const orders = await fetchOrders();
    
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      inProgress: orders.filter(o => o.status === 'in-progress').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      totalRevenue: orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0)
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    throw error;
  }
};
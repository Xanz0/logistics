// import { getToken, getUser, refreshToken } from './auth.js';

// const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

// // Get headers with auth token
// const getHeaders = () => {
//   const token = getToken(); 
//   const headers = {
//     'Content-Type': 'application/json'
//   };
  
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }
  
//   return headers;
// };

// // Enhanced fetch with token refresh
// const fetchWithAuth = async (url, options = {}) => {
//   let response = await fetch(url, {
//     ...options,
//     headers: {
//       ...getHeaders(),
//       ...options.headers
//     }
//   });
  
//   if (response.status === 401) {
//     try {
//       const newToken = await refreshToken(); // ✅ Endi mavjud
//       if (newToken) {
//         response = await fetch(url, {
//           ...options,
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${newToken}`,
//             ...options.headers
//           }
//         });
//       }
//     } catch (refreshError) {
//       console.warn('Token refresh failed:', refreshError);
//     }
//   }
  
//   if (!response.ok) {
//     const errorText = await response.text().catch(() => 'Unknown error');
//     throw new Error(`Request failed: ${response.status} - ${errorText}`);
//   }
  
//   return response;
// };

// // ✅ Fetch all orders
// export const fetchOrders = async () => {
//   try {
//     const res = await fetchWithAuth(BASE_URL);
//     const orders = await res.json();
    
//     const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
//     // Filter user's orders if logged in
//     const user = getUser(); // ✅ Endi mavjud
//     if (user) {
//       const userOrders = orders.filter(order => 
//         order.customerId === user.id || 
//         order.customerEmail === user.email ||
//         order.userId === user.id ||
//         !order.customerId // Agar customerId yo'q bo'lsa, hammasini ko'rsatish
//       );
      
//       return userOrders.map(order => ({
//         ...order,
//         ...(extraData[order.id] || {})
//       }));
//     }
    
//     // If no user, return all orders
//     return orders.map(order => ({
//       ...order,
//       ...(extraData[order.id] || {})
//     }));
    
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw error;
//   }
// };

// // ✅ Fetch orders for specific customer
// export const fetchCustomerOrders = async (customerId) => {
//   try {
//     const allOrders = await fetchOrders();
//     return allOrders.filter(order => order.customerId === customerId);
//   } catch (error) {
//     console.error('Error fetching customer orders:', error);
//     throw error;
//   }
// };

// // ✅ Add new order
// export const addOrder = async (order) => {
//   try {
//     const user = getUser(); // ✅ Endi mavjud
    
//     if (!user) {
//       throw new Error('User not authenticated');
//     }
    
//     const orderWithMetadata = {
//       ...order,
//       customerId: user.id,
//       customerName: user.name,
//       customerEmail: user.email,
//       createdAt: new Date().toISOString(),
//       status: 'pending',
//       driverAssigned: false
//     };
    
//     const res = await fetchWithAuth(BASE_URL, {
//       method: "POST",
//       body: JSON.stringify(orderWithMetadata)
//     });
    
//     return await res.json();
//   } catch (error) {
//     console.error('Error adding order:', error);
//     throw error;
//   }
// };

// // ✅ Edit order
// export const editOrder = async (id, updated) => {
//   try {
//     const user = getUser(); // ✅ Endi mavjud
    
//     const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         ...updated,
//         updatedBy: user?.email || 'unknown',
//         updatedAt: new Date().toISOString()
//       })
//     });
    
//     return await res.json();
//   } catch (error) {
//     console.error('Error editing order:', error);
//     throw error;
//   }
// };

// // ✅ Delete order
// export const deleteOrder = async (id) => {
//   try {
//     const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
//       method: "DELETE"
//     });
    
//     return await res.json();
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     throw error;
//   }
// };

// // ✅ Fetch single order
// export const fetchOrder = async (id) => {
//   try {
//     const res = await fetchWithAuth(`${BASE_URL}/${id}`);
//     const order = await res.json();
    
//     const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
    
//     return {
//       ...order,
//       ...(extraData[order.id] || {})
//     };
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     throw error;
//   }
// };

// // ✅ Assign driver to order
// export const assignDriver = async (orderId, driverId, driverName, driverPhone) => {
//   try {
//     const res = await fetchWithAuth(`${BASE_URL}/${orderId}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         driverAssigned: true,
//         driverId: driverId,
//         driverName: driverName,
//         driverPhone: driverPhone,
//         status: 'in-progress',
//         assignedAt: new Date().toISOString()
//       })
//     });
    
//     return await res.json();
//   } catch (error) {
//     console.error('Error assigning driver:', error);
//     throw error;
//   }
// };

// // ✅ Complete order
// export const completeOrder = async (orderId) => {
//   try {
//     const res = await fetchWithAuth(`${BASE_URL}/${orderId}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         status: 'delivered',
//         delivered: true,
//         deliveredAt: new Date().toISOString()
//       })
//     });
    
//     return await res.json();
//   } catch (error) {
//     console.error('Error completing order:', error);
//     throw error;
//   }
// };

// // ✅ Get order statistics
// export const getOrderStats = async () => {
//   try {
//     const orders = await fetchOrders();
    
//     return {
//       total: orders.length,
//       pending: orders.filter(o => o.status === 'pending').length,
//       inProgress: orders.filter(o => o.status === 'in-progress').length,
//       delivered: orders.filter(o => o.status === 'delivered').length,
//       totalRevenue: orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0)
//     };
//   } catch (error) {
//     console.error('Error getting stats:', error);
//     throw error;
//   }
// };

























































// src/utils/api.js
import { getToken, getUser, refreshToken } from './auth.js';

const BASE_URL = "https://694bbae426e870772068f95a.mockapi.io/orders";

// Get headers with auth token
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
    }
  }
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Request failed: ${response.status} - ${errorText}`);
  }
  
  return response;
};

// ✅ Helper: Get extra data from localStorage
const getExtraData = (orderId) => {
  const extraData = JSON.parse(localStorage.getItem('order_extra_data') || '{}');
  return extraData[orderId] || {};
};

// ✅ Fetch ALL orders (no filtering - for drivers and admins)
export const fetchAllOrders = async () => {
  try {
    const res = await fetchWithAuth(BASE_URL);
    const orders = await res.json();
    
    // Add extra data from localStorage
    return orders.map(order => ({
      ...order,
      ...getExtraData(order.id)
    }));
    
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// ✅ Fetch available orders for drivers (only pending, not assigned)
export const fetchAvailableOrders = async () => {
  try {
    const allOrders = await fetchAllOrders();
    return allOrders.filter(order => 
      order.status === 'pending' && 
      (!order.driverAssigned || order.driverAssigned === false)
    );
  } catch (error) {
    console.error('Error fetching available orders:', error);
    throw error;
  }
};

// ✅ Fetch orders for specific customer
export const fetchCustomerOrders = async (customerId) => {
  try {
    const allOrders = await fetchAllOrders();
    return allOrders.filter(order => 
      order.customerId === customerId || 
      order.customerEmail === getUser()?.email ||
      order.userId === customerId
    );
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    throw error;
  }
};

// ✅ Alias: fetchOrders = fetchCustomerOrders (for backward compatibility)
export const fetchOrders = async () => {
  const user = getUser();
  if (!user) return [];
  
  // If user is driver or admin, return all orders
  if (user.role === 'driver' || user.role === 'admin') {
    return await fetchAllOrders();
  }
  
  // If user is customer, return only their orders
  return await fetchCustomerOrders(user.id);
};

// ✅ Add new order
export const addOrder = async (order) => {
  try {
    const user = getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const orderWithMetadata = {
      ...order,
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone || '',
      createdAt: new Date().toISOString(),
      status: 'pending',
      driverAssigned: false,
      driverId: null,
      driverName: null,
      driverPhone: null
    };
    
    const res = await fetchWithAuth(BASE_URL, {
      method: "POST",
      body: JSON.stringify(orderWithMetadata)
    });
    
    const savedOrder = await res.json();
    
    // Create notification for customer
    if (typeof window !== 'undefined') {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        id: Date.now().toString(),
        orderId: savedOrder.id,
        userId: user.id,
        type: 'order_created',
        message: `Your order "${order.name}" has been created`,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    return savedOrder;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

// ✅ Edit order
export const editOrder = async (id, updated) => {
  try {
    const user = getUser();
    
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
    
    return {
      ...order,
      ...getExtraData(order.id)
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
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
    
    const updatedOrder = await res.json();
    
    // Create notification for customer
    if (typeof window !== 'undefined') {
      const order = await fetchOrder(orderId);
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        id: Date.now().toString(),
        orderId: orderId,
        userId: order.customerId,
        type: 'driver_assigned',
        message: `Driver ${driverName} has accepted your order "${order.name}"`,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    return updatedOrder;
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
        deliveredAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
    
    const updatedOrder = await res.json();
    
    // Create notification for customer
    if (typeof window !== 'undefined') {
      const order = await fetchOrder(orderId);
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        id: Date.now().toString(),
        orderId: orderId,
        userId: order.customerId,
        type: 'order_delivered',
        message: `Your order "${order.name}" has been delivered`,
        read: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    return updatedOrder;
  } catch (error) {
    console.error('Error completing order:', error);
    throw error;
  }
};

// ✅ Get driver's own orders
export const fetchDriverOrders = async (driverId) => {
  try {
    const allOrders = await fetchAllOrders();
    return allOrders.filter(order => 
      order.driverId === driverId || 
      (order.status === 'in-progress' && order.driverId === driverId)
    );
  } catch (error) {
    console.error('Error fetching driver orders:', error);
    throw error;
  }
};

// ✅ Get order statistics
export const getOrderStats = async () => {
  try {
    const orders = await fetchAllOrders();
    
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

// ✅ Get driver statistics
export const getDriverStats = async (driverId) => {
  try {
    const driverOrders = await fetchDriverOrders(driverId);
    
    return {
      total: driverOrders.length,
      pending: driverOrders.filter(o => o.status === 'pending').length,
      inProgress: driverOrders.filter(o => o.status === 'in-progress').length,
      delivered: driverOrders.filter(o => o.status === 'delivered').length,
      totalEarnings: driverOrders.reduce((sum, o) => sum + (Number(o.price) || 0), 0)
    };
  } catch (error) {
    console.error('Error getting driver stats:', error);
    throw error;
  }
};

// ✅ Search orders
export const searchOrders = async (query) => {
  try {
    const allOrders = await fetchAllOrders();
    
    if (!query) return allOrders;
    
    const lowercaseQuery = query.toLowerCase();
    
    return allOrders.filter(order => 
      order.name?.toLowerCase().includes(lowercaseQuery) ||
      order.from?.toLowerCase().includes(lowercaseQuery) ||
      order.to?.toLowerCase().includes(lowercaseQuery) ||
      order.customerName?.toLowerCase().includes(lowercaseQuery) ||
      order.driverName?.toLowerCase().includes(lowercaseQuery) ||
      order.status?.toLowerCase().includes(lowercaseQuery) ||
      order.description?.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error('Error searching orders:', error);
    throw error;
  }
};

// ✅ Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await fetchWithAuth(`${BASE_URL}/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        status: status,
        updatedAt: new Date().toISOString()
      })
    });
    
    return await res.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
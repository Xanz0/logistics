// const KEY = "order_extra_data";

// export const getExtraData = () =>
//   JSON.parse(localStorage.getItem(KEY)) || {};

// export const saveExtraData = (id, data) => {
//   const all = getExtraData();
//   all[id] = { ...all[id], ...data };
//   localStorage.setItem(KEY, JSON.stringify(all));
// };
// storage.js
const KEYS = {
  ORDER_EXTRA_DATA: 'order_extra_data',
  USER_PREFERENCES: 'user_preferences',
  APP_SETTINGS: 'app_settings'
};

// Enhanced localStorage with expiry
export const storage = {
  set: (key, value, expiryHours = null) => {
    const data = {
      value,
      expiry: expiryHours ? Date.now() + (expiryHours * 60 * 60 * 1000) : null
    };
    localStorage.setItem(key, JSON.stringify(data));
  },
  
  get: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    try {
      const data = JSON.parse(itemStr);
      
      // Check if expired
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data.value;
    } catch {
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Order specific functions
export const getExtraData = () => storage.get(KEYS.ORDER_EXTRA_DATA) || {};

export const saveExtraData = (id, data) => {
  const all = getExtraData();
  const updated = {
    ...all,
    [id]: {
      ...all[id],
      ...data,
      lastUpdated: new Date().toISOString()
    }
  };
  storage.set(KEYS.ORDER_EXTRA_DATA, updated);
};

export const clearExtraData = () => {
  storage.remove(KEYS.ORDER_EXTRA_DATA);
};
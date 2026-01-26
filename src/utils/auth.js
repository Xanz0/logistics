// const USER_KEY = 'user';
// const TOKEN_KEY = 'auth_token';
// const TOKEN_EXPIRY_KEY = 'token_expiry';

// // ✅ Fixed login credentials
// const VALID_CREDENTIALS = {
//   customer: {
//     password: 'customer123'
//   },
//   driver: {
//     password: 'driver123'
//   }
// };

// // ✅ Fake JWT token yaratish
// const generateFakeToken = (userData) => {
//   const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
//   const payload = btoa(JSON.stringify({
//     ...userData,
//     userId: Date.now(),
//     iat: Date.now(),
//     exp: Date.now() + 24 * 60 * 60 * 1000 // 24 soat
//   }));
//   const signature = btoa('fake_signature_' + Date.now());
//   return `${header}.${payload}.${signature}`;
// };

// // ✅ Login funksiyasi (name bilan)
// export const login = async ({ role, name, password }) => {
//   // Simulate API call delay
//   await new Promise(resolve => setTimeout(resolve, 300));
  
//   // Check if role is valid
//   if (!VALID_CREDENTIALS[role]) {
//     throw new Error(`Invalid role: ${role}`);
//   }
  
//   // Check name
//   if (!name || name.trim().length < 2) {
//     throw new Error('Please enter your name');
//   }
  
//   // Get correct credentials for the role
//   const correctCreds = VALID_CREDENTIALS[role];
  
//   // Check password
//   if (password !== correctCreds.password) {
//     throw new Error('Invalid password');
//   }
  
//   const user = {
//     email: `${role}@example.com`,
//     name: name.trim(),
//     role: role
//   };
  
//   const token = generateFakeToken(user);
  
//   // Store in localStorage
//   localStorage.setItem(USER_KEY, JSON.stringify(user));
//   localStorage.setItem(TOKEN_KEY, token);
//   localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
//   return { user, token };
// };

// // ✅ Simple login for RoleSelect
// export const simpleLogin = (role, name = "User") => {
//   const user = {
//     email: `${role}@example.com`,
//     name: name,
//     role: role
//   };
  
//   const token = generateFakeToken(user);
  
//   localStorage.setItem(USER_KEY, JSON.stringify(user));
//   localStorage.setItem(TOKEN_KEY, token);
//   localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
//   return { user, token };
// };

// // ✅ Qolgan funksiyalar o'zgarmaydi
// export const logout = () => {
//   localStorage.removeItem(USER_KEY);
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(TOKEN_EXPIRY_KEY);
//   localStorage.removeItem('tempUser');
// };

// export const getUser = () => {
//   const userStr = localStorage.getItem(USER_KEY);
//   return userStr ? JSON.parse(userStr) : null;
// };

// export const getToken = () => localStorage.getItem(TOKEN_KEY);

// export const isAuthenticated = () => {
//   const user = getUser();
//   const token = getToken();
//   const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
//   if (!user || !token) return false;
  
//   if (expiry && Date.now() > parseInt(expiry)) {
//     logout();
//     return false;
//   }
  
//   return true;
// };

// export const getUserRole = () => {
//   const user = getUser();
//   return user?.role || null;
// };

































const USER_KEY = 'user';
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';
const USERS_DB_KEY = 'users_database';

// ✅ Admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@logistics.com',
  password: 'admin2025!Secure',
  role: 'admin',
  name: 'Admin'
};

// ✅ Default driver credentials (for demo)
const DEFAULT_DRIVER = {
  email: 'driver@logistics.com',
  password: 'driver123',
  role: 'driver',
  name: 'Default Driver'
};

// ✅ Initialize users database
const initUsersDB = () => {
  const existing = localStorage.getItem(USERS_DB_KEY);
  if (!existing) {
    const initialUsers = {
      [ADMIN_CREDENTIALS.email]: {
        ...ADMIN_CREDENTIALS,
        id: 'admin_001',
        createdAt: new Date().toISOString()
      },
      [DEFAULT_DRIVER.email]: {
        ...DEFAULT_DRIVER,
        id: 'driver_001',
        createdAt: new Date().toISOString()
      }
    };
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(initialUsers));
  }
};

// ✅ Get all users
export const getAllUsers = () => {
  initUsersDB();
  const usersStr = localStorage.getItem(USERS_DB_KEY);
  return usersStr ? JSON.parse(usersStr) : {};
};

// ✅ Find user by email
const findUserByEmail = (email) => {
  const users = getAllUsers();
  return users[email] || null;
};

// ✅ Fake JWT token generation
const generateFakeToken = (userData) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    ...userData,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000
  }));
  const signature = btoa('fake_signature_' + Date.now());
  return `${header}.${payload}.${signature}`;
};

// ✅ Register new user
export const register = async ({ name, email, password, role = 'customer' }) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  initUsersDB();
  
  // Validation
  if (!name || name.trim().length < 2) {
    throw new Error('Name must be at least 2 characters');
  }
  
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address');
  }
  
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password, // In real app, this would be hashed
    role: role,
    createdAt: new Date().toISOString(),
    rating: role === 'driver' ? 5 : null,
    totalOrders: 0
  };
  
  // Save to database
  const users = getAllUsers();
  users[newUser.email] = newUser;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  
  return { user: { ...newUser, password: undefined }, token: generateFakeToken(newUser) };
};

// ✅ Login function
export const login = async ({ email, password }) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  initUsersDB();
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const user = findUserByEmail(email.toLowerCase().trim());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  const token = generateFakeToken(user);
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
  return { user: userWithoutPassword, token };
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

// ✅ Get current user
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// ✅ Get token
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// ✅ Check authentication
export const isAuthenticated = () => {
  const user = getUser();
  const token = getToken();
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  if (!user || !token) return false;
  
  if (expiry && Date.now() > parseInt(expiry)) {
    logout();
    return false;
  }
  
  return true;
};

// ✅ Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// ✅ Refresh token
export const refreshToken = async () => {
  const user = getUser();
  if (!user) return null;
  
  const newToken = generateFakeToken(user);
  localStorage.setItem(TOKEN_KEY, newToken);
  localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
  return newToken;
};

// ✅ Get all drivers (for admin/customer to select)
export const getAllDrivers = () => {
  const users = getAllUsers();
  return Object.values(users).filter(u => u.role === 'driver');
};

// ✅ Update user rating
export const updateDriverRating = (driverId, newRating) => {
  const users = getAllUsers();
  const driver = Object.values(users).find(u => u.id === driverId);
  
  if (driver && driver.role === 'driver') {
    driver.rating = newRating;
    users[driver.email] = driver;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  }
};

// Initialize on load
initUsersDB();
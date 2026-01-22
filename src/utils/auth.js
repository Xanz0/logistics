const USER_KEY = 'user';
const TOKEN_KEY = 'auth_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

// ✅ Fixed login credentials
const VALID_CREDENTIALS = {
  customer: {
    password: 'customer123'
  },
  driver: {
    password: 'driver123'
  }
};

// ✅ Fake JWT token yaratish
const generateFakeToken = (userData) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    ...userData,
    userId: Date.now(),
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 soat
  }));
  const signature = btoa('fake_signature_' + Date.now());
  return `${header}.${payload}.${signature}`;
};

// ✅ Login funksiyasi (name bilan)
export const login = async ({ role, name, password }) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Check if role is valid
  if (!VALID_CREDENTIALS[role]) {
    throw new Error(`Invalid role: ${role}`);
  }
  
  // Check name
  if (!name || name.trim().length < 2) {
    throw new Error('Please enter your name');
  }
  
  // Get correct credentials for the role
  const correctCreds = VALID_CREDENTIALS[role];
  
  // Check password
  if (password !== correctCreds.password) {
    throw new Error('Invalid password');
  }
  
  const user = {
    email: `${role}@example.com`,
    name: name.trim(),
    role: role
  };
  
  const token = generateFakeToken(user);
  
  // Store in localStorage
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
  return { user, token };
};

// ✅ Simple login for RoleSelect
export const simpleLogin = (role, name = "User") => {
  const user = {
    email: `${role}@example.com`,
    name: name,
    role: role
  };
  
  const token = generateFakeToken(user);
  
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, (Date.now() + 24 * 60 * 60 * 1000).toString());
  
  return { user, token };
};

// ✅ Qolgan funksiyalar o'zgarmaydi
export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem('tempUser');
};

export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

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

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};
// export const login = (role) => {
//   localStorage.setItem("userRole", role);
// };

// export const logout = () => {
//   localStorage.removeItem("userRole");
// };

// export const getUserRole = () => localStorage.getItem("userRole");

// export const isAuthenticated = () => !!getUserRole();


// localStorage orqali fake auth
export const login = ({ email, password, role }) => {
  // Oddiy tekshiruv: email va password bo‘lsa true
  if (email && password && role) {
    localStorage.setItem('user', JSON.stringify({ email, role }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!getUser();
export const getUserRole = () => getUser()?.role || null;

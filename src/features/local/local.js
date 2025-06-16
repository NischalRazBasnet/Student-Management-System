export const setToLocal = (admin) => {
  try {
    localStorage.setItem('admin', JSON.stringify(admin));
    localStorage.setItem('isAuthenticated', 'true');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocal = () => {
  try {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeFromLocal = () => {
  try {
    localStorage.removeItem('admin');
    localStorage.removeItem('isAuthenticated');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const setToLocal = (admin) => {
  localStorage.setItem('admin', JSON.stringify(admin));
};
export const getFromLocal = () => {
  const admin = localStorage.getItem('admin');
  return admin === null ? null : JSON.parse(admin);
};
export const removeFromLocal = () => {
  localStorage.clear();
};

// src/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Eğer kullanıcı doğrulanmamışsa, onu '/login' sayfasına yönlendirir.
    return <Navigate to="/login" />;
  }

  // Kullanıcı doğrulanmışsa, istenilen çocuk bileşenleri (children) render eder.
  return children;
};

export default PrivateRoute;

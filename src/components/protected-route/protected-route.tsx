import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  // если пользователь на странице авторизации и данных в хранилище нет
  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // если пользователь на странице авторизации и данные есть в хранилище
  if (onlyUnAuth && isAuthChecked) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};

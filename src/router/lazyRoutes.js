import { lazy } from 'react';

export const LoginScreen = lazy(() => import('@/pages/auth/LoginPage'))
export const RegisterScreen = lazy(() => import('@/pages/auth/RegisterPage'))
export const RecoverScreen = lazy(() => import('@/pages/auth/RecoverPage'))

export const HomeScreen = lazy(() => import('@/pages/home/HomePage'))
export const ProductScreen = lazy(() => import('@/pages/product/ProductPage'))
export const LocationScreen = lazy(() => import('@/pages/location/LocationPage'))
export const ReservationScreen = lazy(() => import('@/pages/reservation/ReservationPage'))
export const SearchReservationScreen = lazy(() => import('@/pages/search/SearchReservationPage'))

export const DashboardScreen = lazy(() => import('@/pages/dashboard/DashboardPage'))
export const MapScreen = lazy(() => import('@/pages/dashboard/MapPage'))
export const CalendarScreen = lazy(() => import('@/pages/dashboard/CalendarPage'))
export const UserDetailScreen = lazy(() => import('@/pages/dashboard/UserDetailPage'))
export const RestaurantScreen = lazy(() => import('@/pages/dashboard/RestaurantPage'))
import { lazy } from 'react';

export const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
export const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
export const RecoverPage = lazy(() => import('@/pages/auth/RecoverPage'))

export const HomePage = lazy(() => import('@/pages/home/HomePage'))
export const ProductPage = lazy(() => import('@/pages/product/ProductPage'))
export const LocationPage = lazy(() => import('@/pages/location/LocationPage'))
export const ReservationPage = lazy(() => import('@/pages/reservation/ReservationPage'))
export const SearchReservationPage = lazy(() => import('@/pages/search/SearchReservationPage'))

export const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
export const MapPage = lazy(() => import('@/pages/dashboard/MapPage'))
export const CalendarPage = lazy(() => import('@/pages/dashboard/CalendarPage'))
export const UserDetailPage = lazy(() => import('@/pages/dashboard/UserDetailPage'))
export const RestaurantPage = lazy(() => import('@/pages/dashboard/RestaurantPage'))
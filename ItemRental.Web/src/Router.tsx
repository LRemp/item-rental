import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import DashboardPage from './pages/Dashboard';
import InventoryPage from './pages/Dashboard/Inventory.page';
import DashboardHome from './pages/Dashboard/Home.page';
import DashboardSettings from './pages/Dashboard/Settings.page';
import ListingPage from './pages/Listing.page';
import MainLayout from './layouts/MainLayout';
import ListingsPage from './pages/Dashboard/Listings.page';
import ItemPage from './pages/Dashboard/Item.page';
import useApiResult from './hooks/useApiResult';
import api from './api';
import OrdersPage from './pages/Orders.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: ':category?',
        element: <HomePage />,
      },
      {
        path: 'listing/:id',
        element: <ListingPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: 'home',
        element: <DashboardHome />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
      },
      {
        path: 'listings',
        element: <ListingsPage />,
      },
      {
        path: 'item/:id',
        element: <ItemPage />,
      },
      {
        path: 'settings',
        element: <DashboardSettings />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

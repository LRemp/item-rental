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
import OrdersPage from './pages/Orders.page';
import OrderPage from './pages/Order.page';
import DashboardOrders from './pages/Dashboard/Orders.page';
import DashboardOrder from './pages/Dashboard/Order.page';
import UserPage from './pages/User.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    children: [
      {
        path: '/:category?',
        element: <HomePage />,
      },
      {
        path: '/listing/:id',
        element: <ListingPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderPage />,
      },
      {
        path: '/user/:id',
        element: <UserPage />,
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
        path: 'inventory/:id',
        element: <ItemPage />,
      },
      {
        path: 'orders',
        element: <DashboardOrders />,
      },
      {
        path: 'orders/:id',
        element: <DashboardOrder />,
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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import InventoryPage from './pages/Dashboard/Inventory';
import DashboardHome from './pages/Dashboard/Home.page';
import DashboardSettings from './pages/Dashboard/Settings.page';
import ListingPage from './pages/Listing';
import ListingsPage from './pages/Dashboard/Listings';
import ItemPage from './pages/Dashboard/Item';
import OrdersPage from './pages/Orders';
import OrderPage from './pages/Order.page';
import DashboardOrders from './pages/Dashboard/Orders';
import DashboardOrder from './pages/Dashboard/Order';
import UserPage from './pages/User.page';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/Admin';

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
      {
        path: '/profile',
        element: <ProfilePage />,
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
  {
    path: '/admin',
    element: <AdminPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'listing/:id',
        element: <ListingPage />,
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
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'inventory',
        element: <InventoryPage />,
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

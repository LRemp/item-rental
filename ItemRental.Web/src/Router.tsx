import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import DashboardPage from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

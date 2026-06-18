import { useState } from 'react';
import { FaBars, FaHeartbeat, FaTimes } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const PublicLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-primary text-white'
        : 'text-slate-700 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-300 bg-background/95 backdrop-blur dark:border-slate-800">
        <nav className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <FaHeartbeat className="text-primary" />
            Book A Doctor
          </Link>
          <button
            className="rounded-md p-2 text-slate-200 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/doctors">
              Doctors
            </NavLink>
            {isAuthenticated && (
              <NavLink className={linkClass} to="/my-appointments">
                My Appointments
              </NavLink>
            )}
            {isAdmin && (
              <NavLink className={linkClass} to="/admin">
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <NavLink className={linkClass} to="/login">
                  Login
                </NavLink>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </nav>
        {menuOpen && (
          <div className="container-page space-y-2 pb-4 md:hidden">
            <NavLink className={linkClass} to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink className={linkClass} to="/doctors" onClick={() => setMenuOpen(false)}>
              Doctors
            </NavLink>
            {isAuthenticated && (
              <NavLink className={linkClass} to="/my-appointments" onClick={() => setMenuOpen(false)}>
                My Appointments
              </NavLink>
            )}
            {isAdmin && (
              <NavLink className={linkClass} to="/admin" onClick={() => setMenuOpen(false)}>
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <Button variant="secondary" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="grid gap-2 pt-2">
                <NavLink className={linkClass} to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
            <ThemeToggle className="mt-2" />
          </div>
        )}
      </header>
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-slate-300 py-8 dark:border-slate-800">
        <div className="container-page flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Book A Doctor</p>
          <p>Secure healthcare appointment booking platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

import { FaCalendarCheck, FaSignOutAlt, FaStethoscope, FaTachometerAlt } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-primary text-white'
        : 'text-slate-700 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-300 bg-secondary p-4 dark:border-slate-800 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex items-center justify-between gap-3">
            <span className="text-xl font-bold">Admin Panel</span>
            <ThemeToggle />
          </div>
          <nav className="grid gap-2">
            <NavLink end to="/admin" className={linkClass}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
            <NavLink to="/admin/doctors" className={linkClass}>
              <FaStethoscope /> Doctors
            </NavLink>
            <NavLink to="/admin/appointments" className={linkClass}>
              <FaCalendarCheck /> Appointments
            </NavLink>
          </nav>
          <Button variant="secondary" className="mt-6 w-full" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </Button>
        </aside>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

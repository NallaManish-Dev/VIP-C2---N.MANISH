import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUsers, FaUserMd } from 'react-icons/fa';
import DashboardCard from '../../components/DashboardCard.jsx';
import Loader from '../../components/Loader.jsx';
import { getAdminDashboard } from '../../services/dashboardService.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((response) => setStats(response.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400">Platform statistics and operational overview.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardCard icon={<FaUserMd />} label="Total Doctors" value={stats?.totalDoctors || 0} />
        <DashboardCard icon={<FaUsers />} label="Total Patients" value={stats?.totalPatients || 0} />
        <DashboardCard icon={<FaCalendarAlt />} label="Total Appointments" value={stats?.totalAppointments || 0} />
      </div>


    </section>
  );
};

export default AdminDashboard;

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../components/Button.jsx';
import Loader from '../../components/Loader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { getErrorMessage } from '../../services/api.js';
import { getAllAppointments, updateAppointmentStatus } from '../../services/appointmentService.js';

const statuses = ['Approved', 'Rejected', 'Completed', 'Cancelled'];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    setLoading(true);
    getAllAppointments()
      .then((response) => setAppointments(response.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      const response = await updateAppointmentStatus(id, status);
      toast.success(response.data.message);
      loadAppointments();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>
        <p className="text-slate-400">Review bookings and update appointment status.</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-t border-slate-300 dark:border-slate-700">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{appointment.patientId?.name}</p>
                    <p className="text-xs text-slate-400">{appointment.patientId?.email}</p>
                  </td>
                  <td className="px-4 py-3">{appointment.doctorId?.name}</td>
                  <td className="px-4 py-3">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{appointment.appointmentTime}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={appointment.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {statuses.map((status) => (
                        <Button
                          key={status}
                          variant={status === 'Rejected' || status === 'Cancelled' ? 'danger' : status === 'Approved' ? 'success' : 'secondary'}
                          className="px-3 py-1"
                          onClick={() => handleStatus(appointment._id, status)}
                          disabled={appointment.status === status}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!appointments.length && <div className="p-8 text-center text-slate-300">No appointments found.</div>}
        </div>
      )}
    </section>
  );
};

export default ManageAppointments;

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AppointmentCard from '../components/AppointmentCard.jsx';
import Loader from '../components/Loader.jsx';
import { getErrorMessage } from '../services/api.js';
import { cancelAppointment, getMyAppointments } from '../services/appointmentService.js';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    setLoading(true);
    getMyAppointments()
      .then((response) => setAppointments(response.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const response = await cancelAppointment(id);
      toast.success(response.data.message);
      loadAppointments();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <p className="text-slate-400">Track upcoming and previous appointments.</p>
      </div>
      {loading ? (
        <Loader />
      ) : appointments.length ? (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} onCancel={handleCancel} />
          ))}
        </div>
      ) : (
        <div className="panel p-8 text-center text-slate-300">No appointments found.</div>
      )}
    </section>
  );
};

export default MyAppointments;

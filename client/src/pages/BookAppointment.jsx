import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Loader from '../components/Loader.jsx';
import { getErrorMessage } from '../services/api.js';
import { getDoctor } from '../services/doctorService.js';
import { bookAppointment } from '../services/appointmentService.js';
import { getImageUrl } from '../utils/images.js';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ appointmentDate: '', appointmentTime: timeSlots[0] });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDoctor(doctorId)
      .then((response) => setDoctor(response.data.data))
      .finally(() => setLoading(false));
  }, [doctorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await bookAppointment({ doctorId, ...form });
      toast.success(response.data.message);
      navigate('/my-appointments');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section className="container-page py-12">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <article className="panel overflow-hidden">
          <img src={getImageUrl(doctor?.image)} alt={doctor?.name} className="h-72 w-full object-cover" />
          <div className="p-5">
            <h1 className="text-2xl font-bold">{doctor?.name}</h1>
            <p className="text-primary">{doctor?.specialization}</p>
            <p className="mt-2 text-slate-700 dark:text-slate-300">Fee: Rs. {doctor?.fees}</p>
          </div>
        </article>
        <form className="panel space-y-5 p-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-bold">Book Appointment</h2>
            <p className="text-slate-600 dark:text-slate-400">Choose your preferred date and time.</p>
          </div>
          <Input
            id="appointmentDate"
            label="Date"
            type="date"
            value={form.appointmentDate}
            onChange={(event) => setForm((current) => ({ ...current, appointmentDate: event.target.value }))}
            required
          />
          <label className="block" htmlFor="appointmentTime">
            <span className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Time Slot</span>
            <select
              id="appointmentTime"
              value={form.appointmentTime}
              onChange={(event) => setForm((current) => ({ ...current, appointmentTime: event.target.value }))}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" disabled={submitting || !doctor?.availability}>
            {submitting ? 'Booking...' : 'Book Appointment'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookAppointment;

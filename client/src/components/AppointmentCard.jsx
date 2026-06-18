import { FaCalendarTimes } from 'react-icons/fa';
import { getImageUrl } from '../utils/images.js';
import Button from './Button.jsx';
import StatusBadge from './StatusBadge.jsx';

const AppointmentCard = ({ appointment, onCancel }) => {
  const doctor = appointment.doctorId;

  return (
    <article className="panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img src={getImageUrl(doctor?.image)} alt={doctor?.name || 'Doctor'} className="h-16 w-16 rounded-md object-cover" />
        <div>
          <h3 className="font-semibold">{doctor?.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{doctor?.specialization}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {new Date(appointment.appointmentDate).toLocaleDateString()} at {appointment.appointmentTime}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={appointment.status} />

        {appointment.status === 'Pending' && onCancel && (
          <Button variant="danger" onClick={() => onCancel(appointment._id)}>
            Cancel <FaCalendarTimes />
          </Button>
        )}
      </div>
    </article>
  );
};

export default AppointmentCard;

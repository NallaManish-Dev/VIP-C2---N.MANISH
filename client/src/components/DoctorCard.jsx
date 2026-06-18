import { FaArrowRight, FaCalendarPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/images.js';
import Button from './Button.jsx';

const DoctorCard = ({ doctor }) => (
  <article className="panel overflow-hidden transition hover:-translate-y-1 hover:border-primary/60">
    <img src={getImageUrl(doctor.image)} alt={doctor.name} className="h-56 w-full object-cover" />
    <div className="space-y-3 p-5">
      <div>
        <h3 className="text-lg font-bold">{doctor.name}</h3>
        <p className="text-sm text-primary">{doctor.specialization}</p>
      </div>
      <div className="text-sm text-slate-700 dark:text-slate-300">
        <p>{doctor.experience} years experience</p>
        <p>Consultation fee: Rs. {doctor.fees}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link to={`/doctors/${doctor._id}`}>
          <Button variant="secondary">
            Details <FaArrowRight />
          </Button>
        </Link>
        <Link to={`/book/${doctor._id}`}>
          <Button>
            Book <FaCalendarPlus />
          </Button>
        </Link>
      </div>
    </div>
  </article>
);

export default DoctorCard;

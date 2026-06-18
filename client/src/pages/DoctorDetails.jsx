import { useEffect, useState } from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader.jsx';
import { getDoctor } from '../services/doctorService.js';
import { getImageUrl } from '../utils/images.js';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctor(id)
      .then((response) => setDoctor(response.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!doctor) return <div className="container-page py-12">Doctor not found.</div>;

  return (
    <section className="container-page py-12">
      <div className="panel grid overflow-hidden lg:grid-cols-[420px_1fr]">
        <img src={getImageUrl(doctor.image)} alt={doctor.name} className="h-full min-h-96 w-full object-cover" />
        <div className="space-y-5 p-6 lg:p-8">
          <div>
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="mt-1 text-primary">{doctor.specialization}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">Qualification</p>
              <p className="font-semibold">{doctor.qualification}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Experience</p>
              <p className="font-semibold">{doctor.experience} years</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Fee</p>
              <p className="font-semibold">Rs. {doctor.fees}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Availability</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  doctor.availability
                    ? 'bg-accent/15 text-accent ring-accent/30'
                    : 'bg-slate-500/15 text-slate-300 ring-slate-500/30'
                }`}
              >
                {doctor.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-bold">About Doctor</h2>
            <p className="mt-2 text-slate-300">{doctor.about || 'Profile details will be updated soon.'}</p>
          </div>
          {doctor.hospital && <p className="text-slate-300">Hospital: {doctor.hospital}</p>}
          <Link to={`/book/${doctor._id}`}>
            <Button>
              Book Appointment <FaCalendarPlus />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;

import { useEffect, useState } from 'react';
import { FaCalendarCheck, FaLock, FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import DoctorCard from '../components/DoctorCard.jsx';
import Loader from '../components/Loader.jsx';
import { getDoctors } from '../services/doctorService.js';

const features = [
  { icon: <FaUserMd />, title: 'Verified Doctors', text: 'Browse qualified specialists with clear profile details.' },
  { icon: <FaCalendarCheck />, title: 'Easy Appointment Booking', text: 'Choose a doctor, date, and time slot in a few steps.' },
  { icon: <FaLock />, title: 'Secure Platform', text: 'Protected patient workflows with JWT authentication.' }
];

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then((response) => setDoctors(response.data.data.slice(0, 3)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-2">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">Modern Healthcare Booking</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Find and Book Trusted Doctors Online
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Search specialists, review profiles, and manage appointments from one secure patient dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/doctors">
              <Button>Book Appointment</Button>
            </Link>
            <Link to="/doctors">
              <Button variant="secondary">Explore Doctors</Button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-slate-700">
          <img
            className="h-[420px] w-full object-cover"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80"
            alt="Doctor consulting with a patient"
          />
        </div>
      </section>

      <section className="bg-slate-950/40 py-16">
        <div className="container-page grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="panel p-6">
              <div className="mb-4 inline-flex rounded-md bg-primary/15 p-3 text-2xl text-primary">{feature.icon}</div>
              <h2 className="text-xl font-bold">{feature.title}</h2>
              <p className="mt-2 text-slate-400">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Top Doctors</h2>
            <p className="text-slate-400">Available specialists ready for appointments.</p>
          </div>
          <Link to="/doctors">
            <Button variant="secondary">View All</Button>
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : doctors.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="panel p-8 text-center text-slate-300">No doctors added yet.</div>
        )}
      </section>
    </>
  );
};

export default Home;

import { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard.jsx';
import Input from '../components/Input.jsx';
import Loader from '../components/Loader.jsx';
import { searchDoctors } from '../services/doctorService.js';

const specializations = ['', 'Cardiologist', 'Dentist', 'Dermatologist', 'Neurologist', 'Orthopedic'];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ name: '', specialization: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      searchDoctors(filters)
        .then((response) => setDoctors(response.data.data))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters]);

  return (
    <section className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Available Doctors</h1>
        <p className="text-slate-600 dark:text-slate-400">Search by doctor name or specialization.</p>
      </div>
      <div className="panel mb-8 grid gap-4 p-4 md:grid-cols-2">
        <Input
          id="doctor-search"
          label="Doctor Name"
          placeholder="Search doctors"
          value={filters.name}
          onChange={(event) => setFilters((current) => ({ ...current, name: event.target.value }))}
        />
        <label className="block" htmlFor="specialization-filter">
          <span className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Specialization</span>
          <select
            id="specialization-filter"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            value={filters.specialization}
            onChange={(event) => setFilters((current) => ({ ...current, specialization: event.target.value }))}
          >
            {specializations.map((item) => (
              <option key={item || 'all'} value={item}>
                {item || 'All Specializations'}
              </option>
            ))}
          </select>
        </label>
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
        <div className="panel p-8 text-center text-slate-300">No doctors match your search.</div>
      )}
    </section>
  );
};

export default Doctors;

import { useEffect, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import Loader from '../../components/Loader.jsx';
import Modal from '../../components/Modal.jsx';
import { getErrorMessage } from '../../services/api.js';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '../../services/doctorService.js';

const initialForm = {
  name: '',
  specialization: '',
  qualification: '',
  experience: '',
  fees: '',
  hospital: '',
  about: '',
  availability: true,
  image: null
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form, setForm] = useState(initialForm);

  const loadDoctors = () => {
    setLoading(true);
    getDoctors()
      .then((response) => setDoctors(response.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const openCreate = () => {
    setEditingDoctor(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (doctor) => {
    setEditingDoctor(doctor);
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      fees: doctor.fees,
      hospital: doctor.hospital || '',
      about: doctor.about || '',
      availability: doctor.availability,
      image: null
    });
    setModalOpen(true);
  };

  const buildFormData = () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = editingDoctor
        ? await updateDoctor(editingDoctor._id, buildFormData())
        : await createDoctor(buildFormData());
      toast.success(response.data.message);
      setModalOpen(false);
      loadDoctors();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDoctor(id);
      toast.success(response.data.message);
      loadDoctors();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Doctors</h1>
          <p className="text-slate-400">Add, edit, and remove doctor profiles.</p>
        </div>
        <Button onClick={openCreate}>
          <FaPlus /> Add Doctor
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="panel overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Doctor Name</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-t border-slate-300 dark:border-slate-700">
                  <td className="px-4 py-3 font-semibold">{doctor.name}</td>
                  <td className="px-4 py-3">{doctor.specialization}</td>
                  <td className="px-4 py-3">{doctor.experience} years</td>
                  <td className="px-4 py-3">Rs. {doctor.fees}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" className="px-3" onClick={() => openEdit(doctor)} aria-label="Edit doctor">
                        <FaEdit />
                      </Button>
                      <Button variant="danger" className="px-3" onClick={() => handleDelete(doctor._id)} aria-label="Delete doctor">
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!doctors.length && <div className="p-8 text-center text-slate-300">No doctors found.</div>}
        </div>
      )}

      <Modal open={modalOpen} title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'} onClose={() => setModalOpen(false)}>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input id="doctor-name" label="Doctor Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input
            id="specialization"
            label="Specialization"
            value={form.specialization}
            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
            required
          />
          <Input
            id="qualification"
            label="Qualification"
            value={form.qualification}
            onChange={(e) => setForm({ ...form, qualification: e.target.value })}
            required
          />
          <Input
            id="experience"
            label="Experience"
            type="number"
            min="0"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            required
          />
          <Input id="fees" label="Fee" type="number" min="0" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} required />
          <Input id="hospital" label="Hospital" value={form.hospital} onChange={(e) => setForm({ ...form, hospital: e.target.value })} />
          <label className="md:col-span-2" htmlFor="about">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">About</span>
            <textarea
              id="about"
              rows="3"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.checked })}
            />
            Available
          </label>
          <Input id="image" label="Profile Image" type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setForm({ ...form, image: e.target.files[0] || null })} />
          <div className="flex justify-end gap-2 md:col-span-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default ManageDoctors;

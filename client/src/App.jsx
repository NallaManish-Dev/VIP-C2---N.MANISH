import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageAppointments from './pages/admin/ManageAppointments.jsx';
import ManageDoctors from './pages/admin/ManageDoctors.jsx';
import BookAppointment from './pages/BookAppointment.jsx';

import DoctorDetails from './pages/DoctorDetails.jsx';
import Doctors from './pages/Doctors.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import NotFound from './pages/NotFound.jsx';
import Register from './pages/Register.jsx';
import AdminRoute from './routes/AdminRoute.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/book/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />


        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="doctors" element={<ManageDoctors />} />
        <Route path="appointments" element={<ManageAppointments />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

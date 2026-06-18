import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const user = await login(form);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(location.state?.from?.pathname || '/doctors');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <form className="panel w-full max-w-md space-y-5 p-6" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-slate-600 dark:text-slate-400">Access your appointments and dashboard.</p>
        </div>
        <Input
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          required
        />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </Button>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          New here?{' '}
          <Link className="font-semibold text-primary" to="/register">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;

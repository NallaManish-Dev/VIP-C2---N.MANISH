import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await register(form);
      navigate('/doctors');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <form className="panel w-full max-w-md space-y-5 p-6" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-slate-600 dark:text-slate-400">Book appointments with trusted doctors.</p>
        </div>
        <Input
          id="name"
          label="Full Name"
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          required
          minLength={3}
        />
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
          minLength={6}
        />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Register'}
        </Button>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already registered?{' '}
          <Link className="font-semibold text-primary" to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;

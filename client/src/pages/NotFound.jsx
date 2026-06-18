import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

const NotFound = () => (
  <section className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12 text-center">
    <h1 className="text-5xl font-bold">404</h1>
    <p className="mt-3 text-slate-300">Page not found.</p>
    <Link className="mt-6" to="/">
      <Button>Back Home</Button>
    </Link>
  </section>
);

export default NotFound;

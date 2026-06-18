const Loader = ({ label = 'Loading' }) => (
  <div className="flex min-h-48 items-center justify-center">
    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-500 border-t-primary" />
      <span>{label}</span>
    </div>
  </div>
);

export default Loader;

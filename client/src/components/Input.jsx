const Input = ({ label, id, className = '', ...props }) => (
  <label className="block" htmlFor={id}>
    <span className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
    <input
      id={id}
      className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white ${className}`}
      {...props}
    />
  </label>
);

export default Input;

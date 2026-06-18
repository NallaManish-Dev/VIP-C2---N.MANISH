const styles = {
  primary: 'bg-primary text-white hover:bg-blue-600 focus:ring-primary',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-100 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
  danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger',
  success: 'bg-accent text-slate-950 hover:bg-green-400 focus:ring-accent'
};

const Button = ({ children, variant = 'primary', className = '', type = 'button', ...props }) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

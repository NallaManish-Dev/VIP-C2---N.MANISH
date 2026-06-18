const statusStyles = {
  Pending: 'bg-warning/15 text-warning ring-warning/30',
  Approved: 'bg-accent/15 text-accent ring-accent/30',
  Rejected: 'bg-danger/15 text-danger ring-danger/30',
  Completed: 'bg-primary/15 text-blue-300 ring-primary/30',
  Cancelled: 'bg-slate-500/15 text-slate-300 ring-slate-500/30'
};

const StatusBadge = ({ status }) => (
  <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[status] || statusStyles.Pending}`}>
    {status}
  </span>
);

export default StatusBadge;

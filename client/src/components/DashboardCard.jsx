const DashboardCard = ({ icon, label, value }) => (
  <div className="panel p-6 transition hover:-translate-y-1 hover:border-primary/60">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </div>
      <div className="rounded-md bg-primary/15 p-3 text-2xl text-primary">{icon}</div>
    </div>
  </div>
);

export default DashboardCard;

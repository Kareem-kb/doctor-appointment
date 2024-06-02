import PatNavBar from "../ui/patient/PatNavBar";

export default function DashboardPLayout({ children }) {
  return (
    <div className="bg-sky-100 h-full">
      <PatNavBar />
      {children}
    </div>
  );
}

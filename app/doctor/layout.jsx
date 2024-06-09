import DocNavBar from "../ui/doctor/docNavBar";

export default function doctorLayout({ children }) {
  return (
    <div className="min-h-screen bg-sky-100">
      {" "}
      <DocNavBar />
      {children}
    </div>
  );
}

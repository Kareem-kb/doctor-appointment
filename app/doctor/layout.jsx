
import DocNavBar from "../ui/doctor/docNavBar";


export default function doctorLayout({ children }) {
  return (
    <div className="bg-sky-100 h-full">
      {" "}
      <DocNavBar />
      {children}
    </div>
  );
}

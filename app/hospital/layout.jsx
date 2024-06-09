import HosPnavBar from "@/app/ui/hospital/hosPnavBar";

export default function hospitalLayout({ children }) {
  return (
    <div className="bg-sky-100 min-h-screen">
      {" "}
      <HosPnavBar />
      {children}
    </div>
  );
}

import DetailCard from "@/app/ui/hospital/cards/DetailCardHos";
import DoctList from "@/app/ui/hospital/cards/DoctList";

export default async function HDashboard() {
  return (
    <div className="max-w-screen-sm	m-auto">
      <div className="mt-5 flex items-center justify-center">
        <DetailCard />
      </div>
      <DoctList />
    </div>
  );
}

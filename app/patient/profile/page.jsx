"use client";

import DetailInfo from "@/app/ui/patient/personalPage/detailInfo";
import { useSession } from "next-auth/react";

const pPersonal = () => {
  const { data: session } = useSession();
  return (
    <div>

      <DetailInfo />
    </div>
  );
};

export default pPersonal;

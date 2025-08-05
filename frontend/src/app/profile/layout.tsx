import React from "react";
import BottomNav from "@/components/common/bottom-nav";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore?.get("token")?.value;
  console.log("Layout => token", token);
  if (!token) {
    redirect("/login");
  }
  return (
    <div className="flex-grow flex flex-col pb-14">
      <div className="flex-grow scrollBarStyle flex flex-col overflow-auto p-3">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
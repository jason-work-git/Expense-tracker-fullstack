// import { redirect } from "next/navigation";
// import { BASE_URL } from "../../../config-global";
// import { cookies } from "next/headers";
import Transaction from "@/components/pages/profile/transaction";

// interface ProtectedResponse {
//   message: string;
//   userId: string;
// }

export default async function ProfilePage() {


  // const cookieStore = await cookies();
  // const token = cookieStore?.get("token")?.value;
  // console.log("ProfilePage => token", token);
  // if (!token) {
  //   redirect("/login");
  // }
  // try {
  //   const res = await fetch(`${BASE_URL}auth/protected`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   // console.log("res", res);
  //   if (!res.ok) {
  //     redirect("/auth/login");
  //     // console.log("2/auth/login");
  //   }
  //
  //   const data: ProtectedResponse = await res.json();

  return (
    <div className=" flex flex-col ">
      <div>
        <h2>لیست تراکنش ها</h2>
      </div>
      تاریخ:
      <p>امروز 25 ام دوشنبه اسفند ما</p>
      <p>هفته از 11 مرداد 1404 تا 17 مرداد 1404</p>
      <p>مرداد 1404</p>

      <Transaction />

      {/*<div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">*/}
      {/*  <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>*/}
      {/*  {JSON.stringify(data)}*/}
      {/*  <p className="text-center">Welcome, User ID: {data.userId}</p>*/}
      {/*  <p className="mt-4 text-center">*/}
      {/*    <a href="/auth/login" className="text-blue-500 hover:underline">*/}
      {/*      Logout (Go to Login)*/}
      {/*    </a>*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  );
  // } catch (error) {
  //   redirect("/auth/login");
  //   // console.log("3/auth/login");
  // }
}
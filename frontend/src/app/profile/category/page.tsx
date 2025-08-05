import React from "react";
import CategoryForm from "@/app/profile/category/_form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../config-global";
import { type CategoryType } from "@/components/pages/profile/transaction/type";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const fetchCtegories = async () => {
    const cookieStore = await cookies();
    const token = cookieStore?.get("token")?.value;
    console.log("ProfilePage => token", token);
    if (!token) {
      redirect("/login");
    }
    try {
      const res = await fetch(`${BASE_URL}categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        return await res.json() as CategoryType[];
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const data = await fetchCtegories();
  return (
    <>
      <CategoryForm />

      <div className="flex flex-col flex-grow ">
        <h2>
          لیست دسته بندی ها
        </h2>
        <div className="rounded-xl border overflow-y-scroll scrollBarStyle h-[500px]">
          {data?.map((category, i) => (
            <div className="p-3 w-full even:bg-accent flex items-center border-b" key={i}>
              <span className="w-[90%] ">{category?.name}</span>
              <div className="flex items-center gap-x-1">
                <Button size="icon" variant="destructive">
                  <Trash2Icon className="size-4" />
                </Button>
                <Button size="icon">
                  <PencilIcon className="size-4" />
                </Button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default Page;
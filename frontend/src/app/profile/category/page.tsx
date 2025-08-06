import React from "react";
import CategoryForm from "@/app/profile/category/_form";
import { getTokenOrRedirect, fetchCategories } from "@/app/profile/category/server-api";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/app/profile/category/category-actions";

const Page = async () => {
  const token = await getTokenOrRedirect();
  const data = await fetchCategories(token);

  return (
    <div className="flex flex-col gap-4">
      <CategoryForm />

      <div className="flex flex-col flex-grow">
        <h2>لیست دسته‌بندی‌ها</h2>
        <div className="rounded-xl border overflow-y-scroll scrollBarStyle h-[500px]">
          {data?.map((category, i) => (
            <div
              className="p-3 w-full even:bg-accent flex items-center border-b"
              key={i}
            >
              <span className="w-[90%]">{category?.name}</span>
              <div className="flex items-center gap-x-1">
                <form
                  action={async () => {
                    "use server";
                    await deleteCategory(category.id);
                  }}
                >
                  <Button size="icon" variant="destructive" type="submit">
                    <Trash2Icon className="size-4" />
                  </Button>
                </form>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="icon">
                      <PencilIcon className="size-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
                    </DialogHeader>
                    <CategoryForm category={category} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
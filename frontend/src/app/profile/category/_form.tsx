"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CategoryForm = () => {
  return (
    <form className="flex flex-col gap-3 ">
      <div className="flex-grow ">
        <label className="text-sm ">
          نام
        </label>
        <Input />
      </div>
      <Button type="submit" className="w-[120px] mr-auto">ایجاد</Button>
    </form>
  );
};

export default CategoryForm;
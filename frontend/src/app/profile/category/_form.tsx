"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "@/app/profile/category/category-actions";
import { type CategoryType } from "@/components/pages/profile/transaction/type";

interface CategoryFormProps {
  category?: CategoryType;
}

const CategoryForm = ({ category }: CategoryFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: category?.name ?? "" });
  const [errors, setErrors] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ name: "" });

    const form = new FormData();
    form.append("name", formData.name);

    const response = category?.id
      ? await updateCategory(category.id, form)
      : await createCategory(form);

    if (response.success) {
      setFormData({ name: "" });
      router.push("/profile/category"); // Redirect to refresh the page
    } else {
      // response.errors ??
      setErrors( { name: "خطای ناشناخته" });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: e.target.value });
    setErrors({ name: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex-grow">
        <label className="text-sm">نام</label>
        <Input
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <Button
        type="submit"
        className="w-[120px] mr-auto"
        disabled={isSubmitting}
      >
        {category?.id ? "به‌روزرسانی" : "ایجاد"}
      </Button>
    </form>
  );
};

export default CategoryForm;
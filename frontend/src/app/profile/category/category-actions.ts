"use server";
import { revalidatePath } from "next/cache";
import { getTokenOrRedirect, createCategoryApi, updateCategoryApi, deleteCategoryApi, getCategoryApi } from "@/app/profile/category/server-api";

interface ValidationErrors {
  name?: string;
}

export async function createCategory(formData: FormData) {
  const token = await getTokenOrRedirect();

  const name = formData?.get("name")?.toString() ?? "";
  const errors: ValidationErrors = {};

  if (!name.trim()) {
    errors.name = "نام دسته‌بندی الزامی است";
    return { errors, success: false };
  }

  const response = await createCategoryApi(token, name);

  if (response.error) {
    return { errors: { name: response.error }, success: false };
  }

  revalidatePath("/profile/category"); // Revalidate the category page to refresh the list
  return { data: response.data, success: true };
}

export async function updateCategory(id: number, formData: FormData) {
  const token = await getTokenOrRedirect();

  const name = formData.get("name")?.toString() ?? "";
  const errors: ValidationErrors = {};

  if (!name.trim()) {
    errors.name = "نام دسته‌بندی الزامی است";
    return { errors, success: false };
  }

  const response = await updateCategoryApi(token, id, name);

  if (response.error) {
    return { errors: { name: response.error }, success: false };
  }

  revalidatePath("/profile/category"); // Revalidate the category page to refresh the list
  return { data: response.data, success: true };
}

export async function deleteCategory(id: number) {
  const token = await getTokenOrRedirect();

  const response = await deleteCategoryApi(token, id);

  if (response.error) {
    return { errors: { name: response.error }, success: false };
  }

  revalidatePath("/profile/category"); // Revalidate the category page to refresh the list
  return { success: true };
}

export async function getCategory(id: number) {
  const token = await getTokenOrRedirect();

  const response = await getCategoryApi(token, id);

  if (response.error) {
    return { errors: { name: response.error }, success: false };
  }

  return { data: response.data, success: true };
}
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../config-global";
import { type CategoryType } from "@/components/pages/profile/transaction/type";

export async function fetchCategories(token: string): Promise<CategoryType[]> {
  try {
    const res = await fetch(`${BASE_URL}categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      return await res.json() as CategoryType[];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createCategoryApi(token: string, name: string) {
  try {
    const res = await fetch(`${BASE_URL}categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message ?? "خطا در ایجاد دسته‌بندی" };
    }

    return { data: await res.json() };
  } catch (error) {
    return { error: "خطای سرور" };
  }
}

export async function updateCategoryApi(token: string, id: number, name: string) {
  try {
    const res = await fetch(`${BASE_URL}categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message ?? "خطا در به‌روزرسانی دسته‌بندی" };
    }

    return { data: await res.json() };
  } catch (error) {
    return { error: "خطای سرور" };
  }
}

export async function deleteCategoryApi(token: string, id: number) {
  try {
    const res = await fetch(`${BASE_URL}categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message ?? "خطا در حذف دسته‌بندی" };
    }

    return { success: true };
  } catch (error) {
    return { error: "خطای سرور" };
  }
}

export async function getCategoryApi(token: string, id: number) {
  try {
    const res = await fetch(`${BASE_URL}categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message ?? "خطا در دریافت دسته‌بندی" };
    }

    return { data: await res.json() as CategoryType };
  } catch (error) {
    return { error: "خطای سرور" };
  }
}

export async function getTokenOrRedirect() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  return token;
}
import React from "react";
import TransactionDataTable from "@/components/pages/profile/transaction/data-table";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_URL } from "../../../../../config-global";
import { type CategoryType, type ExpenseType } from "@/components/pages/profile/transaction/type";


const Transaction = async () => {
  const fetchEpenses = async () => {
    const cookieStore = await cookies();
    const token = cookieStore?.get("token")?.value;
    console.log("ProfilePage => token", token);
    if (!token) {
      redirect("/login");
    }
    try {
      const res = await fetch(`${BASE_URL}expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        return await res.json() as ExpenseType[];
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const fetchCategories = async () => {
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
  const categories_ = await fetchCategories();
  const data = await fetchEpenses();

  return (
    <TransactionDataTable expenses={data} categories={categories_} />
  );
};

export default Transaction;
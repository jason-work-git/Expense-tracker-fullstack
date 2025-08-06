"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDownIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type CategoryType, type ExpenseType } from "@/components/pages/profile/transaction/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionDataTable = ({ expenses, categories }: { expenses: ExpenseType[], categories: CategoryType[] }) => {
  const [open, setOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<string>("daily");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    category: "",
  });
  const [errors, setErrors] = useState({ name: "", value: "", category: "" });

  const handleChangeData = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleAddOrEditExpense = () => {
    let hasError = false;
    const newErrors = { name: "", value: "", category: "" };
console.log(formData)
    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
      hasError = true;
    }
    if (!formData.value.trim() || isNaN(Number(formData.value))) {
      newErrors.value = "قیمت باید یک عدد معتبر باشد";
      hasError = true;
    }
    if (!formData.category.trim()) {
      newErrors.category = "یک دسته بندی را انتخاب کنید";
      hasError = true;
    }
    setErrors(newErrors);

    if (!hasError) {
      console.log(formData);

    }
  };

  const AddModalDialog = () => (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (!open) {
        // setIsEditing(false);
        setFormData({
          name: "",
          value: "",
          category: "",
        });
        setErrors({ name: "", value: "", category: "" });
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          افزودن
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="mb-3">افزودن هزینه جدید</p>

          </DialogTitle>
        </DialogHeader>
        <DialogDescription>تاریخ: ({new Date(selectedDate).toLocaleDateString("fa-IR")})</DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-[12px]" htmlFor="category">دسته بندی</label>
            <Select onValueChange={(e) => handleChangeData("category", e)}>
              <SelectTrigger id="category" className={`w-full ${errors.category ? "border-red-500" : ""}`}>
                <SelectValue placeholder="دسته بندی" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>دسته بندی</SelectLabel>
                  {categories.map((c, i) => (
                    <SelectItem value={c._id} key={i}>{c.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div className="grid gap-2">
            <label className="text-[12px]" htmlFor="name">نام</label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChangeData("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="grid gap-2">
            <label className="text-[12px]" htmlFor="value">قیمت</label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => handleChangeData("value", e.target.value)}
              className={errors.value ? "border-red-500" : ""}
            />
            {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
          </div>

          <Button onClick={handleAddOrEditExpense}>ثبت</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  let sum_ = 0;
  expenses.map((item) => (sum_ += item.amount));


  return (
    <div className="bg-background container flex-grow flex flex-col">
      <div className="flex items-center gap-x-3 my-3 w-full">
        {
          [
            { name: "روزانه", value: "daily" },
            { name: "هفتگی", value: "weekly" },
            { name: "ماهانه", value: "monthly" },
          ].map((item, i) => {
            return (<Button
              key={i}
              onClick={() => setCurrentPeriod(item.value)}
              variant={currentPeriod === item.value ? "default" : "outline"}
              className="flex-grow"
            >
              {item.name}
            </Button>);
          })
        }
      </div>
      <div className=" flex items-center justify-between">
        <div>
          <span>تاریخ: </span>
          <DatePicker
            value={selectedDate}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //  @ts-expect-error
            onChange={(date) => date && setSelectedDate(new Date(date.toDate()))}
            calendar={persian}
            locale={persian_fa}
          />
        </div>
        {AddModalDialog()}
      </div>
      <div className="my-3  border rounded-lg overflow-y-auto max-h-[400px] scrollBarStyle">
        {
          expenses.length !== 0 ? expenses.map((item, i) => (
            <div key={i} className="flex flex-col even:bg-accent p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    {i}
                    {item.description}
                  </p>
                  <span>{new Date(item.date).toLocaleString("fa-IR")}</span>
                </div>
                <div className="font-bold flex items-center ">
                  <span className="h-5 ">{item.amount}</span>
                  <ArrowDownIcon className="size-5" />
                </div>
              </div>

            </div>
          )) : <div className="px-3 py-6 text-center">
            هنوز مقداری ثبت نشده است
          </div>}
        <div className="sticky bottom-0 inset-x-0 bg-primary border-t p-3 flex items-center justify-between">
          <span>مجموع</span>
          <span className="text-[18px] font-bold">
            {sum_}
            {" "}
            <span className="text-[12px]">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDataTable;
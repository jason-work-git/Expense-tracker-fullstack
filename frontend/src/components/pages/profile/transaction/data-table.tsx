"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDownIcon, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type ExpenseType } from "@/components/pages/profile/transaction/type";

const TransactionDataTable = ({ expenses }: { expenses: ExpenseType[] }) => {
  const [open, setOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<string>("daily");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    value: "",
    date: "", //format(new Date(), "yyyy-MM-dd", {locale: faIR}),
  });
  const [errors, setErrors] = useState({ name: "", value: "", date: "" });

  const handleAddOrEditExpense = () => {
    let hasError = false;
    const newErrors = { name: "", value: "", date: "" };

    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
      hasError = true;
    }
    if (!formData.value.trim() || isNaN(Number(formData.value))) {
      newErrors.value = "قیمت باید یک عدد معتبر باشد";
      hasError = true;
    }
    if (!formData.date) {
      newErrors.date = "تاریخ الزامی است";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      /* const date = parse(formData.date, "yyyy-MM-dd", new Date(), {locale: faIR});
       const expense = {
         id: isEditing ? formData.id : generateId(),
         name: formData.name,
         value: formData.value,
         date: formData.date,
       };

       setExpenses((prev) => {
         const dailyKey = getPeriodKey(date, "daily");
         const weeklyKey = getPeriodKey(date, "weekly");
         const monthlyKey = getPeriodKey(date, "monthly");

         if (isEditing) {
           // Update existing expense
           const updateExpenses = (periodExpenses: Expense[]) =>
             periodExpenses.map((item) =>
               item.id === expense.id ? expense : item
             );

           return {
             daily: {
               ...prev.daily,
               [dailyKey]: updateExpenses(prev.daily[dailyKey] || []),
             },
             weekly: {
               ...prev.weekly,
               [weeklyKey]: updateExpenses(prev.weekly[weeklyKey] || []),
             },
             monthly: {
               ...prev.monthly,
               [monthlyKey]: updateExpenses(prev.monthly[monthlyKey] || []),
             },
           };
         } else {
           // Add new expense
           return {
             daily: {
               ...prev.daily,
               [dailyKey]: [...(prev.daily[dailyKey] || []), expense],
             },
             weekly: {
               ...prev.weekly,
               [weeklyKey]: [...(prev.weekly[weeklyKey] || []), expense],
             },
             monthly: {
               ...prev.monthly,
               [monthlyKey]: [...(prev.monthly[monthlyKey] || []), expense],
             },
           };
         }
       });

       setFormData({id: "", name: "", value: "", date: format(new Date(), "yyyy-MM-dd", {locale: faIR})});
       setIsEditing(false);
       setOpen(false);*/
    }
  };

  const AddModalDialog = () => (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (!open) {
        // setIsEditing(false);
        setFormData({
          id: "",
          name: "",
          value: "",
          date: "",//format(new Date(), "yyyy-MM-dd", {locale: faIR}),
        });
        setErrors({ name: "", value: "", date: "" });
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
          <DialogTitle>افزودن هزینه جدید</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name">نام</label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="value">قیمت</label>
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className={errors.value ? "border-red-500" : ""}
            />
            {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
          </div>
          <div className="grid gap-2">
            <label htmlFor="date">تاریخ</label>
            <DatePicker
              value={formData.date}
              // date
              onChange={() =>
                setFormData({
                  ...formData,
                  date: "",//date ? format(new Date(date.toDate()), "yyyy-MM-dd", {locale: faIR}) : "",
                })
              }
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>
          <Button onClick={handleAddOrEditExpense}>ثبت</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
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
      <div className="my-3 flex items-center justify-between">
        <div>
          <span>تاریخ: </span>
          <DatePicker
            value={selectedDate}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //  @ts-expect-error
            onChange={(date) => date && setSelectedDate(new Date(date.toDate()))}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid gray",
              height: "48px",
            }}
          />
        </div>
        <AddModalDialog />
      </div>
      <div className="my-3  border rounded-lg overflow-y-auto max-h-[500px] scrollBarStyle">
        {

          //   new Array(100).fill(
          //     {
          //       "_id": "6891134b656459145c16df56",
          //       "userId": 1,
          //       "amount": 50.99,
          //       "description": "Lunch at cafe",
          //       "date": "2025-08-05T00:00:00.000Z",
          //       "categoryId": {
          //         "_id": "6891131cbbc44c76d4b1e163",
          //         "name": "سیگار"
          //       },
          //       "createdAt": "2025-08-04T20:08:43.749Z",
          //       "updatedAt": "2025-08-04T20:08:43.749Z",
          //       "id": 1,
          //       "__v": 0
          //     }
          //   )
          expenses.map((item, i) => (
            <div key={i} className="flex flex-col even:bg-accent p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    {item.description}
                  </p>
                  <span>{new Date(item.date).toLocaleString("fa-IR")}</span>
                </div>
                <div className=" font-bold flex items-center ">
                  <span className="h-5 ">{item.amount}</span>
                  <ArrowDownIcon className="size-5" />
                </div>
              </div>

            </div>
          ))}

      </div>
    </div>
  );
};

export default TransactionDataTable;
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full p-3 flex items-center gap-3">
      <Link href={"/login"} className={cn(buttonVariants({}), "w-1/2")}>
        ورود
      </Link>
      <Link href={"/register"} className={cn(buttonVariants({}), "w-1/2")}>
        ثبت نام
      </Link>
    </div>
  );
}

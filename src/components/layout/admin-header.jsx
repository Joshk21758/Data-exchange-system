import Link from "next/link";
import { AppLogo } from "@/components/icons";
import AdminUserNav from "./admin-user-nav";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <AppLogo className="h-6 w-6" />
        <span>CityFlow</span>
      </Link>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search could go here */}
      </div>
      <AdminUserNav />
    </header>
  );
}

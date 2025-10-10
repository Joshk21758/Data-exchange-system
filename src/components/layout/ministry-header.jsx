import Link from "next/link";
import { Bell, Users, History } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { ThemeToggle } from "./theme-toggle";

export default function MinistryHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/ministry">Ministries</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="link" size="sm" asChild>
            <Link href="/dashboard/users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
            </Link>
        </Button>
         <Button variant="link" size="sm" asChild>
            <Link href="/dashboard/audit-trail" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span>Audit Trail</span>
            </Link>
        </Button>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search could go here */}
      </div>
      <ThemeToggle />
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only"></span>
      </Button>
      <UserNav />
    </header>
  );
}

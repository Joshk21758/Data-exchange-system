"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";
import { History, Users } from "lucide-react";

const menuItems = [
  {
    href: "/dashboard/audit-trail",
    label: "Audit Trail",
    icon: History,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: Users,
  },
];

export default function MinistrySidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/ministry" className="flex items-center gap-2">
          <AppLogo className="size-7 text-primary" />
          <span className="text-lg font-semibold font-headline text-primary">CityFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
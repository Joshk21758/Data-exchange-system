import UserHeader from "@/components/layout/user-header";

export default function UserPagesLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}

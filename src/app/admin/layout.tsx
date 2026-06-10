import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        {children}
      </main>
    </div>
  );
}

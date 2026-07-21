import AdminContainer from "@/components/admin/layout/AdminContainer";
import CreateByMe from "@/components/layout/CreateByMe";
import AdminAuthGuard from "@/components/admin/layout/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div>
        <AdminContainer>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 pt-6 px-6 pb-16">{children}</div>
          </div>
        </AdminContainer>

        <CreateByMe />
      </div>
    </AdminAuthGuard>
  );
}

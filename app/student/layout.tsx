import AuthGuard from '@/app/components/AuthGuard';
import AppShell from '@/app/components/AppShell';


export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell>
         {children}
      </AppShell>
    </AuthGuard>
  );
}

import AuthGuard from '@/app/components/AuthGuard';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-6 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">admin_panel_settings</span>
              Super Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary">回首頁</Link>
             <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
               A
             </div>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block overflow-y-auto">
            <nav className="p-4 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Overview
              </div>
              <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 font-medium">
                <span className="material-symbols-outlined">dashboard</span>
                總覽儀表板
              </Link>
              
              <div className="mt-6 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Management
              </div>
              <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined">group</span>
                使用者管理
              </Link>
               <Link href="/admin/content" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined">article</span>
                內容審核
              </Link>

              <div className="mt-6 px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Access
              </div>
              <Link href="/student/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined">school</span>
                進入學生模式
              </Link>
              <Link href="/teacher/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined">cast_for_education</span>
                進入教師模式
              </Link>
            </nav>
          </aside>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

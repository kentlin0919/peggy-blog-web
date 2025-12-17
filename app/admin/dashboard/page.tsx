export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">系統總覽</h1>
        <div className="text-sm text-gray-500">最後更新: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">總使用者數</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">1,234</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
            <span>+12% 較上月</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">活躍學生</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">856</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <span className="material-symbols-outlined">school</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
            <span>+5% 較上月</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">活躍導師</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">42</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <span className="material-symbols-outlined">cast_for_education</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>持平</span>
          </div>
        </div>

         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">本月營收</p>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white">$452k</h3>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <span className="material-symbols-outlined">attach_money</span>
            </div>
          </div>
           <div className="mt-4 flex items-center text-sm text-green-600">
            <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
            <span>+18% 較上月</span>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">快速管理入口</h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">學生端全功能</h4>
                    <p className="text-sm text-gray-500">查看學生視角的儀表板、預約與作品集</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
             </div>

             <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">cast_for_education</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">教師端全功能</h4>
                    <p className="text-sm text-gray-500">查看教師視角的課程管理、學生CRM與報表</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
           <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">待辦審核</h3>
            <div className="flex flex-col items-center justify-center h-[200px] text-gray-400">
               <span className="material-symbols-outlined text-4xl mb-2">task_alt</span>
               <p>目前沒有待審核項目</p>
            </div>
        </div>
      </div>
    </div>
  );
}

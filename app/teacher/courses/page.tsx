'use client';

export default function TeacherCoursesPage() {
  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-medium text-text-sub mb-1">
            <span>管理中心</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">課程方案</span>
          </div>
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight">
            課程方案管理
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-border-light dark:border-border-dark">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-text-sub">系統運作正常</span>
          </div>
          <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-gray-300 transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-20">
          
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-lg group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-sub group-focus-within:text-primary transition-colors">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm transition-all" 
                  placeholder="搜尋方案名稱、描述..." 
                  type="text"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-gray-300 font-medium h-full">
                    <option>所有狀態</option>
                    <option>啟用中</option>
                    <option>草稿</option>
                    <option>已停用</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none text-[18px]">filter_list</span>
                </div>
                <div className="relative">
                  <select className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-gray-300 font-medium h-full">
                    <option>最新建立</option>
                    <option>價格由高到低</option>
                    <option>價格由低到高</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none text-[18px]">sort</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 font-bold text-sm transition-all active:scale-95 whitespace-nowrap">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>新增方案</span>
            </button>
          </div>

          {/* Courses List */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
                    <th className="py-4 px-6 text-xs font-bold text-text-sub uppercase tracking-wider w-[40%]">方案名稱 / 內容摘要</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-sub uppercase tracking-wider">價格設定</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-sub uppercase tracking-wider">課程時長</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-sub uppercase tracking-wider">狀態</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-sub uppercase tracking-wider text-right">管理操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    {
                        title: '牙體形態學基礎班 - 門齒雕刻',
                        desc: '適合初學者的入門課程，掌握中切牙與側切牙的形態特徵，建立正確的刀法觀念。',
                        price: 'NT$ 8,000',
                        priceUnit: '每人',
                        duration: '8 小時',
                        status: 'active',
                        icon: 'dentistry',
                        iconColor: 'blue',
                        tags: [{icon: 'group', text: '小班制'}, {icon: 'hardware', text: '附工具'}]
                    },
                    {
                        title: '進階後牙隆起與咬合面雕刻',
                        desc: '深入探討大臼齒的咬合面形態，包含主要與次要溝隙的雕刻技巧，針對國考重點加強。',
                        price: 'NT$ 12,500',
                        priceUnit: '每人',
                        duration: '12 小時',
                        status: 'active',
                        icon: 'view_in_ar',
                        iconColor: 'indigo',
                        tags: [{icon: 'verified', text: '進階班'}]
                    },
                    {
                        title: '全口假牙排牙實務 (週末工作坊)',
                        desc: '兩日密集工作坊，從咬合堤調整到最終排牙完成，實機操作演練。',
                        price: 'NT$ 18,000',
                        priceUnit: '每人',
                        duration: '16 小時',
                        status: 'draft',
                        icon: 'grid_view',
                        iconColor: 'orange',
                        tags: [{icon: 'construction', text: '籌備中'}]
                    },
                    {
                        title: '一對一客製化指導',
                        desc: '針對學員特定弱點進行加強，時間彈性安排，課前需預約。',
                        price: 'NT$ 1,500',
                        priceUnit: '每小時',
                        duration: '彈性時長',
                        status: 'active',
                        icon: 'person_play',
                        iconColor: 'pink',
                        tags: [{icon: 'calendar_clock', text: '預約制'}]
                    }
                  ].map((course, idx) => (
                    <tr key={idx} className={`group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${course.status === 'draft' ? 'bg-slate-50/30 dark:bg-slate-800/20' : ''}`}>
                        <td className="py-5 px-6">
                            <div className={`flex items-start gap-4 ${course.status === 'draft' ? 'opacity-75 group-hover:opacity-100 transition-opacity' : ''}`}>
                                <div className={`w-12 h-12 rounded-lg bg-${course.iconColor}-100 dark:bg-${course.iconColor}-900/30 text-${course.iconColor}-600 dark:text-${course.iconColor}-400 flex items-center justify-center flex-shrink-0`}>
                                    <span className="material-symbols-outlined">{course.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <a className="text-base font-bold text-slate-800 dark:text-white hover:text-primary transition-colors" href="#">
                                        {course.title}
                                    </a>
                                    <p className="text-sm text-text-sub line-clamp-1">{course.desc}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {course.tags.map((tag, tIdx) => (
                                            <span key={tIdx} className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded ${
                                                course.status === 'draft'
                                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                                                : 'bg-slate-100 dark:bg-slate-800 text-text-sub border border-border-light dark:border-border-dark'
                                            }`}>
                                                <span className="material-symbols-outlined text-[12px]">{tag.icon}</span>
                                                {tag.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="py-5 px-6 align-top">
                            <div className={`flex flex-col ${course.status === 'draft' ? 'opacity-75 group-hover:opacity-100' : ''}`}>
                                <span className="font-bold text-slate-800 dark:text-white">{course.price}</span>
                                <span className="text-xs text-text-sub">{course.priceUnit}</span>
                            </div>
                        </td>
                        <td className="py-5 px-6 align-top">
                            <div className={`flex items-center gap-1.5 text-sm text-slate-600 dark:text-gray-300 ${course.status === 'draft' ? 'opacity-75 group-hover:opacity-100' : ''}`}>
                                <span className="material-symbols-outlined text-[18px] text-text-sub">
                                    {course.duration === '彈性時長' ? 'hourglass_empty' : 'schedule'}
                                </span>
                                {course.duration}
                            </div>
                        </td>
                        <td className="py-5 px-6 align-top">
                            {course.status === 'active' ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    啟用中
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-gray-300 border border-slate-300 dark:border-slate-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                    草稿
                                </span>
                            )}
                        </td>
                        <td className="py-5 px-6 align-top text-right">
                            <div className="flex items-center justify-end gap-2">
                                <div className="flex items-center gap-2 mr-4 border-r border-border-light dark:border-border-dark pr-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={course.status === 'active'} />
                                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="編輯">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="更多選項">
                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="border-t border-border-light dark:border-border-dark p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-sm text-text-sub">顯示 1 到 4 筆，共 4 筆方案</span>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-text-sub disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 rounded-lg bg-primary text-white font-medium text-sm flex items-center justify-center shadow-md shadow-primary/20">1</button>
                <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-text-sub disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

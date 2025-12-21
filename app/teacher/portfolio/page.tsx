'use client';

import React from 'react';

export default function TeacherPortfolioPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-2xl font-bold tracking-tight">作品集管理</h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-1">管理您的假牙雕刻展示作品，向學生展現專業技藝。</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>新增作品</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex flex-1 w-full md:w-auto items-center gap-2">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-gray-200 placeholder-text-sub outline-none" 
                  placeholder="搜尋作品名稱、標籤..." 
                  type="text"
                />
              </div>
              <button className="p-2 text-text-sub hover:text-primary rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors md:hidden">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2 border-r border-border-light dark:border-border-dark pr-3">
                <span className="text-xs font-semibold text-text-sub whitespace-nowrap">分類:</span>
                <select className="bg-transparent text-sm font-medium text-slate-700 dark:text-gray-300 border-none focus:ring-0 cursor-pointer py-1 pl-1 pr-6 outline-none">
                  <option>全部顯示</option>
                  <option>全口假牙</option>
                  <option>活動假牙</option>
                  <option>牙體形態</option>
                </select>
              </div>
              <div className="flex items-center gap-2 border-r border-border-light dark:border-border-dark pr-3">
                <span className="text-xs font-semibold text-text-sub whitespace-nowrap">狀態:</span>
                <select className="bg-transparent text-sm font-medium text-slate-700 dark:text-gray-300 border-none focus:ring-0 cursor-pointer py-1 pl-1 pr-6 outline-none">
                  <option>全部</option>
                  <option>已發布</option>
                  <option>草稿</option>
                </select>
              </div>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button className="p-1.5 rounded bg-white dark:bg-slate-700 shadow-sm text-primary">
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button className="p-1.5 rounded text-text-sub hover:text-slate-700 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">view_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  alt="Project Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB34IKL7u17ygOFRLqK5yi8J1yCUUAqyTBVmJza6JdGwICXiRCudupRNV2072edZpONWN89vl4E70DozsNkSFd1WmipGaH5GE05zUufnxxlyrXLP1JFdZBE_w9sqsgSnSmftupGlJQf8DEj9wmuMQTrlRm1hDk8go8ssAUtO7sWsIz2BzMSyWGSm-Qhv10kGO54KOwz7mL12DiaA8srewJnC7lwUmCFEuuAv5hTzseaHLadhweHoLhuxnP72E1xzijgbB9qWUuEtgc"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="預覽">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg" title="編輯">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-2 bg-rose-500/90 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg" title="刪除">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 backdrop-blur-sm border border-green-200 dark:border-green-800">
                    已發布
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">全口假牙</span>
                  <span className="text-xs text-text-sub">2023/10/24</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">全口假牙排牙展示 - 正面視角</h3>
                <p className="text-sm text-text-sub line-clamp-2 mb-4">
                  本次展示重點在於正中門牙的定位與微笑曲線的建立，特別針對初學者容易忽略的細節進行解析。
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-xs text-text-sub">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 1.2k</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> 86</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">排牙</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">美觀</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  alt="Project Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX0FMNgFJrsqFdoZEhQ8Ni6g5q4wyI9oPzCN586oP2P2Xc6Y2faMNwozGVLPzYIFwOouywCCxuin4ImJ8IdI25xoasYmOuAjeXj7YjZw4_dOWpTKEe4piKOsHXmgBjNf99-F-RUWi0xoBlp6z8rqcGpcq_KlFnPPycWju8idxlkeexIX1PV-sk9IFnr7qkSQ-vLysHoyteMdVSvWxkspUkXA1sPkETcbNiWfUHaWn_u1o3ZLpMoELIO-7RIXeyWWXn_vwPka1zRmo"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-2 bg-rose-500/90 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 backdrop-blur-sm border border-amber-200 dark:border-amber-800">
                    草稿
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">牙體形態</span>
                  <span className="text-xs text-text-sub">2023/10/20</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">上顎第一大臼齒 - 蠟型雕刻</h3>
                <div className="mb-4">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mb-1">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-[10px] text-text-sub text-right">編輯進度 60%</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-xs text-text-sub">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 0</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> 0</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">蠟型</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  alt="Project Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOTrFUpRP3m44ZddGLRHq8MXcOn10o2HwLijwNESRFd6IbyA6mzA8bKp3flQVjCx3jILi8hRJUKKTHiyoPkGCAhRWT_2NRJh82Ql269nDAJrHrziW8ExB2XYvlFEWONn-GoZVt3l1lWpldUeWGL0KYP-SfLKighWXsWivoSJR0MNwBcYV_zkzFH4dZvqRihvotkcSXCT3b1vKm4NuNAXIdUQcY3Pt5k8qe5LsOPe2DlzcaZ2Cp5ZiJxTTXmz38AHTR8MMWbn9ZstA"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-2 bg-rose-500/90 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 backdrop-blur-sm border border-green-200 dark:border-green-800">
                    已發布
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="material-symbols-outlined text-white drop-shadow-md text-[20px]">play_circle</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">活動假牙</span>
                  <span className="text-xs text-text-sub">2023/10/15</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">RPD 設計原則 - Class I 案例</h3>
                <p className="text-sm text-text-sub line-clamp-2 mb-4">
                  針對甘迺迪第一類缺牙情況的設計考量，包含鉤靠選擇與義齒基底延伸範圍的教學影片。
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-xs text-text-sub">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 3.4k</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> 215</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">影片</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">設計</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Draft without image */}
            <div className="group bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col opacity-75 grayscale hover:grayscale-0 hover:opacity-100">
              <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl">image_not_supported</span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-2 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white rounded-full hover:bg-primary hover:text-white transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-2 bg-rose-500/90 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded text-[10px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 backdrop-blur-sm border border-slate-300 dark:border-slate-600">
                    隱藏
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">活動假牙</span>
                  <span className="text-xs text-text-sub">2023/09/28</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">金屬支架鑄造流程</h3>
                <p className="text-sm text-text-sub line-clamp-2 mb-4">
                  詳細記錄了從包埋到鑄造完成的每一個步驟，以及失敗案例的分析檢討。
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3 text-xs text-text-sub">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 120</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> 5</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-text-sub">鑄造</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Project Card */}
            <div className="group border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl flex flex-col items-center justify-center p-8 text-center text-text-sub hover:border-primary hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer min-h-[350px]">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <h3 className="font-bold text-lg mb-1">新增作品集</h3>
              <p className="text-sm max-w-[200px]">開始創建新的假牙雕刻展示作品</p>
            </div>

          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border-light dark:border-border-dark">
            <p className="text-sm text-text-sub">
              顯示 <span className="font-semibold text-slate-800 dark:text-white">1</span> 到 <span className="font-semibold text-slate-800 dark:text-white">5</span> 筆，共 <span className="font-semibold text-slate-800 dark:text-white">12</span> 筆作品
            </p>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                上一頁
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                3
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                下一頁
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

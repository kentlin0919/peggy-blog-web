'use client';

import React from 'react';

export default function StudentManagementPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            學生資訊管理
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">
            目前共有 <span className="text-primary font-bold">14</span> 位活躍學生，本週新增 <span className="text-primary font-bold">2</span> 位
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input 
              className="pl-10 pr-4 py-2 w-64 rounded-lg border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
              placeholder="搜尋學生姓名、Email..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">search</span>
          </div>
          <div className="h-8 w-px bg-border-light dark:bg-border-dark mx-1"></div>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>新增學生</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">總學生數</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">42 <span className="text-sm font-normal text-text-sub">人</span></p>
              </div>
              <div className="size-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">本月活躍</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">14 <span className="text-sm font-normal text-text-sub">人</span></p>
              </div>
              <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">how_to_reg</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-emerald-50/50 to-transparent dark:from-emerald-900/10 pointer-events-none"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl border border-border-light dark:border-border-dark shadow-sm flex items-center justify-between relative overflow-hidden group">
              <div className="flex flex-col z-10">
                <p className="text-text-sub text-xs font-semibold uppercase tracking-wide">待安排課程</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">5 <span className="text-sm font-normal text-text-sub">人</span></p>
              </div>
              <div className="size-12 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-orange-50/50 to-transparent dark:from-orange-900/10 pointer-events-none"></div>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)] min-h-[600px]">
            
            {/* Left ListView */}
            <div className="lg:w-1/3 flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card overflow-hidden">
              <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white border border-border-light dark:border-border-dark">全部</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">活躍中</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg text-text-sub hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">已結業</button>
                </div>
                <button className="text-text-sub hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {/* Item 1 */}
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 border-primary bg-blue-50/50 dark:bg-blue-900/10">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800 shadow-sm">
                          陳
                        </div>
                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full shadow-sm"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">陳小美</h4>
                          <span className="text-[10px] text-text-sub bg-white dark:bg-slate-700 border border-border-light dark:border-border-dark px-1.5 py-0.5 rounded">2小時前</span>
                        </div>
                        <p className="text-xs text-text-sub truncate mt-0.5">全口假牙雕刻入門 • 進度 40%</p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">新手學員</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800">
                          林
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">林大山</h4>
                          <span className="text-[10px] text-text-sub">昨天</span>
                        </div>
                        <p className="text-xs text-text-sub truncate mt-0.5">進階局部活動假牙 • 進度 85%</p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">回訪學員</span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">需關注</span>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* Item 3 */}
                   <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-12 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800">
                          張
                        </div>
                        <span className="absolute bottom-0 right-0 size-3 bg-gray-300 border-2 border-white dark:border-surface-dark rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">張雅婷</h4>
                          <span className="text-[10px] text-text-sub">3天前</span>
                        </div>
                        <p className="text-xs text-text-sub truncate mt-0.5">牙體形態學基礎 • 進度 15%</p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">新手學員</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 4 */}
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800">
                          王
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">王小明</h4>
                          <span className="text-[10px] text-text-sub">1週前</span>
                        </div>
                        <p className="text-xs text-text-sub truncate mt-0.5">牙體技術師國考衝刺班 • 進度 60%</p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">考前衝刺</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 5 */}
                  <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 border-transparent">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800">
                          李
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">李大華</h4>
                          <span className="text-[10px] text-text-sub">2週前</span>
                        </div>
                        <p className="text-xs text-text-sub truncate mt-0.5">全口假牙雕刻入門 • 已結業</p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">已結業</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right DetailView */}
            <div className="lg:w-2/3 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
              <div className="p-6 border-b border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-slate-800/30">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="size-24 rounded-2xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-4xl shadow-sm">
                      陳
                    </div>
                    <div className="flex flex-col gap-1.5 justify-center">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        陳小美
                        <span className="material-symbols-outlined text-green-500 text-xl" title="已驗證學員">verified</span>
                      </h2>
                      <p className="text-text-sub text-sm flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mail</span> chen.mei@example.com</span>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">call</span> 0912-345-678</span>
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">新手學員</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-900/50">全勤模範</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:text-primary hover:border-primary transition-colors shadow-sm" title="傳送訊息">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-all shadow-md shadow-primary/20 active:scale-95">
                      <span className="material-symbols-outlined text-[20px]">edit_square</span>
                      <span>編輯資料</span>
                    </button>
                    <button className="flex items-center justify-center size-10 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark text-text-sub hover:text-red-500 hover:border-red-500 transition-colors shadow-sm" title="更多選項">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-b border-border-light dark:border-border-dark px-6 flex gap-8">
                <button className="py-4 text-sm font-bold text-primary border-b-2 border-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">dashboard</span>
                  課程總覽
                </button>
                <button className="py-4 text-sm font-medium text-text-sub hover:text-slate-800 dark:hover:text-gray-200 transition-colors flex items-center gap-2 group">
                  <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">history</span>
                  預約歷史
                </button>
                <button className="py-4 text-sm font-medium text-text-sub hover:text-slate-800 dark:hover:text-gray-200 transition-colors flex items-center gap-2 group">
                  <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">sticky_note_2</span>
                  學習筆記
                </button>
                <button className="py-4 text-sm font-medium text-text-sub hover:text-slate-800 dark:hover:text-gray-200 transition-colors flex items-center gap-2 group">
                  <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">photo_library</span>
                  作品集
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 bg-surface-light dark:bg-surface-dark">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left content in detail view */}
                  <div className="xl:col-span-2 flex flex-col gap-6">
                    {/* Active Course Card */}
                    <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-9xl">school</span>
                      </div>
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-primary uppercase tracking-wide mb-1">正在進行中</span>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">全口假牙雕刻入門</h3>
                          <p className="text-sm text-text-sub mt-1">週五班 • 第 3 期</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">40%</span>
                          <span className="text-xs text-text-sub">完成進度</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-6 relative z-10">
                        <div className="bg-primary h-3 rounded-full relative" style={{ width: '40%' }}>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 size-4 bg-white dark:bg-slate-800 border-2 border-primary rounded-full shadow-sm"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 relative z-10">
                        <div className="flex flex-col gap-1 p-3 bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                          <span className="text-xs text-text-sub">已上課時數</span>
                          <span className="text-base font-bold text-slate-800 dark:text-white">4.8 <span className="text-xs font-normal text-text-sub">/ 12 hr</span></span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                          <span className="text-xs text-text-sub">缺席記錄</span>
                          <span className="text-base font-bold text-green-600 dark:text-green-400">0 <span className="text-xs font-normal text-text-sub">次</span></span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-white dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                          <span className="text-xs text-text-sub">平均評分</span>
                          <span className="text-base font-bold text-orange-500 flex items-center gap-1">4.8 <span className="material-symbols-outlined text-sm">star</span></span>
                        </div>
                      </div>
                    </div>

                    {/* Portfolio Preview */}
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">photo_library</span>
                          作品集精選
                        </h3>
                        <button className="text-xs font-medium text-primary hover:text-primary-dark hover:underline">查看全部作品</button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="group relative aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border-light dark:border-border-dark cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <span className="material-symbols-outlined text-4xl">dentistry</span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-xs font-medium truncate">中門齒形態練習</p>
                            <p className="text-white/70 text-[10px]">2023-10-20</p>
                          </div>
                        </div>
                        <div className="group relative aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-border-light dark:border-border-dark cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <span className="material-symbols-outlined text-4xl">dentistry</span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                            <p className="text-white text-xs font-medium truncate">犬齒特徵雕刻</p>
                            <p className="text-white/70 text-[10px]">2023-10-15</p>
                          </div>
                        </div>
                        <div className="group relative aspect-square rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 dark:bg-slate-800/50 dark:border-slate-700 flex flex-col items-center justify-center text-text-sub hover:text-primary hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                          <span className="material-symbols-outlined text-3xl mb-1">add_a_photo</span>
                          <span className="text-xs font-medium">上傳新作品</span>
                        </div>
                      </div>
                    </div>

                    {/* Booking History Table */}
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-500">history</span>
                          近期預約記錄
                        </h3>
                      </div>
                      <div className="rounded-xl border border-border-light dark:border-border-dark overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs text-text-sub uppercase">
                            <tr>
                              <th className="px-4 py-3 font-medium">日期</th>
                              <th className="px-4 py-3 font-medium">課程主題</th>
                              <th className="px-4 py-3 font-medium">狀態</th>
                              <th className="px-4 py-3 font-medium text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-light dark:divide-border-dark bg-white dark:bg-surface-dark">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="px-4 py-3 text-slate-800 dark:text-white">2023-10-25</td>
                              <td className="px-4 py-3 text-slate-600 dark:text-gray-300">中門齒形態學</td>
                              <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">已完成</span></td>
                              <td className="px-4 py-3 text-right text-primary hover:underline cursor-pointer">查看</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="px-4 py-3 text-slate-800 dark:text-white">2023-10-18</td>
                              <td className="px-4 py-3 text-slate-600 dark:text-gray-300">基礎工具使用與保養</td>
                              <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">已完成</span></td>
                              <td className="px-4 py-3 text-right text-primary hover:underline cursor-pointer">查看</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right side widgets in detail view */}
                  <div className="flex flex-col gap-6">
                    {/* Upcoming */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 dark:text-white text-sm">即將到來的課程</h3>
                        <button className="size-6 rounded hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-text-sub transition-colors"><span className="material-symbols-outlined text-sm">more_horiz</span></button>
                      </div>
                      <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center min-w-[3.5rem] h-[3.5rem] rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30 shadow-sm">
                            <span className="text-xs font-bold uppercase">10月</span>
                            <span className="text-xl font-bold">28</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">中門齒形態雕刻實作</h4>
                            <p className="text-xs text-text-sub mt-1 flex items-center gap-1.5 truncate">
                              <span className="material-symbols-outlined text-[14px]">schedule</span> 14:00 - 16:00
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-dark transition-colors">進入教室</button>
                          <button className="flex-1 py-2 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">改期</button>
                        </div>
                      </div>
                    </div>

                    {/* Latest Note */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center px-1">
                        <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                          <span className="material-symbols-outlined text-yellow-500 text-lg">sticky_note_2</span>
                          最新學習筆記
                        </h3>
                        <button className="text-xs text-primary hover:underline">新增筆記</button>
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-5 rounded-xl relative shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <span className="material-symbols-outlined absolute top-4 right-4 text-yellow-600/20 dark:text-yellow-500/20 text-4xl group-hover:text-yellow-600/30 transition-colors">format_quote</span>
                        <h4 className="font-bold text-slate-800 dark:text-yellow-100 text-sm mb-2">關於隆線立體感的觀察</h4>
                        <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                          學員對於牙齒隆線的立體感掌握較弱，建議在下次課程中多加強光影觀察的練習。對於工具的使用已經比較熟練，可以開始嘗試更細緻的紋理刻畫。建議參考教材第 45 頁的範例圖。
                        </p>
                        <div className="mt-4 pt-3 border-t border-yellow-200/50 dark:border-yellow-900/30 flex items-center justify-between text-xs text-yellow-800/60 dark:text-yellow-500/60 font-medium">
                          <span>林老師 • 2023-10-25</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl border border-dashed border-border-light dark:border-border-dark text-center text-text-sub hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                        <span className="text-xs font-medium">+ 查看更多筆記 (共 5 則)</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

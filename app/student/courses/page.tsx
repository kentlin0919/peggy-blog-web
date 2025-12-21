'use client';

import React from 'react';
import Image from 'next/image';

export default function StudentCoursesPage() {
  return (
    <div className="flex-1 overflow-y-auto relative h-full bg-slate-50 dark:bg-background-dark">
      {/* Mobile Header (optional if layout handles it, but included for completeness) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary-dark">
            <span className="material-symbols-outlined text-[20px]">dentistry</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-white">牙雕家教</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      <div className="container mx-auto max-w-[1280px] p-6 md:p-10 flex flex-col gap-8 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-display font-black leading-tight tracking-tight mb-2">
              課程方案選擇
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl">
              探索我們的專業牙體雕刻課程，從基礎形態到高階全口假牙實作，靈活選擇適合您的學習時數。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                篩選課程
              </button>
            </div>
            <div className="relative group">
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">sort</span>
                排序方式
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
            {/* Card 1: 基礎入門 */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden group flex flex-col h-full hover:border-primary/50 dark:hover:border-primary/50 trans-all">
              <div className="h-56 relative overflow-hidden">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo"
                  alt="基礎入門課程" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">基礎入門</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-2xl font-bold leading-tight shadow-black drop-shadow-md mb-2">牙體形態學概論與實作</h3>
                  <div className="flex items-center gap-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">school</span> 適合初學者</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">build</span> 工具認識</span>
                  </div>
                </div>
              </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  本課程專為牙技初學者設計，從認識雕刻刀具開始，深入淺出地講解牙齒的基本形態特徵。課程包含大量實作練習，讓您快速掌握單齒雕刻技巧。
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">教案預覽</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">check_circle</span>
                      <span>第一週：牙雕工具介紹與保養</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">check_circle</span>
                      <span>第二週：上顎正中門齒形態解析</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">選擇課程時數</label>
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-primary active:scale-95 transition-all">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-lg font-black text-slate-800 dark:text-white">10</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">小時</span>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-primary active:scale-95 transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">總費用</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary-dark dark:text-primary">NT$ 8,000</span>
                  </div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary-dark dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all flex items-center gap-2 group-hover:scale-105">
                  查看詳情
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: 進階專修 (Hot) */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden group flex flex-col h-full hover:border-secondary/50 dark:hover:border-secondary/50 trans-all relative">
            <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-20 shadow-md">熱門推薦</div>
            <div className="h-56 relative overflow-hidden">
               <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHpcmx5FN0ieyK-KUTHlzpCr7Aj8wyk3XwCcfO9sBG40Fan-DY44DtRxhLT6rnswES6q6B0xREgxnk1ImkFwzDG1AjLCEp0il-_ttTxQZAjLL4AmXamRYBu2Zh6v2QyEZ0GyVpujs4Zkwv3aEJLnYJezfNy4L9DxmcDC3Z5QoMc3eQbRTwtSxoYieRI_nfI5E5ysjpEjZueHWnjExK4sfPdXovbW73WmDh1wuhV8s2zmYq5qKDODTOCJw_efYco-8WOO4DyDdedxA"
                  alt="全口活動假牙排牙技巧" 
                  fill
                  className="object-cover"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">進階專修</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-bold leading-tight shadow-black drop-shadow-md mb-2">全口活動假牙排牙技巧</h3>
                <div className="flex items-center gap-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">workspace_premium</span> 國考重點</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">groups</span> 小班制</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  針對國家考試術科測驗設計，專攻全口活動假牙排列。課程涵蓋咬合平面設定、人工牙選擇與排列原則，以及牙齦雕刻美學，助您輕鬆應對考試挑戰。
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">教案預覽</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">check_circle</span>
                      <span>單元一：咬合器操作與定位</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">check_circle</span>
                      <span>單元二：前牙美觀排列原則</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">選擇課程時數</label>
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-secondary active:scale-95 transition-all">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-lg font-black text-slate-800 dark:text-white">20</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">小時</span>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-secondary active:scale-95 transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">總費用</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-secondary dark:text-secondary">NT$ 18,000</span>
                  </div>
                </div>
                <button className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary/30 transition-all flex items-center gap-2 group-hover:scale-105">
                  查看詳情
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: 實戰演練 */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft overflow-hidden group flex flex-col h-full hover:border-orange-400/50 dark:hover:border-orange-400/50 trans-all relative">
            <div className="h-56 relative overflow-hidden">
               <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCE1Uly6fLjErrYruwnkcru69vTGC1e31xMZOnDuAA81DdY-_uZY9cZnK9-g9UA8Y5mb2g7v_qn7Wz3Hu60VMnNiByPR96fnNueHmxL4b9ohccDKabBJVSlDAsAo1mzvoMH-oVZD95XRhvE4MWDe7sATkVXXF2_Ip5LVOrfvTrFIJtkJSncFEoOCbX-xTdMzjyT5ooeOn6wGFV9tPAcfyLMy5nNyZyEwzUM276O5qZi3XUF1_DGU3e4IfgFUWp9xfBzfiMqCVuGwQo"
                  alt="局部活動假牙設計" 
                  fill
                  className="object-cover"
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-orange-900/20 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">實戰演練</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-bold leading-tight shadow-black drop-shadow-md mb-2">局部活動假牙設計</h3>
                <div className="flex items-center gap-4 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">engineering</span> 結構設計</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">psychology</span> 邏輯訓練</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6 flex-1">
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                  深入探討局部活動假牙(RPD)的組件設計與規劃。課程重點在於理解甘乃迪分類法，學習設計固位體、連接體，並進行實際的蠟型製作與金屬支架觀念。
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">教案預覽</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-orange-400 mt-0.5">check_circle</span>
                      <span>模組A：甘乃迪分類與設計路徑</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-[18px] text-orange-400 mt-0.5">check_circle</span>
                      <span>模組B：大連接體與小連接體</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 block">選擇課程時數</label>
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-orange-500 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-lg font-black text-slate-800 dark:text-white">15</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">小時</span>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:text-orange-500 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">總費用</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-orange-500 dark:text-orange-400">NT$ 12,000</span>
                  </div>
                </div>
                <button className="bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600 dark:text-white text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 dark:shadow-none transition-all flex items-center gap-2 group-hover:scale-105">
                  查看詳情
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-display font-bold mb-4">不確定哪個方案適合您？</h2>
              <p className="text-indigo-100 text-lg">我們可以根據您的目前程度和學習目標，為您量身打造專屬的學習計畫。歡迎預約免費諮詢。</p>
            </div>
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 flex-shrink-0">
              <span className="material-symbols-outlined">calendar_today</span>
              預約免費諮詢
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

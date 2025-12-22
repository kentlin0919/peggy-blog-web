'use client';

import React, { useState, useEffect } from 'react';

// Mock Data Type
type Course = {
    id: string;
    title: string;
    desc: string;
    price: number;
    priceUnit: string;
    duration: string;
    status: 'active' | 'draft' | 'archived';
    icon: string;
    iconColor: string;
    tags: {icon: string, text: string}[];
};

const MOCK_COURSES: Course[] = [
    {
        id: 'c1',
        title: '牙體形態學基礎班 - 門齒雕刻',
        desc: '適合初學者的入門課程，掌握中切牙與側切牙的形態特徵，建立正確的刀法觀念。',
        price: 8000,
        priceUnit: '每人',
        duration: '8 小時',
        status: 'active',
        icon: 'dentistry',
        iconColor: 'blue',
        tags: [{icon: 'group', text: '小班制'}, {icon: 'hardware', text: '附工具'}]
    },
    {
        id: 'c2',
        title: '進階後牙隆起與咬合面雕刻',
        desc: '深入探討大臼齒的咬合面形態，包含主要與次要溝隙的雕刻技巧，針對國考重點加強。',
        price: 12500,
        priceUnit: '每人',
        duration: '12 小時',
        status: 'active',
        icon: 'view_in_ar',
        iconColor: 'indigo',
        tags: [{icon: 'verified', text: '進階班'}]
    },
    {
        id: 'c3',
        title: '全口假牙排牙實務 (週末工作坊)',
        desc: '兩日密集工作坊，從咬合堤調整到最終排牙完成，實機操作演練。',
        price: 18000,
        priceUnit: '每人',
        duration: '16 小時',
        status: 'draft',
        icon: 'grid_view',
        iconColor: 'orange',
        tags: [{icon: 'construction', text: '籌備中'}]
    },
    {
        id: 'c4',
        title: '一對一客製化指導',
        desc: '針對學員特定弱點進行加強，時間彈性安排，課前需預約。',
        price: 1500,
        priceUnit: '每小時',
        duration: '彈性時長',
        status: 'active',
        icon: 'person_play',
        iconColor: 'pink',
        tags: [{icon: 'calendar_clock', text: '預約制'}]
    }
];

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Course>>({});

  // Auto-select first course on load (simulated)
  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
        setSelectedCourseId(courses[0].id);
    }
  }, []);

  // When selected course changes, reset edit mode
  useEffect(() => {
      setIsEditing(false);
  }, [selectedCourseId]);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  const handleEditClick = () => {
      if (!selectedCourse) return;
      setEditForm({ ...selectedCourse });
      setIsEditing(true);
  };

  const handleSave = async () => {
      if (!selectedCourse) return;
      setSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const updatedCourses = courses.map(c => {
          if (c.id === selectedCourse.id) {
              return { ...c, ...editForm } as Course;
          }
          return c;
      });

      setCourses(updatedCourses);
      setIsEditing(false);
      setSaving(false);
      alert('儲存成功 (模擬)');
  };

  const filteredCourses = courses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Header */}
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            課程方案管理
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">
            共 <span className="text-primary font-bold">{courses.length}</span> 個課程方案
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input 
              className="pl-10 pr-4 py-2 w-64 rounded-lg border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" 
              placeholder="搜尋課程名稱..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-sub group-focus-within:text-primary text-[18px] transition-colors">search</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6 pb-10">
          
          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
            
            {/* Left ListView */}
            <div className="lg:w-1/3 flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card overflow-hidden">
              <div className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white border border-border-light dark:border-border-dark">全部</button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-white dark:hover:bg-slate-700 text-text-sub transition-colors">啟用中</button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {filteredCourses.map(course => {
                    const isSelected = selectedCourseId === course.id;
                    const isActive = course.status === 'active';

                    return (
                      <div 
                        key={course.id}
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-l-4 ${isSelected ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-transparent'}`}
                      >
                        <div className="flex items-center gap-3">
                            <div className={`size-12 rounded-lg bg-${course.iconColor}-100 dark:bg-${course.iconColor}-900/30 text-${course.iconColor}-600 dark:text-${course.iconColor}-400 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <span className="material-symbols-outlined">{course.icon}</span>
                            </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate pr-2">{course.title}</h4>
                                {isActive ? (
                                    <span className="material-symbols-outlined text-[14px] text-green-500" title="啟用中">check_circle</span>
                                ) : (
                                    <span className="material-symbols-outlined text-[14px] text-slate-400" title="草稿">edit_document</span>
                                )}
                            </div>
                            <p className="text-xs text-text-sub truncate mt-0.5">{course.priceUnit === '每小時' ? '時計' : '全期'} • ${course.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel - View or Edit */}
            <div className="lg:w-2/3 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-card flex flex-col overflow-hidden">
             
              {selectedCourse ? (
                isEditing ? (
                  // ========== EDIT MODE ==========
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="p-6 border-b border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-slate-800/30 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined">edit_note</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white">編輯課程方案</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Basic Info */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b pb-2 mb-2">基本資訊</h3>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">課程名稱</label>
                                    <input 
                                        className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                                        type="text" 
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">簡短描述</label>
                                    <textarea 
                                        className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm resize-none h-24" 
                                        value={editForm.desc}
                                        onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Pricing & Status */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b pb-2 mb-2">價格與時長</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300">價格 (NTD)</label>
                                        <input 
                                            className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                                            type="number" 
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300">計價單位</label>
                                        <select 
                                            className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                            value={editForm.priceUnit}
                                            onChange={(e) => setEditForm({...editForm, priceUnit: e.target.value})}
                                        >
                                            <option>每人</option>
                                            <option>每小時</option>
                                            <option>每期</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">預計時長</label>
                                    <input 
                                        className="w-full px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                                        type="text" 
                                        value={editForm.duration}
                                        onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                                    />
                                </div>
                            </div>

                             <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b pb-2 mb-2">顯示設定</h3>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">圖示 (Material Symbol)</label>
                                    <div className="flex gap-2">
                                        <input 
                                            className="flex-1 px-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" 
                                            type="text" 
                                            value={editForm.icon}
                                            onChange={(e) => setEditForm({...editForm, icon: e.target.value})}
                                        />
                                        <div className="size-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg border border-border-light dark:border-border-dark">
                                            <span className="material-symbols-outlined">{editForm.icon}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5 pt-2">
                                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-border-light dark:border-border-dark rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <input 
                                            type="checkbox" 
                                            className="size-5 rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={editForm.status === 'active'}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.checked ? 'active' : 'draft'})}
                                        />
                                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">啟用此方案 (公開顯示)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-5 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-slate-800/50">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2 rounded-lg border border-border-light dark:border-border-dark text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-sm flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                        取消
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 font-bold text-sm transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                         {saving ? '儲存中...' : (
                            <>
                              <span className="material-symbols-outlined text-lg">save</span>
                              儲存方案
                            </>
                          )}
                      </button>
                    </div>
                  </div>
                ) : (
                  // ========== VIEW MODE ==========
                  <>
                    <div className="p-8 border-b border-border-light dark:border-border-dark bg-slate-50/30 dark:bg-slate-800/30">
                        <div className="flex items-start gap-5">
                            <div className={`size-20 rounded-2xl bg-${selectedCourse.iconColor}-100 dark:bg-${selectedCourse.iconColor}-900/30 text-${selectedCourse.iconColor}-600 dark:text-${selectedCourse.iconColor}-400 flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <span className="material-symbols-outlined text-4xl">{selectedCourse.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCourse.title}</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            {selectedCourse.status === 'active' ? (
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
                                            <span className="text-text-sub text-sm border-l border-border-light dark:border-border-dark pl-2 ml-1">
                                                ID: {selectedCourse.id}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleEditClick}
                                        className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 font-bold text-sm transition-all active:scale-95 flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">edit_square</span>
                                        編輯
                                    </button>
                                </div>
                                <p className="text-text-sub mt-4 text-sm leading-relaxed max-w-2xl">{selectedCourse.desc}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8 bg-surface-light dark:bg-surface-dark grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-white border-b pb-2">課程細節</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark">
                                    <p className="text-xs text-text-sub mb-1">價格設定</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">NT$ {selectedCourse.price.toLocaleString()}</p>
                                    <p className="text-xs text-text-sub mt-0.5">/{selectedCourse.priceUnit}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark">
                                    <p className="text-xs text-text-sub mb-1">預計時長</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedCourse.duration}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-text-sub uppercase mb-2">標籤</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCourse.tags.map((tag, idx) => (
                                         <span key={idx} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 border border-border-light dark:border-border-dark">
                                            <span className="material-symbols-outlined text-[14px]">{tag.icon}</span>
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-slate-800 dark:text-white border-b pb-2">預覽與連結</h3>
                            <button className="w-full p-4 rounded-xl border border-dashed border-border-light dark:border-border-dark flex items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors">
                                <span className="material-symbols-outlined">visibility</span>
                                預覽學生端頁面
                            </button>
                        </div>
                    </div>
                  </>
                )
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined text-6xl mb-4">library_books</span>
                  <p>請選擇一個課程方案</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

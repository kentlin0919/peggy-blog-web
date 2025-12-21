'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type UserInfo = Database['public']['Tables']['user_info']['Row'];
type TeacherInfo = Database['public']['Tables']['teacher_info']['Row'];

type TeacherData = UserInfo & {
  teacher_info: TeacherInfo | null;
};

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_info')
        .select(`
          *,
          teacher_info (*)
        `)
        .eq('identity_id', 2)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching teachers:', error);
        return;
      }

      setTeachers(data as TeacherData[]);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      searchQuery === '' ||
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' ||
      (statusFilter === 'active' ? teacher.is_active : !teacher.is_active);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            教師管理
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            管理所有註冊教師的帳號權限、狀態與維護費方案
          </p>
        </div>
        <Link
          href="/admin/teachers/new"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl h-12 px-6 bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="text-sm font-bold tracking-wide">新增教師</span>
        </Link>
      </header>
      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Search Input */}
        <div className="flex-1 relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 dark:text-gray-500 group-focus-within:text-sky-500 transition-colors">
            search
          </span>
          <input
            className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400/70 transition-all outline-none"
            placeholder="搜尋姓名或電子郵件..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0">
          <div className="relative min-w-[160px]">
            <select 
              className="w-full h-12 pl-4 pr-10 appearance-none rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:ring-0 text-gray-900 dark:text-white cursor-pointer outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="active">啟用中</option>
              <option value="disabled">已停用</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          {/* 
          <div className="relative min-w-[160px]">
            <select className="w-full h-12 pl-4 pr-10 appearance-none rounded-lg bg-gray-50 dark:bg-gray-900 border-transparent focus:border-sky-500 focus:ring-0 text-gray-900 dark:text-white cursor-pointer outline-none">
              <option value="">所有方案</option>
              <option value="basic">基礎版</option>
              <option value="pro">專業版</option>
              <option value="enterprise">企業版</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          */}
        </div>
      </div>
      {/* Stats Summary (Quick View) - Optional: Make dynamic later */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              總教師數
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {teachers.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
          <div className="size-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              啟用中
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {teachers.filter(t => t.is_active).length}
            </p>
          </div>
        </div>
      </div>
      {/* Data Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[280px]">
                  教師姓名
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[240px]">
                  電子郵件
                </th>
                {/* 
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  維護費方案
                </th>
                */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  狀態
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    載入中...
                  </td>
                </tr>
              ) : filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    查無資料
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-gray-700 bg-sky-100 flex items-center justify-center text-sky-600 font-bold"
                        >
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {teacher.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                            {teacher.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {teacher.email}
                      </span>
                    </td>
                    {/*
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                        {teacher.teacher_info?.base_price ? `$${teacher.teacher_info.base_price}` : '未設定'}
                      </span>
                    </td>
                    */}
                    <td className="px-6 py-4">
                      {teacher.is_active ? (
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            啟用中
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-gray-400"></span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            已停用
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button
                          className="size-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                          title="編輯"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          title="刪除"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination removed for now as we don't have backend pagination yet */}
      </div>
    </div>
  );
}


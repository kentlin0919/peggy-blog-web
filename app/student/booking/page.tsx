'use client';

import React, { useState } from 'react';

// Mock Data
type Booking = {
  id: string;
  courseTitle: string;
  teacherName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  location: string;
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    courseTitle: '牙體形態學基礎班',
    teacherName: 'Dr. Lin',
    date: '2023-12-25',
    time: '14:00 - 16:00',
    status: 'confirmed',
    location: '台北教室 A'
  },
  {
    id: 'b2',
    courseTitle: '全口假牙排牙實務',
    teacherName: 'Prof. Chen',
    date: '2023-12-28',
    time: '09:00 - 12:00',
    status: 'pending',
    location: '線上會議'
  },
  {
    id: 'b3',
    courseTitle: '一對一客製化指導',
    teacherName: 'Dr. Lin',
    date: '2023-11-15',
    time: '19:00 - 20:00',
    status: 'completed',
    location: '台北教室 B'
  }
];

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [RescheduleId, setRescheduleId] = useState<string | null>(null);

  // Mock Reschedule State
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleRescheduleClick = (id: string) => {
    setRescheduleId(id);
    setNewDate('');
    setNewTime('');
  };

  const confirmReschedule = () => {
    alert(`預約 ${RescheduleId} 改期至 ${newDate} ${newTime} (模擬)`);
    setRescheduleId(null);
  };

  const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const historyBookings = MOCK_BOOKINGS.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const displayList = activeTab === 'upcoming' ? upcomingBookings : historyBookings;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">我的預約課程</h1>
        <p className="text-text-sub">查看您的課程時間表或進行改期</p>
      </header>

      {/* Booking Tabs */}
      <div className="flex border-b border-border-light dark:border-border-dark mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-text-sub hover:text-slate-800'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          即將到來
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-text-sub hover:text-slate-800'}`}
          onClick={() => setActiveTab('history')}
        >
          歷史紀錄
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
           <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
             <p className="text-text-sub">尚無資料</p>
           </div>
        ) : (
           displayList.map(booking => (
             <div key={booking.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-border-light dark:border-border-dark shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {booking.status === 'confirmed' ? '已確認' : booking.status === 'pending' ? '待確認' : booking.status === 'completed' ? '已完成' : '已取消'}
                      </span>
                      <span className="text-sm text-text-sub">{booking.date} • {booking.time}</span>
                   </div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{booking.courseTitle}</h3>
                   <div className="flex items-center gap-4 text-sm text-text-sub">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">person</span> {booking.teacherName}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {booking.location}</span>
                   </div>
                </div>
                
                {activeTab === 'upcoming' && (
                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => handleRescheduleClick(booking.id)}
                      className="flex-1 md:flex-none px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium transition-colors"
                    >
                      改期 / 取消
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium shadow-sm transition-colors">
                      進入教室
                    </button>
                  </div>
                )}
             </div>
           ))
        )}
      </div>

      {/* Reschedule Modal (Simple Inline Implementation) */}
      {RescheduleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">更改預約時間</h3>
              <p className="text-sm text-text-sub mb-6">請選擇新的日期與時間，送出後需等待老師確認。</p>
              
              <div className="space-y-4 mb-6">
                 <div>
                    <label className="block text-sm font-medium mb-1">日期</label>
                    <input type="date" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" value={newDate} onChange={e => setNewDate(e.target.value)} />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">時間</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" value={newTime} onChange={e => setNewTime(e.target.value)} />
                 </div>
              </div>

              <div className="flex gap-3">
                 <button onClick={() => setRescheduleId(null)} className="flex-1 py-2.5 rounded-xl border border-border-light dark:border-border-dark text-slate-600">取消</button>
                 <button onClick={confirmReschedule} className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30">確認送出</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

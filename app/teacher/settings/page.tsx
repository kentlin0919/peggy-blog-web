"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useModal } from "@/app/components/providers/ModalContext";
import EducationInputs from "@/app/components/ui/EducationInputs";
import { useSchools } from "@/app/hooks/useSchools";

export default function TeacherSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showModal } = useModal();

  // Use shared hook for school data (for validation in handleSave)
  const schools = useSchools();

  // Profile State
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [teacherId, setTeacherId] = useState("");

  // Booking State
  const [bookingWindow, setBookingWindow] = useState("2 週內");
  const [bookingBuffer, setBookingBuffer] = useState("15 分鐘");
  const [cancelPolicy, setCancelPolicy] = useState("課程開始前 24 小時");
  const [limitFreq, setLimitFreq] = useState(false);

  // Notification State
  const [notifNewBooking, setNotifNewBooking] = useState({
    email: true,
    app: true,
    line: true,
  });
  const [notifReminder, setNotifReminder] = useState({
    email: false,
    app: true,
    line: true,
  });
  const [notifCancel, setNotifCancel] = useState({
    email: true,
    app: true,
    line: true,
  });
  const [notifSystem, setNotifSystem] = useState({
    email: true,
    app: true,
    line: false,
  });

  // Integration State
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [lineEnabled, setLineEnabled] = useState(false);
  const [lineToken, setLineToken] = useState("");

  // Account State
  const [isPaused, setIsPaused] = useState(false);

  // Education State
  const [school, setSchool] = useState("");
  const [status, setStatus] = useState("graduated");
  const [department, setDepartment] = useState("");
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch User Info
      const { data: userData, error: userError } = await supabase
        .from("user_info")
        .select("name, email, phone, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (userError) {
        console.error("Error fetching user_info:", userError);
        throw userError;
      }

      // Fetch Teacher Info
      const { data: teacherData, error: teacherError } = await supabase
        .from("teacher_info")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (teacherError) {
        console.error("Error fetching teacher_info:", teacherError);
        throw teacherError;
      }

      // Fetch Education
      const { data: eduData } = await supabase
        .from("teacher_education")
        .select(
          `
          *,
          schools (name, code),
          education_statuses (status_key)
        `
        )
        .eq("teacher_id", user.id)
        .maybeSingle();

      // Set State
      if (userData) {
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setAvatarUrl(
          userData.avatar_url ||
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDO6reZcrIx4TpNaoa2cHckBMT5jGOVcSOgCiWFeFHvwR5BhOlm6EzZoO1nDA5jhhdVnLiS3xPcbfPeCVuaPW7x9yyQ1OpilXHhQqZf7s1ilC_fOFoonIf98HRVehAYuVriM8l3I0MrYHIn39RVWEj_4jU-wlh_BemOK4VeRUNedhA-sln2p5816fNCRlBCziM3mk1IHmY1EIx1yw45MJkIcGFi9fz7JcPrVe1C0mU8MYnl7CYlnU1BMQEyHUmuypSHuwydpWLgPOU"
        );
      }

      if (teacherData) {
        setTeacherId(teacherData.teacher_code || "");
        setTitle(teacherData.title || "");

        const bookingSettings = (teacherData.booking_settings as any) || {};
        setBookingWindow(bookingSettings.window || "2 週內");
        setBookingBuffer(bookingSettings.buffer || "15 分鐘");
        setCancelPolicy(bookingSettings.cancel_policy || "課程開始前 24 小時");
        setLimitFreq(bookingSettings.limit_freq || false);

        const notifSettings = (teacherData.notification_settings as any) || {};
        if (notifSettings.new_booking)
          setNotifNewBooking(notifSettings.new_booking);
        if (notifSettings.reminder) setNotifReminder(notifSettings.reminder);
        if (notifSettings.cancel) setNotifCancel(notifSettings.cancel);
        if (notifSettings.system) setNotifSystem(notifSettings.system);

        setGoogleEnabled(teacherData.google_calendar_enabled || false);
        setLineEnabled(teacherData.line_notify_enabled || false);
        setLineToken(teacherData.line_notify_token || "");

        // Paused if NOT public
        setIsPaused(!teacherData.is_public);
      }

      if (eduData) {
        // @ts-ignore
        if (eduData.schools) setSchool(eduData.schools.name);
        // @ts-ignore
        if (eduData.education_statuses)
          setStatus(eduData.education_statuses.status_key);
        setDepartment(eduData.department || "");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Update User Info
      const { error: userError } = await supabase
        .from("user_info")
        .update({
          name,
          phone,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (userError) throw userError;

      // Update Teacher Info
      const { error: teacherError } = await supabase
        .from("teacher_info")
        .update({
          title,
          booking_settings: {
            window: bookingWindow,
            buffer: bookingBuffer,
            cancel_policy: cancelPolicy,
            limit_freq: limitFreq,
          },
          notification_settings: {
            new_booking: notifNewBooking,
            reminder: notifReminder,
            cancel: notifCancel,
            system: notifSystem,
          },
          google_calendar_enabled: googleEnabled,
          line_notify_enabled: lineEnabled,
          line_notify_token: lineToken,
          is_public: !isPaused,
        })
        .eq("id", user.id);

      if (teacherError) throw teacherError;

      // Update Education
      // Get/Create School ID
      const matchedSchool = schools.find((s) => s.name === school);
      const schoolCode = matchedSchool ? matchedSchool.code : null;

      const { data: schoolId, error: schoolError } = await supabase.rpc(
        "get_or_create_school",
        {
          p_code: schoolCode,
          p_name: school,
        }
      );

      if (schoolError) throw schoolError;

      // Get Status ID
      const { data: statusData, error: statusError } = await supabase
        .from("education_statuses")
        .select("id")
        .eq("status_key", status)
        .single();

      if (statusError) throw statusError;

      // Upsert Teacher Education
      const { data: existingEdu } = await supabase
        .from("teacher_education")
        .select("id")
        .eq("teacher_id", user.id)
        .maybeSingle();

      const eduUpdates = {
        teacher_id: user.id,
        school_id: schoolId,
        status_id: statusData.id,
        department: department,
        updated_at: new Date().toISOString(),
      };

      if (existingEdu) {
        await supabase
          .from("teacher_education")
          .update(eduUpdates)
          .eq("id", existingEdu.id);
      } else {
        await supabase.from("teacher_education").insert(eduUpdates);
      }

      showModal({
        title: "成功",
        description: "設定已儲存",
        confirmText: "確定",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      showModal({
        title: "錯誤",
        description: "儲存失敗: " + error.message,
        confirmText: "確定",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePauseService = async () => {
    const action = isPaused ? "恢復" : "暫停";

    showModal({
      title: "確認",
      description: `確定要${action}服務嗎？`,
      confirmText: "確定",
      cancelText: "取消",
      showCancel: true,
      onConfirm: async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase
            .from("teacher_info")
            .update({ is_public: isPaused } as any) // Toggle: if paused(true), set public(true). if active(false), set public(false).
            .eq("id", user.id);

          if (error) throw error;

          setIsPaused(!isPaused);
          showModal({
            title: "成功",
            description: `服務已${action}`,
            confirmText: "確定",
          });
        } catch (error) {
          console.error(error);
          showModal({
            title: "錯誤",
            description: "操作失敗",
            confirmText: "確定",
          });
        }
      },
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">載入設定中...</div>;
  }

  return (
    <>
      <header className="w-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
        <div className="flex flex-col">
          <h2 className="text-slate-800 dark:text-white text-xl font-bold tracking-tight flex items-center gap-2">
            系統設定
          </h2>
          <p className="text-text-sub dark:text-gray-400 text-sm mt-0.5">
            管理您的個人資料、預約規則與通知偏好
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchSettings()}
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 border border-border-light dark:border-border-dark text-text-sub hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-all"
          >
            <span>取消修改</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">
              {saving ? "sync" : "save"}
            </span>
            <span>{saving ? "儲存中..." : "儲存設定"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1000px] mx-auto flex flex-col gap-8 pb-10">
          <section className="flex flex-col gap-6" id="personal">
            <div className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                個人設定
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center gap-4 p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                  <div className="relative group">
                    <div
                      className="size-24 rounded-full bg-slate-200 dark:bg-slate-700 bg-center bg-cover ring-4 ring-white dark:ring-surface-dark shadow-md"
                      style={{ backgroundImage: `url("${avatarUrl}")` }}
                    ></div>
                    <button
                      className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
                      title="更換頭像"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </button>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800 dark:text-white">
                      {name}
                    </h4>
                    <p className="text-xs text-text-sub dark:text-gray-400 mt-1">
                      ID: {teacherId}
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                      顯示名稱
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                      專業頭銜
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      type="text"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                      電子郵件
                    </label>
                    <input
                      value={email}
                      disabled
                      className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-100 dark:bg-slate-900 text-sm text-gray-500 cursor-not-allowed"
                      type="email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                      聯絡電話
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      type="tel"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">
                    學歷背景
                  </h4>
                  <EducationInputs
                    school={school}
                    setSchool={setSchool}
                    status={status}
                    setStatus={setStatus}
                    department={department}
                    setDepartment={setDepartment}
                  />
                </div>

                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                  <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      lock_reset
                    </span>
                    修改登入密碼
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6" id="booking">
            <div className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined">
                  calendar_clock
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                預約與時間設定
              </h3>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border-light dark:border-border-dark md:border-b-0">
                    <span className="material-symbols-outlined text-text-sub">
                      tune
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      預約規則設定
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                        開放預約範圍
                      </label>
                      <p className="text-xs text-text-sub mb-1">
                        學生可預約多久以後的課程
                      </p>
                      <select
                        value={bookingWindow}
                        onChange={(e) => setBookingWindow(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      >
                        <option>1 週內</option>
                        <option>2 週內</option>
                        <option>1 個月內</option>
                        <option>3 個月內</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                        預約間隔緩衝
                      </label>
                      <p className="text-xs text-text-sub mb-1">
                        每堂課之間的休息時間
                      </p>
                      <select
                        value={bookingBuffer}
                        onChange={(e) => setBookingBuffer(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      >
                        <option>不設間隔</option>
                        <option>15 分鐘</option>
                        <option>30 分鐘</option>
                        <option>60 分鐘</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 md:pl-8 md:border-l md:border-border-light md:dark:border-border-dark">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border-light dark:border-border-dark md:border-b-0">
                    <span className="material-symbols-outlined text-text-sub">
                      edit_calendar
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      取消與改期政策
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">
                        最晚取消時間
                      </label>
                      <select
                        value={cancelPolicy}
                        onChange={(e) => setCancelPolicy(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      >
                        <option>課程開始前 12 小時</option>
                        <option>課程開始前 24 小時</option>
                        <option>課程開始前 48 小時</option>
                      </select>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="flex h-5 items-center">
                        <input
                          checked={limitFreq}
                          onChange={(e) => setLimitFreq(e.target.checked)}
                          className="rounded text-primary focus:ring-primary border-gray-300"
                          id="penalty"
                          type="checkbox"
                        />
                      </div>
                      <label
                        className="text-sm text-slate-600 dark:text-gray-300"
                        htmlFor="penalty"
                      >
                        啟用頻繁取消限制
                        <span className="block text-xs text-text-sub mt-0.5">
                          一週內取消超過 3 次將暫停預約權限
                        </span>
                      </label>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-4">
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-xl shrink-0">
                          lightbulb
                        </span>
                        <div className="text-sm">
                          <h5 className="font-bold text-yellow-800 dark:text-yellow-400 mb-1">
                            小提示
                          </h5>
                          <p className="text-yellow-700 dark:text-yellow-300/80 leading-relaxed text-xs">
                            設定合理的取消政策有助於保障您的教學權益。建議在課程說明中也同步更新這些規則。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6" id="notification">
            <div className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined">
                  notifications_active
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                通知規則
              </h3>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-border-light dark:border-border-dark">
                      <th className="px-6 py-4 text-xs font-semibold text-text-sub uppercase tracking-wider">
                        觸發事件
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-text-sub uppercase tracking-wider text-center">
                        電子郵件
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-text-sub uppercase tracking-wider text-center">
                        站內信通知
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-text-sub uppercase tracking-wider text-center">
                        LINE 通知
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            新預約成立
                          </span>
                          <span className="text-xs text-text-sub">
                            當學生提交新的課程預約申請時
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifNewBooking.email}
                          onChange={(e) =>
                            setNotifNewBooking({
                              ...notifNewBooking,
                              email: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifNewBooking.app}
                          onChange={(e) =>
                            setNotifNewBooking({
                              ...notifNewBooking,
                              app: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifNewBooking.line}
                          onChange={(e) =>
                            setNotifNewBooking({
                              ...notifNewBooking,
                              line: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            課程前提醒
                          </span>
                          <span className="text-xs text-text-sub">
                            課程開始前 2 小時發送提醒
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifReminder.email}
                          onChange={(e) =>
                            setNotifReminder({
                              ...notifReminder,
                              email: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifReminder.app}
                          onChange={(e) =>
                            setNotifReminder({
                              ...notifReminder,
                              app: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifReminder.line}
                          onChange={(e) =>
                            setNotifReminder({
                              ...notifReminder,
                              line: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            預約取消/變更
                          </span>
                          <span className="text-xs text-text-sub">
                            當學生取消或修改預約時間時
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifCancel.email}
                          onChange={(e) =>
                            setNotifCancel({
                              ...notifCancel,
                              email: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifCancel.app}
                          onChange={(e) =>
                            setNotifCancel({
                              ...notifCancel,
                              app: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifCancel.line}
                          onChange={(e) =>
                            setNotifCancel({
                              ...notifCancel,
                              line: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            系統公告
                          </span>
                          <span className="text-xs text-text-sub">
                            平台發布的重要維護或功能更新
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifSystem.email}
                          onChange={(e) =>
                            setNotifSystem({
                              ...notifSystem,
                              email: e.target.checked,
                            })
                          }
                          disabled
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4 opacity-50 cursor-not-allowed"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifSystem.app}
                          onChange={(e) =>
                            setNotifSystem({
                              ...notifSystem,
                              app: e.target.checked,
                            })
                          }
                          disabled
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4 opacity-50 cursor-not-allowed"
                          type="checkbox"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <input
                          checked={notifSystem.line}
                          onChange={(e) =>
                            setNotifSystem({
                              ...notifSystem,
                              line: e.target.checked,
                            })
                          }
                          className="rounded text-primary focus:ring-primary border-gray-300 size-4"
                          type="checkbox"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6" id="integrations">
            <div className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined">extension</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                其他平台整合
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-6xl">
                    calendar_today
                  </span>
                </div>
                <div className="flex items-start justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark flex items-center justify-center p-2">
                      {/* Using standard img for now since external image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt="Google Calendar"
                        className="w-full h-full object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaa9q-lq_AGaRtkDR3GfsitRjPx-qG6UggEorRIHpejSfmyipRb7OIECGo9KkXHTHSxpX3yyeYU_Gs4Zj0B8HfXbmkxl6OkSeZsOcxfxFIR5e4V902heo0lahNSHn2DsKOLSv2DNtkyW9uSWChBVBSQx-8DukdjmHaBazd9QzUWz8yJ39tAfXcXs2WKyxnaOLXJhMHT2_y6-ncP8y1bucgP7DzMXATtIxHW4ddEueOz9KuBjlgDkY6Nf9T_o5JkvoXq6MJzctkdGQ"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">
                        Google 日曆
                      </h4>
                      <p className="text-xs text-text-sub">
                        同步課程時間到您的個人日曆
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={googleEnabled}
                      onChange={(e) => setGoogleEnabled(e.target.checked)}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                {googleEnabled && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg w-fit">
                    <span className="material-symbols-outlined text-sm">
                      check_circle
                    </span>
                    <span>已連結帳戶：{email}</span>
                  </div>
                )}
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="material-symbols-outlined text-6xl">
                    chat
                  </span>
                </div>
                <div className="flex items-start justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#06C755] flex items-center justify-center text-white font-bold text-xs">
                      LINE
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">
                        LINE 通知
                      </h4>
                      <p className="text-xs text-text-sub">
                        接收即時預約與提醒通知
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={lineEnabled}
                      onChange={(e) => setLineEnabled(e.target.checked)}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                {lineEnabled && (
                  <button className="text-xs text-primary font-medium border border-primary/30 rounded-lg px-3 py-2 w-fit hover:bg-primary/5 transition-colors">
                    設定 Token 連結
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 pt-6 border-t border-border-light dark:border-border-dark">
            <div className="flex items-center justify-between p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl">
              <div>
                <h4 className="text-base font-bold text-red-700 dark:text-red-400">
                  {isPaused ? "恢復帳號" : "暫停帳號"}
                </h4>
                <p className="text-sm text-red-600/80 dark:text-red-400/70 mt-1">
                  {isPaused
                    ? "您的帳號目前處於暫停狀態，學生無法預約。點擊右側按鈕恢復服務。"
                    : "暫停期間學生將無法搜尋到您的課程，且無法進行新的預約。"}
                </p>
              </div>
              <button
                onClick={handlePauseService}
                className="px-4 py-2 bg-white dark:bg-surface-dark border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-sm"
              >
                {isPaused ? "恢復服務" : "暫停服務"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

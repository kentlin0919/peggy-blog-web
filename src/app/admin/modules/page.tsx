"use client";

import { useState } from "react";
import { useSystemModules } from "@/hooks/useSystemModules";
import { supabase } from "@/lib/supabase";

export default function AdminModulesPage() {
  const { modules, loading, getModulesByRole } = useSystemModules();
  const [toggling, setToggling] = useState<string | null>(null);

  const handleToggle = async (id: string, currentState: boolean) => {
    setToggling(id);
    try {
      const { error } = await supabase
        .from("system_modules")
        .update({ is_active: !currentState })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error toggling module:", error);
      alert("Failed to update module status");
    } finally {
      setToggling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">載入中...</div>
      </div>
    );
  }

  const sections = [
    { title: "學生功能", role: "student" },
    { title: "教師功能", role: "teacher" },
    { title: "管理員功能", role: "admin" },
  ] as const;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          模組管理
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          管理系統各個角色的功能模組開關。關閉的模組將在側邊欄中隱藏。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map(({ title, role }) => (
          <div
            key={role}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-500">
                  {role === "student"
                    ? "school"
                    : role === "teacher"
                    ? "co_present"
                    : "admin_panel_settings"}
                </span>
                {title}
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {getModulesByRole(role).map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {module.label}
                    </span>
                    <span className="text-xs text-gray-400 font-mono mt-0.5">
                      {module.key}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(module.id, module.is_active)}
                    disabled={toggling === module.id}
                    className={`
                      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                      ${
                        module.is_active
                          ? "bg-sky-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }
                      ${
                        toggling === module.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    `}
                    role="switch"
                    aria-checked={module.is_active}
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                        ${module.is_active ? "translate-x-5" : "translate-x-0"}
                      `}
                    />
                  </button>
                </div>
              ))}
              {getModulesByRole(role).length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  尚無模組
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

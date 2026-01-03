"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Tag {
  id: string;
  name: string;
  teacher_id: string | null;
  created_at: string;
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTag, setCurrentTag] = useState<Partial<Tag>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    // Admin should be able to see all tags
    const { data, error } = await supabase
      .from("tags")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching tags:", error);
    } else {
      setTags(data || []);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setError(null);
    if (!currentTag.name) {
      setError("請填寫標籤名稱");
      return;
    }

    try {
      if (currentTag.id) {
        // Update
        const { error } = await supabase
          .from("tags")
          .update({
            name: currentTag.name,
            teacher_id: currentTag.teacher_id || null, // Allow setting to null for global
          })
          .eq("id", currentTag.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("tags").insert({
          name: currentTag.name,
          teacher_id: currentTag.teacher_id || null, // Allow setting to null for global
        });
        if (error) throw error;
      }

      setIsEditing(false);
      setCurrentTag({});
      fetchTags();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除此標籤嗎？")) return;

    const { error } = await supabase.from("tags").delete().eq("id", id);
    if (error) {
      alert("刪除失敗：" + error.message);
    } else {
      fetchTags();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          標籤管理
        </h1>
        <button
          onClick={() => {
            setCurrentTag({ teacher_id: null }); // Default to global when creating
            setIsEditing(true);
            setError(null);
          }}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          新增標籤
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm font-medium">
            <tr>
              <th className="px-6 py-4">標籤名稱</th>
              <th className="px-6 py-4">所屬教師 ID</th>
              <th className="px-6 py-4">建立時間</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  載入中...
                </td>
              </tr>
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  尚無資料
                </td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                    {tag.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {tag.teacher_id ? tag.teacher_id : <span className="italic text-gray-400">(全域標籤)</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(tag.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setCurrentTag(tag);
                        setIsEditing(true);
                        setError(null);
                      }}
                      className="text-sky-500 hover:text-sky-600 mr-3"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentTag.id ? "編輯標籤" : "新增標籤"}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  標籤名稱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentTag.name || ""}
                  onChange={(e) =>
                    setCurrentTag({ ...currentTag, name: e.target.value })
                  }
                  placeholder="例如：熱門, 考試必備"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  所屬教師 ID (留空則為全域標籤)
                </label>
                <input
                  type="text"
                  value={currentTag.teacher_id || ""}
                  onChange={(e) =>
                    setCurrentTag({ ...currentTag, teacher_id: e.target.value || null })
                  }
                  placeholder="留空即為全域標籤"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-sm shadow-sky-500/30"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

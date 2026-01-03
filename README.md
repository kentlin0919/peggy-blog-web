# TimeCarve 刻時

TimeCarve 是一個現代化的家教預約與時間管理平台，專為教育工作者與學生設計。它提供了一套完整的工具來管理課程、安排預約、追蹤學習進度，並優化教學體驗。

## 🎯 專案概述

本專案採用 **Clean Architecture** (整潔架構) 與 **Static Export** 模式構建，旨在提供高效、可維護且易於部署的前端應用。

- **核心目標**: 連結學生與教師，簡化預約流程，提升教學管理效率。
- **主要特色**: RWD 響應式設計、即時預約系統、角色分流 (學生/教師/管理員)、數據儀表板。
- **部署模式**: GitHub Pages (Static Export) + Supabase (Backend-as-a-Service)。

## 🛠 技術堆疊

主要技術選型如下：

- **核心框架**: [Next.js 16 (App Router)](https://nextjs.org/)
- **語言**: [TypeScript](https://www.typescriptlang.org/)
- **樣式系統**: [Tailwind CSS v4](https://tailwindcss.com/)
- **後端服務**: [Supabase](https://supabase.com/) (Auth, PostgreSQL DB, Storage)
- **資料圖表**: [Chart.js](https://www.chartjs.org/)
- **UI 組件**: 客製化設計系統 + [Geist Font](https://vercel.com/font)
- **部署**: GitHub Actions -> GitHub Pages

## 🚀 功能模組與頁面路由

專案結構清晰，依據使用者角色劃分為不同區域：

### 🌐 公開頁面 (Public)

位於 `app/(public)`，無需登入即可訪問：

- `/`: 首頁 (Landing Page)
- `/auth/login`: 登入頁面
- `/auth/register`: 註冊頁面
- `/auth/reset-password`: 重設密碼
- `/courses`: 課程探索列表
- `/courses/[courseId]`: 課程詳細資訊
- `/teachers`: 師資陣容介紹
- `/legal/*`: 服務條款與隱私權政策

### 👨‍🎓 學生專區 (Student Portal)

位於 `app/student`，需學生權限：

- `/student/dashboard`: 學生儀表板 (概況、下堂課提醒)
- `/student/bookings`: 預約管理 (查看、取消、改期)
- `/student/booking`: 新增預約流程
- `/student/courses`: 我的課程 (已購買/已報名)
- `/student/profile`: 個人資料與設定
- `/student/progress`: 學習進度追蹤
- `/student/notifications`: 系統通知

### 👩‍🏫 教師後台 (Teacher Console)

位於 `app/teacher`，需教師權限：

- `/teacher/dashboard`: 教師儀表板 (營收概覽、近期課程)
- `/teacher/courses`: 課程管理 (新增、編輯、上架、教案編寫)
- `/teacher/bookings`: 預約審核與行事曆
- `/teacher/students`: 學生 CRM (學員名單、學習紀錄)
- `/teacher/reports`: 營收與數據報表
- `/teacher/settings`: 教學設定 (預約規則、請假規則)
- `/teacher/profile`: 講師個人檔案編輯
- `/teacher/portfolio`: 作品集管理

### 🛡 管理員後台 (Admin Panel)

位於 `app/admin`，需管理員權限：

- `/admin/dashboard`: 系統總覽
- `/admin/teachers`: 教師帳號管理
- `/admin/students`: 學生帳號管理
- `/admin/class-types`: 課程類型設定
- `/admin/tags`: 標籤管理

## 🏁 快速開始

### 1. 環境準備

確保您已安裝 [Node.js](https://nodejs.org/) (建議 v20+) 和 [pnpm](https://pnpm.io/)。

### 2. 安裝依賴

```bash
pnpm install
```

### 3. 設定環境變數

複製 `.env.example` 為 `.env.local` 並填入您的 Supabase 資訊：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. 啟動開發伺服器

```bash
pnpm dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000) 即可看到畫面。

### 5. 建置與部署

```bash
pnpm build
```

此指令會執行 `next build` 並輸出靜態檔案至 `out/` 目錄，適用於靜態託管服務。

## ⚠️ 開發規範

- **Static Export 限制**: 由於專案設定為靜態輸出，**禁止使用** Middleware (`middleware.ts`)、API Routes (`app/api/*`) 以及任何依賴 Node.js Runtime 的 Server Component 功能 (`cookies()`, `headers()`)。
- **Supabase Migration**: 資料庫變更**必須**使用 CLI 指令 `supabase migration new <name>` 建立，禁止手動修改 Schema。
- **Linting**: 提交程式碼前請確保通過 ESLint 檢查。

---

© 2025 TimeCarve. All rights reserved.

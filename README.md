# TimeCarve (刻時) ⏳

TimeCarve 是一個專為家教與學生設計的現代化預約媒合平台。透過直覺的介面與強大的管理功能，協助教師建立專業品牌、管理課程與學生，並讓學生能輕鬆預約合適的課程，達成高效的時間管理與學習目標。

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%7C%20DB-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ 核心功能 (Features)

### 👨‍🏫 教師端 (Teacher Portal)
- **個人品牌頁面**: 自訂簡介、教學理念、專長標籤與作品集。
- **課程管理**: 建立多樣化課程（一對一、小班制、影音課程），設定價格與時長。
- **預約管理**: 查看與審核學生預約，支援 Google Calendar 雙向同步（開發中）。
- **學生 CRM**: 管理學生資料、學習進度與課堂筆記。
- **營收報表**: 視覺化圖表分析收入與課程熱門度。

### 👨‍🎓 學生端 (Student Portal)
- **找老師**: 透過標籤與關鍵字搜尋合適的家教。
- **線上預約**: 直覺的行事曆介面，快速預約課程時段。
- **學習歷程**: 查看過往上課記錄、評價與教師回饋。
- **課表管理**: 整合個人學習行事曆。

### 🛡️ 管理員 (Admin)
- **用戶管理**: 審核教師資格，管理違規用戶。
- **系統設定**: 設定課程分類、標籤與全域參數。

## 🛠️ 技術堆疊 (Tech Stack)

- **Frontend Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (SSR w/ Middleware)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 快速開始 (Getting Started)

### 前置需求
- Node.js 20+
- pnpm (推薦) 或 npm/yarn
- 一個 Supabase 專案

### 1. 安裝專案
```bash
git clone https://github.com/your-username/time-carve-web.git
cd time-carve-web
pnpm install
```

### 2. 設定環境變數
複製 `.env.example` 並重新命名為 `.env.local`，填入您的 Supabase 憑證：

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 啟動開發伺服器
```bash
pnpm dev
```
瀏覽器打開 [http://localhost:3000](http://localhost:3000) 即可看到畫面。

## 📂 專案結構 (Project Structure)

本專案採用 **Clean Architecture** 風格，將業務邏輯與 UI 分離。

```
src/
├── app/                  # Next.js App Router 頁面
│   ├── (public)/         # 公開頁面 (首頁, 課程列表)
│   ├── student/          # 學生後台 (需登入)
│   ├── teacher/          # 教師後台 (需登入)
│   ├── admin/            # 管理員後台
│   └── api/              # API Routes
├── components/           # UI 組件
│   ├── ui/               # 基礎原子組件 (Button, Input...)
│   └── ...
├── lib/                  # 核心邏輯 (Clean Architecture)
│   ├── domain/           # 實體 (Entity) 與 介面 (Interface)
│   ├── application/      # 應用層 (Use Cases)
│   ├── infrastructure/   # 實作層 (Repositories, API Calls)
│   ├── store/            # 狀態管理 (Zustand)
│   └── supabase/         # Supabase Client 設定
├── types/                # TypeScript 型別 (包含 DB Schema)
└── middleware.ts         # 路由保護與 Session 管理
```

## 🗄️ 資料庫開發 (Database Development)

本專案依賴 Supabase。開發時請遵循以下流程：

1. **修改 Schema**: 使用 Supabase Migration。
   ```bash
   supabase migration new add_some_table
   ```
2. **套用變更**:
   ```bash
   supabase db reset # 本地開發
   # 或
   supabase db push # 推送至遠端 (小心使用)
   ```
3. **更新 TypeScript 型別**:
   ```bash
   supabase gen types typescript --local > src/types/database.types.ts
   ```

## 🤝 貢獻 (Contributing)

1. Fork此專案
2. 建立您的 Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權 (License)

Distributed under the MIT License. See `LICENSE` for more information.
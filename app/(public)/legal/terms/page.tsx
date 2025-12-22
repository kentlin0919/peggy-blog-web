import React from "react";
import Link from "next/link";

export const metadata = {
  title: "使用者條款 | Peggy Blog Web",
  description: "Peggy Blog Web 使用者條款（Terms of Service），規範雙方權利義務。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
            回首頁
          </Link>
          <div className="flex gap-4 text-sm text-gray-500">
             <span className="text-gray-900">使用者條款</span>
             <span>|</span>
             <Link href="/legal/privacy" className="hover:text-primary transition-colors">隱私權政策</Link>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            使用者服務條款
          </h1>
          <p className="text-center text-gray-500 mb-8">
            生效日期：2025 年 12 月 21 日
          </p>

          <div className="space-y-8 text-gray-600 leading-relaxed text-justify">
            <section>
              <p className="mb-4">
                歡迎您使用 Peggy Blog Web（以下簡稱「本平台」）。本平台係由 [您的公司/團隊名稱]（以下簡稱「我們」）所經營。為了保障您的權益，請您在註冊或使用本服務前，詳細閱讀本使用者服務條款（以下簡稱「本條款」）。
              </p>
              <p className="font-bold text-gray-800">
                當您完成註冊或開始使用本服務時，即視為您已閱讀、瞭解並同意接受本條款之所有內容。若您不同意本條款之全部或部分內容，請您立即停止使用本服務。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                一、會員註冊與帳號安全
              </h2>
              <ul className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>註冊義務：</strong>您同意於註冊時提供正確、最新及完整的個人資料，並維持該資料之即時性。若您提供任何錯誤、不實或不完整的資料，本平台有權暫停或終止您的帳號。
                </li>
                <li>
                  <strong>行為能力：</strong>若您未滿 20 歲，應於您的法定代理人（家長或監護人）閱讀、瞭解並同意本條款之所有內容後，方得註冊及使用本服務。
                </li>
                <li>
                  <strong>帳號保管：</strong>您有義務妥善保管您的帳號及密碼，並對該帳號登入後所進行之一切活動負責。請勿將帳號出借、轉讓或與他人共用。
                </li>
                <li>
                  <strong>安全通知：</strong>若您發現您的帳號遭到盜用或有其他安全漏洞，應立即通知本平台，以便我們採取適當措施。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                二、使用者行為規範
              </h2>
              <p className="mb-4">您同意並承諾不利用本服務從事任何侵害他人權益或違法之行為，包括但不限於：</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>上載、張貼、公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗之文字、圖片或任何形式的檔案。</li>
                <li>侵害他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。</li>
                <li>違反依法律或契約所應負之保密義務。</li>
                <li>冒用他人名義使用本服務。</li>
                <li>上載、張貼、傳輸或散佈任何含有電腦病毒或對電腦軟、硬體產生中斷、破壞或限制功能之程式碼之資料。</li>
                <li>從事不法交易行為或張貼虛假不實、引人犯罪之訊息。</li>
                <li>其他本平台有正當理由認為不適當之行為。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                三、服務內容與變更
              </h2>
              <ul className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>服務內容：</strong>本平台主要提供線上課程資訊瀏覽、課程預約、作品集展示等服務。
                </li>
                <li>
                  <strong>服務變更：</strong>本平台保留隨時修改、暫停或終止本服務之全部或部分內容之權利，並將於網站公告，恕不另行個別通知。
                </li>
                <li>
                  <strong>系統維護：</strong>於發生下列情形之一時，本平台有權可以停止、中斷提供本服務：
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-500">
                    <li>本平台資訊設備進行必要之保養及施工時。</li>
                    <li>發生突發性之電子通信設備故障時。</li>
                    <li>本平台申請之電子通信服務被停止，無法提供服務時。</li>
                    <li>由於天災等不可抗力之因素致使本平台無法提供服務時。</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                四、智慧財產權保護
              </h2>
              <ul className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>平台內容：</strong>本平台所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，均由本平台或其他權利人依法擁有其智慧財產權。
                </li>
                <li>
                  <strong>授權限制：</strong>若您購買或預約本平台之課程，您僅取得該課程內容之「個人」、「非專屬」、「不可轉讓」之使用權。您不得將課程內容重製、公開傳輸、轉售、分享帳號給他人或進行其他商業利用。
                </li>
                <li>
                  <strong>使用者內容：</strong>您上傳至本平台之作品集、評論或其他內容，您保留其著作權，但同意授權本平台為推廣服務之目的，進行合理之重製、公開傳輸及編輯。
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                五、付費與退費政策
              </h2>
              <p className="mb-4">
                若本平台提供付費課程服務，相關付費方式、價格及退費規定將依各課程頁面說明為主。原則上，本平台參照行政院公告之《網際網路教學服務定型化契約範本》辦理退費事宜。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                六、免責聲明
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>本平台不保證各項服務之穩定、安全、無誤、及不中斷。</li>
                <li>本平台對於您使用本服務或經由本服務連結之其他網站而取得之任何資訊，不擔保其真實性、完整性、即時性或可靠性。</li>
                <li>對於您透過本平台刊登或發布之虛假、違法資訊、侵害他人權益及欺騙、敲詐行為者，純屬您個人行為，本平台對此不負任何責任。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                七、準據法與管轄法院
              </h2>
              <p>
                本條款之解釋與適用，以及與本條款有關之爭議，均應依照中華民國法律予以處理，並以台灣台北地方法院為第一審管轄法院。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                八、聯絡我們
              </h2>
              <p>
                若您對本使用者條款有任何疑問，歡迎透過以下方式與我們聯繫：
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">Peggy Blog Web 客服中心</p>
                <p className="text-gray-600 mt-1">Email: support@peggyblog.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
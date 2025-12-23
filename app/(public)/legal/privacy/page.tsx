import React from "react";
import Link from "next/link";

export const metadata = {
  title: "隱私權政策 | TimeCarve 刻時",
  description: "TimeCarve 刻時 遵守《個人資料保護法》，致力於保護您的個人資料隱私。",
};

export default function PrivacyPage() {
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
             <Link href="/legal/terms" className="hover:text-primary transition-colors">使用者條款</Link>
             <span>|</span>
             <span className="text-gray-900">隱私權政策</span>
          </div>
        </div>
      </header>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            隱私權政策
          </h1>
          <p className="text-center text-gray-500 mb-8">
            生效日期：2025 年 12 月 21 日
          </p>
          
          <div className="space-y-8 text-gray-600 leading-relaxed text-justify">
            <section>
              <p className="mb-4">
                TimeCarve 刻時（以下簡稱「本平台」）非常重視您的隱私權。為了讓您能夠安心使用本平台的各項服務與資訊，特此向您說明本平台的隱私權保護政策，以保障您的權益。本政策遵循中華民國《個人資料保護法》（以下簡稱「個資法」）及相關法令規範制定。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                一、隱私權保護政策的適用範圍
              </h2>
              <p>
                本隱私權保護政策內容，包括本平台如何處理在您使用網站服務時收集到的個人識別資料。本政策不適用於本平台以外的相關連結網站，也不適用於非本平台所委託或參與管理的人員。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                二、個人資料的蒐集、處理及利用方式
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-gray-800">蒐集之目的：</strong><br/>
                  本平台的蒐集目的在於進行客戶管理、會員管理、行銷、教學服務提供、契約與類似契約義務之履行、網路購物及其他電子商務服務、統計調查與分析等（法定特定目的項目編號為 040, 090, 069, 109, 148, 157 等）。
                </li>
                <li>
                  <strong className="text-gray-800">蒐集之個人資料類別：</strong><br/>
                  <ul className="list-circle pl-4 mt-1 space-y-1 text-gray-500">
                    <li>識別類（C001）：如姓名、地址、電話號碼、電子郵件等。</li>
                    <li>特徵類（C011）：如年齡、性別、出生年月日等。</li>
                    <li>社會情況類（C038）：如職業、學歷等（針對教師會員）。</li>
                    <li>財務細節類（C081）：如支付工具之號碼（信用卡號碼等，僅經由第三方金流處理，本平台不直接儲存）。</li>
                  </ul>
                </li>
                <li>
                  <strong className="text-gray-800">利用期間、地區、對象及方式：</strong><br/>
                  <ul className="list-circle pl-4 mt-1 space-y-1 text-gray-500">
                    <li>期間：自您同意成為會員之日起至本平台停止服務、您終止會員資格或您請求刪除資料為止。</li>
                    <li>地區：中華民國境內及本平台伺服器所在地。</li>
                    <li>對象：本平台、與本平台合作之金流服務商、物流服務商（若有實體商品）、主管機關或司法檢調單位（依法律要求時）。</li>
                    <li>方式：以自動化機器或其他非自動化之利用方式。</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                三、資料之保護
              </h2>
              <p className="mb-4">
                本平台主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
              </p>
              <p>
                如因業務需要有必要委託其他單位提供服務時，本平台亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                四、網站對外的相關連結
              </h2>
              <p>
                本平台的網頁提供其他網站的網路連結，您也可經由本平台所提供的連結，點選進入其他網站。但該連結網站不適用本平台的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                五、與第三人共用個人資料之政策
              </h2>
              <p className="mb-4">
                本平台絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
              </p>
              <p className="mb-2">前項但書之情形包括不限於：</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>經由您書面同意。</li>
                <li>法律明文規定。</li>
                <li>為免除您生命、身體、自由或財產上之危險。</li>
                <li>與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。</li>
                <li>當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                六、Cookie 之使用
              </h2>
              <p>
                為了提供您最佳的服務，本平台會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但也因此可能會導致網站某些功能無法正常執行。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                七、當事人權利行使
              </h2>
              <p className="mb-4">
                依據個資法第三條規定，您就本平台保有您之個人資料得行使下列權利：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>查詢或請求閱覽。</li>
                <li>請求製給複製本。</li>
                <li>請求補充或更正。</li>
                <li>請求停止蒐集、處理或利用。</li>
                <li>請求刪除。</li>
              </ul>
              <p className="mt-4 text-sm bg-blue-50 p-4 rounded-lg text-blue-800">
                <strong>注意：</strong>若您申請刪除其個人資料，可能會導致無法繼續使用本平台部分或全部服務（例如：無法登入、無法查詢歷史課程紀錄等）。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                八、未成年人保護
              </h2>
              <p>
                本平台並非特別為未成年人/兒童設計，但我們重視兒童的隱私。若您未滿 20 歲（或當地法律規定的成年年齡），應請您的法定代理人（家長或監護人）閱讀、瞭解並同意本政策之所有內容後，方得使用本平台服務。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                九、隱私權政策之修正
              </h2>
              <p>
                本平台隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。建議您定期閱讀本政策以掌握最新資訊。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                十、聯絡我們
              </h2>
              <p>
                若您對本隱私權政策有任何疑問，或欲行使您的個人資料權利，歡迎透過以下方式與我們聯繫：
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">TimeCarve 刻時 客服中心</p>
                <p className="text-gray-600 mt-1">Email: support@timecarve.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

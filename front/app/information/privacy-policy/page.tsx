import Link from "next/link";

export default function policyPage() {
  return (
    <>
      <div className="ml-3 mt-3">
        <Link href={"/"}>⇐ タイトルに戻る</Link>
      </div>
      <h1 className="text-2xl font-bold my-4 text-center">プライバシーポリシー</h1>
      <main className="p-6 max-w-3xl mx-auto text-sm leading-relaxed overflow-y-auto">
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">お客様から取得する情報</h2>
          <p className="mb-4">
            「コトダマノキ」（以下，「本サービス」とします）は、お客様から以下の情報を取得します。
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>氏名（ニックネームやペンネームも含む）</li>
            <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
            <li>Cookie（クッキー）を用いて生成された識別情報</li>
            <li>当アプリの起動時間、入力履歴、アプリの利用履歴</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">お客様の情報を利用する目的</h2>
          <p className="mb-4">
            当チームは、お客様から取得した情報を、以下の目的で利用します。
          </p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>当サービスに関する登録の受付、お客様の認証のため</li>
            <li>お客様の当サービスの利用履歴を管理するため</li>
            <li>当サービスにおけるお客様の行動履歴を分析し、サービスの維持改善に役立てるため</li>
            <li>当サービスに関するお知らせや重要な通知をお送りするため</li>
            <li>お客様からのお問い合わせに対応するため</li>
            <li>当サービスの利用に関して規約や法令に違反する行為に対応するため</li>
            <li>サービスの変更、提供中止、終了、契約解除に関するご連絡をするため</li>
            <li>当規約の変更等を通知するため</li>
            <li>上記以外、サービスの提供、維持、保護及び改善のため</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">安全管理のために講じる措置</h2>
          <p className="mb-4">
            本サービスは、お客様から取得した情報に関して安全管理を徹底し、必要に応じて適切な措置を講じています。具体的な措置についてのお問い合わせは、「お問い合わせ」ページより本サービスの定める方法でご連絡下さい。
          </p>
          <p className="mb-4">
            他のユーザーからの誹謗中傷や、嫌がらせを目的とする行為の被害を受けた場合、またはその恐れがある場合には、当サービスの「お問い合わせ」ページよりご連絡ください。必要に応じて、当サービスの運営チームが適切な措置を講じます。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第三者提供</h2>
          <p className="mb-4">
            当チームは、お客様から取得した情報のうち、個人データ（個人情報保護法第16条第3項）に該当するものについて、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます）に提供することはありません。ただし、次の場合は除きます。
          </p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>法律によって合法的に第三者提供が許されている場合</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">プライバシーポリシーの変更</h2>
          <p className="mb-4">
            当チームは、必要に応じてこのプライバシーポリシーの内容を変更することがあります。変更後のプライバシーポリシーの施行時期と内容については、適切な方法により周知または通知します。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">お問い合わせ</h2>
          <p className="mb-4">
            お客様の情報の開示、訂正、利用停止、削除をご希望の場合は、「お問い合わせ」ページより本サービスの定める方法でご連絡ください。なお、返信には数日かかる場合がありますので、あらかじめご了承ください。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">開発者情報</h2>
          <ul className="list-none pl-5">
            <li>開発代表者の氏名: 澤田昂大</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">施行日</h2>
          <p>2025年05月7日 制定</p>
        </section>
      </main>
    </>
  );
};


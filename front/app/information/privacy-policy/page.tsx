export default function policyPage() {
  return (
      <main className="p-6 max-w-3xl mx-auto text-sm leading-relaxed">
        <h1 className="text-2xl font-bold mb-4 text-center">プライバシーポリシー</h1>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">お客様から取得する情報</h2>
          <p className="mb-4">
            当チームは、お客様から以下の情報を取得します。
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
          <h2 className="text-lg font-semibold mb-2">安全管理のために講じた措置</h2>
          <p className="mb-4">
            当チームは、お客様から取得した情報に関して安全管理を徹底し、必要に応じて適切な措置を講じています。具体的な措置についてのお問い合わせは、以下の連絡先にご連絡いただければ、法令に従って個別にご回答いたします。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第三者提供</h2>
          <p className="mb-4">
            当チームは、お客様から取得した情報のうち、個人データ（個人情報保護法第16条第3項）に該当するものについて、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます）に提供することはありません。ただし、次の場合は除きます。
          </p>
          <ul className="list-decimal pl-5 space-y-2">
            <li>個人データの取扱いを外部に委託する場合</li>
            <li>当チームや当サービスが買収された場合</li>
            <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します）</li>
            <li>その他、法律によって合法的に第三者提供が許されている場合</li>
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
            お客様の情報の開示、訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
          </p>
          <ul className="list-none pl-5">
            <li>メールアドレス: 〇〇〇〇〇〇〇〇</li>
          </ul>
          <p className="mb-4">
            この場合、運転免許証など、当チームが指定する方法により、ご本人からの請求であることを確認させていただきます。情報の開示請求に関しては、開示の有無に関わらず、1件あたり1,000円の事務手数料を申し受けます。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">開発者情報</h2>
          <ul className="list-none pl-5">
            <li>開発者の氏名: 澤田昂大</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">施行日</h2>
          <p>2025年05月7日 制定</p>
        </section>
      </main>

  );
};


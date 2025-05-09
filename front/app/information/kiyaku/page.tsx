import Link from "next/link";

export default function KiyakuPage() {
  return (
    <>
      <div className="ml-3 mt-3">
        <Link href={"/"}>⇐ タイトルに戻る</Link>
      </div>
      <h1 className="text-2xl font-bold my-4 text-center">利用規約</h1>
      <main className="p-6 max-w-3xl mx-auto text-sm leading-relaxed overflow-y-auto">
        <p className="mb-6">
          この利用規約（以下、「本規約」といいます。）は、澤田昂大（以下、「開発者」といいます）を代表とする「コトダマノキプロジェクトチーム」が提供する、「コトダマノキ」（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザー（以下、「ユーザー」といいます。）の皆さまには、本規約に同意の上、本サービスをご利用いただきます。
        </p>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第1条（適用）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              本規約は、ユーザーと開発者との間における、本サービスの利用に関わる一切の関係に適用されるものとします。
            </li>
            <li>
              開発者は、本サービスに関し、本規約のほか、利用上のルールその他の指針（以下、「個別規定」といいます。）を定めることがあります。これら個別規定は、その名称のいかんにかかわらず、本規約の一部を構成するものとします。
            </li>
            <li>
              本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第2条（利用登録）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              本サービスにおいては、登録希望者が本規約に同意の上、開発者が定める方法によって利用登録を申請し、開発者がその承認を登録希望者に通知することによって、利用登録が完了するものとします。
            </li>
            <li>
              開発者は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切開示義務を負わないものとします。
              <ol className="list-decimal pl-5 space-y-1 mt-2">
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他，開発者が利用登録を相当でないと判断した場合</li>
              </ol>
            </li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第3条（アカウントおよび認証情報の管理）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              ユーザーは、自己の責任において、本サービスのアカウントおよび認証に利用する外部サービス（GitHub、X、Google等）の情報を適切に管理するものとします。
            </li>
            <li>
              ユーザーは、外部認証サービスの利用にあたって第三者に不正に利用されないよう、各外部サービスのアカウント管理に十分留意するものとします。開発者は、外部認証により本人確認が完了した場合には、当該アカウントの保有者による利用とみなします。
            </li>
            <li>
              認証情報が第三者により不正に利用されたことによりユーザーに生じた損害については、開発者に故意または重大な過失がある場合を除き、一切の責任を負いません。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第4条（利用料金）</h2>
          <p>
            本サービスは、現在のところすべての機能を無料で提供しています。将来的に有料機能を導入する場合には、その内容・料金・支払方法等について、あらかじめユーザーに告知した上で適切に定めるものとします。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第5条（禁止事項）</h2>
          <p className="mb-2">
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの他のユーザーまたは第三者のサーバー・ネットワークの機能を破壊または妨害する行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>不正アクセスをし，またはこれを試みる行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>本サービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>本サービスの他のユーザーまたは第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為</li>
            <li>
              以下のいずれかに該当する、または当方がそのおそれがあると判断する内容を投稿または送信する行為
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>過度に暴力的な表現</li>
                <li>露骨な性的表現</li>
                <li>差別につながる表現（人種、国籍、信条、性別、社会的地位等）</li>
                <li>自殺，自傷行為，薬物乱用を誘引または助長する表現</li>
                <li>その他反社会的な内容を含み他人に不快感を与える表現</li>
              </ol>
            </li>
            <li>
              以下を目的とし，または目的とすると当社が判断する行為
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>営利目的の宣伝・勧誘（当方が許可した場合を除く）</li>
                <li>性行為やわいせつな行為を目的とする行為</li>
                <li>出会いを目的とする行為</li>
                <li>他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為</li>
                <li>その他、第三者または当方に不利益や不快感を与える行為</li>
                <li>本サービスの趣旨・目的に反する利用</li>
              </ol>
            </li>
            <li>宗教活動または宗教団体への勧誘行為</li>
            <li>その他，開発者が不適切と判断する行為</li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第6条（本サービスの提供の停止等）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、以下のいずれかの事由があると判断した場合、ユーザーに事前の通知なく、本サービスの全部または一部の提供を停止または中断することができるものとします。
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他，開発者がサービスの提供が困難と判断した場合</li>
              </ol>
            </li>
            <li>
              当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第7条（著作権）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              ユーザーは、自ら著作権その他の知的財産権を有するか、または正当な権利者から許諾を得た文章、画像、映像、その他コンテンツのみを、本サービス上に投稿またはアップロードするものとします。
            </li>
            <li>
              ユーザーが本サービスに投稿またはアップロードしたコンテンツ（文章、画像、映像など）の著作権は、開発者に帰属するものとします。開発者は、本サービスの機能改善、品質向上、バグ修正、またはサービスの紹介・運営等の目的において、必要な範囲でこれらコンテンツを使用することができるものとし、ユーザーはこれに対して著作者人格権を行使しないものとします。
            </li>
            <li>
              本サービスおよび本サービス上の全ての情報・機能に関する著作権およびその他の知的財産権は、開発者または正当な権利を有する第三者に帰属し、ユーザーは開発者の許可なく、これらの全部または一部を複製、転用、翻案、公開、送信、配布、販売などしてはならないものとします。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第8条（利用制限および登録抹消）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、ユーザーが以下のいずれかに該当すると判断した場合、事前通知なく、投稿データの削除、サービスの全部または一部の利用制限、もしくはユーザー登録の抹消を行うことができるものとします。
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>その他，当社が本サービスの利用を適当でないと判断した場合</li>
              </ol>
            </li>
            <li>
              前項に該当した場合、ユーザーは運営に対して有する一切の債務を直ちに履行するものとします。
            </li>
            <li>
              開発者は、本条に基づく措置によってユーザーに生じた損害について、一切責任を負わないものとします。
            </li>
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第9条（退会）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              ユーザーは、所定の方法により、いつでも本サービスから退会することができます。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第10条（保証の否認および免責事項）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、本サービスに瑕疵（エラー、バグ、セキュリティ上の問題等）がないことを保証しません。
            </li>
            <li>
              本サービスの利用によって生じた損害について、開発者は故意または重大な過失がない限り、一切責任を負いません。
            </li>
            <li>
              仮に開発者が損害賠償責任を負う場合でも、通常生じ得る範囲内の損害に限り、かつその賠償額は月あたりの利用料金の相当額を上限とします。ただし、現時点で本サービスが無償提供である場合、この条項は適用されません。
            </li>
            <li>
              ユーザー間またはユーザーと第三者との間で生じたトラブルについて、開発者は一切責任を負いません。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第11条（サービス内容の変更等）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、必要に応じて、本サービスの内容を変更、追加または終了することがあります。事前に可能な限りユーザーに通知するものとしますが、緊急性の高い変更に関しては事後の通知となる場合があります。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第12条（利用規約の変更）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、以下の場合において、ユーザーの個別の同意を要せず本規約を変更することができるものとします。
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                <li>本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。</li>
              </ol>
            </li>
            <li>
              規約を変更する場合、開発者は変更内容およびその効力発生時期を事前に本サービス上または指定の方法で通知します。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第13条（個人情報の取扱い）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              開発者は、本サービスを通じて取得したユーザーの個人情報を、別途定める「プライバシーポリシー」に従い、適切に取り扱います。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第14条（通知または連絡）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              ユーザーと開発者との間の通知または連絡は、本サービス内での通知、メール、その他開発者が指定する方法により行います。開発者は、ユーザーから正しい連絡先の変更通知がない限り、登録された連絡先を有効なものとみなし、その連絡は発信時に到達したものとみなします。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第15条（権利義務の譲渡の禁止）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">第16条（準拠法・裁判管轄）</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              本規約の解釈にあたっては、日本法を準拠法とします。
            </li>
            <li>
              本サービスに関する紛争については、開発者の拠点所在地を管轄する裁判所を専属的合意管轄とします。
            </li>
          </ol>
        </section>
      </main>
    </>
  );
};

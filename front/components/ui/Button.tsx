'use client';

/**
 * 共通ボタンコンポーネント
 * 
 * @param text ボタンに表示するテキスト
 * @param buttonType "default","ok","cancel","danger"から選択。省略可(=default)
 * @param handleClick ボタンクリック時の処理
 * @param inProgress trueの場合, disabled属性を付与し、カーソルデザインを変更
 * @param isDisabled trueの場合, disabled属性を付与し、カーソルデザインを変更
 * 
 * @note
 * サイズは規定していないため、ラップするdiv要素で調整すること
 */

type Props = {
  text: string;
  buttonType?: "default" | "ok" | "cancel" | "danger";
  handleClick?: () => void;
  submit?: boolean;
  inProgress?: boolean;
  isDisabled?: boolean;
};

export default function Button({
    text,
    buttonType="default",
    handleClick=() => {},
    submit=false,
    inProgress=false,
    isDisabled=false
  }: Props) {

  // buttonTypeに応じたデザインを定義(NonNullableでnullとundefinedを除外)
  const buttonTypeClasses: Record<NonNullable<Props["buttonType"]>, string> = {
    default: "bg-gray-900 hover:bg-gray-800",
    ok: "bg-cyan-500 hover:bg-cyan-400",
    cancel: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-rose-600 hover:bg-rose-700",
  };

  // ボタンの状態に応じたスタイルを定義
  const modeStyle = inProgress ? "opacity-50 cursor-progress" :
                      isDisabled ? "opacity-50 cursor-not-allowed" :
                      "cursor-pointer";

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={handleClick}
      className={
        `px-4 py-2 font-bold border-2 border-white rounded transition
          ${buttonTypeClasses[buttonType]} 
          ${modeStyle} 
        `}
      disabled={isDisabled || inProgress}
    >
      {text}
    </button>
  )
}
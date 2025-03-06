import { signIn } from "@/auth";
import { GitHubIcon, GoogleIcon, XIcon } from "./ProviderIcons";

type Provider = "github" | "google" | "x";

// プロバイダーごとのテキストとアイコンを定義
const providerData: Record<Provider, { text: string; Icon: React.FC }> = {
  github: { text: "GitHub", Icon: GitHubIcon },
  google: { text: "Google", Icon: GoogleIcon },
  x: { text: "X", Icon: XIcon },
};

export default function SignInButton({provider}: {provider: Provider}) {
  if (!provider) return null;

  const { text, Icon } = providerData[provider];

  return (
    <form
    action={ async () =>  {
      'use server';
      await signIn(provider);
    }}
  >
    <button className="flex items-center w-60 h-10 px-4 py-2 font-bold border-2 border-white bg-gray-900 hover:bg-gray-700 rounded transition">
        <Icon />
        <p className="flex-grow text-center">{text}</p>
        <div className="w-6"></div>
    </button>
  </form>
  )
}

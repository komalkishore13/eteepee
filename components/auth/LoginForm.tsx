"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-[#dadce0] rounded-2xl p-8 w-full">
      {/* YouTube Logo */}
      <div className="flex justify-center mb-6">
        <svg viewBox="0 0 90 20" className="h-8" aria-label="YouTube">
          <g>
            <path
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
              fill="#FF0000"
            />
            <path
              d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
              fill="white"
            />
          </g>
          <g>
            <path
              d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3889 6.4809C35.7182 7.79808 35.9628 8.93685 36.1243 9.89508H36.2166C36.3297 9.24997 36.5744 8.11119 36.9530 6.4809L38.2084 1.41846H41.0071L37.7362 13.0036V18.561H34.6001V13.0036H34.6024Z"
              fill="#282828"
            />
            <path
              d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.96995 40.3174 8.1680C40.5926 7.36606 41.0257 6.7734 41.6134 6.38051C42.2011 5.98991 42.9781 5.79459 43.9443 5.79459C44.8952 5.79459 45.6556 5.99228 46.2286 6.38996C46.8016 6.78763 47.2187 7.38291 47.4792 8.1680C47.7396 8.95537 47.8721 10.0422 47.8721 11.3898V13.2078C47.8721 14.5437 47.7444 15.6161 47.4909 16.4251C47.2374 17.2365 46.8297 17.8292 46.2696 18.2011C45.7094 18.5731 44.9227 18.7591 43.9025 18.7591C42.8448 18.7591 42.0342 18.5707 41.4697 18.1937ZM44.6552 16.2906C44.7946 15.9072 44.8645 15.2967 44.8645 14.4665V10.1326C44.8645 9.32826 44.7946 8.72998 44.6552 8.34887C44.5157 7.96775 44.2698 7.77713 43.9166 7.77713C43.5757 7.77713 43.3345 7.96775 43.1974 8.34887C43.0604 8.72998 42.9917 9.32826 42.9917 10.1326V14.4665C42.9917 15.2967 43.0581 15.9072 43.1904 16.2906C43.3228 16.674 43.5617 16.8646 43.9025 16.8646C44.2433 16.8646 44.4846 16.674 44.6552 16.2906Z"
              fill="#282828"
            />
            <path
              d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3025C53.7031 18.1871 52.8055 18.7656 51.6103 18.7656C50.7666 18.7656 50.1377 18.4928 49.7239 17.9496C49.3101 17.4064 49.1025 16.5716 49.1025 15.458V6.03751H52.0466V15.2765C52.0466 15.7491 52.0993 16.0919 52.2039 16.3023C52.3085 16.5162 52.4914 16.622 52.7436 16.622C52.9622 16.622 53.1784 16.5551 53.3944 16.4213C53.6105 16.2875 53.7697 16.1146 53.8743 15.9088V6.03516H56.8154V18.5634Z"
              fill="#282828"
            />
            <path
              d="M64.4755 3.68758H61.5397V18.5629H58.6732V3.68758H55.7374V1.41846H64.4755V3.68758Z"
              fill="#282828"
            />
            <path
              d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7639C68.1645 18.1871 67.2669 18.7656 66.0717 18.7656C65.228 18.7656 64.5991 18.4928 64.1853 17.9496C63.7715 17.4064 63.5639 16.5716 63.5639 15.458V6.03751H66.508V15.2765C66.508 15.7491 66.5607 16.0919 66.6653 16.3023C66.7699 16.5162 66.9528 16.622 67.205 16.622C67.4236 16.622 67.6398 16.5551 67.8558 16.4213C68.0719 16.2875 68.2311 16.1146 68.3357 15.9088V6.03516H71.2768V18.5634Z"
              fill="#282828"
            />
            <path
              d="M80.609 8.0387C80.4128 7.24205 80.0949 6.6696 79.6578 6.32892C79.2208 5.98825 78.6293 5.81761 77.8821 5.81761C77.2935 5.81761 76.7425 5.98292 76.2291 6.31824C75.7156 6.65121 75.3203 7.08903 75.0384 7.63635H75.0196V0.892578H72.1896V18.5633H74.7444L75.0548 17.2234H75.1271C75.3853 17.7078 75.7709 18.0926 76.2854 18.3779C76.7999 18.6631 77.3767 18.8058 78.0158 18.8058C79.1915 18.8058 80.0292 18.2317 80.5378 17.0841C81.0440 15.9365 81.2997 14.1808 81.2997 11.8156V10.0469C81.2973 9.11718 81.0652 8.83534 80.609 8.0387ZM78.3633 11.6948C78.3633 12.7855 78.3062 13.6568 78.1920 14.309C78.0778 14.9611 77.8961 15.4358 77.6422 15.7275C77.3907 16.0183 77.0697 16.1637 76.6786 16.1637C76.4204 16.1637 76.1851 16.1001 75.9721 15.9785C75.7591 15.8569 75.5907 15.6839 75.4693 15.4593V8.87953C75.5653 8.54186 75.7360 8.2664 75.9790 8.05525C76.2220 7.84409 76.4932 7.73735 76.7921 7.73735C77.1735 7.73735 77.4698 7.88396 77.6843 8.17954C77.8988 8.47277 78.0519 8.95165 78.1453 9.61602C78.2363 10.2804 78.2855 11.2126 78.2855 12.4096V11.6948H78.3633Z"
              fill="#282828"
            />
            <path
              d="M84.8657 13.9649C84.8657 14.4988 84.8892 14.9107 84.9363 15.2025C84.9833 15.4942 85.0821 15.7086 85.2284 15.8442C85.3748 15.9799 85.5914 16.0466 85.878 16.0466C86.2672 16.0466 86.5265 15.9025 86.6492 15.6178C86.7742 15.3331 86.8391 14.8608 86.8486 14.2185L89.3956 14.364C89.4127 14.493 89.4197 14.6742 89.4197 14.9036C89.4197 16.1166 89.0971 17.0199 88.4593 17.6059C87.8168 18.1919 86.9079 18.4849 85.7337 18.4849C84.3471 18.4849 83.374 18.0714 82.8185 17.2423C82.2629 16.4158 81.9852 15.1373 81.9852 13.4007V11.2048C81.9852 9.4213 82.2723 8.11491 82.8443 7.28462C83.4163 6.45198 84.4027 6.03691 85.8023 6.03691C86.7862 6.03691 87.5409 6.2232 88.0707 6.60196C88.6006 6.98072 88.9647 7.56366 89.1656 8.35073C89.3641 9.14015 89.4657 10.2347 89.4657 11.6322V13.6741H84.8657V13.9649ZM85.2072 8.26986C85.0656 8.39955 84.9692 8.61601 84.9174 8.91926C84.8657 9.22251 84.8398 9.68781 84.8398 10.3219V11.2953H86.8798V10.3219C86.8798 9.70016 86.8517 9.23486 86.7953 8.91926C86.7366 8.60601 86.6374 8.39485 86.4935 8.26986C86.3519 8.14252 86.1423 8.0788 85.8756 8.0788C85.5814 8.07645 85.3466 8.14252 85.2072 8.26986Z"
              fill="#282828"
            />
          </g>
        </svg>
      </div>

      <h1 className="text-2xl font-normal text-[#202124] text-center mb-2">
        Sign in
      </h1>
      <p className="text-sm text-[#444746] text-center mb-6">
        to continue to YouTube
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-[#fce8e6] border border-[#f28b82] text-[#c5221f] text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
            className="peer w-full border border-[#747775] rounded px-3 pt-4 pb-2 text-sm text-[#202124] bg-transparent focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none transition"
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#444746] pointer-events-none transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#1a73e8] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email or phone
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
            className="peer w-full border border-[#747775] rounded px-3 pt-4 pb-2 pr-10 text-sm text-[#202124] bg-transparent focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none transition"
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#444746] pointer-events-none transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#1a73e8] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Enter your password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444746] hover:text-[#1a73e8]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/signup"
            className="text-sm font-medium text-[#1a73e8] hover:text-[#1558b0]"
          >
            Create account
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#1a73e8] hover:bg-[#1558b0] disabled:bg-[#1a73e8]/60 text-white text-sm font-medium px-6 py-2 rounded-full transition"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

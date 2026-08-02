import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  
  const [tab, setTab] = useState<"signin" | "signup" | "google">(authModalTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Google prompt state
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    setTab(authModalTab);
    setError("");
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes("@")) {
      setError("Please enter a valid Gmail address (e.g. yourname@gmail.com).");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const success = await signInWithGoogle(googleEmail, googleName);
      if (!success) setError("Please enter a valid Gmail address.");
    } catch (e) {
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (tab === "signin") {
        const success = await signInWithEmail(email, password);
        if (!success) setError("Please enter a valid email and password.");
      } else {
        const success = await signUpWithEmail(name, email, password);
        if (!success) setError("Please fill in all fields correctly.");
      }
    } catch (e) {
      setError("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8 shadow-2xl shadow-black/20">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {tab === "google" ? (
          /* Real Google Authentication Dialog */
          <div className="space-y-5">
            <div className="text-center">
              {/* Google Official Logo */}
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-border/50 shadow-md">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight">Sign in with Google</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your Gmail address & name to continue to <strong>Online Mobiles</strong>
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleGoogleSubmit} className="space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Gmail Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full rounded-xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Display Name (Optional)
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="e.g. Mohammed Zaid"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full rounded-xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Connecting Google Account...</span>
                ) : (
                  <>
                    <span>Continue as {googleEmail || "Google Account"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setTab("signin")}
                className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                ← Back to standard Sign In
              </button>
            </form>
          </div>
        ) : (
          /* Standard Email / Google Tab Selection */
          <div>
            {/* Header Branding */}
            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {tab === "signin" ? "Welcome Back!" : "Create an Account"}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Sign in with your real email to spin the daily wheel, claim coupons & book repairs!
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={() => setTab("google")}
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-border/80 bg-muted/20 px-4 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted/50 hover:border-accent/40 active:scale-[0.98] cursor-pointer"
            >
              {/* Google SVG Logo */}
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="w-full border-t border-border/40" />
              <span className="absolute bg-card px-3 text-[11px] uppercase font-bold tracking-wider text-muted-foreground">
                or with email
              </span>
            </div>

            {/* Tab Selector */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/40 p-1 mb-5">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={`rounded-lg py-2 text-xs font-bold transition-all ${
                  tab === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`rounded-lg py-2 text-xs font-bold transition-all ${
                  tab === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-xs font-medium text-red-500">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {tab === "signup" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border/50 bg-muted/20 py-2.5 pl-10 pr-4 text-sm font-medium focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{tab === "signin" ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              By signing in, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

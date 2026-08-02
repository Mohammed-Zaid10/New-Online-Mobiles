import React, { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: "google" | "email";
};

export type Coupon = {
  id: string;
  code: string;
  reward: string;
  discountType: string;
  dateWon: string;
  expiresAt: string;
  used: boolean;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "signup" | "google";
  userCoupons: Coupon[];
  openAuthModal: (tab?: "signin" | "signup" | "google") => void;
  closeAuthModal: () => void;
  signInWithGoogle: (email: string, name?: string) => Promise<boolean>;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<boolean>;
  signOut: () => void;
  canSpinToday: () => boolean;
  recordSpin: (reward: string) => Coupon;
  getLastSpinDate: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "om_auth_user";
const COUPONS_STORAGE_KEY_PREFIX = "om_coupons_";
const SPINS_STORAGE_KEY_PREFIX = "om_last_spin_";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup" | "google">("signin");
  const [userCoupons, setUserCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        loadCoupons(parsed.id);
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCoupons = (userId: string) => {
    try {
      const stored = localStorage.getItem(COUPONS_STORAGE_KEY_PREFIX + userId);
      if (stored) {
        setUserCoupons(JSON.parse(stored));
      } else {
        setUserCoupons([]);
      }
    } catch (e) {
      setUserCoupons([]);
    }
  };

  const openAuthModal = (tab: "signin" | "signup" | "google" = "signin") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async (email: string, name?: string): Promise<boolean> => {
    if (!email || !email.includes("@")) return false;
    
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name?.trim() || cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    
    const googleUser: User = {
      id: "usr_google_" + btoa(cleanEmail).replace(/=/g, "").substring(0, 10),
      name: cleanName,
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=4285F4`,
      provider: "google",
    };

    setUser(googleUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(googleUser));
    loadCoupons(googleUser.id);
    closeAuthModal();
    return true;
  };

  const signInWithEmail = async (email: string, pass: string): Promise<boolean> => {
    if (!email || !email.includes("@") || !pass) return false;
    const cleanEmail = email.toLowerCase().trim();
    const nameFromEmail = cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    
    const emailUser: User = {
      id: "usr_email_" + btoa(cleanEmail).replace(/=/g, "").substring(0, 10),
      name: nameFromEmail || "Valued Customer",
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameFromEmail)}&backgroundColor=6B4F3B`,
      provider: "email",
    };
    setUser(emailUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(emailUser));
    loadCoupons(emailUser.id);
    closeAuthModal();
    return true;
  };

  const signUpWithEmail = async (name: string, email: string, pass: string): Promise<boolean> => {
    if (!name || !email || !email.includes("@") || !pass) return false;
    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    
    const newUser: User = {
      id: "usr_email_" + btoa(cleanEmail).replace(/=/g, "").substring(0, 10),
      name: cleanName,
      email: cleanEmail,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=6B4F3B`,
      provider: "email",
    };
    setUser(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    loadCoupons(newUser.id);
    closeAuthModal();
    return true;
  };

  const signOut = () => {
    setUser(null);
    setUserCoupons([]);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const getLastSpinDate = (): string | null => {
    if (!user) return null;
    return localStorage.getItem(SPINS_STORAGE_KEY_PREFIX + user.id);
  };

  const canSpinToday = (): boolean => {
    if (!user) return false;
    const lastSpin = getLastSpinDate();
    if (!lastSpin) return true;
    const today = new Date().toISOString().split("T")[0];
    return lastSpin !== today;
  };

  const recordSpin = (rewardName: string): Coupon => {
    if (!user) throw new Error("User must be logged in to spin");
    
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(SPINS_STORAGE_KEY_PREFIX + user.id, today);

    const randomCode = "OM-" + rewardName.replace(/[^A-Z0-9]/gi, "").substring(0, 4).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 9000);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    const newCoupon: Coupon = {
      id: "cpn_" + Date.now(),
      code: randomCode,
      reward: rewardName,
      discountType: rewardName.includes("Discount") ? "percentage" : rewardName.includes("Free") || rewardName.includes("Guard") || rewardName.includes("Case") ? "gift" : "voucher",
      dateWon: today,
      expiresAt: expires.toISOString().split("T")[0],
      used: false,
    };

    const updated = [newCoupon, ...userCoupons];
    setUserCoupons(updated);
    localStorage.setItem(COUPONS_STORAGE_KEY_PREFIX + user.id, JSON.stringify(updated));

    return newCoupon;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        userCoupons,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        canSpinToday,
        recordSpin,
        getLastSpinDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

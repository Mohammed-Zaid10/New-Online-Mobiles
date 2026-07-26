export type SoftwareService = {
  slug: string;
  name: string;
  description: string;
  price: string;
  time: string;
  icon: string;
};

export const softwareServices: SoftwareService[] = [
  { slug: "android-flashing", name: "Android Flashing", description: "Complete stock ROM re-flash for boot loops, bricked or corrupted Android devices.", price: "₹499 – ₹1,499", time: "45 – 90 min", icon: "RefreshCw" },
  { slug: "iphone-restore", name: "iPhone Restore", description: "DFU / recovery restore via iTunes with data preservation options.", price: "₹499 – ₹1,999", time: "45 – 90 min", icon: "Smartphone" },
  { slug: "icloud-setup", name: "iCloud Setup", description: "Account creation, backup configuration, family sharing and 2FA setup.", price: "₹299", time: "20 – 30 min", icon: "Cloud" },
  { slug: "google-account-removal", name: "Google Account Removal", description: "Legitimate account bypass with proof of ownership documents.", price: "₹999 – ₹2,499", time: "60 – 180 min", icon: "Key" },
  { slug: "frp-unlock", name: "FRP Unlock", description: "Factory Reset Protection bypass on supported Android devices.", price: "₹999 – ₹1,999", time: "60 – 120 min", icon: "ShieldAlert" },
  { slug: "mi-unlock", name: "MI Account Unlock", description: "Legitimate Xiaomi MI account removal for owned devices.", price: "₹1,499 – ₹2,999", time: "60 – 180 min", icon: "Key" },
  { slug: "bootloader-unlock", name: "Bootloader Unlock", description: "Official OEM bootloader unlock for custom ROM enthusiasts.", price: "₹499 – ₹1,499", time: "45 – 90 min", icon: "Unlock" },
  { slug: "software-update", name: "Software Update", description: "Latest iOS / Android OTA and firmware assisted upgrade.", price: "₹199", time: "20 – 45 min", icon: "Download" },
  { slug: "virus-removal", name: "Virus Removal", description: "Malware, spyware and stalkerware audit and removal.", price: "₹499", time: "30 – 60 min", icon: "ShieldCheck" },
  { slug: "data-recovery", name: "Data Recovery", description: "Photo, video, contact and message recovery from damaged storage.", price: "₹999 – ₹9,999", time: "24 – 72 hrs", icon: "HardDrive" },
  { slug: "phone-backup", name: "Phone Backup", description: "Full encrypted local + cloud backup with restoration script.", price: "₹299", time: "30 – 60 min", icon: "Save" },
  { slug: "phone-transfer", name: "Phone Transfer", description: "Old to new device migration including WhatsApp chats and Apple Watch pairing.", price: "₹499", time: "45 – 90 min", icon: "Share2" },
  { slug: "language-installation", name: "Language Installation", description: "Add regional languages, fonts and IME keyboards to the OS.", price: "₹299", time: "20 – 30 min", icon: "Languages" },
  { slug: "performance-optimization", name: "Performance Optimization", description: "System tuning, cache clean-up, battery calibration and startup optimization.", price: "₹399", time: "30 – 60 min", icon: "Zap" },
  { slug: "factory-reset", name: "Factory Reset", description: "Secure erase with backup, followed by clean OS install and initial setup.", price: "₹299", time: "30 – 60 min", icon: "RotateCcw" },
];

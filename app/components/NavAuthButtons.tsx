"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthService } from "@/lib/application/auth/AuthService";
import { SupabaseAuthRepository } from "@/lib/infrastructure/auth/SupabaseAuthRepository";

const authRepository = new SupabaseAuthRepository();
const authService = new AuthService(authRepository);

export default function NavAuthButtons() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const u = await authService.getUser();
        setUser(u);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const subscription = authService.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse"></div>
    );
  }

  if (user) {
    let dashboardLink = "/student/dashboard";
    let label = "進入儀表板";

    if (user.identityId === 1) {
      dashboardLink = "/admin/dashboard";
      label = "管理後台";
    } else if (user.identityId === 2) {
      dashboardLink = "/teacher/dashboard";
      label = "教師後台";
    }

    return (
      <Link
        href={dashboardLink}
        className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-white text-sm font-bold shadow-glow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <span className="truncate">{label}</span>
      </Link>
    );
  }

  // Not logged in
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/login"
        className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
      >
        登入
      </Link>
      <Link
        href="/auth/register"
        className="flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-white text-sm font-bold shadow-glow hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
      >
        <span className="truncate">註冊體驗</span>
      </Link>
    </div>
  );
}

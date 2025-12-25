"use client";

import { ModalProvider } from "./ModalContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

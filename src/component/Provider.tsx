"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;

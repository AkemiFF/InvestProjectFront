"use client";

import { ReactNode } from "react";
import { LayoutProvider } from "./layout/LayoutContext";

interface ClientProviderProps {
    children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
    return <LayoutProvider>{children}</LayoutProvider>;
};

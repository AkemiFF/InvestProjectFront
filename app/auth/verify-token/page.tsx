"use client";

import { Suspense } from "react";
import VerifyToken from "./VerifyToken";

export default function VerifyTokenPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <VerifyToken />
        </Suspense>
    );
}

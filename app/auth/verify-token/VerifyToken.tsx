// app/auth/verify-token/VerifyToken.js
"use client";

import { BASE_URL } from "@/lib/host";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyToken = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [message, setMessage] = useState("Vérification de l'email en cours...");

    useEffect(() => {
        if (!token) return;

        fetch(`${BASE_URL}/api/auth/register/complete/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.detail === "Email vérifié avec succès") {
                    setMessage("Votre email a été vérifié avec succès ! Vous allez être redirigé vers la page de connexion.");
                    localStorage.setItem("__modsqnfoeirnfioreioomsdjfmiz", "true");
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 5000);
                } else {
                    setMessage(data.detail || "Erreur lors de la vérification de l'email.");
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la vérification:", error);
                setMessage("Une erreur est survenue lors de la vérification.");
            });
    }, [token, router]);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Vérification d'email</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifyToken;

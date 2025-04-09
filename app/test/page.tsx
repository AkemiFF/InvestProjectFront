"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useLayoutContext } from "@/components/layout/LayoutContext";
import projectsService from "@/services/projects-service";
import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/types/base";
import { useEffect } from "react";

export default function InvestorDashboard() {
    const { user } = useLayoutContext();

    useEffect(() => {


        // Requête user
        // apiClient.get("/projects").then(...);

        // Requête admin
        // apiAdmin.post("/admin/users", data).then(...);

        // Gestion auth
        // import { userAuth } from "@/lib/auth";

        // // Login
        // userAuth.save(response.data);

        // // Logout
        // userAuth.logout();
        console.log(user);

        // // Vérification auth
        // if (userAuth.isAuthenticated()) { ... }
        const fetchProjects = async () => {
            try {
                const response = await projectsService.getAllProjects();

                // Vérification de la réponse
                if (response.status === 200 && response.data) {
                    const data = response.data
                    console.log(data.results);

                    return data;
                }

                throw new Error("Réponse invalide du serveur");
            } catch (error) {
                const apiError = error as ApiError;
                console.log(apiError.message);

                return [];
            }
        };
        fetchProjects()
    }, []);

    return (
        <DashboardLayout userType={user.userType}>
            <div className="grid gap-6">


            </div>
        </DashboardLayout>
    )
}


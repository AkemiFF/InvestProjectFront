"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useLayoutContext } from "@/components/layout/LayoutContext";
import { userService } from "@/services/user-service";
import { ApiError } from "@/types/base";
import { useEffect, useState } from "react";

export default function InvestorDashboard() {
    const { user } = useLayoutContext();
    const [test, setTest] = useState("Premier valeur")
    const [loading, setLoading] = useState(true)
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
                const response = await userService.getCurrentUser();
                console.log(response);

                const data = response
                console.log(data);
                setLoading(false)
                return data;


                throw new Error("Réponse invalide du serveur");
            } catch (error) {
                const apiError = error as ApiError;
                console.log(apiError.message);

                return [];
            }
        };
        fetchProjects()
    }, []);


    setTimeout(() => {
        setLoading(false)
    }, 5000);
    return (
        <DashboardLayout userType={user.userType}>
            <div className="grid gap-6">
                {loading && (
                    <>Loading</>
                )}
                {/* {test}
                <button onClick={() => { }}>ito</button> */}
            </div>
        </DashboardLayout>
    )
}


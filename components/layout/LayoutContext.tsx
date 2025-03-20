import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Définition du type User
type UserType = "investor" | "project-owner";

interface User {
    id: string | null;
    username: string;
    email: string;
    userType: UserType;
    pic: string;
}

// Définition des types du contexte
interface LayoutContextType {
    user: User;
    setUserType: (type: UserType) => void;
    updateUser: (userData: Partial<User>) => void;
}

// Clé de stockage dans le localStorage
const STORAGE_KEY = "layout_context_user";

// Création du contexte avec une valeur par défaut
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        id: null,
        username: "",
        email: "",
        userType: "investor",
        pic: "",
    });

    // Charger les données depuis le localStorage au montage
    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erreur lors du parsing du user depuis le localStorage :", error);
            }
        }
    }, []);

    // Sauvegarder dans le localStorage à chaque mise à jour de user
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }, [user]);

    // Fonction pour changer le type d'utilisateur
    const setUserType = (type: UserType) => {
        setUser((prev) => ({ ...prev, userType: type }));
    };

    // Fonction pour mettre à jour l'utilisateur (partiellement)
    const updateUser = (userData: Partial<User>) => {
        setUser((prev) => ({ ...prev, ...userData }));
    };

    return (
        <LayoutContext.Provider value={{ user, setUserType, updateUser }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
};

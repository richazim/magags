import AuthContext from "@/context/AuthContext";
import { logout } from "@/libs/appwrite/account/logout";
import { useRouter } from "expo-router";
import { useContext } from "react";

export const useLogout = () => {
  const router = useRouter();
  const { setLoggedInUser } = useContext(AuthContext);

  const logoutUser = async () => {
    try {
      await logout();
      setLoggedInUser(null);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      // Tu peux ajouter une gestion d'erreur ici (toast, alert, etc.)
    }
  };

  return { logoutUser };
};

import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import AuthContext from "@/context/AuthContext";

export const useRedirectIfAuthenticated = (redirectTo: string = "/home") => {
  const { loggedInUser, appwriteLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!appwriteLoading && loggedInUser) {
      router.replace("/home" as any);
    }
  }, [loggedInUser, appwriteLoading]);
};

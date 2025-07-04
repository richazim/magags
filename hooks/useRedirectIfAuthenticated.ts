import AuthContext from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export const useRedirectIfAuthenticated = (redirectTo: string = "/home") => {
  const { loggedInUser, appwriteLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!appwriteLoading && loggedInUser) {
      router.replace("/home" as any);
    }
  }, [loggedInUser, appwriteLoading]);
};

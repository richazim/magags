import AuthContext from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export const useRedirectIfNotAuthenticated = (redirectTo: string = "/sign-in") => {
  const { loggedInUser, appwriteLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!appwriteLoading && !loggedInUser) {
      router.replace(redirectTo as any);
    }
  }, [loggedInUser, appwriteLoading]);
};

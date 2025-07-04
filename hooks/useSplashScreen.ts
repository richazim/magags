// hooks/useSplashScreen.ts
import { useEffect } from "react";

export const useSplashScreen = (loaded: boolean, error: Error | null, splashScreen: any) => {
  useEffect(() => {
    if (loaded || error) {
      splashScreen.hideAsync();
    }
  }, [loaded, error]);
};

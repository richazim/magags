const ROUTE = {
  // Constante en MAJUSCULE car la constante ici est supposé globale
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  GAG_DETAIL: (title: string) => `/gags/${title}`,
} as const;

export default ROUTE;

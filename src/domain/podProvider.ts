/**
 * A service where a user can sign up for a Solid Pod. Providers are only
 * ever linked to: login and Pod discovery are driven by the WebID, so no
 * provider needs code of its own.
 */
export interface PodProvider {
  id: string;
  name: string;
  /** Page where a new user creates a Pod. */
  signUpUrl: string;
}

/** Providers offered during onboarding. Add an entry to offer another. */
export const POD_PROVIDERS: readonly PodProvider[] = [
  {
    id: "igrant",
    name: "iGrant.io Data Pod",
    signUpUrl: "https://igrant.io/datapod.html",
  },
];

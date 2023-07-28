export type GoogleUserInfo = {
  additionalUserInfo: AdditionalUserInfo;
  user: User;
};

type AdditionalUserInfo = {
  isNewUser: boolean;
  profile: Profile;
  providerId: string;
};
type Profile = {
  aud: string;
  azp: string;
  email: string;
  email_verified: true;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
};

export type User = {
  displayName: string;
  email: string;
  emailVerified: true;
  isAnonymous: false;
  metadata: { lastSignInTime: number; creationTime: number };
  multiFactor: { enrolledFactors: any[] };
  phoneNumber: null | unknown;
  photoURL: string;
  providerData: ProviderData[];
  providerId: string;
  tenantId: null;
  uid: string;
};

type ProviderData = {
  displayName: string;
  email: string;
  phoneNumber: null | string | number;
  photoURL: string;
  providerId: string;
  uid: string;
};
export type TinderProfile = {
  age: string;
  displayName: string;
  id: string;
  job: string;
  photoURL: string | null;
  timestamp: Object;
};

export type googleUserInfo = {
  additionalUserInfo: additionalUserInfo;
  user: user;
};

type additionalUserInfo = {
  isNewUser: boolean;
  profile: profile;
  providerId: string;
};
type profile = {
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

type user = {
  displayName: string;
  email: string;
  emailVerified: true;
  isAnonymous: false;
  metadata: { lastSignInTime: number; creationTime: number };
  multiFactor: { enrolledFactors: any[] };
  phoneNumber: null | unknown;
  photoURL: string;
  providerData: providerData[];
  providerId: string;
  tenantId: null;
  uid: string;
};

type providerData = {
  displayName: string;
  email: string;
  phoneNumber: null | string | number;
  photoURL: string;
  providerId: string;
  uid: string;
};

export type TinderProfile = {
  firstName: string;
  lastName: string;
  occupation: string;
  photoURL: string;
  age: number;
  id: number;
};

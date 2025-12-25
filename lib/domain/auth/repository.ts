export interface User {
  id: string;
  email?: string;
  role?: string;
  emailConfirmedAt?: string;
}

export interface Session {
  user: User;
  accessToken: string;
}

export interface AuthSubscription {
  unsubscribe: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  teacherCode?: string;
  education?: {
    schoolCode?: string;
    schoolName: string;
    statusKey: string;
    department?: string;
  };
}

export type AuthStateChangeCallback = (event: string, session: Session | null) => void;

export interface AuthRepository {
  getSession(): Promise<Session | null>;
  getUser(): Promise<User | null>;
  signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: Error | null }>;
  signUp(credentials: RegisterCredentials): Promise<{ error: Error | null }>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription;
  getIdentityId(): Promise<number | null>;
}
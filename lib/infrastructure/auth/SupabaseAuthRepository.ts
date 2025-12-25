import { supabase } from '@/lib/supabase';
import { AuthRepository, Session, AuthStateChangeCallback, AuthSubscription, User, LoginCredentials, RegisterCredentials } from '@/lib/domain/auth/repository';

export class SupabaseAuthRepository implements AuthRepository {
  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    
    return this.mapSession(session);
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    
    return this.mapUser(user);
  }

  async signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: Error | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) return { user: null, error };
    return { user: data.user ? this.mapUser(data.user) : null, error: null };
  }

  async signUp(credentials: RegisterCredentials): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          full_name: credentials.fullName,
          teacher_code: credentials.teacherCode,
        },
      },
    });

    return { error };
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }

  onAuthStateChange(callback: AuthStateChangeCallback): AuthSubscription {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session ? this.mapSession(session) : null);
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }

  async getIdentityId(): Promise<number | null> {
    const { data, error } = await supabase.rpc('get_identity_id');
    if (error) {
      console.error('Error fetching identity:', error);
      return null;
    }
    return data as number;
  }

  private mapSession(supabaseSession: any): Session {
    return {
      user: this.mapUser(supabaseSession.user),
      accessToken: supabaseSession.access_token,
    };
  }

  private mapUser(supabaseUser: any): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      role: supabaseUser.role,
      emailConfirmedAt: supabaseUser.email_confirmed_at
    };
  }
}
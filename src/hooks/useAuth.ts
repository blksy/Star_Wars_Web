import { useQuery } from "@tanstack/react-query";
import { supabase } from "../database/supabase";

const handleSupabaseError = (error: any) => {
  console.error("Supabase Error:", error);
  throw new Error(error.message);
};

export const useAuth = () => {
  const signUp = async (
    email: string,
    password: string,
    name: string,
    username: string
  ) => {
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (data && data.user) {
        await supabase.from("users").insert({
          name,
          username,
          password,
          email,
          id: data.user.id,
        });
      }
      if (error) handleSupabaseError(error);
    } catch (error) {
      handleSupabaseError(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) handleSupabaseError(error);
    } catch (error) {
      handleSupabaseError(error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) handleSupabaseError(error);
    } catch (error) {
      handleSupabaseError(error);
    }
  };

  const {
    data: session,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        return session?.user ?? null;
      } catch (error) {
        handleSupabaseError(error);
      }
    },
  });

  return { signUp, login, logout, user: session, isLoading, error, session };
};

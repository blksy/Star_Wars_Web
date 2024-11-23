import { useQuery } from "@tanstack/react-query";
import { supabase } from "../database/supabase";

const handleSupabaseError = (error: any) => {
  if (error instanceof Error) {
    console.error("Network Error:", error.message);
  } else {
    console.error("Supabase Error:", error);
  }
  throw new Error(error?.message || "Unknown error occurred");
};

export const useAuth = () => {
  const signUp = async (
    name: string,
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (data && data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          name,
          email,
          password,
          username,
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
    data: user,
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

  return { signUp, login, logout, user, isLoading, error };
};

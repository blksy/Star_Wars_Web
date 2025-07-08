import { useQuery } from "@tanstack/react-query";
import { supabase } from "../database/supabase";
import { User } from "../interfaces/interfaces";

const handleSupabaseError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Network Error:", error.message);
    throw error;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    console.error("Supabase Error:", (error as { message: string }).message);
    throw new Error((error as { message: string }).message);
  } else {
    console.error("Unknown error:", error);
    throw new Error("Unknown error occurred");
  }
};

export const useAuth = () => {
  const signUp = async (
    name: string,
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        handleSupabaseError(error);
      }

      if (data?.user) {
        const { error: dbError } = await supabase.from("users").insert({
          id: data.user.id,
          name,
          email,
          password,
          username,
        });

        if (dbError) {
          handleSupabaseError(dbError);
        }
      }
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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) return null;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw new Error(error.message);
      return data as User;
    },
  });

  return { signUp, login, logout, user, isLoading, error };
};

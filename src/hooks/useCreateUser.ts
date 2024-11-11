import { useMutation } from "@tanstack/react-query";
import { supabase } from "../database/supabase";
import { User } from "../interfaces/interfaces";

const createUser = async (user: User) => {
  const { data: userWithUsername } = await supabase
    .from("users")
    .select("*")
    .eq("nickname", user.username)
    .single();

  if (userWithUsername) {
    throw new Error("User with that username already exists");
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useCreateUser() {
  return useMutation((user: User) => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          name: data.name,
          username: data.username,
          id: data.user.id,
        });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}

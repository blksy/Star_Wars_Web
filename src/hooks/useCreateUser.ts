import { useMutation } from "@tanstack/react-query";
import { supabase } from "../database/supabase";
import { User } from "../interfaces/interfaces";

const createUser = async (user: User) => {
  //check if user exists
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

export default function useCreateUser(user: User) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from("users")
        .insert({
          name: user.name,
          username: user.username,
          id: data.user.id,
        });

      if (insertError) {
        throw insertError;
      }

      return insertData;
    },
  });
}

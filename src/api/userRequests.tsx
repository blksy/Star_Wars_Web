import { supabase } from "../database/supabase";
import { User } from "../interfaces/interfaces";

export const getUserById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, username, email")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Failed to fetch user by ID", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error fetching user by ID", error);
    throw error;
  }
};

export const addUser = async (newUser: User) => {
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .or(`username.eq.${newUser.username},email.eq.${newUser.email}`)
      .single();

    if (existingUser) {
      throw new Error("User with this username or email already exists");
    }

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();
    if (error) {
      console.error("Supabase insert error:", error.details, error.hint);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error adding user:", error);
    throw error;
  }
};

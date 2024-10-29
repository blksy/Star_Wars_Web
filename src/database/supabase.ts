import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Provide env variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

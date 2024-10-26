import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/supabase";
const supabaseUrl = "https://c.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwanV0d2J1aGdneWpiZHB6enduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk4NjYxNTIsImV4cCI6MjA0NTQ0MjE1Mn0.uEVWH8RV1xUlbJtjuCkf4Q_BkS06AB_c7hBGXPiDTdo";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Provide env variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

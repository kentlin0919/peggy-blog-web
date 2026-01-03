
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseAnonKey = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkClassType() {
  console.log("Checking class_type table...");
  const { data, error } = await supabase.from("class_type").select("*");
  if (error) console.log("class_type error:", error.code); // 42P01 if not exists
  else console.log("class_type data:", data);

  console.log("Checking class_types table...");
  const { data: data2, error: error2 } = await supabase.from("class_types").select("*");
  if (error2) console.log("class_types error:", error2.code);
  else console.log("class_types data:", data2);
}

checkClassType();

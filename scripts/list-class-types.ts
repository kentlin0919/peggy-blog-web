import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseAnonKey = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listClassTypes() {
  console.log("Listing class_type data...");
  const { data, error } = await supabase
    .from("class_type")
    .select("*");

  if (error) {
    console.error("Error:", error);
  } else {
    console.table(data);
  }
}

listClassTypes();
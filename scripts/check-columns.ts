
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseAnonKey = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkColumns() {
  console.log("Checking courses table columns...");
  // We can't list columns easily via client without admin access or introspection usually.
  // But we can try to select * limit 1 and see keys.
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .limit(1);

  if (error) {
    console.error("Error fetching courses:", error);
  } else {
    if (data && data.length > 0) {
      console.log("Courses columns:", Object.keys(data[0]));
    } else {
      console.log("No courses found, cannot infer columns from data.");
      // Try to insert a dummy to see error? No, that's risky.
    }
  }
}

checkColumns();

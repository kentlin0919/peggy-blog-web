
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseAnonKey = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkFunctions() {
  console.log("Testing get_or_create_school...");
  const { data: schoolId, error: fnError } = await supabase.rpc(
    "get_or_create_school",
    {
      p_code: null,
      p_name: "Test School " + Date.now(),
    }
  );

  if (fnError) {
    console.error("get_or_create_school Error:", fnError);
  } else {
    console.log("get_or_create_school Success, ID:", schoolId);
  }
}

checkFunctions();


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseAnonKey = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probeClassType() {
  console.log("Probing class_type schema...");
  const { error } = await supabase.from("class_type").insert({
    name: "probe",
    label_zh: "Probe"
  });

  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Insert success!");
    // Clean up
    await supabase.from("class_type").delete().eq("name", "probe");
  }
}

probeClassType();

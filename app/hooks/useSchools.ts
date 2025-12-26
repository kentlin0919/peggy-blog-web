import { useState, useEffect } from "react";

export interface School {
  code: string;
  name: string;
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    // Fetch schools from Supabase
    // We import supabase from lib to avoid recreating client if possible, or use standard import
    import("@/lib/supabase").then(({ supabase }) => {
      supabase
        .from("schools")
        .select("code, name")
        .then(({ data, error }) => {
          if (error) {
            console.error("Failed to load schools from DB:", error);
            // Fallback to JSON if DB fails? Or just fail.
            // Let's try fallback if data is empty
          }

          if (data && data.length > 0) {
            const validSchools: School[] = data
              .filter(s => s.code && s.name)
              .map(s => ({ code: s.code!, name: s.name }));
            setSchools(validSchools);
          } else {
             // Fallback to JSON if DB is empty or error (optional, but good for local dev without seed)
             fetch("/schools.json")
              .then((res) => res.json())
              .then((jsonData) => {
                 const schoolMap = new Map();
                 jsonData.forEach((item: any) => {
                  const code = item["代碼"];
                  const name = item["學校名稱"];
                  if (code && name) {
                    schoolMap.set(code, { code, name });
                  }
                });
                setSchools(Array.from(schoolMap.values()));
              })
              .catch(err => console.error("Failed to load schools.json", err));
          }
        });
    });
  }, []);

  return schools;
}

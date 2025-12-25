import { useState, useEffect } from "react";

export interface School {
  code: string;
  name: string;
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    fetch("/schools.json")
      .then((res) => res.json())
      .then((data) => {
        // Map raw data to simpler format: { code: string, name: string }
        // The data contains duplicates for different years. We use a Map to keep unique codes.
        // Later entries (newer years) will overwrite earlier ones.
        const schoolMap = new Map();
        data.forEach((item: any) => {
          const code = item["代碼"];
          const name = item["學校名稱"];
          if (code && name) {
            schoolMap.set(code, { code, name });
          }
        });
        setSchools(Array.from(schoolMap.values()));
      })
      .catch((err) => console.error("Failed to load schools:", err));
  }, []);

  return schools;
}

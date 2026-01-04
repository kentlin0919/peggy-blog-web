import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { userId, email, password, setFirstLogin } = await req.json();

    if (!userId || (!email && !password && typeof setFirstLogin !== "boolean")) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminInfo, error: adminError } = await supabase
      .from("user_info")
      .select("identity_id")
      .eq("id", user.id)
      .single();

    if (adminError || adminInfo?.identity_id !== 1) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceKey || !supabaseUrl) {
      return NextResponse.json(
        { error: "Server configuration missing." },
        { status: 500 }
      );
    }

    const adminClient = createAdminClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    if (email || password) {
      const { error } = await adminClient.auth.admin.updateUserById(userId, {
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    if (email) {
      const { error: profileError } = await adminClient
        .from("user_info")
        .update({ email })
        .eq("id", userId);

      if (profileError) {
        return NextResponse.json(
          { error: profileError.message },
          { status: 500 }
        );
      }
    }

    if (typeof setFirstLogin === "boolean") {
      const { error: firstLoginError } = await adminClient
        .from("user_info")
        .update({ is_first_login: setFirstLogin })
        .eq("id", userId);

      if (firstLoginError) {
        return NextResponse.json(
          { error: firstLoginError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

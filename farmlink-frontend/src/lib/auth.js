import { createClient } from "./supabase/client";

// 1. Sign up
export async function signUpUser({
  email,
  password,
  role,
  fullName,
  businessName,
  phone,
  province,
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role || "farmer",
        full_name: fullName || null,
        business_name: businessName || null,
        phone: phone || null,
        province: province || "Phnom Penh",
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // If user signed up successfully, ensure profile row exists
  if (data?.user) {
    try {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName || data.user.email?.split("@")[0],
        business_name: businessName || null,
        phone: phone || null,
        role: role || "farmer",
        province: province || "Phnom Penh",
        created_at: new Date().toISOString(),
      });
    } catch {
      // Non-blocking if table RLS handles it via trigger
    }
  }

  return { success: true, user: data.user };
}

// 2. Log in
export async function signInUser({ email, password }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message || "Email ឬ Password មិនត្រឹមត្រូវឡើយ" };
  }

  // Fetch profile to know role (farmer or buyer)
  let profile = null;
  try {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();
    profile = userProfile;
  } catch {
    profile = null;
  }

  return { success: true, user: data.user, profile };
}

// 3. Sign Out
export async function signOutUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.reload();
}

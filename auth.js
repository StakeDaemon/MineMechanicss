// auth.js
import { supabase } from "./supabase.js";

// ---------------- SIGN UP ----------------
export async function signUp(email, password, username) {
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error };

  const user = data.user;

  // 2. Create profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    username: username,
    email: email,
  });

  if (profileError) return { error: profileError };

  // 3. Create balance row (IMPORTANT)
  const { error: balanceError } = await supabase.from("balances").insert({
    user_id: user.id,
    minem: 0,
    m2: 0,
  });

  if (balanceError) return { error: balanceError };

  return { user };
}

// ---------------- LOGIN ----------------
export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// ---------------- LOGOUT ----------------
export async function signOut() {
  return await supabase.auth.signOut();
}

// ---------------- CURRENT USER ----------------
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
}

// ---------------- AUTH LISTENER ----------------
export function onAuthChange(cb) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    cb(session?.user ?? null);
  });
}

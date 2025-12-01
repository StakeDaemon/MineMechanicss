const supabase = supabase.createClient(
  "https://qjwigtjmsiojtdkcvwwe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqd2lndGptc2lvanRka2N2d3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQ4NjIsImV4cCI6MjA4MDA2MDg2Mn0.1LqOL9A1GFJ3gQ27yqwoPM15rBbdT8aXUV-KEAsSHOQ"
);

let userId;

async function loadDashboard() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) location.href = "login.html";

  userId = user.id;

  // Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("username,email")
    .eq("id", userId)
    .single();

  document.getElementById("username").textContent = profile.username;
  document.getElementById("email").textContent = profile.email;

  refreshBalances();
}

async function refreshBalances() {
  const { data: bal } = await supabase
    .from("balances")
    .select("m2,minem")
    .eq("user_id", userId)
    .single();

  const { data: loot } = await supabase
    .from("loot_temp")
    .select("temp_m2")
    .eq("user_id", userId)
    .single();

  document.getElementById("m2").textContent = bal?.m2 || 0;
  document.getElementById("minem").textContent = bal?.minem || 0;
  document.getElementById("tempLoot").textContent = loot?.temp_m2 || 0;
}

async function loot() {
  const AMOUNT = 1;

  const { data, error } = await supabase.rpc("add_loot", {
    p_user: userId,
    p_amount: AMOUNT
  });

  if (error) return alert(error.message);
  refreshBalances();
}

async function transferLoot() {
  const { error } = await supabase.rpc("transfer_loot", {
    p_user: userId
  });

  if (error) return alert(error.message);
  refreshBalances();
}

loadDashboard();
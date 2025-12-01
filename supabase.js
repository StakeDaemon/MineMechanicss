// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qjwigtjmsiojtdkcvwwe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqd2lndGptc2lvanRka2N2d3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODQ4NjIsImV4cCI6MjA4MDA2MDg2Mn0.1LqOL9A1GFJ3gQ27yqwoPM15rBbdT8aXUV-KEAsSHOQ";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);
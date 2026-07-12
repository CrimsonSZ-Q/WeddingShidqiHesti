import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== "https://your-supabase-project-id.supabase.co" && 
  supabaseAnonKey && 
  !supabaseAnonKey.includes("dummy_anon_key");

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

if (!isConfigured) {
  console.warn(
    "⚠️ Supabase is not configured yet or is using dummy keys. Fallback to LocalStorage client is enabled for development."
  );
}

// Mock interface for offline/local RSVP entries
export interface RsvpEntry {
  id: number;
  name: string;
  attendance: boolean;
  guests_count: number;
  wishes: string;
  created_at: string;
}

// Helper functions for RSVP operations with automatic mock-fallback
export async function getRsvps(): Promise<RsvpEntry[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      return data as RsvpEntry[];
    }
    console.error("Supabase fetch error:", error);
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("wedding_rsvps");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        return [];
      }
    }
  }
  return [];
}

export async function addRsvp(entry: Omit<RsvpEntry, "id" | "created_at">): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase
      .from("rsvps")
      .insert([entry]);
    
    if (!error) {
      return true;
    }
    console.error("Supabase insert error:", error);
  }

  // Fallback to localStorage
  if (typeof window !== "undefined") {
    const rsvps = await getRsvps();
    const newEntry: RsvpEntry = {
      ...entry,
      id: Date.now(),
      created_at: new Date().toISOString()
    };
    rsvps.unshift(newEntry);
    localStorage.setItem("wedding_rsvps", JSON.stringify(rsvps));
    return true;
  }
  return false;
}

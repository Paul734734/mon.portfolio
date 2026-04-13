/**
 * PORTFOLIO - ETOUKE PAUL JOVANI
 * supabase-config.js - Configuration client Supabase
 */

const SUPABASE_URL = "https://zumonesxptppkknvdwba.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YEka8JeNmwzHrqftq2SugQ_K6RUolZX";

// Initialisation du client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://gkllnsqgiqqypugqjlbn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrbGxuc3FnaXFxeXB1Z3FqbGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjQ3NzYsImV4cCI6MjA1OTIwMDc3Nn0.yTYqwlP4nA7LXEjEqvVRMdjpdJPg0sd6mxdpwlIS-js";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

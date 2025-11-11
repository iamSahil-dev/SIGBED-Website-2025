import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hjkweykghuyobmkadlos.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqa3dleWtnaHV5b2Jta2FkbG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzY3NjIsImV4cCI6MjA3Nzg1Mjc2Mn0.Jc-Q3Gl6TIK5fmSpGGziU_uMJr3OCUk2GWcGWs3fhjc";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


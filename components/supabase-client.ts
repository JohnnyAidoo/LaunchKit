import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcm5zeGdtbHRiZ2xubmpjYnFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzM4MTY5OSwiZXhwIjoyMDU4OTU3Njk5fQ.zUtuLdY5KvoS0DMt2-SB_D4fB-eGlGH1561g6goY3Oo";

if (!supabaseKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

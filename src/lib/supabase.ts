import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dldbwacyblrpativdtwi.supabase.co';
const supabaseKey = 'sb_publishable_utz-KsqKAfjqr_RVJqYSjg_lNY-sSai';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlfzdkzpddgubfvpxwka.supabase.co';
const supabaseKey = 'sb_publishable_e26kPuGazRPLkj8s6RKvhA_4pQDeCL5';

export const supabase = createClient(supabaseUrl, supabaseKey);

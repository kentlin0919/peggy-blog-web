import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(`Has Service Key: ${hasKey}`);

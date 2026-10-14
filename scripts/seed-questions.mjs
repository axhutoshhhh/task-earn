import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach((line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) envVars[k.trim()] = v.join('=').trim();
});

const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const key = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

async function seed() {
  const rawQuestions = JSON.parse(fs.readFileSync('src/data/quizQuestions.json', 'utf8'));
  console.log(`Seeding ${rawQuestions.length} questions into Supabase...`);

  const dbRows = rawQuestions.map((q) => ({
    question: q.question,
    options: q.options,
    correct_index: q.correct_index,
    is_active: true,
  }));

  // Clear existing
  const { error: delError } = await supabase
    .from('quiz_questions')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (delError) {
    console.warn('Warning when deleting existing questions:', delError);
  }

  // Insert in batches of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < dbRows.length; i += BATCH_SIZE) {
    const batch = dbRows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('quiz_questions').insert(batch);
    if (error) {
      console.error(`Error on batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
      process.exit(1);
    }
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} rows) inserted.`);
  }

  const { count } = await supabase
    .from('quiz_questions')
    .select('id', { count: 'exact', head: true });

  console.log(`Successfully verified ${count} questions in Supabase quiz_questions table.`);
}

seed().catch(console.error);

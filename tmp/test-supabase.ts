import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for testing

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSupabase() {
  console.log('Testing Supabase connection...')
  console.log('URL:', supabaseUrl)
  
  try {
    const { data, error } = await supabase.from('leads').select('*').limit(1)
    
    if (error) {
      console.error('Error fetching leads:', error.message)
      if (error.code === '42P01') {
        console.error('The table "leads" does not exist!')
      }
    } else {
      console.log('Successfully connected to Supabase and fetched leads.')
      console.log('Data sample:', data)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testSupabase()

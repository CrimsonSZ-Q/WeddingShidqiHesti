-- Create RSVPs and Wishes table
CREATE TABLE IF NOT EXISTS rsvps (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attendance BOOLEAN NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  wishes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow public read access to rsvps (so guests can read wishes)
CREATE POLICY "Allow public read access" 
ON rsvps FOR SELECT 
USING (true);

-- Allow public write access to rsvps (so guests can RSVP and leave wishes)
CREATE POLICY "Allow public insert access" 
ON rsvps FOR INSERT 
WITH CHECK (true);

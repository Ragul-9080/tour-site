-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Super Admin, Admin)
create table users (
  id uuid default uuid_generate_v4() primary key,
  name text,
  email text unique not null,
  password text not null, -- Hashed password
  role text check (role in ('super_admin', 'admin')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PACKAGES TABLE
create table packages (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  destination text not null,
  category text check (category in ('North India', 'South India', 'East India', 'West India')) not null,
  duration text not null, -- e.g., "5 Days / 4 Nights"
  price decimal(10, 2) not null,
  image_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- OFFERS TABLE
create table offers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  discount_percentage integer,
  valid_till date,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENQUIRIES TABLE
create table enquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  city text,
  whatsapp text,
  destination text,
  travel_date date,
  people_count integer,
  vacation_type text,
  message text,
  package_id uuid references packages(id),
  status text default 'pending' check (status in ('pending', 'contacted', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Default Super Admin (Password: admin123 - You should hash this in real app, but for initial setup we might need a script or manual insert)
-- For security, we will handle user creation via API or script where we can hash the password.

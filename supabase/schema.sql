-- Student Insights Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'applicant', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'delivered', 'completed', 'cancelled', 'refunded');
CREATE TYPE offer_type AS ENUM ('written_review', 'video_call', 'chat_session');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'applicant',
  bio TEXT,
  university TEXT,
  study_program TEXT,
  country TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT,
  stripe_account_id TEXT, -- For connected accounts (students receiving payouts)
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Universities table
CREATE TABLE public.universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offers table (services offered by students)
CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  offer_type offer_type DEFAULT 'written_review',
  price INTEGER NOT NULL, -- Price in cents
  delivery_days INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  offer_id UUID NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  amount INTEGER NOT NULL, -- Total amount in cents
  platform_fee INTEGER NOT NULL, -- Platform commission in cents
  seller_amount INTEGER NOT NULL, -- Seller receives after commission
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  content TEXT, -- Delivered content (written review)
  meeting_link TEXT, -- For video calls
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table (ratings for completed orders)
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewed_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(order_id, reviewer_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_university ON public.users(university);
CREATE INDEX idx_users_country ON public.users(country);
CREATE INDEX idx_offers_user_id ON public.offers(user_id);
CREATE INDEX idx_offers_price ON public.offers(price);
CREATE INDEX idx_offers_is_active ON public.offers(is_active);
CREATE INDEX idx_orders_applicant_id ON public.orders(applicant_id);
CREATE INDEX idx_orders_seller_id ON public.orders(seller_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_reviews_reviewed_id ON public.reviews(reviewed_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for universities table
CREATE POLICY "Anyone can view universities" ON public.universities
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage universities" ON public.universities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for offers table
CREATE POLICY "Anyone can view active offers" ON public.offers
  FOR SELECT USING (is_active = true OR user_id = auth.uid());

CREATE POLICY "Students can create offers" ON public.offers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'student'
    )
  );

CREATE POLICY "Students can update own offers" ON public.offers
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Students can delete own offers" ON public.offers
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for orders table
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (applicant_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Applicants can create orders" ON public.orders
  FOR INSERT WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Participants can update orders" ON public.orders
  FOR UPDATE USING (applicant_id = auth.uid() OR seller_id = auth.uid());

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Order participants can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE id = order_id 
      AND (applicant_id = auth.uid() OR seller_id = auth.uid())
      AND status = 'completed'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'applicant')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample universities
INSERT INTO public.universities (name, country, city, website) VALUES
  ('Massachusetts Institute of Technology', 'United States', 'Cambridge', 'https://www.mit.edu'),
  ('Stanford University', 'United States', 'Stanford', 'https://www.stanford.edu'),
  ('Harvard University', 'United States', 'Cambridge', 'https://www.harvard.edu'),
  ('University of Oxford', 'United Kingdom', 'Oxford', 'https://www.ox.ac.uk'),
  ('University of Cambridge', 'United Kingdom', 'Cambridge', 'https://www.cam.ac.uk'),
  ('ETH Zurich', 'Switzerland', 'Zurich', 'https://ethz.ch'),
  ('Technical University of Munich', 'Germany', 'Munich', 'https://www.tum.de'),
  ('University of Toronto', 'Canada', 'Toronto', 'https://www.utoronto.ca'),
  ('University of Melbourne', 'Australia', 'Melbourne', 'https://www.unimelb.edu.au'),
  ('National University of Singapore', 'Singapore', 'Singapore', 'https://www.nus.edu.sg'),
  ('Vilnius Gediminas Technical University', 'Lithuania', 'Vilnius', 'https://www.vgtu.lt'),
  ('Delft University of Technology', 'Netherlands', 'Delft', 'https://www.tudelft.nl'),
  ('KTH Royal Institute of Technology', 'Sweden', 'Stockholm', 'https://www.kth.se'),
  ('University of Tokyo', 'Japan', 'Tokyo', 'https://www.u-tokyo.ac.jp'),
  ('Tsinghua University', 'China', 'Beijing', 'https://www.tsinghua.edu.cn');


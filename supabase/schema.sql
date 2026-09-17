-- ==============================================================================
-- FARMLINK B2B AGRICULTURAL MARKETPLACE
-- PRODUCTION DATABASE SCHEMA FOR SUPABASE (POSTGRESQL)
-- Version: 1.0 (MVP)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & CUSTOM TYPES
CREATE TYPE user_role AS ENUM ('farmer', 'buyer', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'rejected', 'completed', 'cancelled');
CREATE TYPE demand_status AS ENUM ('active', 'fulfilled', 'closed', 'expired');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'declined');
CREATE TYPE product_status AS ENUM ('active', 'out_of_stock', 'draft', 'archived');

-- ==============================================================================
-- 3. CORE TABLES
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- Table: profiles (1-to-1 with Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'buyer',
    full_name TEXT NOT NULL,
    business_name TEXT,
    phone_number TEXT NOT NULL,
    telegram_username TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    province TEXT NOT NULL,
    address TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_doc_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: categories (Produce Classification)
-- ------------------------------------------------------------------------------
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    icon_url TEXT,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: products (Farmer Produce Listings)
-- ------------------------------------------------------------------------------
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    description TEXT,
    price_per_unit NUMERIC(10, 2) NOT NULL CHECK (price_per_unit > 0),
    unit TEXT NOT NULL DEFAULT 'kg',
    stock_quantity NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    min_order_qty NUMERIC(10, 2) NOT NULL DEFAULT 1 CHECK (min_order_qty > 0),
    is_organic BOOLEAN NOT NULL DEFAULT FALSE,
    tiered_pricing JSONB DEFAULT '[]'::jsonb,
    harvest_date DATE,
    delivery_options JSONB DEFAULT '["farmer_delivery", "farm_pickup"]'::jsonb,
    status product_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: product_images (Up to 10 photos per product)
-- ------------------------------------------------------------------------------
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: sourcing_demands (Buyer Public Produce Broadcasts)
-- ------------------------------------------------------------------------------
CREATE TABLE public.sourcing_demands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    produce_name TEXT NOT NULL,
    quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
    unit TEXT NOT NULL DEFAULT 'kg',
    target_price NUMERIC(10, 2) NOT NULL CHECK (target_price > 0),
    total_budget NUMERIC(10, 2) NOT NULL CHECK (total_budget > 0),
    required_date DATE NOT NULL,
    delivery_location TEXT NOT NULL,
    notes TEXT,
    status demand_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: demand_offers (Direct Farmer Bids / Offers)
-- ------------------------------------------------------------------------------
CREATE TABLE public.demand_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    demand_id UUID NOT NULL REFERENCES public.sourcing_demands(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    offered_price NUMERIC(10, 2) NOT NULL CHECK (offered_price > 0),
    supply_quantity NUMERIC(10, 2) NOT NULL CHECK (supply_quantity > 0),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount > 0),
    delivery_date DATE NOT NULL,
    notes TEXT,
    status offer_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: orders (Order Invoices / Contracts)
-- ------------------------------------------------------------------------------
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status order_status NOT NULL DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    delivery_date DATE NOT NULL,
    delivery_method TEXT NOT NULL DEFAULT 'farmer_delivery',
    buyer_notes TEXT,
    farmer_notes TEXT,
    sourcing_demand_id UUID REFERENCES public.sourcing_demands(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: order_items (Produce Line Items within an Order)
-- ------------------------------------------------------------------------------
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price > 0),
    quantity NUMERIC(10, 2) NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: conversations (Chat Threads)
-- ------------------------------------------------------------------------------
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_one UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    participant_two UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    context_type TEXT,
    context_id UUID,
    last_message TEXT,
    last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT distinct_participants CHECK (participant_one <> participant_two)
);

-- ------------------------------------------------------------------------------
-- Table: messages (Individual Chat Bubbles)
-- ------------------------------------------------------------------------------
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    message_text TEXT,
    attachment_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: reviews (Verified Post-Purchase Ratings)
-- ------------------------------------------------------------------------------
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    quick_tags TEXT[] DEFAULT '{}'::text[],
    photo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: notifications (In-App Notification Bell 🔔)
-- ------------------------------------------------------------------------------
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- Table: saved_products (Buyer Wishlist / Bookmarks ❤️)
-- ------------------------------------------------------------------------------
CREATE TABLE public.saved_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(buyer_id, product_id)
);

-- ------------------------------------------------------------------------------
-- Table: audit_logs (Enterprise Security Ledger)
-- ------------------------------------------------------------------------------
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. DATABASE TRIGGERS & FUNCTIONS
-- ==============================================================================

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_demands_updated_at BEFORE UPDATE ON public.sourcing_demands FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_offers_updated_at BEFORE UPDATE ON public.demand_offers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function: Auto-create Profile row when user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        role,
        full_name,
        phone_number,
        province
    )
    VALUES (
        NEW.id,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'buyer'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'phone_number', '000-000-000'),
        COALESCE(NEW.raw_user_meta_data->>'province', 'Phnom Penh')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 5. SEED DATA (Cambodian Agricultural Categories)
-- ==============================================================================
INSERT INTO public.categories (name, name_en, slug, display_order) VALUES
('បន្លែស្លឹក', 'Leafy Greens', 'leafy-greens', 1),
('បន្លែផ្លែ', 'Fruiting Vegetables', 'fruiting-vegetables', 2),
('មើម', 'Root Vegetables', 'root-vegetables', 3),
('ផ្លែឈើ', 'Fruits', 'fruits', 4),
('គ្រឿងទេស', 'Herbs & Spices', 'herbs-spices', 5),
('ផ្សិត', 'Mushrooms', 'mushrooms', 6)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sourcing_demands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demand_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Categories: Anyone can read
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Products: Anyone can read active products, farmers can manage their own
CREATE POLICY "Active products viewable by everyone" ON public.products FOR SELECT USING (status = 'active' OR auth.uid() = farmer_id);
CREATE POLICY "Farmers can insert products" ON public.products FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update own products" ON public.products FOR UPDATE USING (auth.uid() = farmer_id);
CREATE POLICY "Farmers can delete own products" ON public.products FOR DELETE USING (auth.uid() = farmer_id);

-- Product Images: Public viewable, owner manageable
CREATE POLICY "Product images viewable by everyone" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Farmers can manage own product images" ON public.product_images FOR ALL USING (
    EXISTS (SELECT 1 FROM public.products WHERE products.id = product_images.product_id AND products.farmer_id = auth.uid())
);

-- Profiles: Public can view basic profile, users can update their own
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Sourcing Demands: Viewable by everyone, buyers manage own
CREATE POLICY "Demands viewable by everyone" ON public.sourcing_demands FOR SELECT USING (true);
CREATE POLICY "Buyers can create demands" ON public.sourcing_demands FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Buyers can update own demands" ON public.sourcing_demands FOR UPDATE USING (auth.uid() = buyer_id);

-- Demand Offers: Farmers view/manage own offers, demand owner can view offers
CREATE POLICY "Offers viewable by offer owner and demand owner" ON public.demand_offers FOR SELECT USING (
    auth.uid() = farmer_id OR 
    EXISTS (SELECT 1 FROM public.sourcing_demands WHERE sourcing_demands.id = demand_offers.demand_id AND sourcing_demands.buyer_id = auth.uid())
);
CREATE POLICY "Farmers can submit offers" ON public.demand_offers FOR INSERT WITH CHECK (auth.uid() = farmer_id);
CREATE POLICY "Farmers can update own offers" ON public.demand_offers FOR UPDATE USING (auth.uid() = farmer_id);

-- Orders: Only buyer and farmer can view/manage
CREATE POLICY "Orders viewable by buyer or farmer" ON public.orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = farmer_id);
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Participants can update orders" ON public.orders FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = farmer_id);

-- Order Items: Viewable if user can view order
CREATE POLICY "Order items viewable by order participants" ON public.order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND (orders.buyer_id = auth.uid() OR orders.farmer_id = auth.uid()))
);

-- Conversations & Messages: Strict participant access
CREATE POLICY "Conversations viewable by participants" ON public.conversations FOR SELECT USING (auth.uid() = participant_one OR auth.uid() = participant_two);
CREATE POLICY "Messages viewable by conversation participants" ON public.messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.conversations WHERE conversations.id = messages.conversation_id AND (conversations.participant_one = auth.uid() OR conversations.participant_two = auth.uid()))
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reviews: Public viewable, buyers can create
CREATE POLICY "Reviews viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Buyers can insert review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Notifications: Only target user can view/update
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Saved Products: Only owner can view/manage
CREATE POLICY "Users manage own saved products" ON public.saved_products FOR ALL USING (auth.uid() = buyer_id);

-- ==============================================================================
-- 7. REALTIME PUBLICATION SETUP
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

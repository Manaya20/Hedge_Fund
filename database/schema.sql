-- Enable the necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "timescaledb";

-- User Profiles (extends Supabase Auth)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    display_name TEXT,
    avatar_url TEXT,
    phone_number TEXT,
    country TEXT,
    tax_id TEXT,
    is_accredited_investor BOOLEAN DEFAULT FALSE,
    risk_tolerance INTEGER DEFAULT 50, -- 0-100 scale
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscription Tiers
CREATE TABLE subscription_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2),
    price_yearly DECIMAL(10, 2),
    features JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Subscriptions
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    tier_id UUID NOT NULL REFERENCES subscription_tiers(id),
    status TEXT NOT NULL, -- 'active', 'trial', 'expired', 'cancelled'
    trial_ends_at TIMESTAMPTZ,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    payment_method_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolios
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_demo BOOLEAN DEFAULT FALSE,
    initial_balance DECIMAL(15, 2) NOT NULL,
    current_balance DECIMAL(15, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Strategies
CREATE TABLE strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    risk_level TEXT NOT NULL, -- 'low', 'medium', 'high'
    min_subscription_tier UUID REFERENCES subscription_tiers(id),
    is_active BOOLEAN DEFAULT TRUE,
    parameters JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Strategies (many-to-many)
CREATE TABLE portfolio_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    strategy_id UUID NOT NULL REFERENCES strategies(id) ON DELETE CASCADE,
    allocation_percentage INTEGER NOT NULL, -- 0-100
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(portfolio_id, strategy_id)
);

-- Assets
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    asset_type TEXT NOT NULL, -- 'stock', 'etf', 'crypto', 'bond', etc.
    exchange TEXT,
    currency TEXT DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Holdings
CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    asset_id UUID NOT NULL REFERENCES assets(id),
    quantity DECIMAL(18, 8) NOT NULL,
    average_price DECIMAL(18, 8) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(portfolio_id, asset_id)
);

-- Transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id),
    transaction_type TEXT NOT NULL, -- 'buy', 'sell', 'deposit', 'withdrawal', 'dividend'
    quantity DECIMAL(18, 8),
    price DECIMAL(18, 8),
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2) DEFAULT 0,
    strategy_id UUID REFERENCES strategies(id),
    status TEXT NOT NULL, -- 'pending', 'completed', 'failed', 'cancelled'
    notes TEXT,
    executed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Market Data (Time Series)
CREATE TABLE market_data (
    time TIMESTAMPTZ NOT NULL,
    asset_id UUID NOT NULL REFERENCES assets(id),
    open DECIMAL(18, 8),
    high DECIMAL(18, 8),
    low DECIMAL(18, 8),
    close DECIMAL(18, 8) NOT NULL,
    volume DECIMAL(18, 8),
    PRIMARY KEY(time, asset_id)
);

-- Convert market_data to a hypertable
SELECT create_hypertable('market_data', 'time');

-- Performance Metrics
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    balance DECIMAL(15, 2) NOT NULL,
    deposits DECIMAL(15, 2) DEFAULT 0,
    withdrawals DECIMAL(15, 2) DEFAULT 0,
    daily_return DECIMAL(10, 6),
    daily_return_pct DECIMAL(10, 6),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(portfolio_id, date)
);

-- User Activity Logs (for compliance and auditing)
CREATE TABLE user_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    activity_type TEXT NOT NULL,
    description TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default subscription tiers
INSERT INTO subscription_tiers (name, description, price_monthly, price_yearly, features) VALUES
('Free Trial', 'Explore the platform with simulated trading', 0, 0, '{"simulated_trading": true, "basic_ai_strategies": true, "educational_content": true, "community_support": true}'),
('Standard', 'Access to live trading and core AI strategies', 29.99, 299.99, '{"live_trading": true, "core_ai_strategies": true, "basic_analytics": true, "email_support": true}'),
('Professional', 'Full access to all AI models and advanced features', 99.99, 999.99, '{"live_trading": true, "all_ai_strategies": true, "advanced_analytics": true, "priority_support": true, "api_access": true}'),
('Institutional', 'Enterprise-grade solutions with dedicated support', 499.99, 4999.99, '{"live_trading": true, "all_ai_strategies": true, "advanced_analytics": true, "dedicated_support": true, "api_access": true, "custom_strategies": true, "white_labeling": true}');

-- Set up Row Level Security (RLS)
-- User Profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- User Subscriptions
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own subscriptions" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- Portfolios
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own portfolios" ON portfolios
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own portfolios" ON portfolios
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own portfolios" ON portfolios
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own portfolios" ON portfolios
    FOR DELETE USING (auth.uid() = user_id);

-- Portfolio Holdings
ALTER TABLE portfolio_holdings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view holdings for their portfolios" ON portfolio_holdings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios
            WHERE portfolios.id = portfolio_holdings.portfolio_id
            AND portfolios.user_id = auth.uid()
        )
    );

-- Transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view transactions for their portfolios" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios
            WHERE portfolios.id = transactions.portfolio_id
            AND portfolios.user_id = auth.uid()
        )
    );

-- Performance Metrics
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view performance metrics for their portfolios" ON performance_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM portfolios
            WHERE portfolios.id = performance_metrics.portfolio_id
            AND portfolios.user_id = auth.uid()
        )
    );

-- Create functions for user management
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    
    -- Create a demo portfolio for the new user
    INSERT INTO public.portfolios (user_id, name, description, is_demo, initial_balance, current_balance)
    VALUES (new.id, 'Demo Portfolio', 'Your simulated trading portfolio', TRUE, 100000, 100000);
    
    -- Add free trial subscription
    INSERT INTO public.user_subscriptions (user_id, tier_id, status, trial_ends_at)
    VALUES (
        new.id, 
        (SELECT id FROM public.subscription_tiers WHERE name = 'Free Trial' LIMIT 1),
        'trial',
        NOW() + INTERVAL '14 days'
    );
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

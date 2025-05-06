CREATE TABLE IF NOT EXISTS signers (
    address TEXT PRIMARY KEY,
    chain_id INTEGER NOT NULL,
    profile JSONB NOT NULL DEFAULT '{}'::jsonb,
    transactions_count INTEGER NOT NULL,
    block_number INTEGER NOT NULL,
    block_timestamp TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_address_per_chain UNIQUE (address, chain_id)
);
CREATE INDEX IF NOT EXISTS idx_signers_address_chain_id ON signers(address, chain_id);
CREATE INDEX IF NOT EXISTS idx_signers_profile_jsonb ON signers USING gin (profile);

--CREATE TABLE IF NOT EXISTS users (
--    id SERIAL PRIMARY KEY,
--    user_id UUID NOT NULL UNIQUE,
--    email TEXT NOT NULL UNIQUE,
--    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
--);
--CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    domain TEXT NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    --CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS logins (
    id SERIAL PRIMARY KEY,
    application_id UUID NOT NULL,
    date DATE NOT NULL,
    chain_id INTEGER NOT NULL,
    signer_address TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_id FOREIGN KEY (application_id) REFERENCES applications(id),
    CONSTRAINT unique_login_per_day UNIQUE (application_id, date, chain_id, signer_address)
);

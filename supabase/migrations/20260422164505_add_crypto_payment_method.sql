INSERT INTO payment_methods (name, enabled, type) VALUES ('Cryptocurrency (USDC)', true, 'crypto') ON CONFLICT DO NOTHING;

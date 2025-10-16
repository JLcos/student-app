-- Seed data for Student App
-- Execute this after running the initial migration to add sample data

-- Note: Replace the user_id values with actual user IDs from your auth.users table

-- Example: Insert default subjects for a user
-- IMPORTANT: Update user_id with your actual user ID after authentication

-- Sample subjects (update user_id before running)
INSERT INTO subjects (user_id, name, color, teacher, schedule) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Matemática', '#FF6B35', 'Prof. Silva', 'Seg/Qua 08:00'),
  ('00000000-0000-0000-0000-000000000000', 'Português', '#4ECDC4', 'Prof. Santos', 'Ter/Qui 10:00'),
  ('00000000-0000-0000-0000-000000000000', 'História', '#FFE66D', 'Prof. Oliveira', 'Qua/Sex 14:00'),
  ('00000000-0000-0000-0000-000000000000', 'Geografia', '#FF85C0', 'Prof. Costa', 'Seg/Qui 16:00'),
  ('00000000-0000-0000-0000-000000000000', 'Ciências', '#9B5DE5', 'Prof. Lima', 'Ter/Sex 08:00'),
  ('00000000-0000-0000-0000-000000000000', 'Inglês', '#00F5A0', 'Prof. Brown', 'Qua/Sex 10:00')
ON CONFLICT DO NOTHING;

-- You can also create a function to seed default subjects for new users
CREATE OR REPLACE FUNCTION create_default_subjects_for_user(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO subjects (user_id, name, color) VALUES
    (p_user_id, 'Matemática', '#FF6B35'),
    (p_user_id, 'Português', '#4ECDC4'),
    (p_user_id, 'História', '#FFE66D'),
    (p_user_id, 'Geografia', '#FF85C0'),
    (p_user_id, 'Ciências', '#9B5DE5'),
    (p_user_id, 'Inglês', '#00F5A0')
  ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Usage: SELECT create_default_subjects_for_user('your-user-id-here');

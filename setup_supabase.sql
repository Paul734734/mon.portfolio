-- Créer la table si elle n'existe pas
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Autoriser les insertions publiques
CREATE POLICY "insert_public" ON messages
FOR INSERT TO anon
WITH CHECK (true);

-- Vérification
SELECT 'Table messages créée avec succès !' AS status;

USE psychology_cabinet;

-- Insertion des praticiens
INSERT INTO practitioners (name, specialty, photo_url, bio) VALUES
('Dr. Marie Dubois', 'Psychologue clinicienne', '/placeholder.svg?height=300&width=300', 'Spécialisée en thérapie cognitive et comportementale avec plus de 15 ans d\'expérience. Accompagne les adultes dans la gestion de l\'anxiété et de la dépression.'),
('Dr. Pierre Martin', 'Thérapeute de couple', '/placeholder.svg?height=300&width=300', 'Expert en thérapie de couple et familiale. Aide les couples à surmonter leurs difficultés relationnelles et à renforcer leur communication.'),
('Dr. Sophie Laurent', 'Psychologue pour enfants', '/placeholder.svg?height=300&width=300', 'Spécialisée dans l\'accompagnement des enfants et adolescents. Experte en troubles du comportement et difficultés scolaires.');

-- Insertion des services
INSERT INTO services (title, description, image_url) VALUES
('Thérapie Individuelle', 'Accompagnement personnalisé pour surmonter les difficultés personnelles, gérer le stress, l\'anxiété et développer votre bien-être mental.', '/placeholder.svg?height=400&width=600'),
('Thérapie de Couple', 'Aide aux couples pour améliorer leur communication, résoudre les conflits et renforcer leur relation amoureuse.', '/placeholder.svg?height=400&width=600'),
('Thérapie Familiale', 'Accompagnement des familles pour résoudre les tensions, améliorer les relations et créer un environnement harmonieux.', '/placeholder.svg?height=400&width=600'),
('Accompagnement Professionnel', 'Support psychologique en entreprise pour gérer le stress professionnel, le burn-out et améliorer le bien-être au travail.', '/placeholder.svg?height=400&width=600');

-- Insertion des articles
INSERT INTO articles (title, slug, content, author, published_date) VALUES
('Gérer l\'anxiété au quotidien', 'gerer-anxiete-quotidien', 'L\'anxiété est une réaction normale face au stress, mais elle peut devenir problématique quand elle interfère avec notre quotidien. Voici quelques techniques pour mieux la gérer...', 'Dr. Marie Dubois', '2024-01-15'),
('L\'importance de la communication dans le couple', 'communication-couple', 'La communication est la base d\'une relation saine. Découvrez comment améliorer votre communication avec votre partenaire...', 'Dr. Pierre Martin', '2024-01-10'),
('Accompagner son enfant dans ses émotions', 'accompagner-enfant-emotions', 'Les enfants vivent des émotions intenses qu\'ils ne savent pas toujours exprimer. Voici comment les accompagner...', 'Dr. Sophie Laurent', '2024-01-05');

-- Insertion des FAQ
INSERT INTO faq (question, answer) VALUES
('Combien coûte une séance ?', 'Le tarif d\'une séance individuelle est de 70€. Les séances de couple sont facturées 90€. Nous acceptons les chèques et les virements bancaires.'),
('Quelle est la durée d\'une séance ?', 'Une séance dure généralement 50 minutes pour les consultations individuelles et 1h15 pour les séances de couple ou familiales.'),
('Puis-je annuler un rendez-vous ?', 'Oui, vous pouvez annuler votre rendez-vous jusqu\'à 24h avant la séance. Au-delà, la séance sera facturée.'),
('Proposez-vous des consultations en ligne ?', 'Oui, nous proposons des consultations par visioconférence pour les patients qui ne peuvent pas se déplacer.');

-- Insertion de témoignages validés
INSERT INTO testimonials (name, content, rating, is_validated) VALUES
('Marie L.', 'Un accompagnement exceptionnel qui m\'a vraiment aidée à surmonter mes difficultés. Je recommande vivement !', 5, TRUE),
('Jean-Paul M.', 'Grâce à la thérapie de couple, nous avons pu sauver notre mariage. Merci pour votre professionnalisme.', 5, TRUE),
('Sylvie R.', 'Une écoute bienveillante et des conseils précieux. Je me sens beaucoup mieux depuis que j\'ai commencé les séances.', 4, TRUE);

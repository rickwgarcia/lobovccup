-- ============================================================
-- Lobo VC Cup 2026 — Seed Data
-- Pre-loads the 15 registered teams from 2026 registration
--
-- IMPORTANT: This seed requires real user accounts to exist first.
-- Run after your test users have signed up via the auth portal.
-- Replace the placeholder UUIDs below with real auth.users UUIDs.
--
-- To get user IDs after signup:
--   SELECT id, email FROM auth.users;
-- ============================================================

-- ============================================================
-- Seed: Admin user role assignment
-- Replace 'admin-user-uuid-here' with the actual admin user ID
-- ============================================================
-- UPDATE public.users SET role = 'admin'
-- WHERE email = 'delcampo@unm.edu';

-- ============================================================
-- Seed: Demo teams for development/testing
-- These use placeholder IDs — replace for production use
-- ============================================================

-- To insert seed teams, first ensure key_contact users exist.
-- Below is a reference of the 2026 registered teams.
-- In production, teams self-register through the portal.

-- ============================================================
-- 2026 Registered Teams Reference
-- ============================================================

-- STARTUP TEAMS (8 teams)
--
-- 1.  Team: Lobos Health         | Pathway: startup | Idea: AI-powered patient triage for rural NM clinics
-- 2.  Team: SunBright Solar      | Pathway: startup | Idea: Residential solar installation marketplace for the Southwest
-- 3.  Team: RanchTech            | Pathway: startup | Idea: IoT livestock monitoring for New Mexico ranchers
-- 4.  Team: Mesa Eats            | Pathway: startup | Idea: Ghost kitchen network connecting home cooks to delivery platforms
-- 5.  Team: AltitudeFit          | Pathway: startup | Idea: Elevation-adaptive fitness app for high-altitude athletes
-- 6.  Team: CivicPulse           | Pathway: startup | Idea: Constituent-to-representative communication platform for local govt
-- 7.  Team: DesertDrone          | Pathway: startup | Idea: Autonomous drone inspection service for oil & gas infrastructure
-- 8.  Team: NMBio                | Pathway: startup | Idea: Plant-based protein extraction from native New Mexico crops

-- VC TEAMS (7 teams)
--
-- 9.  Fund: Sandia Peak Ventures    | Pathway: vc | Thesis: Deep tech and hardware startups in the Southwest
-- 10. Fund: Rio Grande Capital      | Pathway: vc | Thesis: Consumer and marketplace companies serving underbanked communities
-- 11. Fund: Roadrunner Fund         | Pathway: vc | Thesis: B2B SaaS and enterprise tools built by UNM engineers
-- 12. Fund: Mesa Ventures           | Pathway: vc | Thesis: AgTech and FoodTech startups in the Mountain West
-- 13. Fund: Turquoise Trail Capital | Pathway: vc | Thesis: Health tech and biotech startups with Hispanic-market focus
-- 14. Fund: Balloon Aloft Ventures  | Pathway: vc | Thesis: Climate tech and cleantech startups in the Southwest
-- 15. Fund: Lobo Syndicate          | Pathway: vc | Thesis: Pre-seed generalist fund backing first-time UNM founders

-- ============================================================
-- Example INSERT statements (use after real users exist)
-- ============================================================

/*

-- Step 1: Set admin role
UPDATE public.users SET role = 'admin' WHERE email = 'rickwgarcia@unm.edu';

-- Step 2: Insert startup teams
INSERT INTO public.teams (id, name, pathway, idea_description, key_contact_id) VALUES
(
  'a1b2c3d4-0001-0000-0000-000000000001',
  'Lobos Health',
  'startup',
  'AI-powered patient triage for rural New Mexico clinics. Our system reduces ER wait times by up to 40% through intelligent symptom routing and telemedicine integration.',
  '<key-contact-uuid-1>'
),
(
  'a1b2c3d4-0002-0000-0000-000000000002',
  'SunBright Solar',
  'startup',
  'Residential solar installation marketplace for the Southwest. We connect homeowners to vetted local installers with transparent pricing and guaranteed installation timelines.',
  '<key-contact-uuid-2>'
),
(
  'a1b2c3d4-0003-0000-0000-000000000003',
  'RanchTech',
  'startup',
  'IoT livestock monitoring for New Mexico ranchers. GPS + biometric sensors track herd health, location, and feeding patterns with alerts sent directly to rancher smartphones.',
  '<key-contact-uuid-3>'
),
(
  'a1b2c3d4-0004-0000-0000-000000000004',
  'Mesa Eats',
  'startup',
  'Ghost kitchen network connecting home cooks to delivery platforms. We handle compliance, insurance, and logistics so talented home chefs can run food businesses legally.',
  '<key-contact-uuid-4>'
),
(
  'a1b2c3d4-0005-0000-0000-000000000005',
  'AltitudeFit',
  'startup',
  'Elevation-adaptive fitness app for high-altitude athletes. Personalized training plans that account for altitude effects on VO2 max, recovery, and performance metrics.',
  '<key-contact-uuid-5>'
),
(
  'a1b2c3d4-0006-0000-0000-000000000006',
  'CivicPulse',
  'startup',
  'Constituent-to-representative communication platform for local government. Makes contacting city council, county commissioners, and school boards as easy as sending a text.',
  '<key-contact-uuid-6>'
),
(
  'a1b2c3d4-0007-0000-0000-000000000007',
  'DesertDrone',
  'startup',
  'Autonomous drone inspection service for oil & gas infrastructure in the Permian Basin. Reduces inspection costs by 60% vs. manned helicopter surveys.',
  '<key-contact-uuid-7>'
),
(
  'a1b2c3d4-0008-0000-0000-000000000008',
  'NMBio',
  'startup',
  'Plant-based protein extraction from native New Mexico crops including blue corn and pinto beans. B2B ingredient supplier to food manufacturers.',
  '<key-contact-uuid-8>'
);

-- Step 3: Insert VC teams
INSERT INTO public.teams (id, name, pathway, idea_description, key_contact_id) VALUES
(
  'b2c3d4e5-0009-0000-0000-000000000009',
  'Sandia Peak Ventures',
  'vc',
  'Deep tech and hardware startups in the Southwest. We focus on companies with defensible IP emerging from UNM and NMSU research labs.',
  '<key-contact-uuid-9>'
),
(
  'b2c3d4e5-0010-0000-0000-000000000010',
  'Rio Grande Capital',
  'vc',
  'Consumer and marketplace companies serving underbanked communities across New Mexico and the broader Southwest.',
  '<key-contact-uuid-10>'
),
(
  'b2c3d4e5-0011-0000-0000-000000000011',
  'Roadrunner Fund',
  'vc',
  'B2B SaaS and enterprise tools built by UNM engineers. We look for technical founders with strong product instincts.',
  '<key-contact-uuid-11>'
),
(
  'b2c3d4e5-0012-0000-0000-000000000012',
  'Mesa Ventures',
  'vc',
  'AgTech and FoodTech startups in the Mountain West. Our LPs include family farms and food distributors who provide deal flow and strategic value.',
  '<key-contact-uuid-12>'
),
(
  'b2c3d4e5-0013-0000-0000-000000000013',
  'Turquoise Trail Capital',
  'vc',
  'Health tech and biotech startups with a focus on Hispanic-market health disparities and rural healthcare access.',
  '<key-contact-uuid-13>'
),
(
  'b2c3d4e5-0014-0000-0000-000000000014',
  'Balloon Aloft Ventures',
  'vc',
  'Climate tech and cleantech startups in the Southwest. Solar, water, grid tech, and sustainable agriculture.',
  '<key-contact-uuid-14>'
),
(
  'b2c3d4e5-0015-0000-0000-000000000015',
  'Lobo Syndicate',
  'vc',
  'Pre-seed generalist fund backing first-time UNM founders across any vertical. We bet on people, not sectors.',
  '<key-contact-uuid-15>'
);

-- Step 4: Update user roles for VC team contacts
UPDATE public.users SET role = 'vc'
WHERE id IN (
  '<key-contact-uuid-9>',
  '<key-contact-uuid-10>',
  '<key-contact-uuid-11>',
  '<key-contact-uuid-12>',
  '<key-contact-uuid-13>',
  '<key-contact-uuid-14>',
  '<key-contact-uuid-15>'
);

*/

#!/usr/bin/env python3
"""Transform namit.html from real estate to BMSCE Rocketry site."""

with open('namit.html', 'r', encoding='utf-8') as f:
    c = f.read()

# === HEADER ===
c = c.replace('<title>Projects</title>', '<title>BMSCE Rocketry - Projects</title>')
c = c.replace('https://dviga.marketing/masters-en', 'https://bmscerocketry.org/projects')
c = c.replace('content="Masters - Live and Create"', 'content="BMSCE Rocketry - Designing, Manufacturing and Launching High-Power Sounding Rockets"')
c = c.replace('lang="ru"', 'lang="en"')
c = c.replace('data-tilda-project-lang="RU"', 'data-tilda-project-lang="EN"')
c = c.replace('Закрыть диалоговое окно', 'Close dialog')

# === LOGO ===
c = c.replace('https://static.tildacdn.com/tild3564-6238-4462-a332-386164303263/imgi_52_Frame_1_1.svg', 'imgs/rocketry-logo.png')

# === BRAND NAME ===
c = c.replace('The MASTERS', 'BMSCE ROCKETRY')
c = c.replace('MASTERS', 'ROCKETRY')
c = c.replace('Masters - Live and Create', 'BMSCE Rocketry - Projects')

# === HERO ===
c = c.replace('Premium Residences near Aeroport\n                                    Station', 'High-Power Sounding Rockets\n                                    Built by Students')

# === MAIN ABOUT ===
c = c.replace(
    'The ROCKETRY, a&nbsp;new luxury residential\n                            building in&nbsp;Moscow\u2019s prestigious north, is&nbsp;located at&nbsp;16 Viktorenko Street.\n                            Nestled in&nbsp;a&nbsp;quiet, intimate neighborhood near the parks and architectural\n                            landmarks of&nbsp;the Khodynka area, it&nbsp;is&nbsp;just 15 minutes from the Kremlin. This\n                            serene, private enclave is&nbsp;surrounded by&nbsp;lush green spaces and welcoming\n                            residential courtyards.',
    'BMSCE ROCKETRY, a&nbsp;student-led aerospace team\n                            at&nbsp;B.M.S. College of&nbsp;Engineering, designs, manufactures, and launches\n                            high-power sounding rockets to&nbsp;a&nbsp;world-class standard. With 90+ student\n                            engineers across multiple disciplines, we&nbsp;function with the discipline\n                            of&nbsp;a&nbsp;professional aerospace organization, pushing the boundaries of&nbsp;what\n                            student teams can achieve in&nbsp;India.'
)

# === SECTION 2 ===
c = c.replace(
    'The neighborhood has long been home\n                            to&nbsp;brilliant minds in&nbsp;aviation and science, a&nbsp;creative hub for artists and\n                            musicians, and the birthplace of&nbsp;breakthrough discoveries and cultural masterpieces.',
    'Our team has been at&nbsp;the forefront of&nbsp;student rocketry in&nbsp;India, developing\n                            advanced propulsion systems, custom composite airframes, dual-event recovery\n                            systems, and real-time telemetry for every launch vehicle we&nbsp;build.'
)

# === SECTION 3 ===
c = c.replace(
    'We&nbsp;are designing\n                            an&nbsp;environment for those who will carry on&nbsp;this legacy. The ROCKETRY Residences\n                            provide a&nbsp;sanctuary for modern leaders and creatives. It&nbsp;is a&nbsp;place where\n                            architecture inspires, panoramic views energize, and dynamic shared spaces foster the\n                            exchange of&nbsp;ideas to&nbsp;help bring your vision to&nbsp;life.',
    'We&nbsp;are engineering\n                            a&nbsp;future for those who dare to&nbsp;reach the stars. From high-altitude flights\n                            to&nbsp;hybrid propulsion research, our projects provide a&nbsp;launchpad for\n                            innovation and real-world aerospace experience that inspires the next generation\n                            of&nbsp;rocket scientists in&nbsp;India.'
)

# === SECTION 4 ===
c = c.replace(
    'The streets surrounding The ROCKETRY are\n                            steeped in&nbsp;a&nbsp;rich legacy of&nbsp;creative innovation&nbsp;\u2014 a&nbsp;heritage that\n                            has shaped the neighborhood\u2019s unique identity for generations. A&nbsp;brief fifteen-minute\n                            stroll reveals a&nbsp;stunning tapestry of&nbsp;architectural history: the famous Petrovsky\n                            Palace, the unique Sokol Artists\' Village, striking Constructivist neighborhoods, rare\n                            pre-Empire residential buildings of&nbsp;the 1930s, and the grand, ceremonial facades\n                            of&nbsp;Leningradsky Avenue.',
    'Since 2025, our rockets have flown\n                            at&nbsp;progressively higher altitudes, with each launch validating new technologies:\n                            NAF-2 reaching new heights, BVYOMAGNI pushing avionics boundaries, and the upcoming\n                            LUMOS S3P3 and PHOENIX NAF-2 Mk II representing our most ambitious projects yet,\n                            targeting the K&aacute;rm&aacute;n line.'
)

# === SECTION TITLES ===
c = c.replace('>Location</div>', '>PROJECTS</div>')
c = c.replace('>Landscaping</div>', '>SPONSORS</div>')
c = c.replace('>Architecture</div>', '>PROJECTS OVERVIEW</div>')

# === STATS ===
c = c.replace('>8 to 25 stories</div>', '>4+ Rockets Launched</div>')
c = c.replace('Varying building heights offering\n                            stunning city views', 'Each rocket designed for progressively higher altitude flights')
c = c.replace('>11 buildings</div>', '>5+ Years of Innovation</div>')
c = c.replace('of landscaping', 'of aerospace engineering excellence')
c = c.replace('Premium outdoor amenities and lush\n                            grounds', '90+ student engineers across multiple engineering disciplines')
c = c.replace('>5 acres</div>', '>10,000+ ft</div>')
c = c.replace('of total grounds', 'highest achieved altitude')
c = c.replace('A&nbsp;private sanctuary for work and\n                            relaxation, shielded from the city bustle', 'Fully student-designed and flight-validated rocket systems')
c = c.replace('>6.4 acres</div>', '>90+</div>')
c = c.replace('of office space', 'team members')
c = c.replace('Where life and work achieve perfect\n                            balance', 'Where engineering excellence meets aerospace innovation')
c = c.replace('>4,500 M&sup2;</div>', '>100%</div>')
c = c.replace('of ground-floor retail', 'student-designed systems')
c = c.replace('Exclusive shared spaces and commercial\n                            suites on the ground floor', 'Custom composite airframes and advanced avionics built in-house')
c = c.replace('>2,400 M&sup2;</div>', '>4</div>')
c = c.replace('As few as 3 residences per floor', 'Major rocket projects developed')
c = c.replace('Over 100 unique floor plans for\n                            personalized living', 'Each project pushes the boundaries of student rocketry in India')
c = c.replace('>672 residences</div>', '>4 Rockets</div>')

# === PHOENIX PROJECT ===
c = c.replace('Architectural design by GAFA Architects', 'PHOENIX - NAF-2 Mk II (2026)')
c = c.replace(
    'The eight-story buildings front the\n                            greenbelt, while the 25-story towers offer 360-degree panoramic views. Featuring\n                            a&nbsp;crystal-inspired architectural design, the intricate facade details create\n                            a&nbsp;stunning interplay of&nbsp;light and shadow.<br /><br />The development features\n                            a&nbsp;variety of&nbsp;window configurations, including striking bay windows and\n                            floor-to-ceiling windows. Accent lighting elevates the building\u2019s striking silhouette,\n                            transforming it&nbsp;into a&nbsp;modern landmark.',
    'PHOENIX is&nbsp;our most advanced high-power rocket, featuring\n                            dual-deployment recovery, carbon fiber airframe, and an&nbsp;integrated flight computer\n                            with real-time telemetry. Designed to&nbsp;reach unprecedented altitudes for\n                            a&nbsp;student-built vehicle, PHOENIX represents the culmination of&nbsp;everything\n                            our team has learned across five years of&nbsp;rocket development.<br /><br />With\n                            custom-designed propulsion, precision-machined components, and redundant\n                            recovery systems, PHOENIX is&nbsp;the flagship of&nbsp;our 2026 launch campaign,\n                            taking student rocketry in&nbsp;India to&nbsp;new heights.'
)

# === SUBSYSTEMS ===
c = c.replace('Up to 80% glass facades', 'Carbon Fiber Airframes')
c = c.replace('offer diverse\n                                            sightlines and create an iconic, recognizable skyline', 'Lightweight, high-strength composite structures for maximum altitude performance')
c = c.replace('Varying building\n                                            heights and custom window configurations', 'Dual-event recovery systems with redundant deployment')
c = c.replace('Thoughtfully designed\n                                            exterior lighting enhances the building\u2019s striking architectural presence', 'Flight-proven avionics with real-time sensor data and GPS tracking')
c = c.replace('Accent lighting\n                                            elevates the building\u2019s silhouette', 'Custom solid and hybrid propulsion systems')
c = c.replace('>Energy-Efficient\n                                            Systems</div>', '>Custom Avionics</div>')
c = c.replace('Custom Window Features', 'Rocket Subsystems')

# === LAUNCH CAMPAIGNS ===
c = c.replace('>Transit & Connectivity</div>', '>LAUNCH CAMPAIGNS</div>')
c = c.replace('>Driving</div>', '>Apogee</div>')
c = c.replace('>Walking Distance</div>', '>Team Size</div>')
c = c.replace('>Aeroport Station</div>', '>NAF-2 (2025)</div>')
c = c.replace('>CSKA Station</div>', '>BVYOMAGNI (2025)</div>')
c = c.replace('>Zorge MCC Station</div>', '>LUMOS S3P3 (2026)</div>')
c = c.replace('>TTK Highway</div>', '>PHOENIX Mk II (2026)</div>')
c = c.replace('>Garden Ring</div>', '>Hybrid Propulsion</div>')
c = c.replace('>The Kremlin</div>', '>Dual-Deploy Recovery</div>')
c = c.replace('>Moscow City</div>', '>Telemetry Systems</div>')
c = c.replace('>MKAD</div>', '>Avionics Suite</div>')

# === SUBSYSTEMS LIST ===
c = c.replace('>Shopping</div>', '>Subsystems</div>')
c = c.replace('>Dynamo</div>', '>Propulsion</div>')
c = c.replace('>Metropolis</div>', '>Avionics</div>')
c = c.replace('>Aviapark</div>', '>Recovery</div>')
c = c.replace('>Arena Plaza</div>', '>Airframes</div>')

# === ENGINEERING TEAMS ===
c = c.replace('>Schools</div>', '>Engineering Teams</div>')
c = c.replace('>Education & Schools</div>', '>Core Subsystems</div>')
c = c.replace('>Preschools &\n                                            Daycare</div>', '>Propulsion &\n                                            Motors</div>')
c = c.replace('>Universities</div>', '>Recovery Systems</div>')

# === LAUNCH SITES ===
c = c.replace('>Outdoor Living</div>', '>Launch Sites</div>')
c = c.replace('>Petrovsky Park</div>', '>BMS College Grounds</div>')
c = c.replace('>WWI Heroes Park</div>', '>Static Test Sites</div>')

# === OUR ROCKETS ===
c = c.replace('>Sports & Recreation</div>', '>OUR ROCKETS</div>')

# === MISSION ===
c = c.replace('>The ROCKETRY: Live, Work, and Play</div>', '>BMSCE ROCKETRY: DESIGN, BUILD, LAUNCH</div>')

# === LAUNCH GALLERY ===
c = c.replace('>Interactive 3D Tour</div>', '>LAUNCH GALLERY</div>')

# === PROJECTS ===
c = c.replace('>LAYOUTS</div>', '>PROJECTS</div>')
c = c.replace('The ROCKETRY Residences feature:', 'BMSCE ROCKETRY projects feature:')
c = c.replace('>Masterful Interiors</div>', '>PROJECT DETAILS</div>')
c = c.replace('>2-Bedroom Residences</div>', '>PHOENIX Mk II</div>')
c = c.replace('>3-Bedroom Residences</div>', '>NAF-2 Mk II</div>')
c = c.replace('>1-Bedroom Residences</div>', '>Test Vehicles</div>')

# === ROCKET DETAILS ===
c = c.replace('>MASTERFUL DETAILS</div>', '>ROCKET DETAILS</div>')
c = c.replace('>Parking Garage</div>', '>Propulsion Systems</div>')
c = c.replace('>Elevators</div>', '>Recovery Systems</div>')
c = c.replace('>Building MEP Systems</div>', '>Avionics & Telemetry</div>')
c = c.replace('>Security</div>', '>Airframe Design</div>')

# === SPONSORS ===
c = c.replace('>Financing & Purchase Options</div>', '>OUR SPONSORS</div>')
c = c.replace('>Family mortgage</div>', '>Sponsor 1</div>')
c = c.replace('>Combo family mortgage</div>', '>Sponsor 2</div>')
c = c.replace('>Tranche mortgage</div>', '>Sponsor 3</div>')
c = c.replace('>Subsidized mortgage</div>', '>Sponsor 4</div>')

# === SPONSOR POPUPS ===
c = c.replace('aria-label="FAMILY MORTGAGE"', 'aria-label="SPONSOR 1"')
c = c.replace('aria-label="COMBO FAMILY MORTGAGE"', 'aria-label="SPONSOR 2"')
c = c.replace('aria-label="STAGED-DRAW MORTGAGE (Milestone Financing)"', 'aria-label="SPONSOR 3"')
c = c.replace('aria-label="DEVELOPER SUBSIDIZED RATE PROGRAM"', 'aria-label="SPONSOR 4"')
c = c.replace('>FAMILY MORTGAGE\n                            </div>', '>SPONSOR 1\n                            </div>')
c = c.replace('>COMBO FAMILY\n                                MORTGAGE</div>', '>SPONSOR 2\n                                </div>')
c = c.replace('>STAGED-DRAW\n                                MORTGAGE (Milestone Financing)</div>', '>SPONSOR 3\n                                </div>')
c = c.replace('>DEVELOPER\n                                SUBSIDIZED RATE PROGRAM</div>', '>SPONSOR 4\n                                </div>')

# === LAUNCH SCHEDULE ===
c = c.replace('>Construction Updates</div>', '>LAUNCH SCHEDULE</div>')
c = c.replace('>April 2026</div>', '>PHOENIX Launch</div>')
c = c.replace('>May 2026</div>', '>LUMOS S3P3</div>')

# === ABOUT ===
c = c.replace('>LEARN MORE ABOUT THE PROJECT</div>', '>EXPLORE OUR PROJECTS</div>')

# === FOOTER ===
c = c.replace('>Phone Number</div>', '>Email Us</div>')
c = c.replace('>Sales Gallery</div>', '>Our Lab</div>')
c = c.replace('>Social media</div>', '>Follow Us</div>')
c = c.replace('Hours of Operation: 9:00 AM - 9:00 PM\n                            (Daily)', 'B.M.S. College of Engineering\n                            (Bangalore, India)')
c = c.replace('Bldg. 2, 8 Aeroporta Passage, Moscow', 'B.M.S. College of Engineering, Bull Temple Road, Bangalore')
c = c.replace('\u00a9 2026 MASTER\'S RESIDENTIAL COMPLEX. All\n                            rights reserved', '\u00a9 2026 BMSCE ROCKETRY. All\n                            rights reserved')

# === IMAGES ===
c = c.replace('https://thb.tildacdn.com/tild3664-3664-4863-b566-326632363234/-/empty/photo.jpg', 'imgs/1.png')
c = c.replace('https://static.tildacdn.com/tild3664-3664-4863-b566-326632363234/photo.jpg', 'imgs/1.png')
c = c.replace('https://static.tildacdn.com/tild3336-3262-4231-b539-666632373538/____________1.jpg', 'imgs/2.png')
c = c.replace('https://static.tildacdn.com/tild3638-3663-4231-a465-383834323837/CHANGE1_1.jpg', 'imgs/3.png')
c = c.replace('https://static.tildacdn.com/tild3535-3762-4436-b035-363133623864/Mask_group.jpg', 'imgs/4.png')
c = c.replace('https://static.tildacdn.com/tild6333-3735-4638-a262-383934343063/Mask_group.jpg', 'imgs/5 (1).png')
c = c.replace('https://static.tildacdn.com/tild3132-6134-4134-a137-646166343064/Mask_group.jpg', 'imgs/6.png')
c = c.replace('https://static.tildacdn.com/tild3266-3439-4432-b838-616339643031/Mask_group.jpg', 'imgs/7.png')
c = c.replace('https://static.tildacdn.com/tild3334-6130-4537-b932-653761656134/Mask_group.jpg', 'imgs/8.png')
c = c.replace('https://static.tildacdn.com/tild3437-3133-4334-b030-313564376162/Mask_group-1.jpg', 'imgs/1.png')
c = c.replace('https://static.tildacdn.com/tild6238-3437-4332-b161-373332323565/Mask_group.jpg', 'imgs/2.png')
c = c.replace('https://static.tildacdn.com/tild6661-6237-4665-b966-373432376531/3.jpg', 'imgs/3.png')
c = c.replace('https://static.tildacdn.com/tild3238-3136-4664-b163-326262396666/Khodynka_Field.jpg', 'imgs/4.png')
c = c.replace('https://static.tildacdn.com/tild6534-6132-4330-a233-656665623565/Khodynka_Field.jpg', 'imgs/5 (1).png')
c = c.replace('https://static.tildacdn.com/tild6234-6239-4338-b864-666632346636/2.jpg', 'imgs/6.png')
c = c.replace('https://static.tildacdn.com/tild6331-6339-4633-a236-323065616163/4.jpg', 'imgs/7.png')
c = c.replace('https://static.tildacdn.com/tild3765-3237-4566-a365-333166646539/5.jpg', 'imgs/8.png')
c = c.replace('https://static.tildacdn.com/tild3961-6364-4034-b833-613966346166/3.jpg', 'imgs/1.png')
c = c.replace('https://static.tildacdn.com/tild6162-6663-4837-a433-373864376636/2.jpg', 'imgs/2.png')

# === REMAINING MASTERS/ROCKETRY FIXES ===
c = c.replace('The ROCKETRY', 'BMSCE ROCKETRY')
c = c.replace('ROCKETRY Residences', 'ROCKETRY Projects')
c = c.replace('ROCKETRY, a&nbsp;new luxury residential', 'ROCKETRY, a&nbsp;student-led aerospace')
c = c.replace('>ROCKETRY</div>', '>BMSCE ROCKETRY</div>')
c = c.replace('ROCKETRY Projects', 'BMSCE ROCKETRY Projects')
c = c.replace('ROCKETRY is', 'BMSCE ROCKETRY is')

# === OTHER SECTIONS ===
c = c.replace('>The Art of&nbsp;Design</div>', '>The Art of&nbsp;Engineering</div>')
c = c.replace('>Site Plan</div>', '>PROJECT OVERVIEW</div>')
c = c.replace('>Landscape Concept</div>', '>LAUNCH OPERATIONS</div>')
c = c.replace('>Amenities Plan</div>', '>SUBSYSTEM MAP</div>')
c = c.replace('>Private Courtyard</div>', '>INTEGRATION FACILITY</div>')
c = c.replace('>MASTERFUL DETAILS</div>', '>ENGINEERING DETAILS</div>')
c = c.replace('>Grand Lobby & Main Reception</div>', '>Mission Control Center</div>')
c = c.replace('>Color palette</div>', '>Design Language</div>')
c = c.replace('>Materials</div>', '>Components</div>')
c = c.replace('>Lighting</div>', '>Avionics</div>')
c = c.replace('>Safety & Durability</div>', '>Reliability & Redundancy</div>')

# === COUNTERS ===
c = c.replace('>1 / 3</div>', '>1 / 4</div>')
c = c.replace('>1 / 5</div>', '>1 / 4</div>')
c = c.replace('>minS</div>', '>km/h</div>')
c = c.replace('>sq. m.</div>', '>ft.</div>')
c = c.replace('M&sup2;', 'ft&sup2;')
c = c.replace('>Ranging from</div>', '>Altitude</div>')

with open('namit.html', 'w', encoding='utf-8') as f:
    f.write(c)

print("Transformation complete!")
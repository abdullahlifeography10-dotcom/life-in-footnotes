import { SiteContent } from '../types';

export const DEFAULT_CONTENT: SiteContent = {
  profile: {
    name: 'Life in Footnotes',
    tagline: 'Photography. Places. Personal Stories.',
    creator: 'Abdullah',
    location: 'Podma Abashik, Vodra, Rajshahi, Bangladesh',
    instagram: '_abd_moments',
    facebook: 'Life in Footnotes',
    email: 'abdullah.lifeography10@gmail.com',
    phone: '+880 1756-070097',
    description:
      'A collection of frames, thoughts and stories from everyday life. Capturing fleeting moments, exploring unfamiliar places, and finding beauty in the ordinary.',
    quote: 'Not every moment needs a reason to be remembered.',
    heroHeadline: 'LIFE IN FOOTNOTES',
    heroSubtitle: 'Not every moment needs a reason to be remembered.',
    heroSupportingText:
      'A visual diary of places I wander, moments I capture, and stories I collect along the way.',
    aboutBio: [
      'I am a university student with a passion for photography, travelling, and storytelling. I find inspiration in ordinary moments, quiet landscapes, unfamiliar streets, and the little details of everyday life.',
      'Life in Footnotes is my personal creative space — a place where photographs become memories, journeys become stories, and passing moments find a permanent home.',
      'Based in Rajshahi, along the quiet embankments of the Padma river, I balance my university lectures with early morning photo walks, spontaneous overnight bus journeys, and long quiet evenings writing down what my camera could not quite say.'
    ],
    creativePhilosophy: [
      'The Unposed Truth: Real life rarely arranges itself for a studio light. The finest frames are unscripted.',
      'Film Soul & Patience: Digital allows infinite clicks, but shooting like film demands deliberation, stillness, and reverence for light.',
      'Footnotes Matter: Great grand chapters get celebrated, but life is lived in the small marginal notes.'
    ],
    timeline: [
      {
        year: '2021',
        title: 'The First Shutter',
        description: 'Began exploring Rajshahi university campus and local alleys with a borrowed camera.'
      },
      {
        year: '2023',
        title: 'Coastal Expeditions',
        description: 'First solo trip to Saint Martin Island and Cox’s Bazar, documenting coastal fishermen.'
      },
      {
        year: '2025',
        title: 'Notes & Thoughts',
        description: 'Began pairing travel documentary frames with reflective long-form personal journal essays.'
      },
      {
        year: '2026',
        title: 'Life in Footnotes',
        description: 'Curating an independent artistic publication dedicated to fleeting moments and ordinary beauty.'
      }
    ]
  },
  categories: [
    'All Frames',
    'Nature',
    'Landscape',
    'Street',
    'Travel',
    'Everyday Life',
    'Architecture',
    'Portraits'
  ],
  photos: [
    {
      id: 'frame-padma-sunset',
      title: 'Dusk Over Padma Riverbank',
      category: 'Landscape',
      imageUrl: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
      caption: 'The golden hour settles over the calm expanse of Padma. Wooden fishing boats wait on muddy banks as migratory birds glide quietly into the mist.',
      location: 'Rajshahi, Bangladesh',
      date: 'October 2026',
      cameraInfo: 'Leica M6 · 35mm f/2 · Portra 400',
      aspect: 'panoramic',
      featuredOnHome: true
    },
    {
      id: 'frame-saint-martin-boat',
      title: 'Saint Martin Express at High Tide',
      category: 'Travel',
      imageUrl: '/src/assets/images/saint_martin_island_1794416271307.jpg',
      caption: 'A weathered wooden country boat resting on the coral sands of Saint Martin. Coconut palms bow gently under the gentle Bay of Bengal breeze.',
      location: 'Saint Martin Island, Bangladesh',
      date: 'February 2026',
      cameraInfo: '50mm f/1.8 · ISO 100 · 1/800s',
      aspect: 'landscape',
      featuredOnHome: true
    },
    {
      id: 'frame-coxs-bazar-nets',
      title: 'The Fisherman’s Dusk Song',
      category: 'Nature',
      imageUrl: '/src/assets/images/coxs_bazar_coast_1794416271646.jpg',
      caption: 'Fishermen pulling coastal nets under a dramatic violet and amber sky along the unending shoreline of Cox’s Bazar.',
      location: 'Cox’s Bazar, Bangladesh',
      date: 'January 2026',
      cameraInfo: '35mm f/2.8 · ISO 400 · 1/250s',
      aspect: 'landscape',
      featuredOnHome: true
    },
    {
      id: 'frame-everyday-desk',
      title: 'A Room of One’s Own',
      category: 'Everyday Life',
      imageUrl: '/src/assets/images/everyday_quiet_life_1794416273610.jpg',
      caption: 'Study desk bathed in cold monsoon rain light. An open notebook, steaming clay cup of milk tea, and the brass patina of a trusted rangefinder.',
      location: 'Vodra, Rajshahi',
      date: 'September 2026',
      cameraInfo: '28mm f/2 · ISO 320 · 1/125s',
      aspect: 'portrait',
      featuredOnHome: true
    },
    {
      id: 'frame-street-heritage',
      title: 'Whispering Brick Arches',
      category: 'Street',
      imageUrl: '/src/assets/images/street_heritage_moment_1794416272039.jpg',
      caption: 'Colonial terracotta brickwork bathed in afternoon sunbeams. A lone cyclist navigates the quiet heritage alleys of old Rajshahi.',
      location: 'Old Rajshahi, Bangladesh',
      date: 'August 2026',
      cameraInfo: '50mm f/1.4 · ISO 160 · 1/640s',
      aspect: 'portrait',
      featuredOnHome: true
    },
    {
      id: 'frame-paddy-morning',
      title: 'Emerald Hues of Bhorer Shurjo',
      category: 'Nature',
      imageUrl: '/public/assets/aistudio/ChatGPT_Image_Nov_11__2026__10_56_37_PM_ef015c1e.jpg',
      caption: 'Dew-drenched paddy fields stretching towards the horizon in the quiet dawn of rural northern Bengal.',
      location: 'Godagari, Rajshahi',
      date: 'November 2026',
      cameraInfo: '35mm f/4 · ISO 200 · 1/400s',
      aspect: 'landscape',
      featuredOnHome: false
    },
    {
      id: 'frame-sreemangal-dawn',
      title: 'Sreemangal Morning Solitude',
      category: 'Landscape',
      imageUrl: '/src/assets/images/sreemangal_misty_tea_estate_1794422948952.jpg',
      caption: 'First light piercing the blanket of white morning mist across the terraced tea estates of Lawachara. Silence broken only by hill mynas.',
      location: 'Sreemangal, Sylhet',
      date: 'November 2026',
      cameraInfo: 'Leica M6 · 35mm f/2 · Portra 400',
      aspect: 'panoramic',
      featuredOnHome: true
    },
    {
      id: 'frame-rajshahi-loom',
      title: 'The Loom of Golden Threads',
      category: 'Everyday Life',
      imageUrl: '/src/assets/images/rajshahi_silk_loom_craft_1794422949155.jpg',
      caption: 'Master silk weaver guiding wooden shuttles under warm kerosene lantern light. A rhythm that has survived in Rajshahi for centuries.',
      location: 'Silk Enclave, Rajshahi',
      date: 'October 2026',
      cameraInfo: '50mm f/1.4 · ISO 800 · 1/125s',
      aspect: 'landscape',
      featuredOnHome: true
    }
  ],
  destinations: [
    {
      id: 'dest-sreemangal',
      title: 'Sreemangal & The Tea Terraces',
      location: 'Moulvibazar, Sylhet',
      country: 'Bangladesh',
      coordinates: { lat: 24.3065, lng: 91.7296 },
      travelDate: 'Autumn 2026',
      coverImage: '/src/assets/images/sreemangal_misty_tea_estate_1794422948952.jpg',
      summary:
        'Rolling emerald hills wrapped in quiet morning fog, where five-layer tea and ancient rainforest trails invite deep stillness.',
      personalExperience: [
        'We arrived in Sreemangal by the Upaban Express at 4:30 in the morning. The air had a sharp, damp chill that smells distinctly of wet earth and crushed lemon-grass.',
        'Hiring a local CNG auto-rickshaw through the sleeping town, we reached the outer edge of Finlay tea estate before dawn. When the sun broke through the canopy of rubber trees, golden rays lit up the dew on millions of emerald leaves like suspended crystals.',
        'I walked the narrow red-clay paths between the tea bushes with an elder worker named Parvati. Her deft fingers plucked the tender two leaves and a bud with percussion-like rhythm, smiling warmly at my camera.'
      ],
      photoGallery: [
        {
          url: '/src/assets/images/sreemangal_misty_tea_estate_1794422948952.jpg',
          caption: 'Morning sunbeams piercing the mist at Sreemangal tea terraces.'
        },
        {
          url: '/src/assets/images/everyday_quiet_life_1794416273610.jpg',
          caption: 'Hot clay cup of seven-layer tea at the quiet Nilkantha stall.'
        }
      ],
      travelNotes: [
        'Visit Lawachara National Park before 8:00 AM to hear Hoolock gibbons call.',
        'Carry a circular polarizer to cut through wet leaf reflections in early morning sun.'
      ],
      closingThought:
        'Green is not merely a color in Sreemangal; it is a silence you can breathe in.',
      status: 'Visited',
      featuredOnHome: true
    },
    {
      id: 'dest-saint-martin',
      title: 'Saint Martin Island',
      location: 'Bay of Bengal',
      country: 'Bangladesh',
      coordinates: { lat: 20.6279, lng: 92.3225 },
      travelDate: 'Winter 2026',
      coverImage: '/src/assets/images/saint_martin_island_1794416271307.jpg',
      summary:
        'A solitary coral outpost where the ocean turns turquoise and time slows down to the rhythm of returning wooden trawlers.',
      personalExperience: [
        'The journey to Saint Martin began on an overnight trawler leaving Teknaf before dawn. As the Naf river gives way to the open bay, the water shifts from murky brown to intense emerald blue.',
        'At night, the island loses all artificial glow. You walk the coral shoreline with just the luminescence of breaking waves and the vast canopy of southern stars overhead. I sat with local fishermen mending their nylon nets by the glow of kerosene lanterns, sharing hot black tea with ginger.',
        'There is a quiet dignity to this place that postcards never capture: the salt that clings to your skin, the coconut husks dried for fuel, and the silent understanding between sea and man.'
      ],
      photoGallery: [
        {
          url: '/src/assets/images/saint_martin_island_1794416271307.jpg',
          caption: 'Wooden fishing vessel anchored on the bleached coral sands of the west beach.'
        },
        {
          url: '/src/assets/images/coxs_bazar_coast_1794416271646.jpg',
          caption: 'Evening tides approaching Chera Dwip as the sun melts into the open horizon.'
        }
      ],
      travelNotes: [
        'Carry physical cash; electricity is generator-based and ATMs are unreliable.',
        'Best light is between 6:00 AM and 7:30 AM before tourists emerge from the resorts.',
        'Chera Dwip is accessible by foot at low tide — respect the delicate living coral.'
      ],
      closingThought:
        'Some places do not belong to maps; they belong to the quiet moments you carry back inside your chest.',
      status: 'Visited',
      featuredOnHome: true
    },
    {
      id: 'dest-coxs-bazar',
      title: 'Cox’s Bazar Shoreline',
      location: 'Chittagong Division',
      country: 'Bangladesh',
      coordinates: { lat: 21.4272, lng: 92.0058 },
      travelDate: 'January 2026',
      coverImage: '/src/assets/images/coxs_bazar_coast_1794416271646.jpg',
      summary:
        'The world’s longest unbroken natural sea beach, where the rhythmic roar of the surf swallows all human hesitation.',
      personalExperience: [
        'Most people know Cox’s Bazar for crowded tourist piers, but if you wake up at 5:00 AM and walk south towards Inani and Himchari, you find an entirely different world.',
        'Here, the beach belongs to the fishermen. Their collective chants rise above the crashing waves as they drag massive hand-woven drag nets out of the breakers. Muscles strained against the relentless tide, salt spray in their eyes, yet they laugh and coordinate with instinctual rhythm.',
        'I spent three days sitting on the wet black sand, watching the sunset paint the sea in impossible shades of crimson, violet, and burnished gold.'
      ],
      photoGallery: [
        {
          url: '/src/assets/images/coxs_bazar_coast_1794416271646.jpg',
          caption: 'Fishermen pulling nets against the violent undertow of the Bay of Bengal.'
        },
        {
          url: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
          caption: 'Long shadows cast by driftwood along the quiet sands south of Marine Drive.'
        }
      ],
      travelNotes: [
        'Rent a local open-top battery auto rickshaw (TomTom) along Marine Drive at 4:30 PM.',
        'Keep a dry bag for camera gear — the evening sea spray carries heavy airborne salt.'
      ],
      closingThought:
        'The sea does not hurry, yet it carves stone. Watching the fishermen reminded me that patience is an act of defiance.',
      status: 'Visited',
      featuredOnHome: true
    },
    {
      id: 'dest-rajshahi',
      title: 'Rajshahi & The Padma Embankment',
      location: 'Rajshahi District',
      country: 'Bangladesh',
      coordinates: { lat: 24.3745, lng: 88.6042 },
      travelDate: 'Autumn 2026 (Home)',
      coverImage: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
      summary:
        'The quiet silk city where the mighty Padma river breathes calmness, ancient mango groves whisper, and sunset is a shared civic ritual.',
      personalExperience: [
        'Rajshahi is my home, yet every morning it feels newly discovered. When autumn arrives and Kashful (white cane grass) blossoms on the dry sandy riverbeds of the Padma, half the city walks down to T-Groin and Vodra embankment.',
        'There is no commercial frenzy here. People come just to watch the water turn from silver to amber, to listen to boat engines puttering into the distance, and to eat hot spicy chui-jhal beef or roasted peanuts wrapped in newspaper.',
        'Documenting one’s own hometown is the hardest test for a photographer: you must strip away familiarity to see the poetry that everyday residents take for granted.'
      ],
      photoGallery: [
        {
          url: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
          caption: 'T-Groin embankment at dusk with silhouetted country boats.'
        },
        {
          url: '/src/assets/images/street_heritage_moment_1794416272039.jpg',
          caption: 'Colonial brick archways in the older quarters of Vodra and Saheb Bazar.'
        }
      ],
      travelNotes: [
        'Visit Borokuthi compound early in the morning for soft light filtering through hundred-year-old banyan roots.',
        'Winter brings thick Padma fog that transforms the river into a minimalist watercolor painting.'
      ],
      closingThought:
        'You don’t have to travel to the ends of the earth to find wonder; sometimes it flows right past your doorstep.',
      status: 'Visited',
      featuredOnHome: true
    }
  ],
  diaryEntries: [
    {
      id: 'diary-yesterday-tomorrow',
      slug: 'somewhere-between-yesterday-and-tomorrow',
      title: 'Somewhere Between Yesterday and Tomorrow',
      category: 'Reflections',
      date: 'November 4, 2026',
      readTime: '4 min read',
      coverImage: '/src/assets/images/everyday_quiet_life_1794416273610.jpg',
      excerpt:
        'On university deadlines, the ticking of the clock in a quiet student room, and the realization that youth is passing not in dramatic milestones, but in quiet Tuesday afternoons.',
      paragraphs: [
        'There is an hour in the late afternoon when the sunlight on the wooden floor changes from bright yellow to a heavy, nostalgic amber. In Rajshahi, this is when the sparrows begin their evening chorus outside my study window and the aroma of roasted tea leaves drifts from the street corner shop downstairs.',
        'As university students, we spend most of our waking hours rehearsing for a future that has not arrived yet. We study for exams that will soon be forgotten, worry about resumes and career trajectories, and measure our worth in milestones. But looking through my camera roll from the past three years, not a single photo is of an exam result or an official achievement.',
        'Instead, what I have saved are frames of my roommate boiling water in an electric kettle during a power cut. The way mist sits on the campus tennis courts in December. The quiet smile of an old bookseller who gave me an extra ten taka discount on a weather-beaten copy of Rabindranath’s poems.',
        'We live our lives forward, but we only feel them backwards. In between yesterday’s regrets and tomorrow’s anxieties lies this fleeting, unrepeatable present. I press the shutter not to stop time, but to acknowledge that I was here to witness it.'
      ],
      closingQuote:
        'We are made of the moments we were too distracted to notice while they were happening.',
      featuredOnHome: true
    },
    {
      id: 'diary-finding-beauty',
      slug: 'on-finding-beauty-in-ordinary-things',
      title: 'On Finding Beauty in Ordinary Things',
      category: 'Life Notes',
      date: 'October 18, 2026',
      readTime: '3 min read',
      coverImage: '/src/assets/images/street_heritage_moment_1794416272039.jpg',
      excerpt:
        'Why the most moving photographs are never taken in grand tourist sights, but in worn brick alleys, peeling paint, and the quiet dignity of daily routine.',
      paragraphs: [
        'When I first picked up a camera, I thought photography required epic landscapes: snow-capped Himalayas, towering skyscrapers, or dramatic storm clouds. I felt frustrated that my surroundings in Rajshahi were ordinary — red brick walls, dusty bicycles, clay tea cups, and sluggish rivers.',
        'It took three years of shooting to unlearn that arrogance. Grand scenes impress the eyes, but ordinary scenes touch the heart. A chipped clay cup of spiced milk tea tells a more honest story about human companionship than a thousand drone panoramas of luxury hotels.',
        'Look closely at an old brick wall in Vodra. The monsoon rains have stained it with moss, the afternoon sun has baked it dry, generations of posters have been pasted and scraped away. It carries the texture of a city living and breathing.',
        'To be an amateur photographer in the truest sense — from the Latin amare, to love — is to look at what everyone else ignores and say: this, too, has sacred weight.'
      ],
      closingQuote:
        'The camera is an instrument that teaches people how to see without a camera.',
      featuredOnHome: true
    },
    {
      id: 'diary-remembered-days',
      slug: 'some-days-are-meant-to-be-remembered',
      title: 'Some Days Are Meant to Be Remembered',
      category: 'Memories',
      date: 'September 29, 2026',
      readTime: '5 min read',
      coverImage: '/src/assets/images/saint_martin_island_1794416271307.jpg',
      excerpt:
        'Revisiting the day the ferry broke down in the Bay of Bengal, and why accidental detours make for the richest stories.',
      paragraphs: [
        'Plans are fragile things. When we booked our trip to Saint Martin, we had an exact schedule: arrival at 11:00 AM, seafood lunch by 1:00 PM, sunset at the west beach by 5:30 PM. We had researched spots, pinned Google Maps locations, and set alarms.',
        'None of it happened. An engine fault in the middle of the channel forced our trawler to drift for nearly three hours in the open sea. At first, passengers were anxious. Phones lost signal. The heat bore down.',
        'Then something extraordinary occurred. Since no one could scroll on social media, people began to speak. An elderly gentleman from Barisal started singing traditional Bhatiali folk songs. Children gathered on the deck to watch flying fish skim across the water. A family shared their homemade shondesh and puffed rice with strangers.',
        'By the time the tugboat reached us as the sun sank into the ocean, the anxiety had vanished into a collective warmth. If everything had gone smoothly, I would have had five more photos of a hotel lobby. Instead, I had a memory of human grace that will outlive any itinerary.'
      ],
      closingQuote:
        'The best journeys are the ones where the map gets left behind.',
      featuredOnHome: false
    },
    {
      id: 'diary-never-photograph',
      slug: 'the-things-i-never-photograph',
      title: 'The Things I Never Photograph',
      category: 'Random Thoughts',
      date: 'August 12, 2026',
      readTime: '3 min read',
      coverImage: '/src/assets/images/coxs_bazar_coast_1794416271646.jpg',
      excerpt:
        'A confession from a photographer: the most devastatingly beautiful moments are the ones where I keep my finger off the shutter button.',
      paragraphs: [
        'There is an ethical dilemma every photographer faces, even an amateur with a modest camera. When a moment is so sacred, so tender, or so private, does capturing it preserve it or violate it?',
        'Last winter, I watched an elderly couple sitting on the Padma river stairs. The man was gently brushing fallen leaves from his wife’s shawl, and neither of them said a word for twenty minutes. My camera was around my neck. The light was perfection. The composition framed itself.',
        'I raised the camera halfway, and then I stopped. Lowered it. Took a deep breath of the cold river air and simply watched.',
        'Some moments demand reverence, not reproduction. If you photograph everything, you experience nothing directly; you become an archivist of your own alienation. Sometimes, the greatest frame is the one that exists only in your memory.'
      ],
      closingQuote:
        'Some beauty is meant to be protected by silence.',
      featuredOnHome: true
    },
    {
      id: 'diary-fragments-unfolding',
      slug: 'fragments-of-a-life-still-unfolding',
      title: 'Fragments of a Life Still Unfolding',
      category: 'Letters to Time',
      date: 'July 5, 2026',
      readTime: '4 min read',
      coverImage: '/src/assets/images/hero_cinematic_landscape_1794416270443.jpg',
      excerpt:
        'A letter to my future self, written while listening to monsoon rain drumming against the tin roof of a tea stall near Rajshahi University.',
      paragraphs: [
        'Dear Abdullah ten years from now, I wonder if you still carry a camera everywhere you go. I wonder if the weight of responsibilities, jobs, and worldly ambitions has crowded out this quiet love for light and shadow.',
        'Right now, sitting here with wet shoes and damp socks, watching rain create concentric ripples on the tea stall puddles, life feels immense, uncertain, and beautiful. I do not know where I will work, what city I will live in, or what burdens you are carrying as you read this.',
        'All I ask is that you remember the footnotes. Do not become so focused on the main text of your achievements that you forget the small annotations that made your life your own: the sound of night trains crossing the Hardinge Bridge, the taste of morning tea after an all-nighter, the laughter of friends on the roof under a monsoon storm.',
        'You were young once, you had very little money, but your eyes were wide open. Keep them open.'
      ],
      closingQuote:
        'Life is written in the main text, but it is felt in the footnotes.',
      featuredOnHome: false
    }
  ]
};

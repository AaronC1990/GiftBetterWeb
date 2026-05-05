export interface GuideProduct {
  name: string;
  description: string;
  priceHint: string;
  searchQuery: string;
  category: string;
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  products: GuideProduct[];
}

export const GUIDES: Guide[] = [
  {
    slug: "best-tech-gifts",
    title: "Best Tech Gifts for Every Budget",
    subtitle: "Smart, practical picks for the gadget lover in your life",
    intro:
      "Whether you're shopping for a gadget enthusiast or someone who simply appreciates things that work beautifully, tech gifts have a way of landing every time. We've rounded up our favourite picks across all price points — from thoughtful stocking stuffers to impressive splurges.",
    products: [
      {
        name: "Wireless Earbuds",
        description:
          "Crystal-clear sound without the tangle. Modern wireless earbuds offer impressive battery life, a secure fit for workouts, and hands-free call quality that's hard to beat. A universally loved gift for commuters, gym-goers, and anyone who loves music.",
        priceHint: "$30 – $150",
        searchQuery: "wireless earbuds bluetooth",
        category: "tech",
      },
      {
        name: "Smart Speaker",
        description:
          "Stream music, set timers, answer trivia, or control smart home devices — all with a voice command. A smart speaker fits naturally into any kitchen, bedroom, or living room and gets used every single day.",
        priceHint: "$30 – $100",
        searchQuery: "smart speaker voice assistant",
        category: "tech",
      },
      {
        name: "Wireless Charging Pad",
        description:
          "Power up without hunting for a cable. A sleek wireless charging pad sits on a nightstand or desk and keeps their phone topped up effortlessly. Works with any Qi-compatible device.",
        priceHint: "$15 – $40",
        searchQuery: "wireless charging pad fast charge",
        category: "tech",
      },
      {
        name: "Noise-Cancelling Headphones",
        description:
          "The gift of silence — and incredible sound. Over-ear noise-cancelling headphones are a game-changer for open offices, long flights, or anyone who needs to focus. Premium models deliver audio quality that rivals much more expensive setups.",
        priceHint: "$60 – $350",
        searchQuery: "noise cancelling headphones over ear",
        category: "tech",
      },
      {
        name: "Portable Power Bank",
        description:
          "Dead phone anxiety is real. A high-capacity power bank with fast charging lets them top up anywhere — at a festival, on a hike, or stuck in a meeting room without an outlet. Genuinely useful every week.",
        priceHint: "$20 – $50",
        searchQuery: "portable power bank fast charging",
        category: "tech",
      },
      {
        name: "Fitness Tracker Smartwatch",
        description:
          "Track steps, heart rate, sleep quality, and workouts in a slim wearable they'll never want to take off. Modern fitness trackers pair with their phone for notifications and can last up to a week on a single charge.",
        priceHint: "$40 – $200",
        searchQuery: "fitness tracker smartwatch",
        category: "tech",
      },
    ],
  },
  {
    slug: "thoughtful-gifts-for-her",
    title: "Thoughtful Gift Ideas for Women",
    subtitle: "Curated picks she'll actually love and use",
    intro:
      "Forget generic bath sets and generic chocolates. The best gifts for women feel personal — chosen with her specific interests, routines, and tastes in mind. Here are our top picks across beauty, wellness, home, and leisure that strike the right balance between indulgent and practical.",
    products: [
      {
        name: "Luxury Skincare Gift Set",
        description:
          "A beautifully presented skincare set gives her the chance to try premium products she might not buy herself. Look for sets that include a cleanser, serum, and moisturiser from a trusted brand — they feel genuinely special when unwrapped.",
        priceHint: "$30 – $90",
        searchQuery: "luxury skincare gift set women",
        category: "wellness",
      },
      {
        name: "Premium Yoga Mat",
        description:
          "If she practices yoga, pilates, or home workouts, a high-quality mat makes every session better. Non-slip surface, cushioning for joints, and a width that gives real room to move — she'll think of you every morning she rolls it out.",
        priceHint: "$35 – $100",
        searchQuery: "premium yoga mat non-slip",
        category: "wellness",
      },
      {
        name: "Aromatherapy Essential Oil Diffuser",
        description:
          "A stylish ultrasonic diffuser fills any room with her favourite scents. Many models double as a soft ambient light, making them a lovely bedside companion. Pair with a set of essential oils for a complete gift.",
        priceHint: "$25 – $60",
        searchQuery: "essential oil diffuser aromatherapy",
        category: "wellness",
      },
      {
        name: "Elegant Jewellery Set",
        description:
          "Dainty, layerable jewellery is a perennial favourite. A minimal necklace and earring set in gold or silver works with everything in her wardrobe — dressy or casual. Look for hypoallergenic metals if you're not sure about sensitivities.",
        priceHint: "$25 – $80",
        searchQuery: "dainty jewellery set women gold",
        category: "fashion",
      },
      {
        name: "Bestselling Novel or Book Set",
        description:
          "A beautifully produced hardback or a curated box set of novels she's been meaning to read is always a hit. Fiction, memoir, self-development — pick the genre she loves and she'll have a meaningful gift that lasts for hours.",
        priceHint: "$15 – $40",
        searchQuery: "bestselling novels women fiction hardback",
        category: "books",
      },
      {
        name: "Luxury Scented Candle",
        description:
          "A premium candle from a quality maker burns cleaner, smells better, and lasts longer than a supermarket pick. It's the kind of treat she'd appreciate but rarely buys for herself — which makes it a perfect gift.",
        priceHint: "$20 – $55",
        searchQuery: "luxury scented candle gift women",
        category: "home",
      },
    ],
  },
  {
    slug: "outdoor-adventure-gifts",
    title: "Outdoor & Adventure Gifts",
    subtitle: "Gear and goodies for the explorer, hiker, and nature lover",
    intro:
      "For the person who would rather be outside than in, the right gear makes every adventure better. These picks are tried-and-tested crowd pleasers — practical enough to use on every trip, quality enough to last for years.",
    products: [
      {
        name: "Insulated Stainless Steel Water Bottle",
        description:
          "Keeps drinks cold for 24 hours and hot for 12. A well-made insulated bottle is the one piece of kit every outdoor enthusiast reaches for every single day. Look for a leak-proof lid and a size that fits standard cup holders.",
        priceHint: "$25 – $50",
        searchQuery: "insulated stainless steel water bottle",
        category: "outdoor",
      },
      {
        name: "Hiking Daypack",
        description:
          "A well-designed 20–30L daypack with a hip belt, ventilated back panel, and hydration bladder compatibility transforms a day hike. Look for models with sensible pocket organisation and a rain cover included.",
        priceHint: "$50 – $150",
        searchQuery: "hiking daypack backpack lightweight",
        category: "outdoor",
      },
      {
        name: "Rechargeable Camping Lantern",
        description:
          "Modern LED camping lanterns are compact, bright, and charge via USB — no more hunting for AA batteries in the dark. A collapsible model packs flat in a bag and doubles as an emergency power bank.",
        priceHint: "$20 – $45",
        searchQuery: "rechargeable camping lantern LED",
        category: "outdoor",
      },
      {
        name: "Lightweight Packable Hammock",
        description:
          "Two trees and five minutes is all it takes to set up a lightweight hammock for the perfect rest. Packable versions compress to the size of a grapefruit and hold up to 400 lbs — a magical gift for any park visitor or camper.",
        priceHint: "$25 – $60",
        searchQuery: "lightweight packable camping hammock",
        category: "outdoor",
      },
      {
        name: "Headlamp",
        description:
          "A hands-free headlamp is indispensable — for hiking at dusk, reading in a tent, or navigating a power cut. Look for a model with multiple brightness settings, a red night-vision mode, and IPX4 water resistance or better.",
        priceHint: "$20 – $55",
        searchQuery: "headlamp hiking camping rechargeable",
        category: "outdoor",
      },
      {
        name: "Trekking Poles",
        description:
          "Collapsible trekking poles reduce knee strain on descents and give real confidence on rocky trails. Lightweight aluminium or carbon fibre poles with cork or foam grips are the go-to choice for serious day hikers.",
        priceHint: "$35 – $90",
        searchQuery: "collapsible trekking poles hiking",
        category: "outdoor",
      },
    ],
  },
  {
    slug: "home-kitchen-gifts",
    title: "Home & Kitchen Gift Ideas",
    subtitle: "Picks for the home cook, coffee lover, and nest-featherer",
    intro:
      "Home and kitchen gifts hit differently because they get used every day — a beautiful coffee setup, a great cookbook, or a clever gadget becomes part of someone's daily ritual. Here are our favourite picks that balance quality, usefulness, and that little touch of luxury.",
    products: [
      {
        name: "Pour-Over Coffee Set",
        description:
          "Brewing coffee by hand is a ritual that slows the morning down in the best way. A pour-over set — dripper, carafe, and filters — produces a cleaner, more flavourful cup than any pod machine. A great gift for anyone who takes their morning seriously.",
        priceHint: "$30 – $70",
        searchQuery: "pour over coffee maker set gooseneck",
        category: "home",
      },
      {
        name: "Quality Cookbook",
        description:
          "A beautifully produced cookbook from a respected author or chef is a gift that keeps giving — inspiring new techniques and meals for years. Whether they're into baking, weeknight dinners, or world cuisines, there's a perfect book waiting.",
        priceHint: "$20 – $45",
        searchQuery: "bestselling cookbook home cooking",
        category: "books",
      },
      {
        name: "Enamelled Cast Iron Dutch Oven",
        description:
          "The workhorse of any serious kitchen. An enamelled Dutch oven braised, soups, stews, bread, and everything in between — and looks beautiful going straight from oven to table. A heirloom-quality piece they'll own for decades.",
        priceHint: "$60 – $200",
        searchQuery: "enamelled cast iron dutch oven",
        category: "home",
      },
      {
        name: "Charcuterie & Serving Board Set",
        description:
          "A well-designed charcuterie board with matching knives transforms casual snacking into a proper occasion. Acacia wood or marble boards with storage for utensils are an elegant gift that gets pulled out whenever guests arrive.",
        priceHint: "$30 – $70",
        searchQuery: "charcuterie board serving set",
        category: "home",
      },
      {
        name: "Electric Kettle with Temperature Control",
        description:
          "For tea enthusiasts and coffee aficionados, temperature control matters. Green tea at 75°C, black tea at 100°C — a variable-temperature kettle brews every cup exactly right, and a gooseneck spout gives precision for pour-over.",
        priceHint: "$35 – $80",
        searchQuery: "electric gooseneck kettle temperature control",
        category: "home",
      },
      {
        name: "Indoor Kitchen Herb Garden Kit",
        description:
          "Fresh herbs on the windowsill make every meal better. A self-watering herb kit with seeds, pots, and growing medium is a fun, practical gift — especially for someone who cooks regularly and would love homegrown basil or rosemary.",
        priceHint: "$20 – $45",
        searchQuery: "indoor herb garden kit growing",
        category: "home",
      },
    ],
  },
  {
    slug: "gifts-under-50",
    title: "Great Gifts Under $50",
    subtitle: "Thoughtful picks that won't break the bank",
    intro:
      "You don't need to spend a fortune to give a gift that genuinely delights someone. The best budget gifts are the ones that feel considered — chosen with the recipient in mind, not just grabbed off a shelf. Here are our favourite picks under $50 that punch well above their price.",
    products: [
      {
        name: "Card or Board Game",
        description:
          "A great card or party game is a gift for the whole group — hours of laughter with friends or family. Look for fast-paced games that work for 3–8 players and take 20–45 minutes per round. Expandable games give even more replay value.",
        priceHint: "$15 – $35",
        searchQuery: "fun card game adults party",
        category: "experience",
      },
      {
        name: "Cosy Socks Gift Set",
        description:
          "Plush, warm socks might sound simple, but a beautiful set in a gift box — novelty prints, bold colours, or a mix of styles — is the kind of present that genuinely makes someone smile. Comfort gifts are always welcome.",
        priceHint: "$15 – $30",
        searchQuery: "cosy socks gift set women men",
        category: "fashion",
      },
      {
        name: "Scented Candle",
        description:
          "A well-made candle from a quality brand burns cleaner and smells better than anything from a pound shop. Choose a scent profile they'd love — fresh and citrusy, warm and woody, or floral and soft — and wrap it nicely. Always appreciated.",
        priceHint: "$15 – $40",
        searchQuery: "scented candle gift box quality",
        category: "home",
      },
      {
        name: "1000-Piece Puzzle",
        description:
          "Puzzles are back in a big way — and for good reason. A beautiful 1,000-piece jigsaw (landscape, art print, or something funny) gives hours of screen-free enjoyment. Great for solo evenings or a shared project over a weekend.",
        priceHint: "$15 – $35",
        searchQuery: "1000 piece jigsaw puzzle adults",
        category: "experience",
      },
      {
        name: "Travel Organiser Pouch",
        description:
          "A sleek organiser pouch for cables, earbuds, cards, and chargers is one of those gifts that once you have it, you can't imagine living without. Perfect for the frequent traveller or the person whose bag is a perpetual mess.",
        priceHint: "$15 – $35",
        searchQuery: "travel cable organiser pouch case",
        category: "tech",
      },
      {
        name: "Specialty Coffee or Tea Set",
        description:
          "A curated selection of single-origin coffees or premium loose-leaf teas is a sensory experience in a box. Perfect for the daily brewer who would love to explore something beyond their usual supermarket pick.",
        priceHint: "$20 – $45",
        searchQuery: "specialty coffee tea gift set",
        category: "food",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

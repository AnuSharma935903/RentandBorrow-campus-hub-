/**
 * RENT & BORROW APPLICATION - LOCALSTORAGE DATA LAYER
 * Centralized data management using browser localStorage.
 * 
 * Provides safe helper functions for:
 * - users
 * - current logged-in user
 * - items
 * - rental requests
 * - active rentals
 * - transactions
 * - ratings
 */

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'rent_borrow_users',
  CURRENT_USER: 'rent_borrow_current_user',
  ITEMS: 'rent_borrow_items',
  RENTAL_REQUESTS: 'rent_borrow_rental_requests',
  RENTALS: 'rent_borrow_rentals',
  TRANSACTIONS: 'rent_borrow_transactions',
  RATINGS: 'rent_borrow_ratings',
  USER_RATINGS: 'rent_borrow_user_ratings',
  ITEM_RATINGS: 'rent_borrow_item_ratings'
};

// Default Initial Seed Data (Used on first visit or when localStorage is empty)
const DEFAULT_USERS = [
  {
    id: 'user_anu',
    name: 'Anu',
    role: 'Verified Student',
    collegeName: 'North Campus Institute of Technology',
    studentId: 'NC-2024-8842',
    email: 'anu@campus.edu',
    password: 'password123',
    avatar: 'AN',
    campus: 'North Campus',
    rating: 5.0,
    trustRating: 5.0,
    credits: 100,
    reviewsCount: 1,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    id: 'user_rahul',
    name: 'Rahul',
    role: 'Engineering Sophomore',
    collegeName: 'School of Mechanical Engineering',
    studentId: 'ENG-2025-3312',
    email: 'rahul@campus.edu',
    password: 'password123',
    avatar: 'RH',
    campus: 'North Quad',
    rating: 5.0,
    trustRating: 5.0,
    credits: 20, // Initial balance: 20 Credits (Tests Insufficient Credits Flow)
    reviewsCount: 3,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-09-10T10:00:00.000Z'
  },
  {
    id: 'user_alex',
    name: 'Alex Chen',
    role: 'CS Junior (Verified)',
    collegeName: 'School of Science & Computing',
    studentId: 'CS-2023-1104',
    email: 'alex.chen@campus.edu',
    password: 'password123',
    avatar: 'AC',
    campus: 'Science Quad',
    rating: 4.9,
    trustRating: 4.9,
    credits: 100,
    reviewsCount: 28,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-08-15T10:00:00.000Z'
  },
  {
    id: 'user_maya',
    name: 'Maya Patel',
    role: 'Media Arts Senior',
    collegeName: 'College of Fine Arts & Design',
    studentId: 'FA-2023-3091',
    email: 'maya.patel@campus.edu',
    password: 'password123',
    avatar: 'MP',
    campus: 'Design Studio',
    rating: 5.0,
    trustRating: 5.0,
    credits: 100,
    reviewsCount: 42,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-08-20T10:00:00.000Z'
  },
  {
    id: 'user_chloe',
    name: 'Chloe Nguyen',
    role: 'BioChem Junior',
    collegeName: 'Faculty of Chemical Sciences',
    studentId: 'CH-2024-5512',
    email: 'chloe.nguyen@campus.edu',
    password: 'password123',
    avatar: 'CN',
    campus: 'Chemistry Annex',
    rating: 4.9,
    trustRating: 4.9,
    credits: 100,
    reviewsCount: 19,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-08-22T10:00:00.000Z'
  },
  {
    id: 'user_marcus',
    name: 'Marcus Vance',
    role: 'MechEng Senior',
    collegeName: 'School of Mechanical Engineering',
    studentId: 'ME-2023-9941',
    email: 'marcus.vance@campus.edu',
    password: 'password123',
    avatar: 'MV',
    campus: 'Engineering Hall',
    rating: 4.95,
    trustRating: 4.95,
    credits: 100,
    reviewsCount: 35,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-08-25T10:00:00.000Z'
  },
  {
    id: 'user_elena',
    name: 'Elena Rostova',
    role: 'Outing Club Lead',
    collegeName: 'School of Environmental Studies',
    studentId: 'ENV-2023-2210',
    email: 'elena.rostova@campus.edu',
    password: 'password123',
    avatar: 'ER',
    campus: 'Recreation Center',
    rating: 5.0,
    trustRating: 5.0,
    credits: 100,
    reviewsCount: 51,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-08-28T10:00:00.000Z'
  },
  {
    id: 'user_samira',
    name: 'Samira Khan',
    role: 'EE Sophomore',
    collegeName: 'Department of Electrical Engineering',
    studentId: 'EE-2025-1033',
    email: 'samira.khan@campus.edu',
    password: 'password123',
    avatar: 'SK',
    campus: 'Robotics Lab',
    rating: 4.8,
    trustRating: 4.8,
    credits: 100,
    reviewsCount: 14,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-09-02T10:00:00.000Z'
  },
  {
    id: 'user_david',
    name: 'David Kim',
    role: 'Film Society Officer',
    collegeName: 'School of Cinematic Arts',
    studentId: 'FLM-2024-7719',
    email: 'david.kim@campus.edu',
    password: 'password123',
    avatar: 'DK',
    campus: 'Graduate Lounge',
    rating: 4.95,
    trustRating: 4.95,
    credits: 100,
    reviewsCount: 37,
    verified: true,
    verificationStatus: 'verified',
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-09-05T10:00:00.000Z'
  },
  {
    id: 'user_jordan',
    name: 'Jordan Lee',
    role: 'Pre-Med Sophomore (Verification Pending)',
    collegeName: 'Health Sciences Institute',
    studentId: 'MED-2025-4421',
    email: 'jordan.lee@campus.edu',
    password: 'password123',
    avatar: 'JL',
    campus: 'Health Sciences Quad',
    rating: 4.85,
    trustRating: 4.85,
    credits: 0, // Initial balance: 0 Credits (Tests Zero Credits Flow)
    reviewsCount: 22,
    verified: false,
    verificationStatus: 'pending', // Demo Account for Verification Pending!
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-10-01T08:30:00.000Z'
  },
  {
    id: 'user_admin',
    name: 'Campus Admin (Officer)',
    role: 'Campus Administrator',
    collegeName: 'Central Student Affairs Office',
    studentId: 'STAFF-001',
    email: 'admin@campus.edu',
    password: 'admin123',
    avatar: 'AD',
    campus: 'Administration Hall',
    rating: 0,
    trustRating: 0,
    credits: 500,
    reviewsCount: 0,
    userRating: {
      average: 0,
      totalRatings: 0
    },
    verified: true,
    verificationStatus: 'verified',
    isAdmin: true,
    transactionHistory: [],
    rentalHistory: [],
    createdAt: '2026-07-01T00:00:00.000Z'
  }
];

const DEFAULT_CURRENT_USER = DEFAULT_USERS[0]; // Anu

const DEFAULT_ITEMS = [
  {
    id: 1,
    name: "TI-84 Plus CE Color Graphing Calculator",
    title: "TI-84 Plus CE Color Graphing Calculator",
    category: "Electronics & Calculators",
    categoryKey: "Electronics & Calculators",
    pricingType: "hourly",
    pricePerHour: 20,
    pricePerDay: 80,
    price: 20,
    period: "hour",
    securityDeposit: 100,
    deposit: 100,
    status: "available",
    condition: "Like New",
    location: "Science Library / North Quad",
    ownerId: "user_alex",
    lender: {
      id: "user_alex",
      name: "Alex Chen",
      role: "CS Junior",
      avatar: "AC",
      rating: 4.9,
      reviewsCount: 28,
      verified: true
    },
    description: "Equipped with rechargeable battery, USB charging cable, and pre-loaded calculus tools. Ideal for exams and midterms.",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "calculator"
  },
  {
    id: 2,
    name: "A2 Technical Drawing Board & Precision Geometry Set",
    title: "A2 Technical Drawing Board & Precision Geometry Set",
    category: "Drawing & Design",
    categoryKey: "Drawing & Design",
    pricingType: "hourly",
    pricePerHour: 20,
    pricePerDay: 90,
    price: 20,
    period: "hour",
    securityDeposit: 100,
    deposit: 100,
    status: "borrowed",
    condition: "Excellent",
    location: "Design Studio & Arts Center",
    ownerId: "user_anu",
    lender: {
      id: "user_anu",
      name: "Anu",
      role: "Verified Student",
      avatar: "AN",
      rating: 5.0,
      reviewsCount: 1,
      verified: true
    },
    description: "Includes parallel motion ruler, 30/60 & 45 set squares, drafting tape, and padded carrying case. Perfect for engineering and architecture students.",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "pen-tool"
  },
  {
    id: 3,
    name: "Organic Chemistry: Structure and Function (8th Edition)",
    title: "Organic Chemistry: Structure and Function (8th Edition)",
    category: "Study Essential",
    categoryKey: "Study Essential",
    pricingType: "daily",
    pricePerHour: 15,
    pricePerDay: 50,
    price: 50,
    period: "day",
    securityDeposit: 150,
    deposit: 150,
    status: "available",
    condition: "Very Good",
    location: "Chemistry Annex / Dorm 4",
    ownerId: "user_chloe",
    lender: {
      id: "user_chloe",
      name: "Chloe Nguyen",
      role: "BioChem Junior",
      avatar: "CN",
      rating: 4.9,
      reviewsCount: 19,
      verified: true
    },
    description: "Hardcover, zero missing pages, highlights only on chapter 4 & 7. Includes molecular model kit pouch.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "book"
  },
  {
    id: 4,
    name: "Makita 18V Cordless Drill & Lab Tool Bit Set",
    title: "Makita 18V Cordless Drill & Lab Tool Bit Set",
    category: "Lab & Project Gear",
    categoryKey: "Lab & Project Gear",
    pricingType: "hourly",
    pricePerHour: 30,
    pricePerDay: 120,
    price: 30,
    period: "hour",
    securityDeposit: 200,
    deposit: 200,
    status: "available",
    condition: "Good",
    location: "Engineering Hall / Maker Space",
    ownerId: "user_marcus",
    lender: {
      id: "user_marcus",
      name: "Marcus Vance",
      role: "MechEng Senior",
      avatar: "MV",
      rating: 4.95,
      reviewsCount: 35,
      verified: true
    },
    description: "Comes with 2 lithium-ion batteries, quick charger, masonry bits, drill bits, and driver heads in a rugged hard case.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "tool"
  },
  {
    id: 6,
    name: "Arduino Ultimate Starter Kit + Sensor Bundle",
    title: "Arduino Ultimate Starter Kit + Sensor Bundle",
    category: "Lab & Project Gear",
    categoryKey: "Lab & Project Gear",
    pricingType: "hourly",
    pricePerHour: 0,
    pricePerDay: 0,
    price: 0,
    period: "Free Borrow",
    securityDeposit: 50,
    deposit: 50,
    status: "borrowed",
    condition: "Good",
    location: "Robotics Club Lab",
    ownerId: "user_samira",
    lender: {
      id: "user_samira",
      name: "Samira Khan",
      role: "EE Sophomore",
      avatar: "SK",
      rating: 4.8,
      reviewsCount: 14,
      verified: true
    },
    description: "Shared for peer learning! Includes Uno R3 board, breadboard, ultrasonic sensor, LCD module, LEDs, and jumper wires.",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "cpu"
  },
  {
    id: 7,
    name: "ViewSonic M1 Mini Ultra-Portable LED Projector",
    title: "ViewSonic M1 Mini Ultra-Portable LED Projector",
    category: "Electronics & Calculators",
    categoryKey: "Electronics & Calculators",
    pricingType: "hourly",
    pricePerHour: 40,
    pricePerDay: 150,
    price: 40,
    period: "hour",
    securityDeposit: 300,
    deposit: 300,
    status: "available",
    condition: "Like New",
    location: "Graduate Student Lounge",
    ownerId: "user_david",
    lender: {
      id: "user_david",
      name: "David Kim",
      role: "Film Society Officer",
      avatar: "DK",
      rating: 4.95,
      reviewsCount: 37,
      verified: true
    },
    description: "Fits in your palm! Integrated JBL speaker, HDMI & USB-C ports, and smart stand. Ideal for movie nights and presentation pitches.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "film"
  },
  {
    id: 9,
    name: "Logitech MX Master 3S Wireless Mouse",
    title: "Logitech MX Master 3S Wireless Mouse",
    category: "College Essential",
    categoryKey: "College Essential",
    pricingType: "daily",
    pricePerHour: 15,
    pricePerDay: 60,
    price: 60,
    period: "day",
    securityDeposit: 100,
    deposit: 100,
    status: "available",
    condition: "Like New",
    location: "North Quad Dorms",
    ownerId: "user_anu",
    lender: {
      id: "user_anu",
      name: "Anu",
      role: "Verified Student",
      avatar: "AN",
      rating: 5.0,
      reviewsCount: 1,
      verified: true
    },
    description: "Ultra-quiet ergonomic mouse with dual Bluetooth & USB receiver. Great for programming assignments and design work.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "mouse"
  },
  {
    id: 10,
    name: "TI-84 Plus CE Graphing Calculator",
    title: "TI-84 Plus CE Graphing Calculator",
    category: "Electronics & Calculators",
    categoryKey: "Electronics & Calculators",
    pricingType: "hourly",
    pricePerHour: 20,
    pricePerDay: 80,
    price: 20,
    period: "hour",
    securityDeposit: 100,
    deposit: 100,
    status: "available",
    condition: "Like New",
    location: "North Quad / Engineering Hall",
    ownerId: "user_anu",
    lender: {
      id: "user_anu",
      name: "Anu",
      role: "Verified Student",
      avatar: "AN",
      rating: 5.0,
      reviewsCount: 1,
      verified: true
    },
    description: "Equipped with rechargeable battery, USB cable, and calculus reference tools. Ideal for exams.",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=700&q=80",
    fallbackIcon: "calculator"
  }
];

const DEFAULT_RENTALS = [
  {
    id: 'rent_1',
    rentalId: 'rent_1',
    itemId: 1,
    itemTitle: "TI-84 Plus CE Color Graphing Calculator",
    itemName: "TI-84 Plus CE Color Graphing Calculator",
    itemImage: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=120&q=80",
    location: "Science Quad",
    ownerId: "user_alex",
    lenderId: "user_alex",
    ownerName: "Alex Chen",
    borrowerId: "user_anu",
    borrowerName: "Anu",
    peerName: "Alex Chen",
    peerRole: "CS Junior (Verified)",
    pricingType: "hourly",
    durationHours: 3,
    durationDays: 1,
    hourlyRate: 20,
    dailyRate: 80,
    rentalCost: 60,
    securityDeposit: 100,
    deposit: 100,
    startTime: Date.now() - (46 * 60 * 1000), // Started 46 mins ago
    endTime: Date.now() + (2 * 3600 * 1000 + 14 * 60 * 1000), // Ends in 2h 14m
    startDate: new Date(Date.now() - (46 * 60 * 1000)).toISOString().split('T')[0],
    dueDate: new Date(Date.now() + (2 * 3600 * 1000 + 14 * 60 * 1000)).toISOString().split('T')[0],
    type: "borrowing",
    status: "active",
    statusLabel: "Active Borrow",
    createdAt: new Date(Date.now() - (46 * 60 * 1000)).toISOString()
  },
  {
    id: 'rent_2',
    rentalId: 'rent_2',
    itemId: 6,
    itemTitle: "Arduino Ultimate Starter Kit",
    itemName: "Arduino Ultimate Starter Kit",
    itemImage: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=120&q=80",
    location: "Robotics Lab",
    ownerId: "user_samira",
    lenderId: "user_samira",
    ownerName: "Samira Khan",
    borrowerId: "user_anu",
    borrowerName: "Anu",
    peerName: "Samira Khan",
    peerRole: "EE Sophomore",
    pricingType: "hourly",
    durationHours: 2,
    durationDays: 1,
    hourlyRate: 0,
    dailyRate: 0,
    rentalCost: 0,
    securityDeposit: 50,
    deposit: 50,
    startTime: Date.now() - (48 * 3600 * 1000),
    endTime: Date.now() - (46 * 3600 * 1000),
    startDate: "2026-10-01",
    dueDate: "2026-10-01",
    type: "borrowing",
    status: "completed",
    statusLabel: "Completed",
    returnStatus: "confirmed",
    returnConfirmedAt: Date.now() - (46 * 3600 * 1000),
    completedAt: Date.now() - (46 * 3600 * 1000),
    createdAt: "2026-10-01T10:00:00.000Z"
  },
  {
    id: 'rent_3',
    rentalId: 'rent_3',
    itemId: 2,
    itemTitle: "A2 Technical Drawing Board & Geometry Set",
    itemName: "A2 Technical Drawing Board & Geometry Set",
    itemImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=120&q=80",
    location: "Design Studio & Arts Center",
    ownerId: "user_anu",
    lenderId: "user_anu",
    ownerName: "Anu",
    borrowerId: "user_maya",
    borrowerName: "Maya Patel",
    borrowerRole: "Senior Media Arts",
    peerName: "Maya Patel",
    peerRole: "Senior Media Arts",
    pricingType: "hourly",
    durationHours: 3,
    durationDays: 1,
    hourlyRate: 20,
    dailyRate: 90,
    rentalCost: 60,
    securityDeposit: 100,
    deposit: 100,
    startTime: Date.now() - (3600 * 1000),
    endTime: Date.now() + (2 * 3600 * 1000),
    startDate: "2026-10-02",
    dueDate: "2026-10-02",
    type: "lending",
    status: "in_good_hands",
    statusLabel: "In Good Hands",
    createdAt: "2026-10-02T12:00:00.000Z"
  },
  {
    id: 'rent_4',
    rentalId: 'rent_4',
    itemId: 9,
    itemTitle: "Logitech MX Master 3S Wireless Mouse",
    itemName: "Logitech MX Master 3S Wireless Mouse",
    itemImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=120&q=80",
    location: "North Quad Dorms",
    ownerId: "user_anu",
    lenderId: "user_anu",
    ownerName: "Anu",
    borrowerId: "user_priya",
    borrowerName: "Priya Patel",
    borrowerRole: "Design Senior",
    peerName: "Priya Patel",
    peerRole: "Design Senior",
    pricingType: "daily",
    durationHours: 72,
    durationDays: 3,
    hourlyRate: 15,
    dailyRate: 60,
    rentalCost: 180,
    securityDeposit: 100,
    deposit: 100,
    startTime: Date.now() - (24 * 3600 * 1000),
    endTime: Date.now() + (48 * 3600 * 1000),
    startDate: "2026-10-02",
    dueDate: "2026-10-05",
    type: "lending",
    status: "in_good_hands",
    statusLabel: "In Good Hands",
    createdAt: "2026-10-02T10:00:00.000Z"
  }
];

const DEFAULT_RENTAL_REQUESTS = [
  {
    requestId: 'req_1',
    id: 'req_1',
    itemId: 2,
    itemTitle: "A2 Technical Drawing Board & Geometry Set",
    itemName: "A2 Technical Drawing Board & Geometry Set",
    itemImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=120&q=80",
    ownerId: "user_anu",
    ownerName: "Anu",
    borrowerId: "user_maya",
    borrowerName: "Maya Patel",
    borrowerRole: "Media Arts Senior",
    pricingType: "hourly",
    durationHours: 3,
    durationDays: 1,
    hourlyRate: 20,
    dailyRate: 90,
    rentalCost: 60,
    rentalFee: 60,
    securityDeposit: 100,
    deposit: 100,
    totalCost: 160,
    details: "3 Hours (₹20/hour + ₹100 deposit)",
    status: "Pending",
    createdAt: "2026-10-02T08:00:00.000Z"
  }
];

const DEFAULT_TRANSACTIONS = [
  {
    id: 'txn_101',
    rentalId: 'rent_1',
    itemId: 1,
    itemTitle: "TI-84 Plus CE Color Graphing Calculator",
    type: "deposit_hold",
    amount: 30.00,
    date: "2026-10-02",
    status: "escrowed"
  },
  {
    id: 'txn_102',
    rentalId: 'rent_1',
    itemId: 1,
    itemTitle: "TI-84 Plus CE Color Graphing Calculator",
    type: "rental_fee",
    amount: 12.00,
    date: "2026-10-02",
    status: "completed"
  }
];

const DEFAULT_RATINGS = [
  {
    id: 'rat_1',
    targetUserId: 'user_alex',
    fromUserId: 'user_anu',
    rating: 5,
    comment: "Calculator was fully charged and saved me during the midterm exam!",
    date: "2026-09-24"
  },
  {
    id: 'rat_2',
    targetUserId: 'user_anu',
    fromUserId: 'user_elena',
    rating: 5,
    comment: "Returned the camping equipment clean and right on schedule.",
    date: "2026-09-29"
  }
];

// Default User / Trust Ratings (Person-to-Person: Borrower rates Owner, Owner rates Borrower)
const DEFAULT_USER_RATINGS = [
  {
    id: 'urat_1',
    rentalId: 'rent_seed_1',
    itemId: '1',
    itemName: 'Texas Instruments TI-84 Plus CE Graphing Calculator',
    fromUserId: 'user_rahul',
    fromUserName: 'Rahul',
    fromUserAvatar: 'RH',
    toUserId: 'user_alex',
    toUserName: 'Alex Chen',
    role: 'owner',
    roleContext: 'owner',
    ratingType: 'user',
    type: 'user',
    stars: 5,
    comment: 'Alex was super punctual and polite. Calculator was handed over fully charged!',
    createdAt: 1727000000000,
    date: 'Sep 22, 2026'
  },
  {
    id: 'urat_2',
    rentalId: 'rent_seed_2',
    itemId: '2',
    itemName: 'A2 Technical Drawing Board & Precision Geometry Set',
    fromUserId: 'user_chloe',
    fromUserName: 'Chloe Nguyen',
    fromUserAvatar: 'CN',
    toUserId: 'user_anu',
    toUserName: 'Anu',
    role: 'owner',
    roleContext: 'owner',
    ratingType: 'user',
    type: 'user',
    stars: 5,
    comment: 'Anu is an awesome lender! Seamless handoff right at the campus library.',
    createdAt: 1727100000000,
    date: 'Sep 24, 2026'
  },
  {
    id: 'urat_3',
    rentalId: 'rent_seed_3',
    itemId: '2',
    itemName: 'A2 Technical Drawing Board & Precision Geometry Set',
    fromUserId: 'user_anu',
    fromUserName: 'Anu',
    fromUserAvatar: 'AN',
    toUserId: 'user_chloe',
    toUserName: 'Chloe Nguyen',
    role: 'borrower',
    roleContext: 'borrower',
    ratingType: 'user',
    type: 'user',
    stars: 5,
    comment: 'Chloe handled the drafting kit with care and returned it on schedule. 10/10 peer borrower!',
    createdAt: 1727150000000,
    date: 'Sep 25, 2026'
  },
  {
    id: 'urat_4',
    rentalId: 'rent_seed_4',
    itemId: '4',
    itemName: 'Sony WH-1000XM4 Noise Canceling Headphones',
    fromUserId: 'user_marcus',
    fromUserName: 'Marcus Vance',
    fromUserAvatar: 'MV',
    toUserId: 'user_anu',
    toUserName: 'Anu',
    role: 'owner',
    roleContext: 'owner',
    ratingType: 'user',
    type: 'user',
    stars: 5,
    comment: 'Great peer lender. Always fast to respond to borrow messages.',
    createdAt: 1727300000000,
    date: 'Sep 28, 2026'
  },
  {
    id: 'urat_5',
    rentalId: 'rent_seed_5',
    itemId: '1',
    itemName: 'TI-84 Plus CE Color Graphing Calculator',
    fromUserId: 'user_alex',
    fromUserName: 'Alex Chen',
    fromUserAvatar: 'AC',
    toUserId: 'user_anu',
    toUserName: 'Anu',
    role: 'borrower',
    roleContext: 'borrower',
    ratingType: 'user',
    type: 'user',
    stars: 5,
    comment: 'Anu took great care of the calculator and returned it right on schedule. Excellent peer borrower!',
    createdAt: 1727400000000,
    date: 'Sep 30, 2026'
  }
];

// Default Individual Item Ratings (Quality & Condition of the specific item)
const DEFAULT_ITEM_RATINGS = [
  {
    id: 'irat_1',
    rentalId: 'rent_seed_1',
    itemId: '1',
    itemName: 'Texas Instruments TI-84 Plus CE Graphing Calculator',
    fromUserId: 'user_rahul',
    fromUserName: 'Rahul',
    fromUserAvatar: 'RH',
    ownerId: 'user_alex',
    ratingType: 'item',
    stars: 4,
    comment: 'Very clean calculator, screen is sharp and color graphing was super helpful for calculus exams.',
    createdAt: 1727000000000,
    date: 'Sep 22, 2026'
  },
  {
    id: 'irat_2',
    rentalId: 'rent_seed_2',
    itemId: '2',
    itemName: 'A2 Technical Drawing Board & Precision Geometry Set',
    fromUserId: 'user_chloe',
    fromUserName: 'Chloe Nguyen',
    fromUserAvatar: 'CN',
    ownerId: 'user_anu',
    ratingType: 'item',
    stars: 5,
    comment: 'Parallel straightedge motion was smooth, set squares were accurate and zero scratches.',
    createdAt: 1727100000000,
    date: 'Sep 24, 2026'
  },
  {
    id: 'irat_3',
    rentalId: 'rent_seed_4',
    itemId: '4',
    itemName: 'Sony WH-1000XM4 Noise Canceling Headphones',
    fromUserId: 'user_marcus',
    fromUserName: 'Marcus Vance',
    fromUserAvatar: 'MV',
    ownerId: 'user_anu',
    ratingType: 'item',
    stars: 5,
    comment: 'Active noise cancelling is phenomenal. Ear pads are clean and battery lasts for days.',
    createdAt: 1727300000000,
    date: 'Sep 28, 2026'
  },
  {
    id: 'irat_4',
    rentalId: 'rent_seed_5',
    itemId: '1',
    itemName: 'Texas Instruments TI-84 Plus CE Graphing Calculator',
    fromUserId: 'user_chloe',
    fromUserName: 'Chloe Nguyen',
    fromUserAvatar: 'CN',
    ownerId: 'user_alex',
    ratingType: 'item',
    stars: 5,
    comment: 'Worked perfectly, battery was full, helped me finish my stats project on time!',
    createdAt: 1727400000000,
    date: 'Sep 30, 2026'
  }
];

/* ==========================================================================
   LOW-LEVEL HELPER FUNCTIONS
   Safe JSON serialization & parsing with localStorage
   ========================================================================== */

/**
 * Safely retrieves and parses JSON data from localStorage.
 * Returns defaultValue if the key doesn't exist or parsing fails.
 * 
 * @param {string} key - The localStorage key
 * @param {*} defaultValue - Fallback value if null or parse fails
 * @returns {*} Parsed value
 */
function getFromStorage(key, defaultValue = null) {
  try {
    const rawData = localStorage.getItem(key);
    if (rawData === null || rawData === undefined) {
      return defaultValue;
    }
    return JSON.parse(rawData);
  } catch (error) {
    console.warn(`[storage.js] Error parsing "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely serializes and saves value to localStorage as a JSON string.
 * 
 * @param {string} key - The localStorage key
 * @param {*} value - The JavaScript object/array/value to save
 * @returns {boolean} True if successfully stored, false otherwise
 */
function saveToStorage(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[storage.js] Error saving "${key}" to localStorage:`, error);
    return false;
  }
}

/* ==========================================================================
   SPECIFIED API FUNCTIONS
   ========================================================================== */

// 1. Users
function saveUsers(users) {
  return saveToStorage(STORAGE_KEYS.USERS, users);
}

function getUsers() {
  let users = getFromStorage(STORAGE_KEYS.USERS, null);
  if (!users) {
    saveUsers(DEFAULT_USERS);
    return DEFAULT_USERS;
  }
  // Ensure Rahul is present in users
  if (!users.some(u => u.id === 'user_rahul')) {
    const rahulUser = DEFAULT_USERS.find(u => u.id === 'user_rahul');
    if (rahulUser) {
      users.push(rahulUser);
      saveUsers(users);
    }
  }
  return users;
}

// 2. Current User & Authentication
function getCurrentUser() {
  const user = getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  if (!user) {
    return null;
  }
  // Sync with users collection for latest verification status, credits, and details
  const users = getUsers();
  const freshUser = users.find(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (freshUser) {
    if (freshUser.verificationStatus !== user.verificationStatus || freshUser.name !== user.name || freshUser.credits !== user.credits) {
      setCurrentUser(freshUser);
    }
    return freshUser;
  }
  return user;
}

function setCurrentUser(user) {
  return saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
}

function clearCurrentUser() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem('rent_borrow_logged_in_user_id');
    return true;
  } catch (error) {
    console.error('[storage.js] Error clearing current user:', error);
    return false;
  }
}

/**
 * Registers a new student account into localStorage.
 * Every newly registered account starts with verificationStatus: "pending".
 * Does NOT require a college email domain (normal personal emails accepted).
 * 
 * @param {Object} data - { name, collegeName, studentId, email, password, confirmPassword }
 * @returns {{ success: boolean, message: string, user?: Object }}
 */
function registerUser(data) {
  const { name, collegeName, studentId, email, password, confirmPassword } = data || {};

  // 1. All required fields must be completed
  if (!name || !name.trim()) {
    return { success: false, message: "Full Name is required." };
  }
  if (!collegeName || !collegeName.trim()) {
    return { success: false, message: "College Name is required." };
  }
  if (!studentId || !studentId.trim()) {
    return { success: false, message: "Student ID / Roll Number is required for verification review." };
  }
  if (!email || !email.trim()) {
    return { success: false, message: "Email address is required." };
  }
  if (!password) {
    return { success: false, message: "Password is required." };
  }

  // 2. Validate email format (normal domains e.g. gmail.com, yahoo.com permitted)
  const cleanEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: "Please enter a valid email address (e.g. yourname@domain.com)." };
  }

  // 3. Password and Confirm Password must match
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return { success: false, message: "Password and Confirm Password do not match." };
  }
  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  // 4. Prevent duplicate email registration
  const users = getUsers();
  const existingUser = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);
  if (existingUser) {
    return { success: false, message: "An account with this email address already exists. Please log in instead." };
  }

  // 5. Construct user data with verificationStatus: "pending"
  const avatarInitials = name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
  const newUser = {
    id: 'user_' + Date.now(),
    name: name.trim(),
    collegeName: collegeName.trim(),
    studentId: studentId.trim(),
    email: cleanEmail,
    password: password,
    verificationStatus: 'pending', // REQUIRED: Starts as "pending", NOT verified
    credits: 100,
    trustRating: 0,
    transactionHistory: [],
    rentalHistory: [],
    createdAt: new Date().toISOString(),
    // UI Helpers:
    role: 'Student (Verification Pending)',
    avatar: avatarInitials,
    campus: collegeName.trim(),
    rating: 0,
    reviewsCount: 0,
    userRating: {
      average: 0,
      totalRatings: 0
    },
    verified: false
  };

  users.push(newUser);
  saveUsers(users);

  // Automatically log in newly registered user and store user ID
  setCurrentUser(newUser);
  try {
    localStorage.setItem('rent_borrow_logged_in_user_id', newUser.id);
  } catch (e) {}

  return {
    success: true,
    message: "Registration successful! Your account has been created with 'Verification Pending' status.",
    user: newUser
  };
}

/**
 * Logs in a user using email and password.
 * On success, stores logged-in user ID and session in localStorage.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {{ success: boolean, message: string, user?: Object }}
 */
function loginUser(email, password) {
  if (!email || !email.trim()) {
    return { success: false, message: "Email is required." };
  }
  if (!password) {
    return { success: false, message: "Password is required." };
  }

  const cleanEmail = email.trim().toLowerCase();
  const users = getUsers();
  const user = users.find(u => u.email && u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return { success: false, message: "No account found with this email address. Please register." };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password. Please try again." };
  }

  // Set logged-in session
  setCurrentUser(user);
  try {
    localStorage.setItem('rent_borrow_logged_in_user_id', user.id);
  } catch (e) {}

  return { success: true, message: `Welcome back, ${user.name}!`, user };
}

/**
 * Logs out the current user session from localStorage.
 */
function logoutUser() {
  clearCurrentUser();
  return { success: true, message: "Logged out successfully." };
}

/**
 * Admin / MVP verification status updater.
 * Allows a test/admin account to approve or reject student registrations.
 * 
 * @param {string} userId 
 * @param {'verified'|'pending'|'rejected'} newStatus 
 * @returns {{ success: boolean, message: string, user?: Object }}
 */
function updateUserVerificationStatus(userId, newStatus) {
  if (!['verified', 'pending', 'rejected'].includes(newStatus)) {
    return { success: false, message: "Invalid verification status." };
  }

  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) {
    return { success: false, message: "User not found." };
  }

  user.verificationStatus = newStatus;
  if (newStatus === 'verified') {
    user.verified = true;
    user.role = 'Verified Student';
  } else if (newStatus === 'pending') {
    user.verified = false;
    user.role = 'Student (Verification Pending)';
  } else if (newStatus === 'rejected') {
    user.verified = false;
    user.role = 'Student (Verification Rejected)';
  }

  saveUsers(users);

  // If the modified user is currently logged in, sync active session
  const currentUser = getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(user);
  }

  return { success: true, message: `Status updated to ${newStatus}.`, user };
}

function topupUserCredits(userId, amount) {
  const users = getUsers();
  const user = users.find(u => String(u.id) === String(userId));
  if (!user) return { success: false, message: 'User account not found.' };

  const topup = Math.max(0, Number(amount) || 0);
  user.credits = (user.credits !== undefined ? Number(user.credits) : 100) + topup;
  saveUsers(users);

  const currentUser = getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  if (currentUser && String(currentUser.id) === String(userId)) {
    currentUser.credits = user.credits;
    setCurrentUser(currentUser);
  }

  // Record demo transaction
  if (typeof getTransactions === 'function' && typeof saveTransactions === 'function') {
    const txns = getTransactions();
    txns.unshift({
      id: 'txn_' + Date.now(),
      type: 'demo_payment_topup',
      title: 'Demo Shortfall Payment Top-Up',
      amount: topup,
      currency: 'INR',
      userId: userId,
      date: new Date().toISOString(),
      status: 'completed',
      note: 'Demo payment simulation: shortfall credited to campus account'
    });
    saveTransactions(txns);
  }

  return { success: true, message: `Added ${topup} credits to demo account.`, newBalance: user.credits };
}

// 3. Items
function saveItems(items) {
  return saveToStorage(STORAGE_KEYS.ITEMS, items);
}

function getItems() {
  let items = getFromStorage(STORAGE_KEYS.ITEMS, null);
  if (!items) {
    saveItems(DEFAULT_ITEMS);
    return DEFAULT_ITEMS;
  }
  // Targeted removal: ensure demo items 5, 8, and Anu Sharma's Calculator are removed if present in existing storage
  const isTargetItem = (i) => {
    // 1. Demo items 5 and 8
    if (String(i.id) === '5' || String(i.id) === '8') return true;
    if (i.title === "Campbell Biology (12th Edition Hardcover)" || i.name === "Campbell Biology (12th Edition Hardcover)") return true;
    if (i.title === "Campus Stationery Bundle & 128GB High-Speed USB Drive" || i.name === "Campus Stationery Bundle & 128GB High-Speed USB Drive") return true;

    // 2. Specific removal: Calculator owned by Anu Sharma (preserve Alex Chen's Calculator and Anu's active items)
    const itemName = String(i.name || i.title || '').trim().toLowerCase();
    if (itemName === 'calculator') {
      const ownerName = String(
        (i.owner && typeof i.owner === 'object' ? i.owner.name : i.owner) ||
        i.ownerName ||
        (i.lender && typeof i.lender === 'object' ? i.lender.name : i.lender) ||
        i.lenderName || ''
      ).trim().toLowerCase();
      const isAlex = ownerName.includes('alex') || String(i.ownerId) === 'user_alex';
      if (isAlex) return false; // Strictly KEEP Alex Chen's Calculator
      const isAnuSharma = ownerName.includes('anu sharma');
      const isPrice40 = Number(i.price) === 40 || Number(i.pricePerDay) === 40 || Number(i.dailyRate) === 40;
      if (isAnuSharma && isPrice40) return true;
    }
    return false;
  };

  if (items.some(isTargetItem)) {
    items = items.filter(i => !isTargetItem(i));
    saveItems(items);
  }

  // Ensure Anu's Calculator (id: 10) is seeded if not present
  if (!items.some(i => String(i.id) === '10')) {
    const anuCalc = DEFAULT_ITEMS.find(i => String(i.id) === '10');
    if (anuCalc) {
      items.push(anuCalc);
      saveItems(items);
    }
  }

  return items;
}

/**
 * Checks if a given user is the registered owner of an item.
 * Strictly checks item.ownerId === currentUser.id.
 * 
 * @param {Object} item 
 * @param {Object} [user] 
 * @returns {boolean}
 */
function isItemOwner(item, user) {
  if (!item) return false;
  const currentUser = user || (typeof getCurrentUser === 'function' ? getCurrentUser() : null);
  if (!currentUser || !currentUser.id) return false;

  const itemOwnerId = item.ownerId || 
    (item.owner && typeof item.owner === 'object' ? item.owner.id : null) ||
    (typeof item.owner === 'string' || typeof item.owner === 'number' ? item.owner : null) ||
    (item.lender && item.lender.id) || 
    item.lenderId;
  if (!itemOwnerId) return false;

  return String(itemOwnerId) === String(currentUser.id);
}

/**
 * Checks if an item is eligible for deletion.
 * Safety Rule: If the item currently has an active rental, do NOT allow deletion.
 * @param {number|string} itemId 
 * @returns {{allowed: boolean, reason?: string, item?: Object}}
 */
function canDeleteItem(itemId) {
  const items = getItems();
  const item = items.find(i => String(i.id) === String(itemId));
  if (!item) {
    return { allowed: false, hasActiveRental: false, reason: "Item not found." };
  }

  // Safety rule: Item status check
  const isBorrowed = item.status === 'borrowed';

  // Safety rule: Active rental check in rentals list
  const rentals = typeof getRentals === 'function' ? getRentals() : [];
  const activeRental = rentals.find(r => 
    String(r.itemId) === String(itemId) && 
    r.status !== 'returned' && 
    r.status !== 'completed'
  );

  const hasActiveRental = Boolean(isBorrowed || activeRental);

  return {
    allowed: true,
    hasActiveRental: hasActiveRental,
    reason: hasActiveRental ? "This item is currently rented out to a student peer." : "",
    item: item
  };
}

/**
 * Updates an item's details if the user is the registered owner.
 * Allows editing item name, description, price, deposit, availability, category, image.
 * @param {number|string} itemId 
 * @param {Object} updatedData 
 * @returns {{success: boolean, message: string, item?: Object}}
 */
function updateItem(itemId, updatedData) {
  const items = getItems();
  const index = items.findIndex(i => String(i.id) === String(itemId));
  if (index === -1) {
    return { success: false, message: "Item not found." };
  }

  const item = items[index];
  const currentUser = getCurrentUser();

  if (!isItemOwner(item, currentUser)) {
    return { success: false, message: "Unauthorized: You can only edit items that you listed." };
  }

  // Update item properties
  if (updatedData.name !== undefined) {
    item.name = updatedData.name;
    item.title = updatedData.name;
  }
  if (updatedData.category !== undefined) {
    item.category = updatedData.category;
    item.categoryKey = updatedData.category;
  }
  if (updatedData.description !== undefined) {
    item.description = updatedData.description;
  }
  if (updatedData.pricingType !== undefined) {
    item.pricingType = updatedData.pricingType;
    item.period = updatedData.pricingType === 'hourly' ? 'hour' : 'day';
    item.duration = item.period;
  }
  if (updatedData.price !== undefined) {
    const p = Number(updatedData.price) || 0;
    item.price = p;
    if (item.pricingType === 'hourly') {
      item.pricePerHour = p;
      item.pricePerDay = p * 4;
    } else {
      item.pricePerDay = p;
      item.pricePerHour = Math.round(p / 4);
    }
  }
  if (updatedData.securityDeposit !== undefined || updatedData.deposit !== undefined) {
    const d = Number(updatedData.securityDeposit !== undefined ? updatedData.securityDeposit : updatedData.deposit) || 0;
    item.securityDeposit = d;
    item.deposit = d;
  }
  if (updatedData.availabilityType !== undefined) {
    item.availabilityType = updatedData.availabilityType;
  }
  if (updatedData.availabilityStart !== undefined) {
    item.availabilityStart = updatedData.availabilityStart;
  }
  if (updatedData.availabilityEnd !== undefined) {
    item.availabilityEnd = updatedData.availabilityEnd;
  }
  if (updatedData.image) {
    item.image = updatedData.image;
  }

  item.updatedAt = new Date().toISOString();

  items[index] = item;
  saveItems(items);

  return { success: true, message: "Item updated successfully.", item: item };
}

/**
 * Deletes an item from localStorage if the user is the owner.
 * Historical rentals and transactions remain completely intact.
 * @param {number|string} itemId 
 * @returns {{success: boolean, message: string}}
 */
function deleteItem(itemId) {
  const items = getItems();
  const index = items.findIndex(i => String(i.id) === String(itemId));
  if (index === -1) {
    return { success: false, message: "Item not found." };
  }

  const item = items[index];
  const currentUser = getCurrentUser();

  // 1. Ownership check: Only owner can delete
  if (!isItemOwner(item, currentUser)) {
    return { success: false, message: "Unauthorized: You can only remove items that you listed." };
  }

  // 2. Remove the item from array and persist to localStorage
  items.splice(index, 1);
  saveItems(items);

  // Track deleted ID so default seed migrations do not re-add it
  try {
    const deletedIds = getFromStorage('rent_borrow_deleted_item_ids', []);
    const idStr = String(itemId);
    if (!deletedIds.includes(idStr)) {
      deletedIds.push(idStr);
      saveToStorage('rent_borrow_deleted_item_ids', deletedIds);
    }
  } catch (e) {
    console.warn('[storage.js] Could not save deleted ID tracker:', e);
  }

  return { success: true, message: "Item removed successfully." };
}

// 4. Rental Requests
function saveRentalRequests(requests) {
  return saveToStorage(STORAGE_KEYS.RENTAL_REQUESTS, requests);
}

function getRentalRequests() {
  const requests = getFromStorage(STORAGE_KEYS.RENTAL_REQUESTS, null);
  if (!requests) {
    saveRentalRequests(DEFAULT_RENTAL_REQUESTS);
    return DEFAULT_RENTAL_REQUESTS;
  }
  return requests;
}

/**
 * Creates and stores a new borrow request in localStorage.
 * Shared between borrower and owner.
 * 
 * @param {Object} data - Request payload
 * @returns {{success: boolean, message: string, request?: Object}}
 */
function createBorrowRequest(data) {
  const {
    itemId, itemTitle, itemName, itemImage, itemCategory,
    ownerId, ownerName,
    borrowerId, borrowerName, borrowerRole,
    pricingType, durationHours, durationDays,
    hourlyRate, dailyRate,
    rentalCost, rentalFee,
    securityDeposit, deposit,
    totalCost, details
  } = data || {};
  if (!itemId || !ownerId || !borrowerId) {
    return { success: false, message: "Missing required request parameters (itemId, ownerId, or borrowerId)." };
  }
  if (String(ownerId) === String(borrowerId)) {
    return { success: false, message: "You cannot borrow your own listed item." };
  }

  const requests = getRentalRequests();
  const reqId = 'req_' + Date.now();
  const isHourly = pricingType === 'hourly';
  const computedHours = durationHours ? Number(durationHours) : (durationDays ? Number(durationDays) * 24 : 3);
  const computedDays = durationDays ? Number(durationDays) : (durationHours ? Math.ceil(Number(durationHours) / 24) : 1);
  const computedRate = isHourly ? (hourlyRate !== undefined ? Number(hourlyRate) : 20) : (dailyRate !== undefined ? Number(dailyRate) : 50);
  const computedCost = rentalCost !== undefined ? Number(rentalCost) : (rentalFee !== undefined ? Number(rentalFee) : (isHourly ? computedHours * computedRate : computedDays * computedRate));
  const computedDeposit = securityDeposit !== undefined ? Number(securityDeposit) : (deposit !== undefined ? Number(deposit) : 0);
  const computedTotal = totalCost !== undefined ? Number(totalCost) : (computedCost + computedDeposit);

  const defaultDetails = isHourly
    ? `${computedHours} Hour${computedHours === 1 ? '' : 's'} (₹${computedRate}/hour + ₹${computedDeposit} deposit)`
    : `${computedDays} Day${computedDays === 1 ? '' : 's'} (₹${computedRate}/day + ₹${computedDeposit} deposit)`;

  const newRequest = {
    requestId: reqId,
    id: reqId,
    itemId: itemId,
    itemTitle: itemTitle || itemName || 'Item',
    itemName: itemName || itemTitle || 'Item',
    itemImage: itemImage || '',
    itemCategory: itemCategory || '',
    ownerId: String(ownerId),
    ownerName: ownerName || 'Owner',
    borrowerId: String(borrowerId),
    borrowerName: borrowerName || 'Borrower',
    borrowerRole: borrowerRole || 'Student',
    pricingType: isHourly ? 'hourly' : 'daily',
    durationHours: computedHours,
    durationDays: computedDays,
    hourlyRate: isHourly ? computedRate : Math.round(computedRate / 4),
    dailyRate: isHourly ? computedRate * 4 : computedRate,
    rentalCost: computedCost,
    rentalFee: computedCost,
    securityDeposit: computedDeposit,
    deposit: computedDeposit,
    totalCost: computedTotal,
    details: details || defaultDetails,
    availabilityType: data.availabilityType || 'all-day',
    availabilityStart: data.availabilityStart || '',
    availabilityEnd: data.availabilityEnd || '',
    requestedStartTime: data.requestedStartTime || '',
    requestedEndTime: data.requestedEndTime || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  requests.unshift(newRequest);
  saveRentalRequests(requests);
  return { success: true, message: "Borrow request created successfully.", request: newRequest };
}

/**
 * Updates a borrow request status in localStorage.
 * Used when an owner accepts or rejects a request.
 * 
 * @param {string} requestId 
 * @param {'Pending'|'Accepted'|'Rejected'} newStatus 
 * @returns {{success: boolean, message: string, request?: Object}}
 */
function updateBorrowRequestStatus(requestId, newStatus) {
  const validStatuses = ['Pending', 'Accepted', 'Rejected'];
  const normalizedStatus = validStatuses.find(s => s.toLowerCase() === String(newStatus).toLowerCase());
  if (!normalizedStatus) {
    return { success: false, message: "Invalid request status. Must be Pending, Accepted, or Rejected." };
  }

  const requests = getRentalRequests();
  const req = requests.find(r => (r.requestId === requestId || r.id === requestId));
  if (!req) {
    return { success: false, message: "Request not found." };
  }

  req.status = normalizedStatus;
  saveRentalRequests(requests);
  return { success: true, message: `Request status updated to ${normalizedStatus}.`, request: req };
}

/**
 * Retrieves requests where currentUser is the borrower.
 * @param {string} userId 
 * @returns {Array}
 */
function getUserBorrowRequests(userId) {
  if (!userId) return [];
  const requests = getRentalRequests();
  return requests.filter(r => String(r.borrowerId) === String(userId));
}

/**
 * Retrieves incoming requests for items owned by currentUser.
 * @param {string} userId 
 * @returns {Array}
 */
function getUserIncomingRequests(userId) {
  if (!userId) return [];
  const requests = getRentalRequests();
  return requests.filter(r => String(r.ownerId) === String(userId));
}

// 5. Active Rentals
function saveRentals(rentals) {
  return saveToStorage(STORAGE_KEYS.RENTALS, rentals);
}

function getRentals() {
  const rentals = getFromStorage(STORAGE_KEYS.RENTALS, null);
  if (!rentals) {
    saveRentals(DEFAULT_RENTALS);
    return DEFAULT_RENTALS;
  }
  return rentals;
}

// 6. Transactions
function saveTransactions(transactions) {
  return saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
}

function getTransactions() {
  const transactions = getFromStorage(STORAGE_KEYS.TRANSACTIONS, null);
  if (!transactions) {
    saveTransactions(DEFAULT_TRANSACTIONS);
    return DEFAULT_TRANSACTIONS;
  }
  return transactions;
}

// 7. Ratings (Legacy & Two-Sided System)
function saveRatings(ratings) {
  return saveToStorage(STORAGE_KEYS.RATINGS, ratings);
}

function getRatings() {
  const ratings = getFromStorage(STORAGE_KEYS.RATINGS, null);
  if (!ratings) {
    saveRatings(DEFAULT_RATINGS);
    return DEFAULT_RATINGS;
  }
  return ratings;
}

// 8. User / Trust Ratings (Person-to-Person: Borrower rates Owner, Owner rates Borrower)
function getUserRatings() {
  const ratings = getFromStorage(STORAGE_KEYS.USER_RATINGS, null);
  if (!ratings) {
    saveToStorage(STORAGE_KEYS.USER_RATINGS, DEFAULT_USER_RATINGS);
    return DEFAULT_USER_RATINGS;
  }
  return ratings;
}

function saveUserRatings(ratings) {
  return saveToStorage(STORAGE_KEYS.USER_RATINGS, ratings);
}

// 9. Individual Item Ratings (Specific physical item quality & condition)
function getItemRatings() {
  const ratings = getFromStorage(STORAGE_KEYS.ITEM_RATINGS, null);
  if (!ratings) {
    saveToStorage(STORAGE_KEYS.ITEM_RATINGS, DEFAULT_ITEM_RATINGS);
    return DEFAULT_ITEM_RATINGS;
  }
  return ratings;
}

function saveItemRatings(ratings) {
  return saveToStorage(STORAGE_KEYS.ITEM_RATINGS, ratings);
}

/**
 * Calculates user rating summary strictly from USER ratings.
 * Never includes item ratings.
 * @param {string} userId
 */
function getUserRatingSummary(userId) {
  if (!userId) return { average: 0, totalRatings: 0, ratings: [] };
  const allUserRatings = getUserRatings();
  const userRatings = allUserRatings.filter(r => String(r.toUserId) === String(userId));
  
  if (userRatings.length === 0) {
    const allUsers = typeof getUsers === 'function' ? getUsers() : [];
    const u = allUsers.find(user => String(user.id) === String(userId));
    if (u && u.userRating && Number(u.userRating.totalRatings) > 0) {
      return {
        average: Number(u.userRating.average) || 0,
        totalRatings: Number(u.userRating.totalRatings) || 0,
        ratings: []
      };
    }
    if (u && Number(u.reviewsCount) > 0 && !u.userRating && (u.trustRating > 0 || u.rating > 0)) {
      return {
        average: Number(u.trustRating !== undefined ? u.trustRating : u.rating) || 0,
        totalRatings: Number(u.reviewsCount) || 0,
        ratings: []
      };
    }
    return { average: 0, totalRatings: 0, ratings: [] };
  }

  const sum = userRatings.reduce((acc, r) => acc + (Number(r.stars) || 0), 0);
  const avg = userRatings.length > 0 ? (Math.round((sum / userRatings.length) * 10) / 10) : 0;
  return {
    average: avg,
    totalRatings: userRatings.length,
    ratings: userRatings.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  };
}

/**
 * Calculates item rating summary strictly from ITEM ratings.
 * Never includes user ratings.
 * @param {string|number} itemId
 */
function getItemRatingSummary(itemId) {
  if (!itemId) return { average: 0, totalRatings: 0, ratings: [] };
  const allItemRatings = getItemRatings();
  const itemRatings = allItemRatings.filter(r => String(r.itemId) === String(itemId));

  if (itemRatings.length === 0) {
    const allItems = typeof getItems === 'function' ? getItems() : [];
    const item = allItems.find(it => String(it.id) === String(itemId));
    if (item && item.itemRating && Number(item.itemRating.totalRatings) > 0) {
      return {
        average: Number(item.itemRating.average) || 0,
        totalRatings: Number(item.itemRating.totalRatings) || 0,
        ratings: []
      };
    }
    return { average: 0, totalRatings: 0, ratings: [] };
  }

  const sum = itemRatings.reduce((acc, r) => acc + (Number(r.stars) || 0), 0);
  const avg = itemRatings.length > 0 ? (Math.round((sum / itemRatings.length) * 10) / 10) : 0;
  return {
    average: avg,
    totalRatings: itemRatings.length,
    ratings: itemRatings.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
  };
}

/**
 * Submits a rating for a user (Borrower -> Owner OR Owner -> Borrower).
 * Strictly enforced:
 * - Rental must be completed
 * - No self rating
 * - One user rating per rental per direction
 */
function submitUserRating({ rentalId, toUserId, stars, comment }) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    return { success: false, message: 'Please log in to submit a rating.' };
  }

  const parsedStars = parseInt(stars, 10);
  if (isNaN(parsedStars) || parsedStars < 1 || parsedStars > 5) {
    return { success: false, message: 'Please select a valid rating between 1 and 5 stars.' };
  }

  const allRentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = allRentals.find(r => String(r.id) === String(rentalId));
  if (!rental) {
    return { success: false, message: 'Rental record not found.' };
  }

  // Must be completed / returned
  const st = (rental.status || '').toLowerCase();
  if (st !== 'completed' && st !== 'returned') {
    return { success: false, message: 'Ratings can only be submitted after the rental has been confirmed as completed/returned.' };
  }

  const isBorrower = String(rental.borrowerId) === String(currentUser.id);
  const isOwner = String(rental.ownerId || rental.lenderId) === String(currentUser.id);

  if (!isBorrower && !isOwner) {
    return { success: false, message: 'Unauthorized: You were not a participant in this completed rental.' };
  }

  // Prevent self-rating
  if (String(toUserId) === String(currentUser.id)) {
    return { success: false, message: 'Invalid action: You cannot rate yourself.' };
  }

  // Verify toUserId is indeed the peer of this rental
  const expectedPeerId = isBorrower ? String(rental.ownerId || rental.lenderId) : String(rental.borrowerId);
  if (String(toUserId) !== expectedPeerId) {
    return { success: false, message: 'Invalid recipient for this rental review.' };
  }

  // Check duplicate
  const allUserRatings = getUserRatings();
  const alreadyRated = allUserRatings.some(r => 
    String(r.rentalId) === String(rentalId) && 
    String(r.fromUserId) === String(currentUser.id)
  );
  if (alreadyRated) {
    return { success: false, message: 'You have already submitted a rating for this rental.' };
  }

  const allUsers = typeof getUsers === 'function' ? getUsers() : [];
  const toUser = allUsers.find(u => String(u.id) === String(toUserId));
  const toUserName = (toUser && toUser.name) || (isBorrower ? (rental.ownerName || rental.lenderName) : rental.borrowerName) || 'Student';

  const newRating = {
    id: 'urat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    rentalId: String(rentalId),
    itemId: rental.itemId ? String(rental.itemId) : null,
    itemName: rental.itemName || rental.itemTitle || 'Campus Gear',
    fromUserId: String(currentUser.id),
    fromUserName: currentUser.name || 'Student',
    fromUserAvatar: currentUser.avatar || 'ST',
    toUserId: String(toUserId),
    toUserName: toUserName,
    role: isOwner ? 'borrower' : 'owner', // role of person being rated
    roleContext: isOwner ? 'borrower' : 'owner',
    ratingType: 'user',
    type: 'user',
    stars: parsedStars,
    comment: comment ? String(comment).trim() : '',
    createdAt: Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  allUserRatings.unshift(newRating);
  saveUserRatings(allUserRatings);

  // Update target user's trustRating & rating & userRating object
  const updatedSummary = getUserRatingSummary(toUserId);
  if (toUser) {
    toUser.trustRating = updatedSummary.average;
    toUser.rating = updatedSummary.average;
    toUser.reviewsCount = updatedSummary.totalRatings;
    toUser.userRating = {
      average: updatedSummary.average,
      totalRatings: updatedSummary.totalRatings
    };
    saveUsers(allUsers);
  }

  return { success: true, rating: newRating, summary: updatedSummary };
}

/**
 * Submits an item rating (Borrower -> Item).
 * Strictly enforced:
 * - Rental must be completed
 * - Only borrower can rate the item
 * - One item rating per rental
 */
function submitItemRating({ rentalId, itemId, stars, comment }) {
  const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
  if (!currentUser) {
    return { success: false, message: 'Please log in to submit a rating.' };
  }

  const parsedStars = parseInt(stars, 10);
  if (isNaN(parsedStars) || parsedStars < 1 || parsedStars > 5) {
    return { success: false, message: 'Please select a valid rating between 1 and 5 stars.' };
  }

  const allRentals = typeof getRentals === 'function' ? getRentals() : [];
  const rental = allRentals.find(r => String(r.id) === String(rentalId));
  if (!rental) {
    return { success: false, message: 'Rental record not found.' };
  }

  // Must be completed / returned
  const st = (rental.status || '').toLowerCase();
  if (st !== 'completed' && st !== 'returned') {
    return { success: false, message: 'Item ratings can only be submitted after the rental has been confirmed as completed/returned.' };
  }

  // Only borrower can rate the item
  if (String(rental.borrowerId) !== String(currentUser.id)) {
    return { success: false, message: 'Unauthorized: Only the student who borrowed this item can submit an item review.' };
  }

  if (String(rental.itemId) !== String(itemId)) {
    return { success: false, message: 'Item ID does not match the rented item.' };
  }

  // Prevent duplicate
  const allItemRatings = getItemRatings();
  const alreadyRated = allItemRatings.some(r => 
    String(r.rentalId) === String(rentalId) && 
    String(r.fromUserId) === String(currentUser.id)
  );
  if (alreadyRated) {
    return { success: false, message: 'You have already submitted a rating for this item from this rental.' };
  }

  const newRating = {
    id: 'irat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    rentalId: String(rentalId),
    itemId: String(itemId),
    itemName: rental.itemName || rental.itemTitle || 'Campus Gear',
    fromUserId: String(currentUser.id),
    fromUserName: currentUser.name || 'Student',
    fromUserAvatar: currentUser.avatar || 'ST',
    ownerId: rental.ownerId || rental.lenderId,
    ratingType: 'item',
    type: 'item',
    stars: parsedStars,
    comment: comment ? String(comment).trim() : '',
    createdAt: Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  allItemRatings.unshift(newRating);
  saveItemRatings(allItemRatings);

  // Update item rating in itemsData
  const allItems = typeof getItems === 'function' ? getItems() : [];
  const item = allItems.find(i => String(i.id) === String(itemId));
  const updatedSummary = getItemRatingSummary(itemId);
  if (item) {
    item.itemRating = {
      average: updatedSummary.average,
      totalRatings: updatedSummary.totalRatings
    };
    saveItems(allItems);
  }

  return { success: true, rating: newRating, summary: updatedSummary };
}

/**
 * Helper to inspect the rating status of a completed rental for the current user.
 */
function getRentalRatingStatus(rental, currentUserId) {
  if (!rental || !currentUserId) {
    return { canRate: false, isCompleted: false };
  }

  const st = (rental.status || '').toLowerCase();
  const isCompleted = (st === 'completed' || st === 'returned');
  if (!isCompleted) {
    return { canRate: false, isCompleted: false };
  }

  const isBorrower = String(rental.borrowerId) === String(currentUserId);
  const isOwner = String(rental.ownerId || rental.lenderId) === String(currentUserId);

  if (!isBorrower && !isOwner) {
    return { canRate: false, isCompleted: true };
  }

  const allUserRatings = getUserRatings();
  const allItemRatings = getItemRatings();

  const userRating = allUserRatings.find(r => 
    String(r.rentalId) === String(rental.id) && 
    String(r.fromUserId) === String(currentUserId)
  ) || null;

  const itemRating = isBorrower ? (allItemRatings.find(r => 
    String(r.rentalId) === String(rental.id) && 
    String(r.fromUserId) === String(currentUserId)
  ) || null) : null;

  const peerId = isBorrower ? (rental.ownerId || rental.lenderId) : rental.borrowerId;
  const peerName = isBorrower ? (rental.ownerName || rental.lenderName || 'Owner') : (rental.borrowerName || 'Borrower');

  return {
    isCompleted: true,
    isBorrower: isBorrower,
    isOwner: isOwner,
    peerId: peerId,
    peerName: peerName,
    hasRatedUser: !!userRating,
    userRating: userRating,
    hasRatedItem: !!itemRating,
    itemRating: itemRating,
    canRateUser: !userRating,
    canRateItem: isBorrower && !itemRating
  };
}

/* ==========================================================================
   INITIALIZATION, MIGRATION & RESET HELPERS
   ========================================================================== */

/**
 * Ensures existing storage instances are migrated to support hourly rentals,
 * live countdown timers, return due states, and credit balance tracking.
 */
function migrateStorageIfNeeded() {
  try {
    const versionKey = 'rent_borrow_storage_version';
    const currentVersion = 'v9_initial_zero_ratings';
    if (localStorage.getItem(versionKey) !== currentVersion) {
      // 1. Items migration: Ensure pricingType, pricePerHour, pricePerDay, securityDeposit, and name/title
      const categoryMap = {
        'electronics': 'Electronics & Calculators',
        'electronics & calculators': 'Electronics & Calculators',
        'textbooks': 'Study Essential',
        'study essential': 'Study Essential',
        'photography': 'Drawing & Design',
        'photography & media': 'Drawing & Design',
        'drawing & design': 'Drawing & Design',
        'tools': 'Lab & Project Gear',
        'tools & lab gear': 'Lab & Project Gear',
        'lab & project gear': 'Lab & Project Gear',
        'outdoors': 'College Essential',
        'outdoors & trips': 'College Essential',
        'college essential': 'College Essential'
      };

      const items = getFromStorage(STORAGE_KEYS.ITEMS, null);
      if (items && Array.isArray(items)) {
        items.forEach(item => {
          if (!item.ownerId) {
            item.ownerId = (item.lender && item.lender.id) || item.lenderId || 
              (item.id === 2 || item.id === 9 ? 'user_anu' : 
              (item.id === 1 ? 'user_alex' : 
              (item.id === 3 ? 'user_chloe' : 
              (item.id === 4 ? 'user_marcus' : 
              (item.id === 5 ? 'user_elena' : 
              (item.id === 6 ? 'user_samira' : 
              (item.id === 7 ? 'user_david' : 
              (item.id === 8 ? 'user_jordan' : 'user_anu'))))))));
          }
          if (item.lender) {
            if (!item.lender.id) {
              item.lender.id = item.ownerId;
            }
            if (item.lender.name) {
              item.lender.name = item.lender.name.replace(/\s*\(You\)/gi, '').trim();
            }
          }

          item.name = item.name || item.title || 'Item';
          item.title = item.title || item.name || 'Item';

          // Hourly vs Daily schema migration
          if (!item.pricingType) {
            const isHourlyDefault = item.id === 1 || item.id === 2 || item.id === 4 || item.id === 6 || item.id === 7;
            item.pricingType = isHourlyDefault ? 'hourly' : 'daily';
          }

          if (item.pricingType === 'hourly') {
            item.pricePerHour = item.pricePerHour !== undefined ? item.pricePerHour : (item.id === 1 ? 20 : (item.id === 2 ? 20 : (item.id === 4 ? 30 : (item.id === 6 ? 0 : (item.id === 7 ? 40 : (item.price || 20))))));
            item.pricePerDay = item.pricePerDay !== undefined ? item.pricePerDay : (item.pricePerHour * 4);
            item.price = item.pricePerHour;
            item.period = item.price === 0 ? 'Free Borrow' : 'hour';
          } else {
            item.pricePerDay = item.pricePerDay !== undefined ? item.pricePerDay : (item.id === 3 ? 50 : (item.id === 5 ? 25 : (item.id === 8 ? 0 : (item.id === 9 ? 60 : (item.price || 50)))));
            item.pricePerHour = item.pricePerHour !== undefined ? item.pricePerHour : Math.round(item.pricePerDay / 4);
            item.price = item.pricePerDay;
            item.period = item.price === 0 ? 'Free Borrow' : 'day';
          }

          item.securityDeposit = item.securityDeposit !== undefined ? item.securityDeposit : (item.deposit !== undefined ? item.deposit : 100);
          item.deposit = item.securityDeposit;

          // Normalize category
          const rawCat = (item.category || '').toLowerCase().trim();
          if (categoryMap[rawCat]) {
            item.category = categoryMap[rawCat];
          }
          if (item.categoryKey) {
            const rawKey = (item.categoryKey || '').toLowerCase().trim();
            if (categoryMap[rawKey]) {
              item.category = categoryMap[rawKey];
            }
          }
          item.categoryKey = item.category;

          // Migrate item 1 specifics (TI-84)
          if (item.id === 1) {
            item.name = "TI-84 Plus CE Color Graphing Calculator";
            item.title = "TI-84 Plus CE Color Graphing Calculator";
            item.pricingType = "hourly";
            item.pricePerHour = 20;
            item.pricePerDay = 80;
            item.price = 20;
            item.period = "hour";
            item.securityDeposit = 100;
            item.deposit = 100;
          }
          // Migrate item 2 specifics (Drawing Board)
          if (item.id === 2) {
            item.name = "A2 Technical Drawing Board & Precision Geometry Set";
            item.title = "A2 Technical Drawing Board & Precision Geometry Set";
            item.category = "Drawing & Design";
            item.categoryKey = "Drawing & Design";
            item.pricingType = "hourly";
            item.pricePerHour = 20;
            item.pricePerDay = 90;
            item.price = 20;
            item.period = "hour";
            item.securityDeposit = 100;
            item.deposit = 100;
            item.image = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80";
            item.fallbackIcon = "pen-tool";
            item.description = "Includes parallel motion ruler, 30/60 & 45 set squares, drafting tape, and padded carrying case. Perfect for engineering and architecture students.";
          }
        });

        // Ensure default items exist if not explicitly deleted
        const deletedIds = getFromStorage('rent_borrow_deleted_item_ids', []);
        DEFAULT_ITEMS.forEach(defItem => {
          if (!items.some(i => String(i.id) === String(defItem.id)) && !deletedIds.includes(String(defItem.id))) {
            items.push(defItem);
          }
        });

        saveItems(items);
      } else {
        saveItems(DEFAULT_ITEMS);
      }

      // 2. Rental requests migration: Ensure durationHours, hourlyRate, rentalCost, securityDeposit
      const requests = getFromStorage(STORAGE_KEYS.RENTAL_REQUESTS, null);
      if (requests && Array.isArray(requests)) {
        requests.forEach(req => {
          if (!req.requestId) req.requestId = req.id || ('req_' + Date.now());
          if (!req.id) req.id = req.requestId;
          if (!req.ownerId) req.ownerId = req.lenderId || 'user_anu';
          if (!req.borrowerId) req.borrowerId = 'user_maya';
          if (!req.status) req.status = 'Pending';
          if (!req.createdAt) req.createdAt = req.requestDate || new Date().toISOString();

          if (req.itemId === 2 || req.id === 'req_1') {
            req.itemTitle = "A2 Technical Drawing Board & Geometry Set";
            req.itemName = "A2 Technical Drawing Board & Geometry Set";
            req.itemCategory = "Drawing & Design";
            req.itemImage = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=120&q=80";
            req.pricingType = "hourly";
            req.durationHours = 3;
            req.durationDays = 1;
            req.hourlyRate = 20;
            req.dailyRate = 90;
            req.rentalCost = 60;
            req.rentalFee = 60;
            req.securityDeposit = 100;
            req.deposit = 100;
            req.totalCost = 160;
            req.details = "3 Hours (₹20/hour + ₹100 deposit)";
          } else {
            if (!req.pricingType) req.pricingType = 'daily';
            if (!req.durationHours) req.durationHours = (req.durationDays || 3) * 24;
            if (req.securityDeposit === undefined) req.securityDeposit = req.deposit || 0;
            if (req.rentalCost === undefined) req.rentalCost = req.rentalFee || 0;
            if (!req.details) req.details = `${req.durationHours} Hours`;
          }
        });
        saveRentalRequests(requests);
      } else {
        saveRentalRequests(DEFAULT_RENTAL_REQUESTS);
      }

      // 3. Rentals migration: Ensure hourly data, startTime, endTime, countdown support
      const rentals = getFromStorage(STORAGE_KEYS.RENTALS, null);
      if (rentals && Array.isArray(rentals)) {
        rentals.forEach(r => {
          if (!r.borrowerId) {
            if (r.id === 'rent_1' || r.id === 'rent_2') r.borrowerId = 'user_anu';
            else if (r.id === 'rent_3') r.borrowerId = 'user_maya';
            else if (r.id === 'rent_4') r.borrowerId = 'user_priya';
          }
          if (!r.ownerId && !r.lenderId) {
            if (r.id === 'rent_1') { r.ownerId = 'user_alex'; r.lenderId = 'user_alex'; }
            else if (r.id === 'rent_2') { r.ownerId = 'user_samira'; r.lenderId = 'user_samira'; }
            else if (r.id === 'rent_3' || r.id === 'rent_4') { r.ownerId = 'user_anu'; r.lenderId = 'user_anu'; }
          }

          r.itemName = r.itemName || r.itemTitle;
          r.itemTitle = r.itemTitle || r.itemName;

          // Rent 1: Active 3-hour rental for Anu (TI-84 Calculator) with live countdown (2h 14m left)
          if (r.id === 'rent_1') {
            r.itemTitle = "TI-84 Plus CE Color Graphing Calculator";
            r.itemName = "TI-84 Plus CE Color Graphing Calculator";
            r.pricingType = "hourly";
            r.durationHours = 3;
            r.durationDays = 1;
            r.hourlyRate = 20;
            r.dailyRate = 80;
            r.rentalCost = 60;
            r.securityDeposit = 100;
            r.deposit = 100;
            r.startTime = Date.now() - (46 * 60 * 1000);
            r.endTime = Date.now() + (2 * 3600 * 1000 + 14 * 60 * 1000);
            r.status = 'active';
            r.statusLabel = 'Active Borrow';
            r.type = 'borrowing';
            r.borrowerId = 'user_anu';
            r.borrowerName = 'Anu';
            r.ownerId = 'user_alex';
            r.lenderId = 'user_alex';
            r.ownerName = 'Alex Chen';
          } else if (r.id === 'rent_2') {
            // Rent 2: Completed rental so Anu has exactly 1 active borrowing rental
            r.status = 'completed';
            r.statusLabel = 'Completed';
            r.pricingType = 'hourly';
            r.durationHours = 2;
            r.durationDays = 1;
            r.hourlyRate = 0;
            r.dailyRate = 0;
            r.rentalCost = 0;
            r.securityDeposit = 50;
            r.deposit = 50;
            r.startTime = Date.now() - (48 * 3600 * 1000);
            r.endTime = Date.now() - (46 * 3600 * 1000);
          } else {
            if (!r.pricingType) r.pricingType = r.dailyRate ? 'daily' : 'hourly';
            if (!r.durationHours) r.durationHours = (r.durationDays || 3) * 24;
            if (!r.startTime) r.startTime = r.startDate ? new Date(r.startDate).getTime() : Date.now();
            if (!r.endTime) r.endTime = r.dueDate ? new Date(r.dueDate).getTime() : (r.startTime + (r.durationHours * 3600000));
            if (r.securityDeposit === undefined) r.securityDeposit = r.deposit || 0;
            if (r.rentalCost === undefined) r.rentalCost = r.dailyRate ? r.dailyRate * (r.durationDays || 1) : 0;
          }
        });
        saveRentals(rentals);
      } else {
        saveRentals(DEFAULT_RENTALS);
      }

      // 4. Users migration: ensure verificationStatus, collegeName, studentId, etc.
      const users = getFromStorage(STORAGE_KEYS.USERS, null);
      if (users && Array.isArray(users)) {
        let changed = false;
        users.forEach(u => {
          if (!u.verificationStatus) {
            u.verificationStatus = u.verified ? 'verified' : 'pending';
            changed = true;
          }
          if (!u.collegeName) {
            u.collegeName = u.campus || 'Campus University';
            changed = true;
          }
          if (!u.studentId) {
            u.studentId = 'STU-' + (Math.floor(1000 + Math.random() * 9000));
            changed = true;
          }
          if (!u.password) {
            u.password = 'password123';
            changed = true;
          }
          if (u.credits === undefined) {
            u.credits = u.id === 'user_jordan' ? 0 : (u.id === 'user_rahul' ? 20 : 100);
            changed = true;
          }
          if (u.id === 'user_rahul' && u.credits === 100) {
            u.credits = 20;
            changed = true;
          }
          if (u.id === 'user_jordan' && u.credits === 100) {
            u.credits = 0;
            changed = true;
          }
          if (u.trustRating === undefined || (u.reviewsCount === 0 && (u.trustRating === 5.0 || u.trustRating === 5))) {
            u.trustRating = (u.reviewsCount > 0 && u.rating) ? u.rating : 0;
            changed = true;
          }
          if (u.reviewsCount === 0 && (u.rating === 5.0 || u.rating === 5)) {
            u.rating = 0;
            u.trustRating = 0;
            changed = true;
          }
          if (!u.userRating) {
            u.userRating = { average: u.rating || 0, totalRatings: u.reviewsCount || 0 };
            changed = true;
          }
          if (!u.transactionHistory) {
            u.transactionHistory = [];
            changed = true;
          }
          if (!u.rentalHistory) {
            u.rentalHistory = [];
            changed = true;
          }
        });

        if (changed) {
          saveUsers(users);
        }
      }

      // 5. Zero Initial Rating Migration for Users & Items
      // Remove artificial 5-star defaults for unrated users and items without destroying legitimate ratings
      const allUserRatings = getFromStorage(STORAGE_KEYS.USER_RATINGS, DEFAULT_USER_RATINGS) || [];
      const allItemRatings = getFromStorage(STORAGE_KEYS.ITEM_RATINGS, DEFAULT_ITEM_RATINGS) || [];

      const currentUsersList = getFromStorage(STORAGE_KEYS.USERS, null);
      if (currentUsersList && Array.isArray(currentUsersList)) {
        let usersModified = false;
        currentUsersList.forEach(u => {
          const userReceivedRatings = allUserRatings.filter(r => String(r.toUserId) === String(u.id));
          if (userReceivedRatings.length > 0) {
            const sum = userReceivedRatings.reduce((acc, r) => acc + (Number(r.stars) || 0), 0);
            const avg = Math.round((sum / userReceivedRatings.length) * 10) / 10;
            u.rating = avg;
            u.trustRating = avg;
            u.reviewsCount = userReceivedRatings.length;
            u.userRating = { average: avg, totalRatings: userReceivedRatings.length };
            usersModified = true;
          } else if (u.reviewsCount === 0 || u.rating === 5.0 || u.trustRating === 5.0 || !u.userRating) {
            // Unrated user: MUST start with zero rating
            u.rating = 0;
            u.trustRating = 0;
            u.reviewsCount = 0;
            u.userRating = { average: 0, totalRatings: 0 };
            usersModified = true;
          }
        });
        if (usersModified) {
          saveUsers(currentUsersList);
        }
      }

      const storedItems = getFromStorage(STORAGE_KEYS.ITEMS, null);
      if (storedItems && Array.isArray(storedItems)) {
        let itemsModified = false;
        storedItems.forEach(item => {
          const itemReceivedRatings = allItemRatings.filter(r => String(r.itemId) === String(item.id));
          if (itemReceivedRatings.length > 0) {
            const sum = itemReceivedRatings.reduce((acc, r) => acc + (Number(r.stars) || 0), 0);
            const avg = Math.round((sum / itemReceivedRatings.length) * 10) / 10;
            item.itemRating = { average: avg, totalRatings: itemReceivedRatings.length };
            itemsModified = true;
          } else {
            // New or unrated item: MUST start with zero rating
            item.itemRating = { average: 0, totalRatings: 0 };
            itemsModified = true;
          }
        });
        if (itemsModified) {
          saveItems(storedItems);
        }
      }

      // Sync active session user
      const currentSessionUser = getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
      if (currentSessionUser) {
        const freshUsers = getUsers();
        const freshUser = freshUsers.find(u => u.id === currentSessionUser.id);
        if (freshUser) {
          setCurrentUser(freshUser);
        }
      }

      // 6. First time app session setup
      if (!localStorage.getItem('rent_borrow_auth_initialized')) {
        setCurrentUser(DEFAULT_CURRENT_USER);
        localStorage.setItem('rent_borrow_auth_initialized', 'true');
      }

      localStorage.setItem(versionKey, currentVersion);
    }
  } catch (e) {
    console.warn('[storage.js] Storage migration note:', e);
  }
}

/**
 * Initializes localStorage with default seed data if keys don't already exist.
 * Keeps existing user data intact.
 */
function initializeStorage() {
  migrateStorageIfNeeded();
  getUsers();
  getCurrentUser();
  getItems();
  getRentalRequests();
  getRentals();
  getTransactions();
  getRatings();
  getUserRatings();
  getItemRatings();
}

/**
 * Resets all application keys back to factory defaults.
 * Useful for debugging and demos.
 */
function resetStorageToDefaults() {
  saveUsers(DEFAULT_USERS);
  setCurrentUser(DEFAULT_CURRENT_USER);
  saveItems(DEFAULT_ITEMS);
  saveRentalRequests(DEFAULT_RENTAL_REQUESTS);
  saveRentals(DEFAULT_RENTALS);
  saveTransactions(DEFAULT_TRANSACTIONS);
  saveRatings(DEFAULT_RATINGS);
  saveUserRatings(DEFAULT_USER_RATINGS);
  saveItemRatings(DEFAULT_ITEM_RATINGS);
  localStorage.removeItem('rent_borrow_deleted_item_ids');
  localStorage.setItem('rent_borrow_storage_version', 'v9_initial_zero_ratings');
  localStorage.setItem('rent_borrow_auth_initialized', 'true');
  console.log('[storage.js] All data reset to default seed values.');
}

// Attach rating storage helpers to window for global access
window.getUserRatings = getUserRatings;
window.saveUserRatings = saveUserRatings;
window.getItemRatings = getItemRatings;
window.saveItemRatings = saveItemRatings;
window.getUserRatingSummary = getUserRatingSummary;
window.getItemRatingSummary = getItemRatingSummary;
window.submitUserRating = submitUserRating;
window.submitItemRating = submitItemRating;
window.getRentalRatingStatus = getRentalRatingStatus;
window.topupUserCredits = topupUserCredits;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.getCurrentUser = getCurrentUser;
window.setCurrentUser = setCurrentUser;
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.getItems = getItems;
window.saveItems = saveItems;
window.getRentals = getRentals;
window.saveRentals = saveRentals;

// Auto-run initial storage check upon script load
initializeStorage();

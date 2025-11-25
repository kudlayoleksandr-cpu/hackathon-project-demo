/**
 * Mock Data for Demo Mode
 * This file contains all mock data used when running without Supabase/Stripe
 */

import { User, Offer, Order, University, OfferWithUser, UserRole, OfferType, OrderStatus } from './database.types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'sarah.chen@stanford.edu',
    name: 'Sarah Chen',
    role: 'student',
    bio: 'Senior Computer Science student at Stanford. I love helping prospective students navigate the application process and sharing my experience with campus life, research opportunities, and Silicon Valley connections.',
    university: 'Stanford University',
    study_program: 'Computer Science',
    country: 'United States',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'marcus.johnson@mit.edu',
    name: 'Marcus Johnson',
    role: 'student',
    bio: 'PhD candidate in Artificial Intelligence at MIT. Previously worked at Google AI. Happy to share insights about grad school applications, research life, and career paths in AI.',
    university: 'Massachusetts Institute of Technology',
    study_program: 'Artificial Intelligence',
    country: 'United States',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'user-3',
    email: 'emma.wilson@oxford.ac.uk',
    name: 'Emma Wilson',
    role: 'student',
    bio: 'Third-year PPE (Philosophy, Politics, Economics) student at Oxford. I can help with understanding the tutorial system, college life, and what it\'s really like studying at one of the world\'s oldest universities.',
    university: 'University of Oxford',
    study_program: 'Philosophy, Politics, Economics',
    country: 'United Kingdom',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'user-4',
    email: 'kenji.tanaka@ethz.ch',
    name: 'Kenji Tanaka',
    role: 'student',
    bio: 'Master\'s student in Robotics at ETH Zurich. International student from Japan. I can share my experience about studying in Switzerland, the application process for international students, and the amazing research facilities here.',
    university: 'ETH Zurich',
    study_program: 'Robotics',
    country: 'Switzerland',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z',
  },
  {
    id: 'user-5',
    email: 'ana.garcia@harvard.edu',
    name: 'Ana Garcia',
    role: 'student',
    bio: 'Pre-med student at Harvard College. First-generation college student passionate about helping others navigate the Ivy League application process. I focus on financial aid, scholarships, and balancing academics with extracurriculars.',
    university: 'Harvard University',
    study_program: 'Biology (Pre-Med)',
    country: 'United States',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-01-25T10:00:00Z',
  },
  {
    id: 'user-6',
    email: 'lars.eriksson@kth.se',
    name: 'Lars Eriksson',
    role: 'student',
    bio: 'Engineering Physics student at KTH Stockholm. Love the Swedish approach to education - it\'s very collaborative and innovative. Happy to share about student life in Stockholm and the tech startup scene here.',
    university: 'KTH Royal Institute of Technology',
    study_program: 'Engineering Physics',
    country: 'Sweden',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: false,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 'demo-applicant',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'applicant',
    bio: null,
    university: null,
    study_program: null,
    country: 'United States',
    avatar_url: null,
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: false,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'demo-student',
    email: 'student@example.com',
    name: 'Demo Student',
    role: 'student',
    bio: 'Demo student account for testing the platform. Feel free to explore all features!',
    university: 'Stanford University',
    study_program: 'Computer Science',
    country: 'United States',
    avatar_url: null,
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'demo-admin',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    bio: null,
    university: null,
    study_program: null,
    country: null,
    avatar_url: null,
    stripe_customer_id: null,
    stripe_account_id: null,
    is_verified: true,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
  },
]

// Mock Offers
export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    user_id: 'user-1',
    title: 'Complete Guide to Stanford CS Admissions',
    description: 'I\'ll provide a comprehensive written review covering everything you need to know about applying to Stanford\'s Computer Science program. This includes application tips, what admissions looks for, my personal experience, course recommendations, research opportunities, and career prospects. I\'ll also answer any specific questions you have about campus life, housing, and Silicon Valley internships.',
    offer_type: 'written_review',
    price: 2500, // $25.00
    delivery_days: 3,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'offer-2',
    user_id: 'user-1',
    title: '1-on-1 Video Call: Stanford Life & CS Program',
    description: 'Book a 30-minute video call with me to discuss anything about Stanford! We can cover academics, social life, clubs, research, internships, or your specific questions. I\'ll give you honest insights you won\'t find in brochures.',
    offer_type: 'video_call',
    price: 4500, // $45.00
    delivery_days: 5,
    is_active: true,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
  },
  {
    id: 'offer-3',
    user_id: 'user-2',
    title: 'MIT AI/ML PhD Application Strategy',
    description: 'Comprehensive guide to applying for PhD programs in AI/ML at MIT and similar top schools. I\'ll cover: research experience expectations, how to reach out to professors, statement of purpose tips, and what makes an application stand out. Drawing from my own successful application and mentoring experience.',
    offer_type: 'written_review',
    price: 3500, // $35.00
    delivery_days: 5,
    is_active: true,
    created_at: '2024-02-10T10:00:00Z',
    updated_at: '2024-02-10T10:00:00Z',
  },
  {
    id: 'offer-4',
    user_id: 'user-2',
    title: 'Video Consultation: AI Research Career Path',
    description: '45-minute deep-dive video call about pursuing AI research. We\'ll discuss: PhD vs industry research, top labs, publication strategies, and career trajectories. I\'ll share insights from my time at Google AI and MIT.',
    offer_type: 'video_call',
    price: 6000, // $60.00
    delivery_days: 7,
    is_active: true,
    created_at: '2024-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 'offer-5',
    user_id: 'user-3',
    title: 'Oxford PPE: The Complete Guide',
    description: 'Everything about studying PPE at Oxford: the tutorial system, college selection, interview preparation, reading lists, and what a typical week looks like. I\'ll share my personal experience and tips for thriving in Oxford\'s unique academic environment.',
    offer_type: 'written_review',
    price: 2000, // $20.00
    delivery_days: 3,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'offer-6',
    user_id: 'user-3',
    title: 'Mock Oxford Interview Session',
    description: 'Practice your Oxford interview with me! I\'ll simulate the tutorial-style interview, ask challenging questions, and provide detailed feedback on your responses. Perfect for PPE, Economics, or Humanities applicants.',
    offer_type: 'video_call',
    price: 5500, // $55.00
    delivery_days: 5,
    is_active: true,
    created_at: '2024-02-08T10:00:00Z',
    updated_at: '2024-02-08T10:00:00Z',
  },
  {
    id: 'offer-7',
    user_id: 'user-4',
    title: 'ETH Zurich: International Student Guide',
    description: 'A comprehensive guide for international students considering ETH Zurich. Covers: application process, visa requirements, living in Zurich, language considerations, and what makes ETH special for engineering and science.',
    offer_type: 'written_review',
    price: 2500, // $25.00
    delivery_days: 4,
    is_active: true,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z',
  },
  {
    id: 'offer-8',
    user_id: 'user-4',
    title: 'Chat Session: Robotics & Engineering in Europe',
    description: 'Ongoing chat over 3 days where you can ask me anything about studying robotics/engineering in Europe. I\'ll respond within a few hours and we can have a natural conversation about your questions.',
    offer_type: 'chat_session',
    price: 3000, // $30.00
    delivery_days: 3,
    is_active: true,
    created_at: '2024-02-22T10:00:00Z',
    updated_at: '2024-02-22T10:00:00Z',
  },
  {
    id: 'offer-9',
    user_id: 'user-5',
    title: 'Harvard Pre-Med: First-Gen Student Perspective',
    description: 'As a first-generation college student, I know the challenges of navigating elite university applications. I\'ll share my journey, financial aid strategies, and tips for pre-med track success at Harvard.',
    offer_type: 'written_review',
    price: 2000, // $20.00
    delivery_days: 3,
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'offer-10',
    user_id: 'user-5',
    title: 'Financial Aid & Scholarship Strategy Call',
    description: 'Video call focused on maximizing financial aid and finding scholarships. I\'ll share exactly how I funded my Harvard education and strategies that worked for me.',
    offer_type: 'video_call',
    price: 4000, // $40.00
    delivery_days: 5,
    is_active: true,
    created_at: '2024-02-05T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
  },
  {
    id: 'offer-11',
    user_id: 'user-6',
    title: 'Study in Sweden: KTH & Stockholm Guide',
    description: 'Everything about studying engineering in Sweden: free tuition for EU students, English-taught programs, student life in Stockholm, and the innovative Swedish education system.',
    offer_type: 'written_review',
    price: 1500, // $15.00
    delivery_days: 2,
    is_active: true,
    created_at: '2024-02-25T10:00:00Z',
    updated_at: '2024-02-25T10:00:00Z',
  },
  {
    id: 'offer-12',
    user_id: 'user-6',
    title: 'Chat: Nordic Tech & Startup Scene',
    description: 'Casual chat session about the tech and startup ecosystem in Stockholm. Great for those considering Europe for tech careers.',
    offer_type: 'chat_session',
    price: 2000, // $20.00
    delivery_days: 3,
    is_active: true,
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-02-28T10:00:00Z',
  },
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    applicant_id: 'demo-applicant',
    seller_id: 'user-1',
    offer_id: 'offer-1',
    status: 'completed',
    amount: 2500,
    platform_fee: 375,
    seller_amount: 2125,
    stripe_payment_intent_id: 'pi_demo_1',
    stripe_transfer_id: null,
    content: 'Here is your comprehensive guide to Stanford CS admissions...',
    meeting_link: null,
    delivered_at: '2024-02-05T10:00:00Z',
    created_at: '2024-02-03T10:00:00Z',
    updated_at: '2024-02-05T10:00:00Z',
  },
  {
    id: 'order-2',
    applicant_id: 'demo-applicant',
    seller_id: 'user-3',
    offer_id: 'offer-5',
    status: 'delivered',
    amount: 2000,
    platform_fee: 300,
    seller_amount: 1700,
    stripe_payment_intent_id: 'pi_demo_2',
    stripe_transfer_id: null,
    content: 'Welcome to your Oxford PPE guide! Let me start by explaining the tutorial system...',
    meeting_link: null,
    delivered_at: '2024-03-01T10:00:00Z',
    created_at: '2024-02-28T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'order-3',
    applicant_id: 'demo-applicant',
    seller_id: 'user-2',
    offer_id: 'offer-4',
    status: 'paid',
    amount: 6000,
    platform_fee: 900,
    seller_amount: 5100,
    stripe_payment_intent_id: 'pi_demo_3',
    stripe_transfer_id: null,
    content: null,
    meeting_link: null,
    delivered_at: null,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
  },
]

// Mock Universities
export const mockUniversities: University[] = [
  { id: 'uni-1', name: 'Massachusetts Institute of Technology', country: 'United States', city: 'Cambridge', logo_url: null, website: 'https://www.mit.edu', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-2', name: 'Stanford University', country: 'United States', city: 'Stanford', logo_url: null, website: 'https://www.stanford.edu', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-3', name: 'Harvard University', country: 'United States', city: 'Cambridge', logo_url: null, website: 'https://www.harvard.edu', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-4', name: 'University of Oxford', country: 'United Kingdom', city: 'Oxford', logo_url: null, website: 'https://www.ox.ac.uk', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-5', name: 'University of Cambridge', country: 'United Kingdom', city: 'Cambridge', logo_url: null, website: 'https://www.cam.ac.uk', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-6', name: 'ETH Zurich', country: 'Switzerland', city: 'Zurich', logo_url: null, website: 'https://ethz.ch', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-7', name: 'Technical University of Munich', country: 'Germany', city: 'Munich', logo_url: null, website: 'https://www.tum.de', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-8', name: 'University of Toronto', country: 'Canada', city: 'Toronto', logo_url: null, website: 'https://www.utoronto.ca', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-9', name: 'University of Melbourne', country: 'Australia', city: 'Melbourne', logo_url: null, website: 'https://www.unimelb.edu.au', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-10', name: 'National University of Singapore', country: 'Singapore', city: 'Singapore', logo_url: null, website: 'https://www.nus.edu.sg', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-11', name: 'KTH Royal Institute of Technology', country: 'Sweden', city: 'Stockholm', logo_url: null, website: 'https://www.kth.se', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-12', name: 'Delft University of Technology', country: 'Netherlands', city: 'Delft', logo_url: null, website: 'https://www.tudelft.nl', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-13', name: 'University of Tokyo', country: 'Japan', city: 'Tokyo', logo_url: null, website: 'https://www.u-tokyo.ac.jp', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-14', name: 'Tsinghua University', country: 'China', city: 'Beijing', logo_url: null, website: 'https://www.tsinghua.edu.cn', created_at: '2024-01-01T00:00:00Z' },
  { id: 'uni-15', name: 'Vilnius Gediminas Technical University', country: 'Lithuania', city: 'Vilnius', logo_url: null, website: 'https://www.vgtu.lt', created_at: '2024-01-01T00:00:00Z' },
]

// Helper function to get offers with user data
export function getOffersWithUsers(): OfferWithUser[] {
  return mockOffers.map(offer => ({
    ...offer,
    users: mockUsers.find(u => u.id === offer.user_id)!,
  }))
}

// Helper function to get user by ID
export function getUserById(id: string): User | undefined {
  return mockUsers.find(u => u.id === id)
}

// Helper function to get offers by user ID
export function getOffersByUserId(userId: string): OfferWithUser[] {
  return mockOffers
    .filter(o => o.user_id === userId)
    .map(offer => ({
      ...offer,
      users: mockUsers.find(u => u.id === offer.user_id)!,
    }))
}

// Helper function to get orders by user ID (as buyer or seller)
export function getOrdersByUserId(userId: string, role: 'buyer' | 'seller'): Order[] {
  return mockOrders.filter(o => 
    role === 'buyer' ? o.applicant_id === userId : o.seller_id === userId
  )
}


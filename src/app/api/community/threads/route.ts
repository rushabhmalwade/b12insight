import { NextResponse } from 'next/server';
import type { Thread, CreateThreadInput } from '@/models/Thread'; // Import Thread model
import { z } from 'zod';

// --- Dummy Data (Replace with Database Interaction) ---
let dummyThreads: Thread[] = [
    // Re-use existing dummy data structure but ensure it matches the Thread interface
     { id: '1', title: 'Struggling with persistent fatigue despite normal serum B12?', content: 'My serum B12 level is technically "normal" (350 pg/mL) but I feel exhausted all the time. It\'s been going on for months. Has anyone else experienced this? What further tests helped you get answers? My doctor seems hesitant to look further because the number isn\'t below the lab range.', author: { id: 'u1', name: 'Alice Green', avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), category: 'Deficiency Symptoms', tags: ['Fatigue', 'Testing', 'Symptoms', 'Normal Range'], upvotes: 15, downvotes: 1, commentCount: 8, excerpt: 'My serum B12 level is technically "normal" (350 pg/mL) but I feel exhausted all the time...', isPinned: false, isLocked: false },
     { id: '2', title: 'Best Vegan B12 Supplement Brand Recommendations?', content: 'Hi everyone! I\'m looking for a reliable and well-absorbed vegan B12 supplement. There are so many options out there – Cyanocobalamin or Methylcobalamin? Liquid, tablet, or spray? What brands have you had good experiences with and trust for consistency?', author: { id: 'u2', name: 'Bob PlantBased', avatarUrl: 'https://picsum.photos/seed/avatar2/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), category: 'Supplements', tags: ['Vegan', 'Supplements', 'Recommendations', 'Brands'], upvotes: 22, downvotes: 0, commentCount: 12, excerpt: 'Looking for a reliable and well-absorbed vegan B12 supplement. Cyanocobalamin or Methylcobalamin? What brands do you trust?', isPinned: false, isLocked: false },
     { id: '3', title: 'Tips for getting B12 injections covered by insurance?', content: 'My doctor recommended B12 injections for my diagnosed absorption issues, but my insurance initially denied coverage stating it wasn\'t medically necessary despite the diagnosis. Has anyone successfully appealed this? Any tips on navigating the insurance maze or finding affordable options?', author: { id: 'u3', name: 'Charlie Costs' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), category: 'Treatment', tags: ['Injections', 'Insurance', 'Cost', 'Pernicious Anemia'], upvotes: 8, downvotes: 0, commentCount: 5, excerpt: 'My doctor recommended B12 injections for my absorption issues, but my insurance initially denied coverage. Any advice...?', isPinned: false, isLocked: false },
     { id: '4', title: 'Can high-dose oral B12 be as effective as injections for some?', content: 'I have absorption problems (not pernicious anemia, but related to gut surgery). I read a study suggesting high-dose oral B12 (1000mcg+) might work even with absorption issues via passive diffusion in the intestine. Has anyone tried this successfully instead of shots? How did it compare?', author: { id: 'u4', name: 'Diana Dose', avatarUrl: 'https://picsum.photos/seed/avatar4/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), category: 'Treatment', tags: ['Supplements', 'Absorption', 'Research', 'Alternatives'], upvotes: 11, downvotes: 2, commentCount: 7, excerpt: 'I read a study suggesting high-dose oral B12 might work even with absorption problems... Has anyone tried this?', isPinned: false, isLocked: false },
     { id: '5', title: 'Favorite B12-fortified foods that actually taste good?', content: 'Trying to increase my B12 intake through diet as a vegetarian. Besides nutritional yeast (which I like!), what are some genuinely tasty fortified cereals, plant milks, or snacks you regularly include? Bonus points for specific brand names!', author: { id: 'u5', name: 'Eddie Eats', avatarUrl: 'https://picsum.photos/seed/avatar5/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), category: 'Sources', tags: ['Vegetarian', 'Fortified Foods', 'Recipes', 'Taste'], upvotes: 19, downvotes: 1, commentCount: 10, excerpt: 'Besides nutritional yeast, what are some tasty fortified cereals, plant milks, or snacks you regularly include in your diet?', isPinned: false, isLocked: false },
 ];
// ------------------------------------------------------

// Zod schema for validating the request body when creating a thread
const createThreadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  content: z.string().min(10, "Content must be at least 10 characters long."),
  category: z.string().min(1, "Category is required."),
  tags: z.array(z.string()).optional().default([]),
  // In a real app, authorId would come from authentication context
  authorId: z.string().default("temp-user-id"), // Temporary default
});


/**
 * GET handler for fetching community threads.
 * Supports filtering by category and tag, and searching.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - JSON response with threads or error.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const searchTerm = searchParams.get('search');

  // TODO: Replace dummy data filtering with actual database queries
  let filteredThreads = dummyThreads;

  if (category && category !== 'All') {
    filteredThreads = filteredThreads.filter(t => t.category === category);
  }
  if (tag) {
    filteredThreads = filteredThreads.filter(t => t.tags.includes(tag));
  }
  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filteredThreads = filteredThreads.filter(t =>
      t.title.toLowerCase().includes(lowerSearchTerm) ||
      t.content.toLowerCase().includes(lowerSearchTerm) || // Search content too
      t.excerpt?.toLowerCase().includes(lowerSearchTerm) ||
      t.author.name.toLowerCase().includes(lowerSearchTerm) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }

  // TODO: Implement pagination

  return NextResponse.json(filteredThreads);
}

/**
 * POST handler for creating a new community thread.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - JSON response with the created thread or error.
 */
export async function POST(request: Request) {
  // TODO: Implement user authentication check here. Only logged-in users should post.

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const validation = createThreadSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: 'Validation failed', errors: validation.error.errors }, { status: 400 });
  }

  const inputData: CreateThreadInput = validation.data;

  // TODO: Replace with database insertion logic
  // Fetch author details based on inputData.authorId (placeholder for now)
  const authorDetails = { id: inputData.authorId, name: 'Temporary User', avatarUrl: undefined };

  const newThread: Thread = {
    id: `t${Date.now()}`, // Generate a simple unique ID (replace with proper UUID in DB)
    title: inputData.title,
    content: inputData.content,
    author: authorDetails,
    createdAt: new Date(),
    category: inputData.category,
    tags: inputData.tags || [],
    upvotes: 0,
    downvotes: 0,
    commentCount: 0,
    excerpt: inputData.content.substring(0, 150) + (inputData.content.length > 150 ? '...' : ''), // Auto-generate excerpt
  };

  dummyThreads.unshift(newThread); // Add to the beginning of the list (simulate DB add)

  return NextResponse.json(newThread, { status: 201 }); // Return the created thread
}

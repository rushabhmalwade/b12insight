import { NextResponse } from 'next/server';
import type { Thread, UpdateThreadInput } from '@/models/Thread'; // Import Thread model
import { z } from 'zod';

// --- Dummy Data Access (Replace with Database Interaction) ---
let dummyThreads: Thread[] = [
    // Assume dummyThreads array is populated similarly to the threads/route.ts file
    // This is just for demonstration and should be replaced by a database lookup
     { id: '1', title: 'Struggling with persistent fatigue despite normal serum B12?', content: 'My serum B12 level is technically "normal" (350 pg/mL) but I feel exhausted all the time...', author: { id: 'u1', name: 'Alice Green', avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), category: 'Deficiency Symptoms', tags: ['Fatigue', 'Testing', 'Symptoms', 'Normal Range'], upvotes: 15, downvotes: 1, commentCount: 8, excerpt: 'My serum B12 level is technically "normal" (350 pg/mL) but I feel exhausted all the time...', isPinned: false, isLocked: false },
     // ... add other dummy threads if needed for testing ...
 ];

const findThreadById = (id: string): Thread | undefined => {
    return dummyThreads.find(t => t.id === id);
};

const updateThreadById = (id: string, data: UpdateThreadInput): Thread | null => {
    const index = dummyThreads.findIndex(t => t.id === id);
    if (index === -1) return null;
    const updatedThread = { ...dummyThreads[index], ...data, updatedAt: new Date() };
    dummyThreads[index] = updatedThread;
    return updatedThread;
};

const deleteThreadById = (id: string): boolean => {
    const initialLength = dummyThreads.length;
    dummyThreads = dummyThreads.filter(t => t.id !== id);
    return dummyThreads.length < initialLength;
};
// ------------------------------------------------------------

// Zod schema for validating update data
const updateThreadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").optional(),
  content: z.string().min(10, "Content must be at least 10 characters long.").optional(),
  category: z.string().min(1, "Category is required.").optional(),
  tags: z.array(z.string()).optional(),
}).strict(); // Ensure no extra fields are passed


/**
 * GET handler for fetching a single community thread by ID.
 * @param {Request} _request - The incoming request object (unused).
 * @param {{ params: { threadId: string } }} context - Route parameters.
 * @returns {NextResponse} - JSON response with the thread or 404 error.
 */
export async function GET(_request: Request, { params }: { params: { threadId: string } }) {
  const { threadId } = params;

  // TODO: Replace with database lookup
  const thread = findThreadById(threadId);

  if (!thread) {
    return NextResponse.json({ message: 'Thread not found.' }, { status: 404 });
  }

  return NextResponse.json(thread);
}

/**
 * PATCH handler for updating a community thread by ID.
 * @param {Request} request - The incoming request object.
 * @param {{ params: { threadId: string } }} context - Route parameters.
 * @returns {NextResponse} - JSON response with the updated thread or error.
 */
export async function PATCH(request: Request, { params }: { params: { threadId: string } }) {
  const { threadId } = params;

  // TODO: Implement authentication and authorization (only author or mods can update)

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const validation = updateThreadSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: 'Validation failed', errors: validation.error.errors }, { status: 400 });
  }

  const updateData: UpdateThreadInput = validation.data;

  // Prevent updating with empty data
  if (Object.keys(updateData).length === 0) {
       return NextResponse.json({ message: 'No update data provided.' }, { status: 400 });
  }

  // TODO: Replace with database update logic
  const updatedThread = updateThreadById(threadId, updateData);

  if (!updatedThread) {
    return NextResponse.json({ message: 'Thread not found.' }, { status: 404 });
  }

  return NextResponse.json(updatedThread);
}

/**
 * DELETE handler for deleting a community thread by ID.
 * @param {Request} _request - The incoming request object (unused).
 * @param {{ params: { threadId: string } }} context - Route parameters.
 * @returns {NextResponse} - Success response or error.
 */
export async function DELETE(_request: Request, { params }: { params: { threadId: string } }) {
  const { threadId } = params;

  // TODO: Implement authentication and authorization (only author or mods can delete)

  // TODO: Replace with database deletion logic
  const deleted = deleteThreadById(threadId);

  if (!deleted) {
    return NextResponse.json({ message: 'Thread not found.' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Thread deleted successfully.' }, { status: 200 });
}

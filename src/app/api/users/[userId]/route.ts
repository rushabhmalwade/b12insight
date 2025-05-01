import { NextResponse } from 'next/server';
import type { UserProfile, UpdateUserProfileInput } from '@/models/User'; // Import User model
import { z } from 'zod';

// --- Dummy Data Access (Replace with Database Interaction) ---
let dummyUsers: UserProfile[] = [
    { id: 'user123', name: 'Sample User', email: 'user@example.com', joinedDate: new Date(), roles: ['member'], bio: 'Initial bio.' },
    { id: 'u1', name: 'Alice Green', email: 'alice@example.com', joinedDate: new Date(), roles: ['member'], avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' },
    { id: 'u2', name: 'Bob PlantBased', email: 'bob@example.com', joinedDate: new Date(), roles: ['member'], diet: 'Vegan', avatarUrl: 'https://picsum.photos/seed/avatar2/40/40' },
    // ... potentially more users
];

const findUserById = (id: string): UserProfile | undefined => {
    return dummyUsers.find(u => u.id === id);
};

const updateUserById = (id: string, data: UpdateUserProfileInput): UserProfile | null => {
    const index = dummyUsers.findIndex(u => u.id === id);
    if (index === -1) return null;
    // Merge only allowed fields from UpdateUserProfileInput
    const allowedUpdates = Object.keys(data).reduce((acc, key) => {
        if (['name', 'avatarUrl', 'bio', 'diet', 'interests'].includes(key)) {
            acc[key as keyof UpdateUserProfileInput] = data[key as keyof UpdateUserProfileInput];
        }
        return acc;
    }, {} as UpdateUserProfileInput);

    const updatedUser = { ...dummyUsers[index], ...allowedUpdates };
    dummyUsers[index] = updatedUser;
    return updatedUser;
};

const deleteUserById = (id: string): boolean => {
    const initialLength = dummyUsers.length;
    dummyUsers = dummyUsers.filter(u => u.id !== id);
    return dummyUsers.length < initialLength;
};
// ------------------------------------------------------------

// Zod schema for validating profile update data
const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  avatarUrl: z.string().url("Invalid URL format for avatar.").optional().or(z.literal('')), // Allow empty string to clear avatar
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  diet: z.enum(['Vegan', 'Vegetarian', 'Omnivore', 'Pescatarian', 'Other']).nullable().optional(),
  interests: z.array(z.string()).optional(),
}).strict(); // Ensure no extra fields are passed

/**
 * GET handler for fetching a single user profile by ID.
 * @param {Request} _request - The incoming request object (unused).
 * @param {{ params: { userId: string } }} context - Route parameters.
 * @returns {NextResponse} - JSON response with the user profile or 404 error.
 */
export async function GET(_request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  // TODO: Replace with database lookup
  const user = findUserById(userId);

  if (!user) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 });
  }

  // Omit sensitive data before returning
  const { /* passwordHash, */ ...userToReturn } = user;

  return NextResponse.json(userToReturn);
}

/**
 * PATCH handler for updating a user profile by ID.
 * @param {Request} request - The incoming request object.
 * @param {{ params: { userId: string } }} context - Route parameters.
 * @returns {NextResponse} - JSON response with the updated profile or error.
 */
export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  // TODO: Implement authentication and authorization (user can only update their own profile, or admin)
  // Example: Check if authenticated user ID matches userId

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const validation = updateUserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: 'Validation failed', errors: validation.error.errors }, { status: 400 });
  }

  const updateData: UpdateUserProfileInput = validation.data;

  // Prevent updating with empty data
   if (Object.keys(updateData).length === 0) {
       return NextResponse.json({ message: 'No update data provided.' }, { status: 400 });
   }

  // TODO: Replace with database update logic
  const updatedUser = updateUserById(userId, updateData);

  if (!updatedUser) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 });
  }

  // Omit sensitive data before returning
  const { /* passwordHash, */ ...userToReturn } = updatedUser;

  return NextResponse.json(userToReturn);
}

/**
 * DELETE handler for deleting a user profile by ID.
 * @param {Request} _request - The incoming request object (unused).
 * @param {{ params: { userId: string } }} context - Route parameters.
 * @returns {NextResponse} - Success response or error.
 */
export async function DELETE(_request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  // TODO: Implement authentication and authorization (user can delete own account, or admin)

  // TODO: Replace with database deletion logic
  const deleted = deleteUserById(userId);

  if (!deleted) {
    return NextResponse.json({ message: 'User not found.' }, { status: 404 });
  }

  // TODO: Consider related data cleanup (e.g., anonymize posts?)

  return NextResponse.json({ message: 'User deleted successfully.' }, { status: 200 });
}

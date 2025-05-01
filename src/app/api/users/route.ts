import { NextResponse } from 'next/server';
import type { UserProfile, UserSignupInput } from '@/models/User'; // Import User model
import { z } from 'zod';

// --- Dummy Data (Replace with Database Interaction) ---
let dummyUsers: UserProfile[] = [
    { id: 'user123', name: 'Sample User', email: 'user@example.com', joinedDate: new Date(), roles: ['member'] },
    { id: 'u1', name: 'Alice Green', email: 'alice@example.com', joinedDate: new Date(), roles: ['member'], avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' },
    { id: 'u2', name: 'Bob PlantBased', email: 'bob@example.com', joinedDate: new Date(), roles: ['member'], diet: 'Vegan', avatarUrl: 'https://picsum.photos/seed/avatar2/40/40' },
];

const findUserByEmail = (email: string): UserProfile | undefined => {
    return dummyUsers.find(u => u.email === email);
}
// ------------------------------------------------------

// Zod schema for validating the request body during signup
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

/**
 * POST handler for user signup.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - JSON response with the created user (excluding sensitive info) or error.
 */
export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const validation = signupSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: 'Validation failed', errors: validation.error.errors }, { status: 400 });
  }

  const signupData: UserSignupInput = validation.data;

  // --- TODO: Replace with Database Interaction ---
  // 1. Check if email already exists
  if (findUserByEmail(signupData.email)) {
    return NextResponse.json({ message: 'Email already in use.' }, { status: 409 }); // Conflict
  }

  // 2. Hash the password securely (e.g., using bcrypt)
  // const hashedPassword = await hashPassword(signupData.password); // Replace with actual hashing

  // 3. Create the new user object
  const newUser: UserProfile = {
    id: `u${Date.now()}`, // Simple unique ID (use UUID in DB)
    name: signupData.name,
    email: signupData.email,
    // passwordHash: hashedPassword, // Store hash, not plain password
    joinedDate: new Date(),
    roles: ['member'], // Default role
    // Initialize other fields as needed
  };

  // 4. Save the user to the database
  dummyUsers.push(newUser);
  // --- End Database Interaction Replacement ---

  // Return the created user profile (omit sensitive data like password hash)
  const { /* passwordHash, */ ...userToReturn } = newUser; // Destructure to omit passwordHash

  return NextResponse.json(userToReturn, { status: 201 });
}

/**
 * GET handler (Optional - might not be needed publicly)
 * Typically you wouldn't list all users. Maybe fetch based on ID or search.
 * For now, returning a simple message.
 */
export async function GET() {
    // TODO: Add authentication/authorization if this endpoint is needed
    return NextResponse.json({ message: 'Listing all users is not implemented.' }, { status: 405 }); // Method Not Allowed
}

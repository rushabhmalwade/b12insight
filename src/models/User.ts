/**
 * @fileOverview Defines the data structure for a user profile.
 */

/**
 * Represents a user profile within the application.
 */
export interface UserProfile {
  /** Unique identifier for the user. */
  id: string;
  /** The user's display name. */
  name: string;
  /** The user's email address (should be unique). */
  email: string;
  /** URL of the user's avatar image (optional). */
  avatarUrl?: string;
  /** A short biography or description provided by the user (optional). */
  bio?: string;
  /** Timestamp when the user account was created/joined. */
  joinedDate: Date;
  /** User's dietary preference (optional). */
  diet?: 'Vegan' | 'Vegetarian' | 'Omnivore' | 'Pescatarian' | 'Other' | null;
  /** User-defined interests related to B12 or health (optional). */
  interests?: string[];
  /** Roles assigned to the user (e.g., 'member', 'moderator', 'admin'). */
  roles?: string[];
  // Add other relevant profile fields as needed
}

/**
 * Represents the data needed for user signup.
 * Excludes fields generated automatically or set later.
 */
export type UserSignupInput = Pick<UserProfile, 'name' | 'email'> & {
  password?: string; // Include password for email/pass signup
};

/**
 * Represents the data allowed for updating a user profile.
 * Only allows specific fields to be updated by the user.
 */
export type UpdateUserProfileInput = Partial<Pick<UserProfile, 'name' | 'avatarUrl' | 'bio' | 'diet' | 'interests'>>;

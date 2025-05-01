/**
 * @fileOverview Defines the data structure for a community forum thread.
 */

import type { UserProfile } from './User'; // Assuming User model exists

/**
 * Represents a single thread/post in the community forum.
 */
export interface Thread {
  /** Unique identifier for the thread. */
  id: string;
  /** The title of the thread. */
  title: string;
  /** The main content/body of the thread post. */
  content: string; // Added content field
  /** The user who created the thread. */
  author: Pick<UserProfile, 'id' | 'name' | 'avatarUrl'>; // Reference simplified author info
  /** Timestamp when the thread was created. */
  createdAt: Date;
  /** Timestamp when the thread was last updated. */
  updatedAt?: Date; // Optional last update timestamp
  /** The category the thread belongs to (e.g., Symptoms, Supplements). */
  category: string;
  /** Tags associated with the thread for filtering/searching. */
  tags: string[];
  /** Number of upvotes the thread has received. */
  upvotes: number;
  /** Number of downvotes the thread has received. */
  downvotes: number;
  /** Number of comments on the thread. */
  commentCount: number;
  /** A short excerpt or summary of the content (optional, can be generated). */
  excerpt?: string;
  /** Flag indicating if the thread is pinned or featured. */
  isPinned?: boolean;
  /** Flag indicating if the thread is locked (no new comments). */
  isLocked?: boolean;
  // Potentially add view count, last comment info etc. later
}

/**
 * Represents the data needed to create a new thread.
 */
export type CreateThreadInput = Omit<Thread, 'id' | 'author' | 'createdAt' | 'updatedAt' | 'upvotes' | 'downvotes' | 'commentCount' | 'isPinned' | 'isLocked' | 'excerpt'> & {
  authorId: string; // Require authorId when creating
};

/**
 * Represents the data allowed for updating a thread.
 */
export type UpdateThreadInput = Partial<Pick<Thread, 'title' | 'content' | 'category' | 'tags'>>; // Define what can be updated

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, MessageSquare, Search, Flag, PlusCircle, Filter, XCircle, Loader2, AlertCircle } from 'lucide-react'; // Updated icons
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import type { Thread } from '@/models/Thread'; // Import Thread model
import { useAuth } from '@/hooks/useAuth.tsx'; // Import useAuth

// --- Helper Functions ---
const getInitials = (name?: string): string => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '?';
    return (names[0][0]?.toUpperCase() || '') + (names[names.length - 1][0]?.toUpperCase() || '');
}

// --- Main Component ---
export default function CommunityPage() {
    const { toast } = useToast();
    const { user, isLoading: authLoading } = useAuth(); // Get auth status

    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [availableCategories, setAvailableCategories] = useState<string[]>(['All']);
    const [allTags, setAllTags] = useState<string[]>([]);

    // Fetch threads from API
    const fetchThreads = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') queryParams.set('category', selectedCategory);
        if (selectedTag) queryParams.set('tag', selectedTag);
        if (searchTerm) queryParams.set('search', searchTerm);

        try {
            // TODO: Update API endpoint if needed
            const response = await fetch(`/api/community/threads?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch threads: ${response.statusText}`);
            }
            const data: Thread[] = await response.json();

             // Ensure createdAt is a Date object
             const processedData = data.map(thread => ({
                 ...thread,
                 createdAt: new Date(thread.createdAt), // Convert string timestamp to Date
             }));

            setThreads(processedData);

            // Extract unique categories and tags from fetched data (only if needed - could be static or fetched separately)
            const categories = ['All', ...Array.from(new Set(processedData.map(t => t.category)))].sort();
            const tags = Array.from(new Set(processedData.flatMap(t => t.tags))).sort();
            setAvailableCategories(categories);
            setAllTags(tags);

        } catch (err) {
            console.error("Error fetching threads:", err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setThreads([]); // Clear threads on error
            toast({
                title: "Error Loading Threads",
                description: err instanceof Error ? err.message : "Could not load community threads.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategory, selectedTag, searchTerm, toast]); // Add dependencies

    // Fetch threads on initial load and when filters change
    useEffect(() => {
        fetchThreads();
    }, [fetchThreads]); // fetchThreads includes all necessary dependencies

    // Placeholder actions - Update to interact with API
    const handleVote = async (id: string, type: 'up' | 'down') => {
        // TODO: Implement API call to /api/community/threads/{id}/vote (or similar)
        console.log(`Voting ${type} on thread ${id}`);

        // Optimistic UI update (example) - revert on API error
        setThreads(prevThreads =>
            prevThreads.map(t => {
                if (t.id === id) {
                    // Basic simulation: only allow one vote type change
                    const currentUpvotes = t.upvotes || 0;
                    const currentDownvotes = t.downvotes || 0;
                    // This simulation is basic and doesn't track user's previous vote
                    if (type === 'up') {
                        return { ...t, upvotes: currentUpvotes + 1, downvotes: currentDownvotes };
                    } else {
                        return { ...t, downvotes: currentDownvotes + 1, upvotes: currentUpvotes };
                    }
                }
                return t;
            })
        );
        toast({ title: `Voted ${type} on thread ${id} (simulated)` });
         // In real app: await fetch(...); handle success/error & revert UI if needed
    };

    const handleReport = async (id: string) => {
        // TODO: Implement API call to /api/community/threads/{id}/report
        console.log(`Reporting thread ${id}`);
        toast({
            title: "Thread Reported (Simulated)",
            description: `Thank you for reporting thread ${id}. Our moderators will review it.`,
            variant: "default"
        });
        // In real app: await fetch(...); handle success/error
    };

    const handleCreatePost = () => {
        // TODO: Navigate to a dedicated /community/new page or open a modal form
        if (!user && !authLoading) {
             toast({
                 title: "Login Required",
                 description: "You must be logged in to create a post.",
                 variant: "destructive",
             });
             // Optionally redirect to login: router.push('/login?redirect=/community');
             return;
         }
        toast({
            title: "Create New Post",
            description: "Navigate to post creation page (functionality coming soon!).",
        });
        // Example navigation (uncomment when ready):
        // router.push('/community/new');
    }

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 space-y-12 md:space-y-16 font-inter">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
                B12 Insight Community Forum
            </h1>

            {/* Controls: Search, Filters, New Post */}
            <Card className="shadow-lg rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in p-4 md:p-6" style={{ animationDelay: '0.1s' }}>
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex-grow w-full md:w-auto md:max-w-sm">
                        <Input
                            type="search"
                            placeholder="Search topics, tags, or authors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                             // Consider adding onKeyDown for Enter key submission if desired
                            className="pl-10 h-11 text-base border-border/60 focus:border-primary shadow-sm"
                            aria-label="Search forum threads"
                        />
                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        {searchTerm && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                                onClick={() => setSearchTerm('')}
                                aria-label="Clear search"
                            >
                                <XCircle className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </Button>
                        )}
                    </div>
                     {/* New Post Button */}
                     <Button onClick={handleCreatePost} size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow" disabled={authLoading}>
                        <PlusCircle className="w-5 h-5 mr-2"/> Create New Post
                     </Button>
                </div>

                {/* Category Filters */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5"><Filter className="w-4 h-4"/> Filter by Category:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {availableCategories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "rounded-full transition-all h-8 px-3 text-xs shadow-sm hover:shadow",
                                    selectedCategory === category && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                 {/* Tag Filters */}
                 <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5"><Filter className="w-4 h-4"/> Filter by Tag:</h3>
                     <div className="flex gap-1.5 flex-wrap">
                        <Button
                            variant={selectedTag === null ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                "rounded-full transition-all h-7 px-2.5 text-xs shadow-sm hover:shadow",
                                selectedTag === null && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow"
                            )}
                        >
                            All Tags
                        </Button>
                         {allTags.map(tag => (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedTag(tag)}
                                className={cn(
                                    "rounded-full transition-all h-7 px-2.5 text-xs shadow-sm hover:shadow",
                                    selectedTag === tag && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow"
                                )}
                            >
                                #{tag}
                            </Button>
                         ))}
                     </div>
                 </div>
            </Card>

            {/* Thread List Section */}
            <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {isLoading ? (
                    // Loading Skeletons
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                             <Card key={i} className="shadow-md rounded-xl border border-border/50 bg-card/95 p-4 md:p-5 flex gap-4">
                                 <div className="flex flex-col items-center w-16 flex-shrink-0 space-y-1">
                                     <Skeleton className="h-6 w-6 rounded-full" />
                                     <Skeleton className="h-5 w-8" />
                                     <Skeleton className="h-6 w-6 rounded-full" />
                                 </div>
                                 <div className="flex-grow space-y-3">
                                     <div className="flex gap-2">
                                         <Skeleton className="h-5 w-24 rounded-full" />
                                         <Skeleton className="h-5 w-16 rounded-full" />
                                     </div>
                                     <Skeleton className="h-6 w-3/4" />
                                     <Skeleton className="h-4 w-full" />
                                     <Skeleton className="h-4 w-5/6" />
                                     <div className="flex justify-between items-center pt-2">
                                         <Skeleton className="h-5 w-40" />
                                         <Skeleton className="h-5 w-20" />
                                     </div>
                                 </div>
                             </Card>
                        ))}
                    </div>
                 ) : error ? (
                    // Error Message
                     <Card className="shadow-md rounded-xl border-destructive/50 bg-destructive/10 text-center p-8">
                         <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
                         <CardTitle className="text-destructive text-xl mb-2">Failed to Load Threads</CardTitle>
                         <CardDescription className="text-destructive/80">{error}</CardDescription>
                         <Button onClick={fetchThreads} variant="destructive" className="mt-6">Try Again</Button>
                     </Card>
                 ) : threads.length > 0 ? (
                    // Display Threads
                    threads.map(thread => (
                        <Card key={thread.id} className="shadow-md hover:shadow-xl transition-shadow rounded-xl border border-border/50 bg-card/95">
                            <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row gap-4">
                                {/* Voting Section */}
                                <div className="flex sm:flex-col items-center justify-start sm:justify-center gap-1 sm:gap-0.5 sm:w-16 flex-shrink-0 text-center border-b sm:border-b-0 sm:border-r pb-3 sm:pb-0 sm:pr-4 border-border/30">
                                     <Button variant="ghost" size="sm" className="h-7 w-7 p-0 group hover:bg-green-100 dark:hover:bg-green-900/50 disabled:opacity-50" onClick={() => handleVote(thread.id, 'up')} aria-label="Upvote" disabled={!user}>
                                        <ThumbsUp className="w-4 h-4 text-muted-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                                    </Button>
                                    <span className="font-bold text-sm w-8 text-center">{thread.upvotes - thread.downvotes}</span>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 group hover:bg-red-100 dark:hover:bg-red-900/50 disabled:opacity-50" onClick={() => handleVote(thread.id, 'down')} aria-label="Downvote" disabled={!user}>
                                        <ThumbsDown className="w-4 h-4 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                                    </Button>
                                </div>

                                {/* Main Thread Content */}
                                <div className="flex-grow">
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        <Badge variant="outline" className="text-xs font-medium rounded-full px-2 py-0.5 border-primary/40 text-primary/90 bg-primary/5 cursor-pointer hover:bg-primary/10" onClick={() => setSelectedCategory(thread.category)}>
                                           {thread.category}
                                        </Badge>
                                         {thread.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-2 py-0.5 bg-secondary/70 dark:bg-secondary/50 cursor-pointer hover:bg-secondary" onClick={() => setSelectedTag(tag)}>
                                               #{tag}
                                            </Badge>
                                         ))}
                                    </div>
                                    <h2 className="text-lg md:text-xl font-semibold mb-1.5 hover:text-primary transition-colors">
                                        {/* Link to future thread detail page */}
                                        <Link href={`/community/thread/${thread.id}`} className="focus:outline-none">
                                             <span className="absolute inset-0" aria-hidden="true"></span>
                                            {thread.title}
                                        </Link>
                                    </h2>
                                     <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{thread.excerpt || thread.content.substring(0, 150)}</p> {/* Use excerpt or generate */}
                                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={thread.author.avatarUrl} alt={thread.author.name} />
                                                <AvatarFallback className="text-[10px]">{getInitials(thread.author.name)}</AvatarFallback>
                                            </Avatar>
                                            {/* Link to future profile page */}
                                            <Link href={`/profile/${thread.author.id}`} className="hover:underline font-medium relative z-10">{thread.author.name}</Link>
                                             <span>·</span>
                                            <time dateTime={thread.createdAt.toISOString()}>
                                                {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                                            </time>
                                        </div>
                                         <div className="flex items-center gap-3">
                                             <span className="flex items-center gap-1">
                                                 <MessageSquare className="w-3.5 h-3.5" /> {thread.commentCount} comments
                                             </span>
                                             <Button variant="ghost" size="sm" className="h-6 px-1.5 text-muted-foreground hover:text-destructive relative z-10 disabled:opacity-50" onClick={(e) => { e.stopPropagation(); handleReport(thread.id); }} aria-label="Report post" disabled={!user}>
                                                 <Flag className="w-3.5 h-3.5" />
                                             </Button>
                                         </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                     <p className="text-center text-muted-foreground mt-12 text-lg bg-muted/50 py-8 rounded-lg">
                         No threads found matching your criteria. Try broadening your search or filters.
                     </p>
                )}
            </section>

             {/* Placeholder for pagination or load more */}
             {/* TODO: Implement proper pagination based on API response */}
             {/* <div className="mt-12 text-center">
                 <Button variant="outline" size="lg" disabled>Load More Threads (Coming Soon)</Button>
             </div> */}

             {/* Note on Future Features */}
            <Card className="mt-16 border-2 border-dashed border-blue-500/50 bg-blue-50/30 dark:bg-blue-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-3">
                        <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-blue-700 dark:text-blue-400">More Features Coming Soon!</h3>
                            <p className="text-sm text-blue-800/90 dark:text-blue-300/90 mt-1">
                                We're actively working on adding detailed thread pages with reply functionality, user profiles, post formatting (Markdown/WYSIWYG), and more robust moderation tools. Your feedback is welcome!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

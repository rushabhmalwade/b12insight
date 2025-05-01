'use client';

import React, { useState, useMemo } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Search, ThumbsDown, ThumbsUp, Flag, PlusCircle, Filter, XCircle } from 'lucide-react'; // Added icons
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.

interface Author {
    id: string;
    name: string;
    avatarUrl?: string; // Optional avatar URL
}

interface Thread {
    id: string;
    title: string;
    author: Author;
    createdAt: Date;
    category: string;
    tags: string[];
    excerpt: string;
    upvotes: number;
    downvotes: number;
    commentCount: number;
}

// Dummy Data - Replace with actual data fetching
const dummyThreads: Thread[] = [
    { id: '1', title: 'Struggling with persistent fatigue despite normal serum B12?', author: { id: 'u1', name: 'Alice Green', avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), category: 'Deficiency Symptoms', tags: ['Fatigue', 'Testing', 'Symptoms'], excerpt: 'My serum B12 level is technically "normal" (350 pg/mL) but I feel exhausted all the time. Anyone else experience this? What further tests helped?', upvotes: 15, downvotes: 1, commentCount: 8 },
    { id: '2', title: 'Best Vegan B12 Supplement Brand Recommendations?', author: { id: 'u2', name: 'Bob PlantBased', avatarUrl: 'https://picsum.photos/seed/avatar2/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), category: 'Supplements', tags: ['Vegan', 'Supplements', 'Recommendations'], excerpt: 'Looking for a reliable and well-absorbed vegan B12 supplement. Cyanocobalamin or Methylcobalamin? What brands do you trust?', upvotes: 22, downvotes: 0, commentCount: 12 },
    { id: '3', title: 'Tips for getting B12 injections covered by insurance?', author: { id: 'u3', name: 'Charlie Costs' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), category: 'Treatment', tags: ['Injections', 'Insurance', 'Cost'], excerpt: 'My doctor recommended B12 injections for my absorption issues, but my insurance initially denied coverage. Any advice on navigating appeals or finding affordable options?', upvotes: 8, downvotes: 0, commentCount: 5 },
    { id: '4', title: 'Can high-dose oral B12 be as effective as injections for some?', author: { id: 'u4', name: 'Diana Dose', avatarUrl: 'https://picsum.photos/seed/avatar4/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), category: 'Treatment', tags: ['Supplements', 'Absorption', 'Research'], excerpt: 'I read a study suggesting high-dose oral B12 might work even with absorption problems via passive diffusion. Has anyone tried this successfully instead of shots?', upvotes: 11, downvotes: 2, commentCount: 7 },
    { id: '5', title: 'Favorite B12-fortified foods that actually taste good?', author: { id: 'u5', name: 'Eddie Eats', avatarUrl: 'https://picsum.photos/seed/avatar5/40/40' }, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), category: 'Sources', tags: ['Vegan', 'Fortified Foods', 'Recipes'], excerpt: 'Besides nutritional yeast, what are some tasty fortified cereals, plant milks, or snacks you regularly include in your diet?', upvotes: 19, downvotes: 1, commentCount: 10 },
];

const dummyCategories: string[] = ['All', 'Deficiency Symptoms', 'Supplements', 'Treatment', 'Sources', 'Testing', 'Vegan/Vegetarian'];
const allTags = Array.from(new Set(dummyThreads.flatMap(t => t.tags))).sort();

// --- Helper Functions ---
const getInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '?';
    return (names[0][0]?.toUpperCase() || '') + (names[names.length - 1][0]?.toUpperCase() || '');
}

// --- Main Component ---
export default function CommunityPage() {
    const { toast } = useToast();
    const [threads, setThreads] = useState<Thread[]>(dummyThreads);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Client-side filtering logic
    const filteredThreads = useMemo(() => {
        return threads.filter(thread => {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm ||
                thread.title.toLowerCase().includes(lowerSearchTerm) ||
                thread.excerpt.toLowerCase().includes(lowerSearchTerm) ||
                thread.author.name.toLowerCase().includes(lowerSearchTerm) ||
                thread.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));

            const matchesCategory = selectedCategory === 'All' || thread.category === selectedCategory;

            const matchesTag = !selectedTag || thread.tags.includes(selectedTag);

            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [threads, searchTerm, selectedCategory, selectedTag]);

    // Placeholder actions
    const handleVote = (id: string, type: 'up' | 'down') => {
        // In a real app, this would send a request to the backend
        setThreads(prevThreads =>
            prevThreads.map(t => {
                if (t.id === id) {
                    // Basic simulation: only allow one vote type change
                    const currentUpvotes = t.upvotes;
                    const currentDownvotes = t.downvotes;
                    if (type === 'up') {
                        return { ...t, upvotes: currentUpvotes + 1, downvotes: Math.max(0, currentDownvotes - (currentDownvotes > 0 ? 1 : 0)) }; // Crude simulation
                    } else {
                        return { ...t, downvotes: currentDownvotes + 1, upvotes: Math.max(0, currentUpvotes - (currentUpvotes > 0 ? 1 : 0)) }; // Crude simulation
                    }
                }
                return t;
            })
        );
        toast({ title: `Voted ${type} on thread ${id}` });
    };

    const handleReport = (id: string) => {
        // In a real app, this would send a report request to the backend
        toast({
            title: "Thread Reported",
            description: `Thank you for reporting thread ${id}. Our moderators will review it.`,
            variant: "default"
        });
    };

    const handleCreatePost = () => {
         // In a real app, this would navigate to a new post page or open a modal
        toast({
            title: "Create New Post",
            description: "Post creation functionality is coming soon!",
        });
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
                            className="pl-10 h-11 text-base border-border/60 focus:border-primary"
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
                     <Button onClick={handleCreatePost} size="lg" className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow">
                        <PlusCircle className="w-5 h-5 mr-2"/> Create New Post
                     </Button>
                </div>

                {/* Category Filters */}
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5"><Filter className="w-4 h-4"/> Filter by Category:</h3>
                    <div className="flex gap-2 flex-wrap">
                        {dummyCategories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={cn(
                                    "rounded-full transition-all h-8 px-3 text-xs",
                                    selectedCategory === category && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
                 {/* Tag Filters (Optional - could be combined or separate) */}
                 <div className="mt-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1.5"><Filter className="w-4 h-4"/> Filter by Tag:</h3>
                     <div className="flex gap-1.5 flex-wrap">
                        <Button
                            variant={selectedTag === null ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                "rounded-full transition-all h-7 px-2.5 text-xs",
                                selectedTag === null && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
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
                                    "rounded-full transition-all h-7 px-2.5 text-xs",
                                    selectedTag === tag && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                )}
                            >
                                #{tag}
                            </Button>
                         ))}
                     </div>
                 </div>
            </Card>

            {/* Thread List */}
            <section className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {filteredThreads.length > 0 ? (
                    filteredThreads.map(thread => (
                        <Card key={thread.id} className="shadow-md hover:shadow-lg transition-shadow rounded-xl border border-border/50 bg-card/95">
                            <CardContent className="p-4 md:p-5 flex flex-col sm:flex-row gap-4">
                                {/* Voting Section */}
                                <div className="flex sm:flex-col items-center justify-start sm:justify-center gap-1 sm:gap-0.5 sm:w-16 flex-shrink-0 text-center border-b sm:border-b-0 sm:border-r pb-3 sm:pb-0 sm:pr-4 border-border/30">
                                     <Button variant="ghost" size="sm" className="h-7 w-7 p-0 group hover:bg-green-100 dark:hover:bg-green-900/50" onClick={() => handleVote(thread.id, 'up')} aria-label="Upvote">
                                        <ThumbsUp className="w-4 h-4 text-muted-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                                    </Button>
                                    <span className="font-bold text-sm w-8 text-center">{thread.upvotes - thread.downvotes}</span>
                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 group hover:bg-red-100 dark:hover:bg-red-900/50" onClick={() => handleVote(thread.id, 'down')} aria-label="Downvote">
                                        <ThumbsDown className="w-4 h-4 text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                                    </Button>
                                </div>

                                {/* Main Thread Content */}
                                <div className="flex-grow">
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        <Badge variant="outline" className="text-xs font-medium rounded-full px-2 py-0.5 border-primary/40 text-primary/90 bg-primary/5">
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
                                        <Link href={`/community/thread/${thread.id}`} className="stretched-link focus:outline-none">
                                             <span className="absolute inset-0" aria-hidden="true"></span>
                                            {thread.title}
                                        </Link>
                                    </h2>
                                     <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{thread.excerpt}</p>
                                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={thread.author.avatarUrl} alt={thread.author.name} />
                                                <AvatarFallback className="text-[10px]">{getInitials(thread.author.name)}</AvatarFallback>
                                            </Avatar>
                                            {/* Link to future profile page */}
                                            <Link href={`/community/profile/${thread.author.id}`} className="hover:underline font-medium relative z-10">{thread.author.name}</Link>
                                             <span>·</span>
                                            <time dateTime={thread.createdAt.toISOString()}>
                                                {formatDistanceToNow(thread.createdAt, { addSuffix: true })}
                                            </time>
                                        </div>
                                         <div className="flex items-center gap-3">
                                             <span className="flex items-center gap-1">
                                                 <MessageSquare className="w-3.5 h-3.5" /> {thread.commentCount} comments
                                             </span>
                                             <Button variant="ghost" size="sm" className="h-6 px-1.5 text-muted-foreground hover:text-destructive relative z-10" onClick={(e) => { e.stopPropagation(); handleReport(thread.id); }} aria-label="Report post">
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
             <div className="mt-12 text-center">
                 <Button variant="outline" size="lg" disabled>Load More Threads (Coming Soon)</Button>
             </div>

             {/* Note on Future Features */}
            <Card className="mt-16 border-2 border-dashed border-blue-500/50 bg-blue-50/30 dark:bg-blue-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-3">
                        <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-500 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-blue-700 dark:text-blue-400">More Features Coming Soon!</h3>
                            <p className="text-sm text-blue-800/90 dark:text-blue-300/90 mt-1">
                                We're working on adding user profiles, detailed thread pages with reply functionality, post formatting (Markdown/WYSIWYG), and more robust moderation tools. Stay tuned!
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Mail, Save, Loader2, CalendarDays } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.tsx'; // Import useAuth
import { useRouter } from 'next/navigation'; // Import useRouter
import type { UserProfile, UpdateUserProfileInput } from '@/models/User'; // Import models
import { format } from 'date-fns'; // Import date-fns

export default function ProfilePage() {
  const { user: authUser, isLoading: authLoading } = useAuth(); // Get authenticated user
  const router = useRouter();
  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserProfileInput>({ name: '', bio: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.replace('/login?redirect=/profile'); // Redirect to login if not authenticated
    }
  }, [authLoading, authUser, router]);

  // Fetch profile data when authenticated user is available
  const fetchProfile = useCallback(async () => {
    if (!authUser?.id) return; // Don't fetch if no auth user ID

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${authUser.id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      const data: UserProfile = await response.json();
      // Ensure joinedDate is a Date object
      if (data.joinedDate && typeof data.joinedDate === 'string') {
        data.joinedDate = new Date(data.joinedDate);
      }
      setUserProfile(data);
      setFormData({
        name: data.name || '',
        bio: data.bio || '',
        avatarUrl: data.avatarUrl || '',
        // Initialize other editable fields here
        diet: data.diet || null,
        interests: data.interests || [],
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error Loading Profile",
        description: error instanceof Error ? error.message : "Could not load your profile data.",
        variant: "destructive",
      });
      setUserProfile(null); // Clear profile on error
    } finally {
      setIsLoading(false);
    }
  }, [authUser?.id, toast]);

  useEffect(() => {
    if (authUser?.id) {
      fetchProfile();
    } else if (!authLoading) {
       // Handle case where auth is loaded but no user (e.g., after logout)
       setIsLoading(false);
       setUserProfile(null);
    }
  }, [authUser, authLoading, fetchProfile]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && userProfile) {
      // Reset form data to current profile state if canceling edit
       setFormData({
        name: userProfile.name || '',
        bio: userProfile.bio || '',
        avatarUrl: userProfile.avatarUrl || '',
        diet: userProfile.diet || null,
        interests: userProfile.interests || [],
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!userProfile?.id) return;
    setIsSaving(true);
    console.log('Saving profile data:', formData);

    try {
      const response = await fetch(`/api/users/${userProfile.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        // Only send fields that are actually part of the update form
        body: JSON.stringify({
            name: formData.name,
            bio: formData.bio,
            avatarUrl: formData.avatarUrl,
            diet: formData.diet,
            interests: formData.interests
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setUserProfile(result); // Update local state with the saved profile
        // Update formData as well to reflect saved state
         setFormData({
            name: result.name || '',
            bio: result.bio || '',
            avatarUrl: result.avatarUrl || '',
            diet: result.diet || null,
            interests: result.interests || [],
         });
        toast({
          title: "Profile Updated!",
          description: "Your profile information has been saved.",
          variant: "default",
        });
        setIsEditing(false);
      } else {
        toast({
          title: "Update Failed",
          description: result.message || "Could not save profile changes.",
          variant: "destructive",
        });
      }
    } catch (error) {
       console.error("Error saving profile:", error);
       toast({
         title: "Update Error",
         description: "An unexpected error occurred while saving.",
         variant: "destructive",
       });
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function for initials
  const getInitials = (name: string): string => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '?';
    return (names[0][0]?.toUpperCase() || '') + (names[names.length - 1][0]?.toUpperCase() || '');
  };


  if (isLoading || authLoading) {
    return (
        <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-72px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (!userProfile) {
    // This case might be hit briefly after logout or if fetching failed
    return (
        <div className="container mx-auto text-center py-20">
            <p className="text-muted-foreground text-xl">Profile not available.</p>
            {/* Optionally add a button to retry or go home */}
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 font-inter">
      <Card className="max-w-3xl mx-auto shadow-xl border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="relative pb-8">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg z-0"></div>
          <div className="relative flex flex-col items-center pt-16 z-10">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4">
                <AvatarImage src={isEditing ? formData.avatarUrl : userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback className="text-3xl">{getInitials(userProfile.name)}</AvatarFallback>
              </Avatar>
              {!isEditing ? (
                  <>
                    <CardTitle className="text-2xl md:text-3xl font-serif tracking-tight text-center">{userProfile.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                       <Mail className="w-3.5 h-3.5"/> {userProfile.email}
                    </CardDescription>
                     <CardDescription className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                        <CalendarDays className="w-3 h-3"/> Joined {userProfile.joinedDate ? format(userProfile.joinedDate, 'PPP') : 'N/A'}
                     </CardDescription>
                 </>
              ) : (
                <>
                 <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl md:text-3xl font-serif tracking-tight text-center max-w-sm h-12 mb-2 shadow-sm"
                    placeholder="Your Name"
                 />
                  <Input
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleInputChange}
                    className="text-xs text-center max-w-sm h-8 mt-1 text-muted-foreground shadow-sm"
                    placeholder="Avatar Image URL (optional)"
                 />
                </>
              )}
               <Button onClick={handleEditToggle} variant="outline" size="sm" className="absolute top-4 right-4 z-20">
                 <Edit className="w-4 h-4 mr-1.5" /> {isEditing ? 'Cancel' : 'Edit Profile'}
               </Button>
           </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-6">
           {/* Bio Section */}
           <div className="space-y-2">
                <Label htmlFor="bio" className="text-base font-semibold">Bio</Label>
                 {!isEditing ? (
                    <p id="bio" className="text-foreground/80 bg-muted/30 p-4 rounded-md min-h-[80px] whitespace-pre-wrap border border-border/20 shadow-sm"> {/* Added whitespace-pre-wrap */}
                        {userProfile.bio || <span className="italic text-muted-foreground">No bio provided yet.</span>}
                    </p>
                 ) : (
                    <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a bit about yourself..."
                        rows={4}
                        className="text-base shadow-sm"
                        maxLength={500} // Match schema validation
                    />
                 )}
           </div>

           {/* TODO: Add editing for other fields like diet, interests if desired */}
             <div className="space-y-2">
               <h3 className="text-base font-semibold">Dietary Preference</h3>
               {!isEditing ? (
                   <p className="text-foreground/80">{userProfile.diet || <span className="italic text-muted-foreground">Not specified</span>}</p>
               ) : (
                   // Add Select component for diet editing here
                   <p className="text-muted-foreground text-sm italic">(Diet editing coming soon)</p>
               )}
           </div>

           {/* My Posts Section */}
           <div className="space-y-2">
               <h3 className="text-base font-semibold">My Posts</h3>
                <p className="text-muted-foreground text-sm italic">
                    Your community posts will appear here (Feature coming soon).
                </p>
                {/* TODO: Fetch and display user's posts via API call */}
           </div>

           {/* Account Settings Placeholder */}
           <div className="space-y-2">
               <h3 className="text-base font-semibold">Account Settings</h3>
                <p className="text-muted-foreground text-sm italic">
                    Password change, notification preferences, etc. (Feature coming soon).
                </p>
           </div>

           {isEditing && (
                <div className="flex justify-end pt-4 border-t border-dashed mt-8">
                    <Button onClick={handleSaveProfile} disabled={isSaving} size="lg">
                        {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />} Save Changes
                    </Button>
                </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

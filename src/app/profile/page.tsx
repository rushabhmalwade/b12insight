
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Edit, Mail, Save, Loader2, CalendarDays } from 'lucide-react'; // Added icons

// Placeholder user data - replace with actual fetched data
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: Date;
  // Add other relevant profile fields: diet, interests, etc.
}

export default function ProfilePage() {
  // Example: Simulate fetching user data
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '' });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchProfile = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        // Replace with actual API fetch
        const fetchedUser: UserProfile = {
            id: 'user123',
            name: 'Sample User',
            email: 'user@example.com',
            avatarUrl: 'https://picsum.photos/seed/profile_avatar/100/100', // Placeholder avatar
            bio: 'Passionate about health and understanding B12!',
            joinedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // Joined a week ago
        };
        setUser(fetchedUser);
        setFormData({ name: fetchedUser.name, bio: fetchedUser.bio || '' });
        setIsLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && user) {
      // Reset form data if canceling edit
      setFormData({ name: user.name, bio: user.bio || '' });
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    console.log('Saving profile data:', formData); // Debugging log

    // Simulate API call to save profile
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Placeholder for actual save logic
    setUser(prev => prev ? { ...prev, name: formData.name, bio: formData.bio } : null);
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
      variant: "default",
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  // Helper function for initials
  const getInitials = (name: string): string => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0]?.toUpperCase() || '?';
    return (names[0][0]?.toUpperCase() || '') + (names[names.length - 1][0]?.toUpperCase() || '');
  };


  if (isLoading) {
    // Basic loading state - improve with Skeleton components if needed
    return (
        <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-72px)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  if (!user) {
    // Handle case where user is not found or not logged in (implement proper auth check later)
    return (
        <div className="container mx-auto text-center py-20">
            <p className="text-destructive text-xl">Could not load profile. Please try logging in.</p>
             <Button asChild className="mt-4">
                <Link href="/login">Go to Login</Link>
             </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 font-inter">
      <Card className="max-w-3xl mx-auto shadow-xl border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="relative pb-8"> {/* Add padding-bottom for overlap */}
          {/* Cover Photo Placeholder */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg z-0">
             {/* Or use an Image component here */}
          </div>
           <div className="relative flex flex-col items-center pt-16 z-10"> {/* Adjust pt for avatar overlap */}
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              {!isEditing ? (
                  <>
                    <CardTitle className="text-2xl md:text-3xl font-serif tracking-tight text-center">{user.name}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                       <Mail className="w-3.5 h-3.5"/> {user.email}
                    </CardDescription>
                     <CardDescription className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
                        <CalendarDays className="w-3 h-3"/> Joined {user.joinedDate.toLocaleDateString()}
                     </CardDescription>
                 </>
              ) : (
                 <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl md:text-3xl font-serif tracking-tight text-center max-w-sm h-12 mb-2"
                    placeholder="Your Name"
                 />
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
                    <p id="bio" className="text-foreground/80 bg-muted/30 p-4 rounded-md min-h-[80px]">
                        {user.bio || <span className="italic text-muted-foreground">No bio provided yet.</span>}
                    </p>
                 ) : (
                    <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a bit about yourself..."
                        rows={4}
                        className="text-base"
                    />
                 )}
           </div>

           {/* Add other profile sections here: e.g., Diet Type, Interests, My Posts, Settings */}
           <div className="space-y-2">
               <h3 className="text-base font-semibold">My Posts</h3>
                <p className="text-muted-foreground text-sm italic">
                    Your community posts will appear here (Feature coming soon).
                </p>
           </div>
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

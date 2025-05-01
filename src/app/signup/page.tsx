'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Loader2, UserPlus } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }), // Add name field
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path of error
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); // Get router instance

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", // Default value for name
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setIsSubmitting(true);
    console.log('Signup Form Values (excluding passwords for safety):', { name: values.name, email: values.email }); // Log values

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password, // Send password to API for hashing
            }),
        });

        const result = await response.json();

        if (response.ok) {
            toast({
                title: "Signup Successful!",
                description: "Your account has been created. Please log in.",
                variant: "default",
            });
            router.push('/login'); // Redirect to login page
        } else {
             toast({
                title: "Signup Failed",
                description: result.message || "Could not create account. Please try again.",
                variant: "destructive",
            });
        }
    } catch (error) {
         console.error("Signup error:", error);
         toast({
            title: "Signup Error",
            description: "An unexpected error occurred during signup.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12 md:py-16 font-inter">
      <Card className="w-full max-w-md shadow-xl border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center">
          <UserPlus className="mx-auto h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-serif tracking-tight">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground">Join the B12 Insight community.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Full Name" {...field} className="h-11 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} className="h-11 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Choose a password (min. 6 chars)" {...field} className="h-11 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Repeat your password" {...field} className="h-11 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By signing up, you agree to our{' '}
             <Button variant="link" className="p-0 h-auto text-xs" asChild>
               <Link href="/legal">Terms of Service</Link>
             </Button>
            {' '}and{' '}
             <Button variant="link" className="p-0 h-auto text-xs" asChild>
                {/* Link might need adjustment based on legal page structure */}
               <Link href="/legal#privacy-policy">Privacy Policy</Link>
             </Button>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

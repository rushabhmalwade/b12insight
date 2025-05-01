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
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.tsx'; // Import useAuth

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 char for presence check
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth(); // Get login function from useAuth
  const router = useRouter(); // Get router instance

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    console.log('Login Form Values:', values);

    try {
        const success = await login(values.email, values.password);

        if (success) {
            toast({
                title: "Login Successful!",
                description: "Welcome back!",
                variant: "default",
            });
            // Redirect to profile page or dashboard after successful login
            router.push('/profile'); // Redirect to profile page
        } else {
             // Login function in useAuth already handles setting user to null
             // The auth library simulation handles the failure case
             toast({
                title: "Login Failed",
                description: "Invalid email or password. Please try again.", // More specific error
                variant: "destructive",
            });
        }
    } catch (error) {
        console.error("Login page error:", error);
        toast({
            title: "Login Error",
            description: "An unexpected error occurred during login.",
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
          <LogIn className="mx-auto h-10 w-10 text-primary mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-serif tracking-tight">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground">Log in to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input type="password" placeholder="••••••••" {...field} className="h-11 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Log In'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
           <p className="mt-2 text-center text-xs text-muted-foreground">
             <Button variant="link" className="p-0 h-auto text-xs" asChild>
                <Link href="#">Forgot Password?</Link>
             </Button>
           </p>
        </CardContent>
      </Card>
    </div>
  );
}

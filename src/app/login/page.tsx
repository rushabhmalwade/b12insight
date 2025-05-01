
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
import { Loader2, LogIn } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    console.log('Login Form Values:', values); // Log values for debugging

    // Simulate login attempt delay (Replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Placeholder for actual login logic
    toast({
      title: "Login Functionality Pending",
      description: "Login is not yet implemented. Proceeding as if successful for demo.",
      variant: "default",
    });
    // In a real app, you'd handle success/error based on API response
    // e.g., redirect to profile or show error toast
    // form.reset(); // Optionally reset form

    setIsSubmitting(false);
    // Example redirect (replace with actual logic)
    // window.location.href = '/profile';
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
           {/* Optional: Add "Forgot Password?" link later */}
            <p className="mt-2 text-center text-xs text-muted-foreground">
              <Link href="#" className="hover:underline">
                Forgot Password?
              </Link>
            </p>
           {/* Optional: Add OAuth buttons later */}
            {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" disabled>
                    Google (Coming Soon)
                </Button>
            </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

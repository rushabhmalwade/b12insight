'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Mail, MessageSquare, Send, HelpCircle, Instagram, Twitter, Facebook, Link as LinkIcon, AlertTriangle, Loader2 } from 'lucide-react'; // Added icons
import Link from 'next/link'; // Use NextLink for external links potentially
import { cn } from '@/lib/utils'; // Import cn

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, { message: "Name seems too long."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(3, { message: "Subject should be at least 3 characters." }).max(150, { message: "Subject is too long."}), // Made subject required and added length validation
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(1000, { message: "Message cannot exceed 1000 characters."}),
});

type ContactFormValues = z.infer<typeof formSchema>;


export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "", // Default value for subject
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    console.log('Submitting Form Values:', values); // Log values for debugging

    // Simulate form submission delay (Replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Example: Handle potential submission error
    const submissionSuccess = Math.random() > 0.1; // Simulate 90% success rate

    if (submissionSuccess) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. We'll get back to you as soon as possible.",
          variant: "default",
        });
        form.reset(); // Reset form only on success
    } else {
        toast({
          title: "Submission Failed",
          description: "Could not send your message. Please try again later or use our email address.",
          variant: "destructive",
        });
    }

    setIsSubmitting(false);
  }


  const faqs = [
    {
      id: 'faq1',
      question: 'What is Vitamin B12 and why is it important?',
      answer:
        'Vitamin B12 (cobalamin) is a vital nutrient for nerve function, DNA synthesis, and red blood cell formation. Deficiency can cause neurological problems, fatigue, anemia, and more. Learn details on our [About B12 page](/about-b12).', // Added link
    },
    {
      id: 'faq2',
      question: 'What are the common sources of Vitamin B12?',
      answer:
        'Primary sources include meat, fish, poultry, eggs, and dairy products. For vegans/vegetarians, reliable sources are fortified foods (like nutritional yeast, cereals, plant milks) or supplements. Explore our [Sources page](/sources-of-b12) for a comprehensive list.', // Added link
    },
    {
      id: 'faq3',
      question: 'What are the symptoms of Vitamin B12 deficiency?',
      answer:
        'Symptoms are diverse and can include fatigue, weakness, numbness/tingling, balance issues, memory problems ("brain fog"), pale skin, shortness of breath, depression, anxiety, and mouth sores. Use our [Symptoms page](/b12-deficiency-symptoms) for details and the AI checker.', // Added link
    },
    {
       id: 'faq4',
      question: 'How is B12 deficiency tested?',
      answer:
        'Consult your doctor. Common blood tests include Serum B12, Methylmalonic Acid (MMA), and Homocysteine. Active B12 (Holotranscobalamin) is another option. Your doctor will determine the best tests for you. See more on the [Symptoms page](/b12-deficiency-symptoms).', // Added link
    },
     {
       id: 'faq5',
      question: 'Is the information on B12 Insight medical advice?',
      answer:
        'No. B12 Insight provides educational information only. It is not a substitute for professional medical advice, diagnosis, or treatment from a qualified healthcare provider. Always consult a doctor or other qualified health professional regarding any medical condition.',
    },
      {
       id: 'faq6',
      question: 'How does the AI Symptom Assessment work?',
      answer:
        'Our AI tool analyzes the age, diet, and symptoms you provide against known patterns associated with B12 deficiency to estimate a probability. It\'s an informational tool to encourage discussion with your doctor, not a diagnostic device. Accuracy depends on the information provided.',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/b12insight_official' }, // Use more specific placeholders
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/b12_insight' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/b12insight' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight animate-fade-in">Contact B12 Insight</h1>

      {/* Contact Options Grid */}
      <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
         <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary/90 mb-8 text-center tracking-tight">Get in Touch</h2>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Email Card */}
          <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 h-full">
            <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block text-primary transition-transform duration-300 group-hover:scale-110">
                <Mail className="w-8 h-8" />
            </div>
            <CardTitle className="text-xl font-serif mb-2">Email Support</CardTitle>
            <CardDescription className="text-muted-foreground mb-3 text-sm">General inquiries & support</CardDescription>
            <a href="mailto:support@b12insight.com" className="font-semibold text-primary hover:underline break-all">
                support@b12insight.com
            </a>
          </Card>

          {/* Form Card */}
           <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 h-full">
             <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block text-primary transition-transform duration-300 group-hover:scale-110">
                 <MessageSquare className="w-8 h-8" />
              </div>
              <CardTitle className="text-xl font-serif mb-2">Send a Message</CardTitle>
             <CardDescription className="text-muted-foreground mb-3 text-sm">Use our secure contact form</CardDescription>
               <Button variant="link" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                 Go to Form <Send className="w-4 h-4 ml-1.5" />
               </Button>
          </Card>

          {/* Social Media Card */}
           <Card className="text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 h-full">
            <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block text-primary transition-transform duration-300 group-hover:scale-110">
                 <LinkIcon className="w-8 h-8" />
             </div>
              <CardTitle className="text-xl font-serif mb-2">Connect Socially</CardTitle>
             <CardDescription className="text-muted-foreground mb-4 text-sm">Follow us for updates & news</CardDescription>
               <div className="flex justify-center gap-4">
                 {socialLinks.map((link) => (
                   <Button key={link.name} variant="outline" size="icon" className="rounded-full w-11 h-11 hover:scale-110 hover:rotate-6 transition-transform hover:bg-primary/5 border-primary/30" asChild>
                     <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                       <link.icon className="w-5 h-5 text-primary/80" />
                     </Link>
                   </Button>
                 ))}
               </div>
          </Card>
        </div>
      </section>


      {/* Contact Form Section */}
      <section id="contact-form" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
         <h2 className="text-2xl md:text-3xl font-serif font-semibold text-primary/90 mb-8 text-center tracking-tight">Contact Form</h2>
        <Card className="shadow-xl rounded-xl border-2 border-primary/30 bg-gradient-to-br from-card to-secondary/10">
          <CardHeader className="p-6">
            <CardTitle className="text-2xl md:text-3xl font-serif text-primary flex items-center gap-3 tracking-tight"><MessageSquare className="w-7 h-7"/> Send Your Inquiry</CardTitle>
            <CardDescription className="text-muted-foreground mt-2 text-base">Fill out the form below. We typically respond within 1-2 business days.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Name</FormLabel>
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
                        <FormLabel className="text-base">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} type="email" className="h-11 text-base"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Question about symptoms, Website Feedback, Collaboration Inquiry" {...field} className="h-11 text-base"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type your detailed message here..." {...field} rows={6} className="text-base"/>
                      </FormControl>
                       <FormDescription className="text-xs">
                         Please provide details so we can assist you effectively. (Max 1000 characters)
                       </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                   <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[180px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                     {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : <>Send Message <Send className="w-5 h-5 ml-2" /></>}
                   </Button>
                </div>
              </form>
            </Form>
             {/* Feedback Link/Button */}
              <div className="text-center mt-10 pt-6 border-t border-dashed">
                 <p className="text-muted-foreground mb-3 text-base">Have feedback about the website or suggestions?</p>
                 <Button variant="outline" onClick={() => {
                     form.setValue('subject', 'Website Feedback');
                     form.setFocus('message'); // Focus on the message field
                     document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                 }} className="transition-colors hover:bg-accent/50">
                   Submit Feedback
                 </Button>
              </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
        <Card className="shadow-xl rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm">
           <CardHeader className="bg-muted/30 p-6 border-b">
              <CardTitle className="font-serif text-2xl md:text-3xl text-primary flex items-center gap-3 tracking-tight"><HelpCircle className="w-7 h-7"/> Quick Answers</CardTitle>
              <CardDescription className="text-muted-foreground mt-1 text-base">Find answers to common questions about Vitamin B12 and B12 Insight.</CardDescription>
           </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq) => (
                 <AccordionItem value={faq.id} key={faq.id} className="border px-4 rounded-lg bg-background/50 hover:bg-muted/40 transition-colors shadow-sm">
                   <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors text-base md:text-lg py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-45">
                      {faq.question}
                   </AccordionTrigger>
                   {/* Improved styling for answer content */}
                   <AccordionContent className="text-foreground/85 pt-1 pb-4 text-base leading-relaxed [&_a]:text-primary [&_a:hover]:underline [&_a]:font-medium">
                     {/* Basic Markdown-like link rendering */}
                     <span dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') }} />
                   </AccordionContent>
                 </AccordionItem>
               ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

       {/* Final Disclaimer */}
        <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Important Note</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                     Contacting us via this form or email does not establish a doctor-patient relationship. For medical emergencies, please call your local emergency number immediately. We cannot provide personalized medical advice through this contact channel.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}

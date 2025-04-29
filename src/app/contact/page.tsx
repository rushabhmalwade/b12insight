
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
import { useToast } from "@/hooks/use-toast"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Mail, Phone, MessageSquare, Send, HelpCircle, Instagram, Twitter, Facebook, Link as LinkIcon } from 'lucide-react'; // Added icons
import Link from 'next/link'; // Use NextLink for external links potentially

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().optional(), // Added subject field as optional
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
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
    // Simulate form submission delay
    console.log('Form Values:', values); // Log values for debugging
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Form submitted successfully!",
      description: "We'll get back to you as soon as possible.",
    })
    form.reset();
  }


  const faqs = [
    {
      id: 'faq1',
      question: 'What is Vitamin B12 and why is it important?',
      answer:
        'Vitamin B12 is an essential nutrient crucial for nerve function, DNA synthesis, and red blood cell formation. A deficiency can lead to various health issues. Learn more on our About B12 page.',
    },
    {
      id: 'faq2',
      question: 'What are the common sources of Vitamin B12?',
      answer:
        'Primary sources are animal products (meat, fish, dairy, eggs). Vegans must rely on fortified foods (like nutritional yeast, cereals, plant milks) or supplements. Explore our Sources page for details.',
    },
    {
      id: 'faq3',
      question: 'What are the symptoms of Vitamin B12 deficiency?',
      answer:
        'Symptoms vary widely and can include fatigue, weakness, numbness/tingling, balance problems, memory loss, pale skin, shortness of breath, depression, and mouth sores. Check our Symptoms page for a comprehensive list.',
    },
    {
       id: 'faq4',
      question: 'How can I get tested for Vitamin B12 deficiency?',
      answer:
        'Consult a healthcare provider. Common tests include Serum B12, Methylmalonic Acid (MMA), and Homocysteine levels. Your doctor will recommend the appropriate tests based on your situation.',
    },
     {
       id: 'faq5',
      question: 'Is this website medical advice?',
      answer:
        'No. B12 Insight provides educational information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for health concerns.',
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' }, // Replace with actual links
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">Contact Us</h1>

      {/* Contact Options Grid */}
      <section>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                <Mail className="w-7 h-7 text-primary/80" />
              </div>
              <CardTitle className="text-xl font-serif">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">General inquiries & support</p>
              <a href="mailto:support@b12insight.com" className="font-semibold text-primary hover:underline">
                support@b12insight.com
              </a>
            </CardContent>
          </Card>
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <MessageSquare className="w-7 h-7 text-primary/80" />
              </div>
              <CardTitle className="text-xl font-serif">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Use our contact form below</p>
               <Button variant="link" onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}>
                 Go to Form <Send className="w-4 h-4 ml-2" />
               </Button>
            </CardContent>
          </Card>
           <Card className="text-center shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
            <CardHeader className="items-center">
               <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                 <LinkIcon className="w-7 h-7 text-primary/80" />
               </div>
              <CardTitle className="text-xl font-serif">Connect Socially</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground mb-3">Follow us for updates</p>
               <div className="flex justify-center gap-4">
                 {socialLinks.map((link) => (
                   <Button key={link.name} variant="outline" size="icon" className="rounded-full w-10 h-10 hover:scale-110 hover:rotate-6 transition-transform" asChild>
                     <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                       <link.icon className="w-5 h-5" />
                     </Link>
                   </Button>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Contact Form Section */}
      <section id="contact-form">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2"><MessageSquare className="w-6 h-6"/> Send Us Your Inquiry</CardTitle>
            <CardDescription>Fill out the form below, and we'll get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                          <Input placeholder="your.email@example.com" {...field} type="email" />
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
                        <FormLabel>Subject (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Question about symptoms, Feedback" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Type your message here..." {...field} rows={5} />
                      </FormControl>
                       <FormDescription>
                         Please provide as much detail as possible.
                       </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                   <Button type="submit" disabled={isSubmitting} size="lg">
                     {isSubmitting ? 'Submitting...' : 'Send Message'}
                     {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                   </Button>
                </div>
              </form>
            </Form>
             {/* Feedback Link/Button */}
              <div className="text-center mt-8 pt-6 border-t border-dashed">
                 <p className="text-muted-foreground mb-3">Have feedback about the website or content?</p>
                 <Button variant="outline" onClick={() => {
                    // You could pre-fill the subject or scroll to the form
                     form.setValue('subject', 'Website Feedback');
                     document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                     document.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
                 }}>
                   Submit Feedback
                 </Button>
              </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs Section */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
        <Card className="shadow-md bg-card/80">
           <CardHeader>
              <CardTitle className="font-serif text-2xl text-primary flex items-center gap-2"><HelpCircle className="w-6 h-6"/> Quick Answers</CardTitle>
              <CardDescription>Find answers to common questions about Vitamin B12 and our site.</CardDescription>
           </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                 <AccordionItem value={faq.id} key={faq.id}>
                   <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors text-base">
                      {faq.question}
                   </AccordionTrigger>
                   <AccordionContent className="text-foreground/80 pt-2 text-sm">
                     {faq.answer}
                   </AccordionContent>
                 </AccordionItem>
               ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

       {/* Disclaimer */}
        <Card className="mt-12 border-dashed border-primary/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> The information provided on this website is for educational purposes only. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment. Contacting us via this form does not establish a doctor-patient relationship.
            </p>
          </CardContent>
        </Card>

    </div>
  );
}

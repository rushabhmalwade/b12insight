'use client'; // Required for Accordion

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Cookie, FileText, AlertTriangle, ChevronsUpDown } from 'lucide-react'; // Added icons
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // Import Accordion components
import { Button } from '@/components/ui/button'; // For potential "Back to Top"
import { useState, useEffect } from 'react'; // For Back to Top button visibility

export default function LegalPage() {
   const [showBackToTop, setShowBackToTop] = useState(false);

   // Handle scroll listener for Back to Top button
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup listener
  }, []);

   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Placeholder Date - Replace with actual last updated date
  const lastUpdatedDate = "October 26, 2023";


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-12 md:space-y-16 font-inter relative">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10 md:mb-12 text-center tracking-tight animate-fade-in">
         Legal Information & Policies
      </h1>

      {/* Medical Disclaimer */}
      <Card className="border-2 border-destructive/50 shadow-lg bg-destructive/5 rounded-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="p-6">
          <CardTitle className="text-2xl md:text-3xl font-serif text-destructive flex items-center gap-3 tracking-tight">
            <ShieldAlert className="w-7 h-7" /> Medical Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6 space-y-3 text-base">
          <p className="font-semibold text-destructive/90">
            The information provided on B12 Insight, including text, graphics, images, AI assessments, and other material, is for informational and educational purposes only. It does not constitute medical advice.
          </p>
          <p className="text-foreground/80">
            This website's content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment options.
          </p>
          <p className="text-foreground/80">
            Never disregard professional medical advice or delay in seeking it because of something you have read or interacted with on this website. Reliance on any information provided by B12 Insight is solely at your own risk. If you think you may have a medical emergency, call your doctor or local emergency number immediately.
          </p>
        </CardContent>
      </Card>

      {/* Main Policies Accordion */}
       <Card className="shadow-xl rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6 md:p-8">
              <Accordion type="multiple" className="w-full space-y-4">

                {/* Terms of Service */}
                <AccordionItem value="terms" className="border px-4 rounded-lg bg-background/50 shadow-sm">
                  <AccordionTrigger className="text-left font-serif text-xl md:text-2xl text-primary hover:text-primary/80 transition-colors py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                     <span className="flex items-center gap-3"><FileText className="w-6 h-6" /> Terms of Service</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 text-foreground/85 text-base leading-relaxed space-y-4">
                    <p className="text-sm text-muted-foreground italic">Last updated: {lastUpdatedDate}</p>
                    <p>
                      Welcome to B12 Insight! These Terms of Service ("Terms") govern your access to and use of our website located at [Your Website URL] (the "Site") and any associated services provided by B12 Insight (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.
                    </p>
                     {/* Use nested structure or clear headings for readability */}
                    <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">1. Acceptance & Use License</h3>
                      <p>
                        By using B12 Insight, you confirm you have read, understood, and agree to these Terms. We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes, subject to these Terms. You may not modify, copy, distribute, sell, or exploit any content or software from the Site without express permission.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">2. Intellectual Property</h3>
                      <p>
                        All content, features, and functionality on the Site, including text, graphics, logos, icons, images, and software, are the exclusive property of B12 Insight or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">3. Disclaimers</h3>
                      <p>
                        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. B12 Insight makes no warranties, express or implied, regarding the accuracy, reliability, or completeness of the content. Use of the Service is at your own risk. <strong className="font-medium">Refer explicitly to our Medical Disclaimer above regarding health information.</strong>
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">4. Limitation of Liability</h3>
                      <p>
                        In no event shall B12 Insight, its directors, employees, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, the Service.
                      </p>
                    </section>
                    {/* Add other sections like User Conduct, Termination, Governing Law, Changes to Terms */}
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">5. Governing Law & Modifications</h3>
                      <p>
                        These Terms are governed by the laws of [Your Jurisdiction, e.g., State of California, USA], without regard to conflict of law principles. B12 Insight reserves the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on the Site. Your continued use after changes constitutes acceptance.
                      </p>
                    </section>
                  </AccordionContent>
                </AccordionItem>

                {/* Privacy Policy */}
                 <AccordionItem value="privacy" className="border px-4 rounded-lg bg-background/50 shadow-sm">
                   <AccordionTrigger className="text-left font-serif text-xl md:text-2xl text-primary hover:text-primary/80 transition-colors py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                     <span className="flex items-center gap-3"><FileText className="w-6 h-6" /> Privacy Policy</span>
                  </AccordionTrigger>
                   <AccordionContent className="pt-2 pb-6 text-foreground/85 text-base leading-relaxed space-y-4">
                      <p className="text-sm text-muted-foreground italic">Last updated: {lastUpdatedDate}</p>
                    <p>
                      Your privacy is critically important to us. This Privacy Policy outlines how B12 Insight collects, uses, discloses, and protects your information when you use our Service.
                    </p>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">1. Information Collection</h3>
                      <p>
                        We collect information you provide directly (e.g., name, email via contact form). We also collect non-personal information automatically (e.g., browser type, IP address, usage data through cookies and analytics tools) to improve the Service. Information submitted to the AI Symptom Assessment tool is processed for the purpose of providing the assessment and improving the tool, but is not used to personally identify you unless explicitly stated otherwise.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">2. Use of Information</h3>
                      <p>
                        We use collected information to operate and improve the Site, respond to inquiries, send newsletters (if subscribed), analyze usage trends, and ensure security. Anonymized symptom data may be used to enhance the AI tool's accuracy.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">3. Information Sharing & Disclosure</h3>
                      <p>
                        We do not sell or rent your personal information. We may share information with third-party service providers who assist us (e.g., hosting, analytics), under confidentiality agreements. We may disclose information if required by law or to protect our rights or safety.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">4. Data Security & Your Rights</h3>
                      <p>
                        We implement reasonable security measures to protect your information but cannot guarantee absolute security. Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. Contact us at <a href="mailto:privacy@b12insight.com" className="text-primary hover:underline font-medium">privacy@b12insight.com</a> for inquiries.
                      </p>
                    </section>
                     {/* Add sections on Cookies, Children's Privacy, International Transfers, Contact Info */}
                      <section>
                        <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">5. Cookies & Tracking</h3>
                        <p>
                          We use cookies and similar technologies. Refer to our <a href="#cookie-policy" onClick={(e) => { e.preventDefault(); document.getElementById('cookie-policy-trigger')?.click(); document.getElementById('cookie-policy')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-primary hover:underline font-medium">Cookie Policy</a> below for details.
                        </p>
                      </section>
                  </AccordionContent>
                </AccordionItem>

                {/* Cookie Policy */}
                 <AccordionItem value="cookies" id="cookie-policy" className="border px-4 rounded-lg bg-background/50 shadow-sm">
                   <AccordionTrigger id="cookie-policy-trigger" className="text-left font-serif text-xl md:text-2xl text-primary hover:text-primary/80 transition-colors py-4 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                     <span className="flex items-center gap-3"><Cookie className="w-6 h-6" /> Cookie Policy</span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6 text-foreground/85 text-base leading-relaxed space-y-4">
                      <p className="text-sm text-muted-foreground italic">Last updated: {lastUpdatedDate}</p>
                     <p>
                        This Cookie Policy explains how B12 Insight uses cookies and similar technologies on our Site.
                    </p>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">1. What Are Cookies?</h3>
                      <p>
                        Cookies are small text files stored on your device when you visit websites. They help sites remember information about your visit, like preferred language and other settings, making your next visit easier and the site more useful.
                      </p>
                    </section>
                     <section>
                      <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">2. How We Use Cookies</h3>
                      <p>
                        We use cookies for various purposes:
                      </p>
                       <ul className="list-disc list-inside space-y-1 pl-4">
                         <li><strong>Essential Cookies:</strong> Necessary for the Site to function (e.g., remembering session state).</li>
                         <li><strong>Performance & Analytics Cookies:</strong> Help us understand how visitors interact with the Site (e.g., Google Analytics) by collecting anonymous information.</li>
                         <li><strong>Functionality Cookies:</strong> Remember choices you make (e.g., theme preference) to provide enhanced features.</li>
                         {/* <li><strong>Advertising/Targeting Cookies:</strong> (We currently do not use these, but will update this policy if we do).</li> */}
                       </ul>
                    </section>
                    <section>
                        <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">3. Your Choices</h3>
                        <p>
                            You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. However, disabling essential cookies may affect the functionality of the Site. For more information, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.aboutcookies.org</a>.
                        </p>
                     </section>
                     <section>
                        <h3 className="font-mono text-lg font-semibold mt-4 mb-2 text-primary/90">4. Policy Updates</h3>
                        <p>
                            We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.
                        </p>
                     </section>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
       </Card>

       {/* Back to Top Button */}
       <Button
         onClick={scrollToTop}
         className={cn(
           "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 shadow-lg transition-opacity duration-300",
           showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
         )}
         aria-label="Scroll back to top"
         variant="secondary" // Or primary
       >
         <ChevronsUpDown className="h-6 w-6 transform -rotate-90" />
       </Button>

    </div>
  );
}

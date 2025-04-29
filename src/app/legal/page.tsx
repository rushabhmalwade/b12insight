
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Cookie, FileText } from 'lucide-react'; // Added icons

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 text-center">Legal Information</h1>

      {/* Medical Disclaimer */}
      <Card className="border-destructive/50 shadow-md bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-destructive flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" /> Medical Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-destructive/90">
            The information provided on B12 Insight, including text, graphics, images, and other material, is for informational purposes only and does not constitute medical advice.
          </p>
          <p className="mt-2 text-foreground/80">
            The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen.
          </p>
          <p className="mt-2 text-foreground/80">
            Never disregard professional medical advice or delay in seeking it because of something you have read on this website. Reliance on any information provided by B12 Insight is solely at your own risk.
          </p>
        </CardContent>
      </Card>

      {/* Terms of Service */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <FileText className="w-6 h-6" /> Terms of Service
           </CardTitle>
           <CardDescription>Last updated: [Date]</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            Welcome to B12 Insight! These Terms of Service ("Terms") govern your use of our website located at [Your Website URL] (the "Site") and any related services provided by B12 Insight.
            By accessing or using our Site, you agree to comply with and be bound by these Terms.
          </p>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">1. Acceptance of Terms</h3>
            <p>
              By using B12 Insight, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and Cookie Policy. If you do not agree with any part of these terms, you must not use our Site.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">2. Use License</h3>
             <p>
               Permission is granted to temporarily download one copy of the materials (information or software) on B12 Insight's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on B12 Insight's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.
            </p>
             <p className="mt-2">This license shall automatically terminate if you violate any of these restrictions and may be terminated by B12 Insight at any time.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">3. Intellectual Property</h3>
            <p>
              All content, design, graphics, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">4. Disclaimer</h3>
            <p>
              The materials on B12 Insight's website are provided on an 'as is' basis. B12 Insight makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, B12 Insight does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. <strong className="font-semibold">Refer to our Medical Disclaimer for health-related information.</strong>
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">5. Limitations</h3>
            <p>
              In no event shall B12 Insight or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on B12 Insight's website, even if B12 Insight or a B12 Insight authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">6. Governing Law</h3>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., State of California, USA] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">7. Modifications</h3>
            <p>
              B12 Insight may revise these Terms of Service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
            <FileText className="w-6 h-6" /> Privacy Policy
           </CardTitle>
           <CardDescription>Last updated: [Date]</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            Your privacy is important to us. This Privacy Policy explains how B12 Insight collects, uses, discloses, and safeguards your information when you visit our Site.
          </p>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">1. Information We Collect</h3>
            <p>
              We may collect personal information that you voluntarily provide to us, such as your name and email address when you subscribe to a newsletter or use the contact form. We may also automatically collect certain information when you visit the Site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Site (Usage Data).
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">2. Use of Your Information</h3>
            <p>
              Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to: send you a newsletter, respond to your inquiries, monitor and analyze usage and trends to improve your experience with the Site, and perform other business activities as needed.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">3. Disclosure of Your Information</h3>
            <p>
              We do not sell, trade, rent, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
            </p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">4. Tracking Technologies (Cookies)</h3>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Site and hold certain information. Please refer to our <a href="#cookie-policy" className="text-primary hover:underline font-medium">Cookie Policy</a> for more details.
            </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">5. Data Security</h3>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">6. Your Rights</h3>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. If you wish to exercise these rights, please contact us using the contact information provided below.
            </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">7. Contact Us</h3>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <a href="mailto:privacy@b12insight.com" className="text-primary hover:underline font-medium ml-1">privacy@b12insight.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Cookie Policy */}
      <Card id="cookie-policy" className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
             <Cookie className="w-6 h-6" /> Cookie Policy
           </CardTitle>
           <CardDescription>Last updated: [Date]</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            This Cookie Policy explains what cookies are and how B12 Insight uses them on our Site. You should read this policy so you can understand what type of cookies we use, the information we collect using cookies and how that information is used.
          </p>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">1. What Are Cookies?</h3>
            <p>
              Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">2. How We Use Cookies</h3>
            <p>
              We use cookies for several purposes, including:
            </p>
             <ul className="list-disc list-inside space-y-1 pl-4">
               <li><strong>Essential Cookies:</strong> These are necessary for the Site to function and cannot be switched off in our systems.</li>
               <li><strong>Performance and Analytics Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our Site. They help us know which pages are the most and least popular and see how visitors move around the Site. (e.g., Google Analytics)</li>
               <li><strong>Functionality Cookies:</strong> These enable the website to provide enhanced functionality and personalisation.</li>
                <li><strong>Advertising/Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant adverts on other sites. (We currently do not use these, but will update this policy if we do).</li>
             </ul>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">3. Your Choices Regarding Cookies</h3>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this Site may become inaccessible or not function properly.
            </p>
             <p className="mt-2">
                To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.allaboutcookies.org</a>.
             </p>
          </section>
           <section>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-primary/90">4. Changes to This Cookie Policy</h3>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
          </section>
        </CardContent>
      </Card>

    </div>
  );
}

    
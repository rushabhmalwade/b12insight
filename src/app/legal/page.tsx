import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Welcome to B12 Insight! These Terms of Service govern your use of our website and services.
            By accessing or using our platform, you agree to comply with these terms.
          </p>
          <h3 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h3>
          <p>
            By using B12 Insight, you agree to be bound by these Terms of Service, our Privacy Policy,
            and all applicable laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using or accessing our platform.
          </p>
          <h3 className="text-lg font-semibold mt-4">2. Use of Our Platform</h3>
          <p>
            You agree to use B12 Insight for lawful purposes only and in a manner that does not
            infringe upon the rights of others or restrict their use and enjoyment of the platform.
          </p>
          <h3 className="text-lg font-semibold mt-4">3. Intellectual Property</h3>
          <p>
            The content, design, and logos on B12 Insight are protected by copyright and other
            intellectual property laws. You may not reproduce, distribute, or modify our content
            without our prior written consent.
          </p>
          <h3 className="text-lg font-semibold mt-4">4. Disclaimer</h3>
          <p>
            The information provided on B12 Insight is for informational purposes only and should not be
            construed as medical advice. We do not endorse or guarantee the accuracy, completeness,
            or reliability of any information provided on our platform. Consult with a healthcare
            professional for personalized medical advice.
          </p>
          <h3 className="text-lg font-semibold mt-4">5. Limitation of Liability</h3>
          <p>
            In no event shall B12 Insight or its affiliates be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in any way connected with
            the use of our platform.
          </p>
          <h3 className="text-lg font-semibold mt-4">6. Governing Law</h3>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws
            of the jurisdiction in which B12 Insight operates.
          </p>
          <h3 className="text-lg font-semibold mt-4">7. Changes to Terms</h3>
          <p>
            We reserve the right to modify or revise these Terms of Service at any time without prior
            notice. By continuing to use B12 Insight after any changes are made, you agree to be
            bound by the revised terms.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and
            protect your personal information when you use B12 Insight.
          </p>
          <h3 className="text-lg font-semibold mt-4">1. Information We Collect</h3>
          <p>
            We may collect personal information such as your name, email address, and any other
            information you voluntarily provide to us. We also collect usage data, such as your IP
            address, browser type, and device information.
          </p>
          <h3 className="text-lg font-semibold mt-4">2. How We Use Your Information</h3>
          <p>
            We use your personal information to provide and improve our services, personalize your
            experience, communicate with you, and respond to your inquiries. We may also use your
            information for marketing purposes with your consent.
          </p>
          <h3 className="text-lg font-semibold mt-4">3. Data Security</h3>
          <p>
            We implement industry-standard security measures to protect your personal information
            from unauthorized access, use, or disclosure. However, no method of transmission over
            the internet or electronic storage is completely secure, so we cannot guarantee absolute
            security.
          </p>
          <h3 className="text-lg font-semibold mt-4">4. Data Sharing</h3>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as required by law or as necessary to provide our services.
          </p>
          <h3 className="text-lg font-semibold mt-4">5. Cookies</h3>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our
            platform. You can control cookies through your browser settings.
          </p>
          <h3 className="text-lg font-semibold mt-4">6. Third-Party Links</h3>
          <p>
            Our platform may contain links to third-party websites or services that are not owned
            or controlled by us. We are not responsible for the privacy practices or content of
            these third-party sites.
          </p>
          <h3 className="text-lg font-semibold mt-4">7. Your Rights</h3>
          <p>
            You have the right to access, update, or delete your personal information. You may also
            opt-out of receiving marketing communications from us at any time.
          </p>
          <h3 className="text-lg font-semibold mt-4">8. Contact Us</h3>
          <p>
            If you have any questions or concerns about our Privacy Policy, please contact us at
            <a href="mailto:privacy@b12insight.com">privacy@b12insight.com</a>.
          </p>
          <h3 className="text-lg font-semibold mt-4">9. Changes to this Policy</h3>
          <p>
            We reserve the right to modify or update this Privacy Policy at any time. We will
            notify you of any material changes by posting the updated policy on our platform.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

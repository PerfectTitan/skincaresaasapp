import MainLayout from "@/components/layout/MainLayout";

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-20 px-4">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-center">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-center">
            Last updated: June 1, 2023
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <p>
            At GlowSage, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our website and services. Please read this
            privacy policy carefully. If you do not agree with the terms of this
            privacy policy, please do not access the site.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you
            register for an account, complete the skin assessment quiz, upload
            progress photos, or communicate with us. This information may
            include:
          </p>
          <ul>
            <li>Personal identifiers such as your name and email address</li>
            <li>Demographic information such as your age and gender</li>
            <li>
              Skin-related information such as your skin type, concerns, and
              allergies
            </li>
            <li>Photos that you upload to track your skincare progress</li>
            <li>Information about your skincare routine and product usage</li>
            <li>Communications you have with us</li>
          </ul>

          <p>
            We also automatically collect certain information when you visit,
            use, or navigate our website. This information does not reveal your
            specific identity but may include:
          </p>
          <ul>
            <li>
              Device and usage information, such as your IP address, browser and
              device characteristics, operating system, language preferences,
              referring URLs, device name, country, location, and information
              about how and when you use our website
            </li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including
            to:
          </p>
          <ul>
            <li>Create and manage your account</li>
            <li>Provide personalized skincare recommendations</li>
            <li>Track your skincare progress over time</li>
            <li>Improve our AI algorithms and recommendation engine</li>
            <li>
              Communicate with you about your account, our services, and
              marketing
            </li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Ensure the security and functionality of our website</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>How We Share Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your
              information with third-party vendors, service providers,
              contractors, or agents who perform services for us or on our
              behalf.
            </li>
            <li>
              <strong>With Business Partners:</strong> We may share your
              information with our business partners to offer you certain
              products, services, or promotions.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal
              information for any other purpose with your consent.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information where required to do so by law or in response to valid
              requests by public authorities.
            </li>
          </ul>

          <h2>Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, such as:
          </p>
          <ul>
            <li>
              The right to access the personal information we have about you
            </li>
            <li>
              The right to request that we correct or update your personal
              information
            </li>
            <li>
              The right to request that we delete your personal information
            </li>
            <li>The right to opt-out of marketing communications</li>
            <li>
              The right to withdraw consent where we rely on consent to process
              your information
            </li>
          </ul>

          <p>
            To exercise these rights, please contact us at privacy@glowsage.com.
          </p>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational
            security measures designed to protect the security of any personal
            information we process. However, despite our safeguards and efforts
            to secure your information, no electronic transmission over the
            Internet or information storage technology can be guaranteed to be
            100% secure.
          </p>

          <h2>Data Retention</h2>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy policy, unless a
            longer retention period is required or permitted by law. When we
            have no ongoing legitimate business need to process your personal
            information, we will either delete or anonymize it.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We
            do not knowingly collect personal information from children under
            16. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we can take necessary actions.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated "Last updated" date and the
            updated version will be effective as soon as it is accessible. We
            encourage you to review this privacy policy frequently to be
            informed of how we are protecting your information.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email
            us at privacy@glowsage.com or contact us at:
          </p>
          <p>
            GlowSage, Inc.
            <br />
            123 Skincare Avenue
            <br />
            San Francisco, CA 94105
            <br />
            United States
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

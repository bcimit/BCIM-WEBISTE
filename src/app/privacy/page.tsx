import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of BCIM Engineering Private Limited — how we collect, use, and protect your personal information.',
}

const LAST_UPDATED = '1 July 2025'

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="section-py bg-white">
        <div className="container-xl max-w-3xl">
          <div className="prose prose-navy max-w-none text-navy-700 leading-relaxed space-y-10">

            <div>
              <p>
                BCIM Engineering Private Limited (&ldquo;BCIM&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website <strong>bcim.in</strong> or contact us through any of our
                digital channels.
              </p>
              <p className="mt-4">
                By using our website, you consent to the practices described in this policy. If you do not
                agree, please discontinue use of our website.
              </p>
            </div>

            <Section title="1. Information We Collect">
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li><strong>Contact form submissions</strong> — your name, email address, phone number, and message content when you fill out our Contact Us or Request a Quote forms.</li>
                <li><strong>Job applications</strong> — your name, email, phone number, years of experience, and cover note when you apply for a position through our Careers page.</li>
                <li><strong>Email correspondence</strong> — any information you include in emails sent to our published addresses.</li>
              </ul>
              <p className="mt-4">We also collect certain information automatically when you visit our website:</p>
              <ul>
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring URL</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your enquiries, quote requests, and job applications</li>
                <li>Provide you with information about our construction services</li>
                <li>Improve our website content and user experience</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Prevent fraud and ensure website security</li>
              </ul>
              <p className="mt-4">
                We will never use your information for unsolicited marketing communications without your
                explicit consent.
              </p>
            </Section>

            <Section title="3. How We Share Your Information">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties.
                We may share information only in the following limited circumstances:
              </p>
              <ul>
                <li><strong>Service providers</strong> — trusted vendors who assist us in operating our website or conducting our business, subject to confidentiality agreements.</li>
                <li><strong>Legal compliance</strong> — when required by applicable law, court order, or governmental authority.</li>
                <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of all or a portion of our assets, with appropriate confidentiality safeguards.</li>
              </ul>
            </Section>

            <Section title="4. Cookies">
              <p>
                Our website uses cookies — small text files stored on your device — to improve your
                browsing experience. These include:
              </p>
              <ul>
                <li><strong>Essential cookies</strong> — required for the website to function correctly.</li>
                <li><strong>Analytics cookies</strong> — help us understand how visitors interact with our website (e.g., Google Analytics). These are anonymised and do not identify you personally.</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings at any time. Note that disabling certain
                cookies may affect website functionality.
              </p>
            </Section>

            <Section title="5. Data Retention">
              <p>
                We retain your personal information only for as long as necessary to fulfil the purposes
                for which it was collected, or as required by law. Enquiry and application data is
                typically retained for 24 months and then securely deleted.
              </p>
            </Section>

            <Section title="6. Data Security">
              <p>
                We implement industry-standard technical and organisational measures to protect your
                personal information against unauthorised access, alteration, disclosure, or destruction.
                As an ISO 9001:2015 certified organisation, information security is embedded in our
                operating procedures.
              </p>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure. We cannot guarantee
                absolute security of data transmitted to our website.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>Under applicable Indian data protection law, you have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for processing at any time</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at the details below.
              </p>
            </Section>

            <Section title="8. Third-Party Links">
              <p>
                Our website may contain links to third-party websites (e.g., Google Maps). We are not
                responsible for the privacy practices or content of those sites and encourage you to
                review their privacy policies independently.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our website is not directed at individuals under the age of 18. We do not knowingly
                collect personal information from minors. If you believe we have inadvertently collected
                such information, please contact us immediately.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page
                with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy
                periodically.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>If you have any questions or concerns about this Privacy Policy, please contact:</p>
              <div className="mt-4 p-5 rounded-xl border border-navy-100 bg-bg text-sm">
                <p className="font-bold text-dark">{COMPANY.name}</p>
                <p className="mt-1">{COMPANY.address}</p>
                <p className="mt-1">Email: <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a></p>
                <p className="mt-1">Phone: <a href={COMPANY.phoneHref} className="text-primary hover:underline">{COMPANY.phone}</a></p>
              </div>
            </Section>

          </div>
        </div>
      </section>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-dark mb-4 pb-2 border-b border-navy-100">{title}</h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-navy-700">
        {children}
      </div>
    </div>
  )
}

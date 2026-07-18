import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { COMPANY } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing use of the BCIM Engineering website and services.',
}

const LAST_UPDATED = '1 July 2025'

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${LAST_UPDATED}`}
      />

      <section className="section-py bg-white">
        <div className="container-xl max-w-3xl">
          <div className="prose prose-navy max-w-none text-navy-700 leading-relaxed space-y-10">

            <div>
              <p>
                Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the website
                located at <strong>bcim.in</strong> operated by BCIM Engineering Private Limited
                (&ldquo;BCIM&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
              </p>
              <p className="mt-4">
                By accessing or using our website, you agree to be bound by these Terms. If you disagree
                with any part, please do not use our website.
              </p>
            </div>

            <Section title="1. Use of Website">
              <p>
                This website is provided for informational purposes about BCIM Engineering&rsquo;s construction
                services, projects, and career opportunities. You may use this website only for lawful
                purposes and in a manner that does not infringe the rights of others.
              </p>
              <p className="mt-3">You agree not to:</p>
              <ul>
                <li>Use the website in any way that violates applicable Indian or international laws</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material</li>
                <li>Attempt to gain unauthorised access to any part of the website or its related systems</li>
                <li>Use automated tools (bots, scrapers) to access or collect data from the website without our written consent</li>
                <li>Impersonate BCIM Engineering or its employees</li>
              </ul>
            </Section>

            <Section title="2. Intellectual Property">
              <p>
                All content on this website — including text, graphics, logos, photographs, project
                images, and software — is the property of BCIM Engineering Private Limited or its content
                suppliers and is protected under applicable Indian copyright, trademark, and intellectual
                property laws.
              </p>
              <p className="mt-3">
                You may view and print pages for personal, non-commercial use only. No content may be
                reproduced, distributed, modified, or used commercially without our prior written
                permission.
              </p>
            </Section>

            <Section title="3. Construction Services — No Contract by Website">
              <p>
                Information on this website about our construction services, capabilities, project
                portfolio, and pricing indicatives is provided for general informational purposes only.
              </p>
              <p className="mt-3">
                <strong>Nothing on this website constitutes a binding contract, offer, or guarantee
                of services.</strong> All construction engagements are governed exclusively by signed
                contracts executed between BCIM Engineering and the respective client. Quote estimates
                submitted via our website forms are preliminary enquiries only and do not represent a
                contractual commitment.
              </p>
            </Section>

            <Section title="4. Accuracy of Information">
              <p>
                We endeavour to keep information on this website accurate and up to date. However, we
                make no representations or warranties — express or implied — about the completeness,
                accuracy, reliability, or suitability of any information on the website.
              </p>
              <p className="mt-3">
                Project details, team information, and certifications displayed are subject to change.
                For the most current information, please contact us directly.
              </p>
            </Section>

            <Section title="5. Third-Party Links">
              <p>
                Our website may contain links to third-party websites for your convenience (e.g.,
                Google Maps, LinkedIn). These links do not constitute an endorsement of those websites.
                BCIM Engineering has no control over the content of linked sites and accepts no
                responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, BCIM Engineering Private Limited, its directors,
                employees, and agents shall not be liable for any direct, indirect, incidental, special,
                or consequential loss or damage arising from:
              </p>
              <ul>
                <li>Your use of, or inability to use, this website</li>
                <li>Any errors or omissions in the website content</li>
                <li>Unauthorised access to or alteration of your data</li>
                <li>Any matter beyond our reasonable control</li>
              </ul>
            </Section>

            <Section title="7. Disclaimer of Warranties">
              <p>
                This website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranty
                of any kind, whether express or implied, including but not limited to implied warranties
                of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </Section>

            <Section title="8. Privacy">
              <p>
                Your use of this website is also governed by our{' '}
                <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>,
                which is incorporated into these Terms by reference.
              </p>
            </Section>

            <Section title="9. Governing Law & Jurisdiction">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India.
                Any disputes arising in connection with these Terms or your use of the website shall be
                subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.
              </p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms at any time. Updated Terms will be posted on
                this page with a revised &ldquo;Last updated&rdquo; date. Continued use of the website after
                changes constitutes acceptance of the revised Terms.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>For questions about these Terms, please contact:</p>
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

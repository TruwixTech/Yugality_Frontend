export const metadata = {
  title: "Terms and Conditions | Yugality",
  description: "Read the Terms and Conditions for Yugality.",
};

export default function TermsAndConditions() {
  return (
    <main className="bg-colordark text-colorlight min-h-screen flex flex-col pt-32 pb-24">
      <div className="flex-1 w-full max-w-[800px] mx-auto px-6 lg:px-8">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight mb-4 leading-[1.15]">Terms and Conditions</h1>
        <p className="text-[16px] text-colorlight/50 mb-12">Last updated: March 30, 2026</p>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-medium prose-p:text-colorlight/80 prose-headings:text-colorlight prose-a:text-blue-400">
          <p>
            Welcome to Yugality! These terms and conditions outline the rules and regulations for the use of Yugality&apos;s Website and Application.
          </p>
          <p>
            By accessing this website and application, we assume you accept these terms and conditions. Do not continue to use Yugality if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2>1. License</h2>
          <p>
            Unless otherwise stated, Yugality and/or its licensors own the intellectual property rights for all material on Yugality. All intellectual property rights are reserved. You may access this from Yugality for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from Yugality</li>
            <li>Sell, rent or sub-license material from Yugality</li>
            <li>Reproduce, duplicate or copy material from Yugality</li>
            <li>Redistribute content from Yugality</li>
          </ul>

          <h2>2. Acceptable Use</h2>
          <p>
            You must not use our website or application in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
          </p>

          <h2>3. User Account</h2>
          <p>
            If you create an account on the application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We reserve the right to suspend or terminate accounts that violate our policies.
          </p>

          <h2>4. Legal Disclaimer</h2>
          <p>
            Yugality provides algorithmic automation, document generation, and workflow optimization. The information provided by the software does not constitute legal advice. You should always consult with a qualified legal professional for legal advice and review any generated documents manually.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Yugality, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this website or software whether such liability is under contract. Yugality, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws of the State/Country in which our company is registered, and you submit to the non-exclusive jurisdiction of the state and federal courts located there for the resolution of any disputes.
          </p>
        </div>
      </div>
    </main>
  );
}

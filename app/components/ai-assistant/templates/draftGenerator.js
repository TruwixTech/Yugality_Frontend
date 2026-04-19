export default function generateFullDraft(agreementName = "MASTER SERVICE AGREEMENT") {
  const isPolicy = agreementName.toLowerCase().includes("policy");
  const isResolution = agreementName.toLowerCase().includes("appoint") || agreementName.toLowerCase().includes("resolution");

  if (isResolution) {
    return `**BOARD RESOLUTION**

**${agreementName.toUpperCase()}**

**CERTIFIED TRUE COPY OF THE RESOLUTION PASSED AT THE MEETING OF THE BOARD OF DIRECTORS OF [COMPANY NAME] HELD ON [DATE] AT [TIME] AT THE REGISTERED OFFICE OF THE COMPANY AT [ADDRESS].**

**RESOLVED THAT** pursuant to the provisions of the Companies Act, 2013 and the rules made thereunder (including any statutory modification(s) or re-enactment thereof for the time being in force), and subject to such approvals as may be necessary, the consent of the Board of Directors of the Company be and is hereby accorded to ${agreementName.toLowerCase()}.

**RESOLVED FURTHER THAT** [Name of Appointee], who possesses the requisite qualifications and experience, be and is hereby appointed to the aforementioned position with effect from [Effective Date], on such terms and conditions as determined by the Board and mutually agreed upon.

**RESOLVED FURTHER THAT** any Director or the Company Secretary of the Company be and is hereby authorized to sign and file the necessary forms, returns, and documents with the Registrar of Companies and to do all such acts, deeds, and things as may be necessary to give full effect to this resolution.

**For and on behalf of the Board of Directors**

**[Company Name]**

___________________________

**Name:** [Director Name]

**Title:** Director

**DIN:** [DIN Number]

**Date:** _________________________`;
  }

  if (isPolicy) {
    return `**${agreementName.toUpperCase()}**

**Last Updated:** [Date]

**Effective Date:** [Date]

**1. INTRODUCTION AND SCOPE**
This ${agreementName} (the "Policy") outlines the rules, expectations, and strict legal obligations regarding the use, management, and protection of company assets and legal rights. This Policy applies to all employees, independent contractors, vendors, users, and third-party affiliates (collectively referred to as "Users") interacting with our systems, services, proprietary data, or premises. Compliance with this Policy is mandatory. Failure to adhere to the stipulations set forth herein may result in immediate disciplinary action up to and including termination of employment or contract, restriction of access privileges, or civil/criminal legal action.

**2. DEFINITIONS**
For the purposes of this Policy, the following capitalized terms shall have the designated meanings:
(a) **"Company"** means [Company Legal Name], including all of its subsidiaries, parent entities, and global affiliates.

(b) **"Confidential Information"** refers to any non-public data, trade secrets, business plans, financial records, algorithms, intellectual property, or personally identifiable information (PII) handled by the Company.

(c) **"Applicable Laws"** refers to all state, federal, and international regulations (including but not limited to GDPR, CCPA, and HIPAA where applicable) governing data privacy, digital conduct, and commerce relevant to this Policy.

(d) **"Authorized User"** means any individual explicitly granted access to Company systems via authenticated credentials.

**3. REGULATORY COMPLIANCE AND COMMITMENT**
The Company is strictly committed to conducting business in full compliance with Applicable Laws. Users must proactively ensure that their actions do not solicit, encourage, or facilitate any violations of statutory regulations. The Company reserves the right to audit User activity, investigate potential infractions, and report findings to relevant regulatory or law enforcement agencies without prior notice to the User.

**4. OBLIGATIONS AND ACCEPTABLE USE**
Users shall exercise a standard of reasonable care when interacting with Company property. Specifically, Users shall not:
(i) Circumvent, disable, or attempt to compromise security protocols, firewalls, or encryption mechanisms.

(ii) Distribute, reproduce, or claim ownership over Company Intellectual Property without express written consent.

(iii) Use Company networks to transmit defamatory, harassing, explicitly offensive, or legally prohibited material.

(iv) Introduce malicious software, viruses, or unsolicited bulk communications (spam) into the Company infrastructure.

**5. DATA COLLECTION, PRIVACY, AND RETENTION**
Where this Policy touches upon personal data, the Company strictly limits data collection to what is necessary for legitimate business functions. 

**5.1 Data Handling:** All data shall be encrypted in transit and at rest using industry-standard cryptographic protocols.

**5.2 Data Retention:** The Company shall retain data only for as long as required to fulfill operational needs or statutory archiving requirements, after which it shall be permanently deleted or securely anonymized.

**6. INTELLECTUAL PROPERTY RIGHTS**
All right, title, and interest in and to the Company's services, software, trademarks, and documentation shall remain the exclusive property of the Company. Nothing in this Policy shall be construed as granting any User a license to use such Intellectual Property outside the scope of explicitly authorized operations.

**7. ENFORCEMENT AND AUDIT RIGHTS**
The Company maintains the absolute right to monitor, intercept, and review all communications and activities conducted on its networks. Users represent that they have no expectation of privacy when utilizing Company-provided hardware or software. Upon reasonable suspicion of a breach, the Company may seize devices and quarantine accounts pending a comprehensive forensic investigation.

**8. LIMITATION OF LIABILITY**
To the maximum extent permitted by Applicable Laws, the Company shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of the User's violation of this Policy, including loss of profits or data breaches resulting from User negligence.

**9. MODIFICATIONS AND AMENDMENTS**
The Company reserves the right, at its sole discretion, to modify, amend, or completely restate this Policy at any time. Material changes will be communicated via official corporate channels. Continued interaction with the Company following such notice constitutes explicit acceptance of the updated terms.

**10. GOVERNING LAW AND DISPUTE RESOLUTION**
This Policy and any disputes arising out of it shall be governed by the laws of the State of [State], without regard to conflict of law principles. Any legal action or proceeding related to this Policy shall be instituted exclusively in the state or federal courts located in [County/City], [State].

**ACKNOWLEDGMENT**
By proceeding to use the Company's systems, sign employment contracts, or utilize our services, you formally acknowledge that you have read, understood, and agreed to be legally bound by this ${agreementName}.`;
  } else {
    return `**${agreementName.toUpperCase()}**

**THIS ${agreementName.toUpperCase()}** (the "Agreement") is made and entered into as of the [Day] day of [Month], [Year] (the "Effective Date"), by and between:

**[PARTY A LEGAL NAME]**, a [State] [Entity Type] with its principal place of business at [Address of Party A] (hereinafter referred to as "Party A"), and 

**[PARTY B LEGAL NAME]**, a [State] [Entity Type] with its principal place of business at [Address of Party B] (hereinafter referred to as "Party B").

Party A and Party B may be referred to individually as a "Party" and collectively as the "Parties."

***RECITALS***

**WHEREAS**, Party A possesses specific expertise, assets, and operational resources related to [Industry/Domain];

**WHEREAS**, Party B desires to engage Party A under the terms and conditions outlined herein;

**WHEREAS**, both Parties wish to formally codify their mutual understandings, representations, warranties, and strict legal obligations regarding the prospective transaction/relationship.

**NOW, THEREFORE**, in consideration of the mutual covenants, promises, and adequate considerations contained herein, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

**1. SCOPE OF AGREEMENT AND PERFORMANCE OBLIGATIONS**

**1.1 General Scope:** Party A agrees to provide, and Party B agrees to accept and compensate for, the deliverables, services, or assets explicitly detailed in Exhibit A (the "Scope of Work" or "Subject Matter"), attached hereto and incorporated by reference.

**1.2 Standard of Performance:** Party A shall execute its obligations with a high degree of professional skill, utilizing industry-best practices. Party A warrants that all deliverables will conform exactly to the specifications provided by Party B.

**1.3 Timelines:** Time is of the essence. Both Parties shall strictly adhere to the milestones and deadlines stipulated in Exhibit A. Unexcused delays exceeding [Number] days shall constitute a material breach.

**2. COMPENSATION AND PAYMENT TERMS**

**2.1 Fees:** In exchange for the obligations rendered, Party B shall pay Party A the sum of [Amount in Words] Dollars ($[Amount in Numbers]) (the "Consideration").

**2.2 Invoicing:** Party A shall submit invoices on a [Monthly/Milestone] basis. Party B shall remit payment within net thirty (30) days of invoice receipt.

**2.3 Late Penalties:** Any overdue balances shall accrue interest at a rate of one and one-half percent (1.5%) per month, or the highest rate permitted by law, whichever is lower.

**3. REPRESENTATIONS AND WARRANTIES**

**3.1 Mutual Representations:** Each Party represents and warrants that it has the full legal authority to enter into this Agreement and that executing this Agreement does not violate any prior contractual obligations.

**3.2 No Infringement:** Party A warrants that no deliverables provided under this Agreement will infringe upon the intellectual property, patent, or copyright of any third party.

**4. CONFIDENTIALITY AND NON-DISCLOSURE**

**4.1 Confidential Information:** During the term of this Agreement and for a period of five (5) years thereafter, neither Party shall disclose, distribute, or exploit the other Party's Proprietary Information (including trade secrets, client lists, and financial data) without prior written authorization.

**4.2 Exclusions:** Confidential Information does not include information that is explicitly public knowledge, lawfully obtained from a third party, or independently developed without reference to the disclosing Party's data.

**5. INDEMNIFICATION AND LIABILITY**

**5.1 Indemnification:** Party A agrees to indemnify, defend, and hold harmless Party B (and its officers, directors, and employees) from any claims, damages, liabilities, and expenses (including reasonable attorney's fees) arising directly from Party A's gross negligence, willful misconduct, or breach of Section 3.

**5.2 Limitation of Liability:** IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES (INCLUDING LOST PROFITS), EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, EXCEPT FOR BREACHES OF CONFIDENTIALITY OR INDEMNIFICATION OBLIGATIONS.

**6. TERM AND TERMINATION**

**6.1 Term:** This Agreement shall commence on the Effective Date and remain in full force and effect until [Termination Date], unless earlier terminated in accordance with this Section.

**6.2 Termination for Cause:** Either Party may terminate this Agreement immediately upon written notice if the other Party materially breaches any provision herein and fails to cure such breach within fifteen (15) days of receiving notice.

**6.3 Effect of Termination:** Upon termination, all outstanding payment obligations shall become immediately due, and both Parties shall promptly return or destroy all Confidential Information.

**7. GENERAL PROVISIONS**

**7.1 Governing Law:** This Agreement shall be construed, interpreted, and governed in accordance with the laws of the State of [State], completely excluding any conflict of law provisions.

**7.2 Dispute Resolution:** Any controversy or claim arising out of this Agreement shall be settled by binding arbitration in [City, State], administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules.

**7.3 Entire Agreement:** This document constitutes the entire integrated agreement between the Parties and supersedes all prior communications, understandings, or agreements, whether oral or written.

**7.4 Severability:** If any provision of this Agreement is deemed legally invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not affect the enforceability of the remaining provisions.

**7.5 Counterparts:** This Agreement may be executed in multiple counterparts, including via digital signatures, each of which shall be deemed an original, but all of which together shall constitute one binding instrument.

**IN WITNESS WHEREOF**, the Parties hereto have caused this Agreement to be executed by their duly authorized representatives as of the Effective Date.

**PARTY A:**

By: ___________________________

Name: [Signatory Name]

Title: [Signatory Title]

Date: _________________________

**PARTY B:**

By: ___________________________

Name: [Signatory Name]

Title: [Signatory Title]

Date: _________________________`;
  }
}

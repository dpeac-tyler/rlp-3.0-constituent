import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Send,
  Search,
  FileText,
  Clock,
  DollarSign,
  HelpCircle,
  AlertTriangle,
  Headphones,
  Star,
  ExternalLink,
  Loader2,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

// ── P.E.T.E.R. Government Seal ────────────────────────────────────────────────

function PeterSeal({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="58" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="60" cy="60" r="55" stroke="#FFFFFF" strokeWidth="0.75" fill="none" opacity="0.15" />
      {/* Main badge background */}
      <circle cx="60" cy="60" r="52" fill="#0A3161" />
      {/* Inner decorative ring */}
      <circle cx="60" cy="60" r="46" stroke="#FFFFFF" strokeWidth="0.75" fill="none" opacity="0.25" />
      <circle cx="60" cy="60" r="43" stroke="#FFFFFF" strokeWidth="0.5" fill="none" opacity="0.12" />
      {/* Shield motif */}
      <path
        d="M60 28 L78 38 L78 56 C78 68 70 78 60 82 C50 78 42 68 42 56 L42 38 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        opacity="0.35"
      />
      {/* Inner shield fill */}
      <path
        d="M60 32 L74 40 L74 55 C74 65 67 74 60 77 C53 74 46 65 46 55 L46 40 Z"
        fill="#FFFFFF"
        opacity="0.08"
      />
      {/* Checkmark guidance motif inside shield */}
      <path
        d="M52 54 L57 59 L68 48"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      {/* Subtle guidance lines below checkmark */}
      <line x1="50" y1="66" x2="70" y2="66" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
      <line x1="53" y1="70" x2="67" y2="70" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" strokeLinecap="round" />
      {/* Circular text path – decorative dots */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 - 90) * (Math.PI / 180);
        const r = 48.5;
        return (
          <circle
            key={i}
            cx={60 + r * Math.cos(angle)}
            cy={60 + r * Math.sin(angle)}
            r="0.6"
            fill="#FFFFFF"
            opacity="0.2"
          />
        );
      })}
      {/* Bottom arc text area */}
      <text
        x="60"
        y="96"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="6"
        fontFamily="'Roboto', sans-serif"
        fontWeight="500"
        letterSpacing="2.5"
        opacity="0.5"
      >
        DIGITAL GUIDE
      </text>
    </svg>
  );
}

function PeterSealCompact({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="58" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.25" />
      <circle cx="60" cy="60" r="54" fill="#0A3161" />
      <circle cx="60" cy="60" r="47" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.2" />
      {/* Shield */}
      <path
        d="M60 26 L80 38 L80 58 C80 72 71 82 60 86 C49 82 40 72 40 58 L40 38 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M60 32 L75 42 L75 56 C75 68 68 76 60 80 C52 76 45 68 45 56 L45 42 Z"
        fill="#FFFFFF"
        opacity="0.07"
      />
      {/* Checkmark */}
      <path
        d="M50 56 L56 62 L70 48"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
}

function PeterSealLauncher({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="56" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="60" cy="60" r="50" fill="rgba(255,255,255,0.12)" />
      {/* Shield */}
      <path
        d="M60 24 L82 36 L82 58 C82 74 72 84 60 88 C48 84 38 74 38 58 L38 36 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity="0.4"
      />
      <path
        d="M60 30 L77 40 L77 56 C77 70 69 79 60 83 C51 79 43 70 43 56 L43 40 Z"
        fill="#FFFFFF"
        opacity="0.1"
      />
      {/* Checkmark */}
      <path
        d="M48 56 L55 63 L72 46"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Decorative ring dots */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 - 90) * (Math.PI / 180);
        const r = 53;
        return (
          <circle
            key={i}
            cx={60 + r * Math.cos(angle)}
            cy={60 + r * Math.sin(angle)}
            r="1"
            fill="#FFFFFF"
            opacity="0.25"
          />
        );
      })}
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  sender: "system" | "user";
  content: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  articles?: Article[];
  highlight?: string;
  isSearching?: boolean;
  prefillData?: Record<string, string>;
}

interface QuickReply {
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface Article {
  title: string;
  url: string;
  isMostCommon?: boolean;
}

// ── Conversation Flow Data ─────────────────────────────────────────────────────

const MAIN_MENU_REPLIES: QuickReply[] = [
  { label: "Apply for a Permit", action: "apply_permit", icon: <FileText size={14} /> },
  { label: "Application Status", action: "app_status", icon: <Search size={14} /> },
  { label: "Fees & Payments", action: "fees", icon: <DollarSign size={14} /> },
  { label: "Required Documents", action: "documents", icon: <FileText size={14} /> },
  { label: "Account Help", action: "account_help", icon: <HelpCircle size={14} /> },
  { label: "Rejected Applications", action: "rejected", icon: <AlertTriangle size={14} /> },
  { label: "Processing Times", action: "processing", icon: <Clock size={14} /> },
  { label: "Escalate to Support", action: "escalate", icon: <Headphones size={14} /> },
];

const PERMIT_TYPES: QuickReply[] = [
  { label: "General Business Permit", action: "permit_general" },
  { label: "Professional License", action: "permit_professional" },
  { label: "Contractor License", action: "permit_contractor" },
  { label: "Food Service Permit", action: "permit_food" },
  { label: "Return to Main Menu", action: "main_menu" },
];

const APPLICANT_TYPES: QuickReply[] = [
  { label: "Individual", action: "applicant_individual" },
  { label: "Business Asset", action: "applicant_asset" },
  { label: "Government Agency", action: "applicant_government" },
  { label: "Back", action: "apply_permit" },
];

const ESCALATION_REASONS: QuickReply[] = [
  { label: "Technical Issue", action: "escalate_technical" },
  { label: "Application Problem", action: "escalate_application" },
  { label: "Payment Dispute", action: "escalate_payment" },
  { label: "General Inquiry", action: "escalate_general" },
  { label: "Return to Main Menu", action: "main_menu" },
];

// ── Helper ─────────────────────────────────────────────────────────────────────

let msgId = 0;
function createMsg(
  sender: "system" | "user",
  content: string,
  extras?: Partial<Message>
): Message {
  return {
    id: `msg-${++msgId}`,
    sender,
    content,
    timestamp: new Date(),
    ...extras,
  };
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [prefill, setPrefill] = useState<Record<string, string>>({});
  const [hasGreeted, setHasGreeted] = useState(false);
  const [contextMode, setContextMode] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isSearching]);

  const addSystemMessage = useCallback(
    (content: string, extras?: Partial<Message>, delay = 800) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, createMsg("system", content, extras)]);
      }, delay);
    },
    []
  );

  const addSearchThenRespond = useCallback(
    (content: string, extras?: Partial<Message>) => {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, createMsg("system", content, extras)]);
        }, 900);
      }, 1500);
    },
    []
  );

  // Listen for external open events (e.g. from "support" link)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const context = detail?.context as string | undefined;

      // Reset conversation state for contextual open
      setMessages([]);
      setIsTyping(false);
      setIsSearching(false);
      setHasGreeted(true); // prevent default greeting
      setContextMode(context ?? null);
      setIsOpen(true);

      if (context === "username_support") {
        // First message: the contextual info
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages([
              createMsg(
                "system",
                "Usernames are managed by your assigned agency and cannot be modified within this portal.\n\nFor assistance, please contact:",
              ),
            ]);
            // Second message: contact card after a brief delay
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                  ...prev,
                  createMsg(
                    "system",
                    "Department of Regulatory & Licensing Services\n\nPhone: (555) 555-5555\nEmail: support@agency.gov\n\nOffice Hours:\n  Monday -- Friday, 8:00 AM -- 5:00 PM EST\n  Closed on federal holidays",
                    {
                      quickReplies: [
                        { label: "Account Help", action: "account_help", icon: <HelpCircle size={14} /> },
                        { label: "Escalate to Support", action: "escalate", icon: <Headphones size={14} /> },
                        { label: "Return to Main Menu", action: "main_menu" },
                      ],
                      articles: [
                        {
                          title: "Username & Account Management Policy",
                          url: "#",
                          isMostCommon: true,
                        },
                        { title: "How to Contact Your Assigned Agency", url: "#" },
                        { title: "Account Transfer Procedures", url: "#" },
                      ],
                    }
                  ),
                ]);
              }, 700);
            }, 400);
          }, 600);
        }, 300);
      }
    };

    window.addEventListener("peter:open", handler);
    return () => window.removeEventListener("peter:open", handler);
  }, []);

  // Initial greeting
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      addSystemMessage(
        "Welcome to P.E.T.E.R., the Permitting Engagement Resource Platform. This system provides guided assistance for licensing, permitting, and regulatory services.\n\nSelect a topic below to begin.",
        {
          quickReplies: MAIN_MENU_REPLIES,
        },
        600
      );
    }
  }, [isOpen, hasGreeted, addSystemMessage]);

  // ── Action Handler ─────────────────────────────────────────────────────────

  const handleAction = (action: string, label: string) => {
    setMessages((prev) => [...prev, createMsg("user", label)]);

    switch (action) {
      case "main_menu":
        addSystemMessage("Select a topic to continue.", {
          quickReplies: MAIN_MENU_REPLIES,
        });
        break;

      case "apply_permit":
        addSearchThenRespond(
          "To initiate a permit application, please first identify the permit type. Select from the options below or refer to the linked knowledge base articles for additional guidance.",
          {
            quickReplies: PERMIT_TYPES,
            articles: [
              {
                title: "Complete Guide to Permit Applications",
                url: "#",
                isMostCommon: true,
              },
              { title: "Permit Types & Requirements Overview", url: "#" },
              { title: "First-Time Applicant Checklist", url: "#" },
            ],
          }
        );
        break;

      case "permit_general":
      case "permit_professional":
      case "permit_contractor":
      case "permit_food": {
        const permitName = label;
        setPrefill((prev) => ({ ...prev, permitType: permitName }));
        addSystemMessage(
          `Permit type recorded: ${permitName}.\n\nPlease identify your applicant classification to proceed.`,
          { quickReplies: APPLICANT_TYPES }
        );
        break;
      }

      case "applicant_individual":
      case "applicant_asset":
      case "applicant_government": {
        const category = label;
        const finalPrefill = { ...prefill, applicantCategory: category };
        setPrefill(finalPrefill);
        addSystemMessage(
          `Application parameters confirmed:\n\n  Permit Type: ${finalPrefill.permitType}\n  Applicant Classification: ${category}\n\nThe intake form will be pre-populated with this information. Select "Proceed to Intake Form" to continue.`,
          {
            quickReplies: [
              {
                label: "Proceed to Intake Form",
                action: "launch_form",
                icon: <ExternalLink size={14} />,
              },
              { label: "Modify Selection", action: "apply_permit" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            prefillData: finalPrefill,
          }
        );
        break;
      }

      case "launch_form":
        addSystemMessage(
          "Initiating permit intake form with pre-populated data. In a production environment, this action navigates to the intake page with all collected parameters passed as application state.",
          {
            quickReplies: [
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          },
          1200
        );
        break;

      case "app_status":
        addSearchThenRespond(
          "Application status can be reviewed in the Submissions section of your account dashboard.\n\nStandard status definitions:\n\n  Under Review -- Application is being evaluated\n  Pending Documents -- Additional documentation required\n  Approved -- Ready for issuance\n  Returned -- Corrections have been requested",
          {
            quickReplies: [
              { label: "Navigate to Submissions", action: "nav_submissions", icon: <ExternalLink size={14} /> },
              { label: "What does 'Returned' mean?", action: "status_returned" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "Understanding Application Statuses",
                url: "#",
                isMostCommon: true,
              },
              { title: "How to Track Your Application", url: "#" },
            ],
            highlight: "Under Review",
          }
        );
        break;

      case "nav_submissions":
        addSystemMessage(
          "Routing to the Submissions page. In production, this navigates to /submissions with contextual state preserved.",
          {
            quickReplies: [
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "status_returned":
        addSystemMessage(
          "A \"Returned\" status indicates the reviewing agency has identified items requiring correction. Specific instructions are provided in the submission detail view.\n\nThis is not a rejection. Corrections can be made and the application resubmitted without additional fees.",
          {
            quickReplies: [
              { label: "Navigate to Submissions", action: "nav_submissions", icon: <ExternalLink size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            highlight: "not a rejection",
          }
        );
        break;

      case "fees":
        addSearchThenRespond(
          "Fee and payment information:\n\n  Application fees are non-refundable and due at time of submission\n  Accepted methods: Credit/Debit Card, ACH Transfer, eCheck\n  Renewal fees are generally lower than initial application fees\n  Fee schedules vary by permit type and jurisdiction",
          {
            quickReplies: [
              { label: "View Fee Schedule", action: "fee_schedule" },
              { label: "Payment Issues", action: "payment_issues" },
              { label: "Refund Policy", action: "refund_policy" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "Complete Fee Schedule for All Permit Types",
                url: "#",
                isMostCommon: true,
              },
              { title: "Accepted Payment Methods", url: "#" },
              { title: "Understanding Processing Fees", url: "#" },
            ],
          }
        );
        break;

      case "fee_schedule":
        addSystemMessage(
          "Representative fee ranges by permit type:\n\n  General Business Permit: $75 -- $250\n  Professional License: $100 -- $500\n  Contractor License: $150 -- $400\n  Food Service Permit: $200 -- $600\n\nFinal fees are calculated during the application process based on specific requirements and jurisdiction.",
          {
            quickReplies: [
              { label: "Apply for a Permit", action: "apply_permit", icon: <FileText size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "payment_issues":
        addSystemMessage(
          "Common payment resolution steps:\n\n  1. Verify card details and billing address accuracy\n  2. Confirm the transaction has not been blocked by your financial institution\n  3. Attempt an alternative payment method\n  4. Clear browser cache and retry\n\nIf the issue persists, this matter can be escalated to the support team.",
          {
            quickReplies: [
              { label: "Escalate to Support", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "refund_policy":
        addSystemMessage(
          "Refund Policy Summary:\n\n  Application fees are generally non-refundable once submitted\n  Duplicate payments are refunded within 5--10 business days\n  Overpayments are automatically credited to the account\n  Payment disputes require a transaction ID for processing\n\nFor dispute resolution, please escalate to the support team.",
          {
            quickReplies: [
              { label: "Escalate to Support", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "documents":
        addSearchThenRespond(
          "Commonly required documentation across permit types:\n\n  Government-issued Photo ID\n  Proof of Business Registration\n  Professional Certifications or Diplomas\n  Insurance Certificate (COI)\n  Background Check Authorization\n  Surety Bond (where applicable)\n\nSpecific requirements vary by permit type. Refer to the linked articles for detailed guidance.",
          {
            quickReplies: [
              { label: "Document Format Requirements", action: "doc_format" },
              { label: "Upload Troubleshooting", action: "doc_upload" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "Document Requirements by Permit Type",
                url: "#",
                isMostCommon: true,
              },
              { title: "How to Upload Documents", url: "#" },
              { title: "Accepted File Formats", url: "#" },
            ],
          }
        );
        break;

      case "doc_format":
        addSystemMessage(
          "Accepted document specifications:\n\n  PDF format preferred (maximum 10MB)\n  JPEG/PNG for photographic evidence (maximum 5MB)\n  TIFF for scanned documents\n\nAll submissions must be clearly legible and unaltered. Color scans at 300 DPI minimum resolution are recommended.",
          {
            quickReplies: [
              { label: "Upload Troubleshooting", action: "doc_upload" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "doc_upload":
        addSystemMessage(
          "Document upload troubleshooting:\n\n  1. Verify file size compliance (PDF: 10MB, Images: 5MB)\n  2. Ensure the file is not password-protected\n  3. Use a supported browser (Chrome recommended)\n  4. Compress oversized files with a PDF optimization tool\n  5. Temporarily disable browser extensions that may interfere\n\nIf the issue persists, this can be escalated to technical support.",
          {
            quickReplies: [
              { label: "Escalate to Support", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "account_help":
        addSearchThenRespond(
          "Select the account service you require assistance with.",
          {
            quickReplies: [
              { label: "Reset Password", action: "reset_password" },
              { label: "Update Profile Information", action: "update_profile" },
              { label: "Link a Business Asset", action: "link_asset" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "Managing Your Account Settings",
                url: "#",
                isMostCommon: true,
              },
              { title: "Multi-Asset Account Setup", url: "#" },
            ],
          }
        );
        break;

      case "reset_password":
        addSystemMessage(
          "Password reset procedure:\n\n  1. Select \"Forgot Password\" on the login page\n  2. Enter your registered email address\n  3. Check your inbox and spam folder for the reset link\n  4. Create a new password meeting the following requirements:\n     -- Minimum 12 characters\n     -- At least one uppercase letter\n     -- At least one number\n     -- At least one special character\n\nReset links expire after 24 hours.",
          {
            quickReplies: [
              { label: "Did not receive email", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "update_profile":
        addSystemMessage(
          "Most profile information can be updated directly through Account Settings. Legal name changes require supporting documentation.\n\nTo update your profile:\n  1. Navigate to Account Settings\n  2. Select \"Edit Profile\"\n  3. Apply changes and save\n\nFor legal name changes, submit a formal name change request with appropriate documentation.",
          {
            quickReplies: [
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "link_asset":
        addSystemMessage(
          "To affiliate a business asset with your account:\n\n  1. Navigate to \"My Assets\" in the sidebar\n  2. Select \"Add Asset\"\n  3. Enter the Asset ID or search by name\n  4. Submit the affiliation request\n\nThe asset administrator must approve the request. Status can be monitored under Affiliations, Pending.",
          {
            quickReplies: [
              { label: "Navigate to Affiliations", action: "nav_affiliations", icon: <ExternalLink size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "nav_affiliations":
        addSystemMessage(
          "Routing to the Affiliations section. In production, this navigates to /affiliations/pending.",
          {
            quickReplies: [
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "rejected":
        addSearchThenRespond(
          "Application rejections are typically resolvable. Common causes include:\n\n  Incomplete or missing documentation\n  Information discrepancies\n  Unmet eligibility requirements\n  Expired supporting documents\n\nIn most cases, applicants may reapply after addressing the issues specified in the rejection notice.",
          {
            quickReplies: [
              { label: "View Rejection Details", action: "rejection_details" },
              { label: "Appeal a Decision", action: "appeal" },
              { label: "Reapply for Permit", action: "apply_permit", icon: <FileText size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "What To Do After a Rejection",
                url: "#",
                isMostCommon: true,
              },
              { title: "Appeal Process Overview", url: "#" },
            ],
            highlight: "typically resolvable",
          }
        );
        break;

      case "rejection_details":
        addSystemMessage(
          "To review rejection details:\n\n  1. Navigate to Submissions in the sidebar\n  2. Locate the rejected application\n  3. Select \"View Details\"\n  4. Review the rejection reason and required actions under \"Review Notes\"\n\nFor clarification on noted issues, this matter can be escalated to a support representative.",
          {
            quickReplies: [
              { label: "Navigate to Submissions", action: "nav_submissions", icon: <ExternalLink size={14} /> },
              { label: "Escalate to Support", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "appeal":
        addSystemMessage(
          "Appeal procedure:\n\n  1. Submit a formal appeal within 30 days of the rejection date\n  2. Include any new documentation or supporting evidence\n  3. Reference your original application number\n  4. Clearly state the grounds for the appeal\n\nAppeals are reviewed within 15--20 business days. A written decision will be provided via registered email.",
          {
            quickReplies: [
              { label: "Escalate to Support", action: "escalate" },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "processing":
        addSearchThenRespond(
          "Current estimated processing timelines:\n\n  General Business Permit: 5--10 business days\n  Professional License: 10--15 business days\n  Contractor License: 15--20 business days\n  Food Service Permit: 10--15 business days\n  Renewals: 3--5 business days\n\nTimelines are estimates and may vary based on submission volume and application completeness.",
          {
            quickReplies: [
              { label: "Expedited Processing", action: "expedited" },
              { label: "Check Application Status", action: "app_status", icon: <Search size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
            articles: [
              {
                title: "Current Processing Times by Permit Type",
                url: "#",
                isMostCommon: true,
              },
              { title: "Tips to Avoid Processing Delays", url: "#" },
            ],
          }
        );
        break;

      case "expedited":
        addSystemMessage(
          "Expedited processing is available for eligible permit types:\n\n  Standard expedite (2x processing speed): +$50\n  Rush processing (3x processing speed): +$150\n\nEligibility is determined during the application process. The expedited option will be presented if available for your permit type.",
          {
            quickReplies: [
              { label: "Apply for a Permit", action: "apply_permit", icon: <FileText size={14} /> },
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          }
        );
        break;

      case "escalate":
        addSystemMessage(
          "To route your case to the appropriate support team, please select the category that best describes your request.",
          { quickReplies: ESCALATION_REASONS }
        );
        break;

      case "escalate_technical":
      case "escalate_application":
      case "escalate_payment":
      case "escalate_general": {
        const reason = label;
        addSystemMessage(
          `Support case created.\n\n  Category: ${reason}\n  Case Reference: RLP-${Math.floor(10000 + Math.random() * 90000)}\n  Date Filed: ${new Date().toLocaleDateString()}\n  Response Time: Within 1 business day\n\nA support representative will contact you via your registered email address. This case reference number can also be used when contacting the support line directly.`,
          {
            quickReplies: [
              { label: "Return to Main Menu", action: "main_menu" },
            ],
          },
          1400
        );
        break;
      }

      default:
        addSystemMessage(
          "That selection was not recognized. Please choose from the available options below.",
          { quickReplies: MAIN_MENU_REPLIES }
        );
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 420,
            maxHeight: "calc(100vh - 120px)",
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            boxShadow:
              "0 12px 48px rgba(10,49,97,0.20), 0 2px 8px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            fontFamily: "'Roboto', sans-serif",
            animation: "peterSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header — Branded */}
          <div
            style={{
              background: "linear-gradient(180deg, #0A3161 0%, #112E51 100%)",
              padding: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top bar with close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "8px 12px 0 12px",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close P.E.T.E.R. panel"
                style={{
                  backgroundColor: "transparent",
                  borderTopWidth: 0,
                  borderTopStyle: "none",
                  borderTopColor: "transparent",
                  borderRightWidth: 0,
                  borderRightStyle: "none",
                  borderRightColor: "transparent",
                  borderBottomWidth: 0,
                  borderBottomStyle: "none",
                  borderBottomColor: "transparent",
                  borderLeftWidth: 0,
                  borderLeftStyle: "none",
                  borderLeftColor: "transparent",
                  cursor: "pointer",
                  padding: 4,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onFocus={(e) =>
                  (e.currentTarget.style.outline = "2px solid #73B3E7")
                }
                onBlur={(e) => (e.currentTarget.style.outline = "none")}
              >
                <X size={18} color="#A9C4E0" />
              </button>
            </div>

            {/* Seal + Identity */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4px 20px 18px 20px",
                gap: 10,
              }}
            >
              <PeterSeal size={52} />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: 18,
                    lineHeight: "22px",
                    letterSpacing: "3px",
                  }}
                >
                  P.E.T.E.R.
                </div>
                <div
                  style={{
                    color: "#A9C4E0",
                    fontSize: 11,
                    lineHeight: "16px",
                    fontWeight: 400,
                    letterSpacing: "0.5px",
                    marginTop: 2,
                  }}
                >
                  Permitting Engagement Resource Platform
                </div>
                <div
                  style={{
                    color: "#73B3E7",
                    fontSize: 10,
                    lineHeight: "14px",
                    fontWeight: 500,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginTop: 4,
                    opacity: 0.8,
                  }}
                >
                  Digital Licensing Guide
                </div>
              </div>
            </div>

            {/* Thin accent line */}
            <div
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, transparent 0%, #005EA2 30%, #73B3E7 50%, #005EA2 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              backgroundColor: "#F7F9FC",
              minHeight: 280,
              maxHeight: 400,
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {/* Message Bubble */}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  {msg.sender === "system" && (
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        minWidth: 28,
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      <PeterSealCompact size={28} />
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius:
                        msg.sender === "user"
                          ? "12px 12px 2px 12px"
                          : "12px 12px 12px 2px",
                      backgroundColor:
                        msg.sender === "user" ? "#0A3161" : "#FFFFFF",
                      color: msg.sender === "user" ? "#FFFFFF" : "#1B1B1B",
                      fontSize: 13,
                      lineHeight: "20px",
                      whiteSpace: "pre-line",
                      boxShadow:
                        msg.sender === "system"
                          ? "0 1px 3px rgba(0,0,0,0.06)"
                          : "none",
                    }}
                  >
                    {msg.highlight
                      ? msg.content
                          .split(msg.highlight)
                          .map((part, i, arr) =>
                            i < arr.length - 1 ? (
                              <span key={i}>
                                {part}
                                <span
                                  style={{
                                    backgroundColor: "#FFF1D2",
                                    padding: "1px 4px",
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    color: "#1B1B1B",
                                  }}
                                >
                                  {msg.highlight}
                                </span>
                              </span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )
                      : msg.content}
                  </div>
                </div>

                {/* Articles */}
                {msg.articles && msg.articles.length > 0 && (
                  <div
                    style={{
                      marginLeft: 36,
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: "#71767A",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      Knowledge Base References
                    </div>
                    {msg.articles.map((article) => (
                      <a
                        key={article.title}
                        href={article.url}
                        onClick={(e) => e.preventDefault()}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 10px",
                          backgroundColor: article.isMostCommon
                            ? "#FFF1D2"
                            : "#FFFFFF",
                          borderRadius: 6,
                          fontSize: 12,
                          color: "#005EA2",
                          textDecoration: "none",
                          borderLeftWidth: 3,
                          borderLeftStyle: "solid",
                          borderLeftColor: article.isMostCommon
                            ? "#E5A000"
                            : "transparent",
                          transition: "background-color 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            article.isMostCommon ? "#FFE4A0" : "#F0F0F0")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            article.isMostCommon ? "#FFF1D2" : "#FFFFFF")
                        }
                        onFocus={(e) =>
                          (e.currentTarget.style.outline =
                            "2px solid #005EA2")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.outline = "none")
                        }
                      >
                        {article.isMostCommon && (
                          <Star size={11} color="#E5A000" fill="#E5A000" />
                        )}
                        <FileText size={11} />
                        <span style={{ flex: 1 }}>{article.title}</span>
                        {article.isMostCommon && (
                          <span
                            style={{
                              fontSize: 9,
                              backgroundColor: "#B07800",
                              color: "#FFFFFF",
                              padding: "1px 5px",
                              borderRadius: 3,
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                              letterSpacing: "0.3px",
                            }}
                          >
                            RECOMMENDED
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}

                {/* Quick Replies */}
                {msg.quickReplies &&
                  msg.id === messages[messages.length - 1]?.id && (
                    <div
                      style={{
                        marginLeft: 36,
                        marginTop: 10,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                      }}
                    >
                      {msg.quickReplies.map((qr) => (
                        <button
                          key={qr.action + qr.label}
                          onClick={() => handleAction(qr.action, qr.label)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "7px 12px",
                            borderRadius: 6,
                            backgroundColor: "#FFFFFF",
                            borderTopWidth: 1,
                            borderTopStyle: "solid",
                            borderTopColor: "#005EA2",
                            borderRightWidth: 1,
                            borderRightStyle: "solid",
                            borderRightColor: "#005EA2",
                            borderBottomWidth: 1,
                            borderBottomStyle: "solid",
                            borderBottomColor: "#005EA2",
                            borderLeftWidth: 1,
                            borderLeftStyle: "solid",
                            borderLeftColor: "#005EA2",
                            color: "#005EA2",
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: "pointer",
                            fontFamily: "'Roboto', sans-serif",
                            transition:
                              "background-color 0.15s, color 0.15s, box-shadow 0.15s",
                            letterSpacing: "0.1px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#0A3161";
                            e.currentTarget.style.color = "#FFFFFF";
                            e.currentTarget.style.borderTopColor = "#0A3161";
                            e.currentTarget.style.borderRightColor = "#0A3161";
                            e.currentTarget.style.borderBottomColor = "#0A3161";
                            e.currentTarget.style.borderLeftColor = "#0A3161";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#FFFFFF";
                            e.currentTarget.style.color = "#005EA2";
                            e.currentTarget.style.borderTopColor = "#005EA2";
                            e.currentTarget.style.borderRightColor = "#005EA2";
                            e.currentTarget.style.borderBottomColor = "#005EA2";
                            e.currentTarget.style.borderLeftColor = "#005EA2";
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.boxShadow =
                              "0 0 0 2px #73B3E7")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.boxShadow = "none")
                          }
                        >
                          {qr.icon}
                          {qr.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Searching State */}
            {isSearching && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  backgroundColor: "#E7F3FF",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "#0A3161",
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                }}
              >
                <Search size={13} className="animate-pulse" />
                <span>Querying knowledge base...</span>
                <Loader2 size={13} className="animate-spin" />
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    minWidth: 28,
                    flexShrink: 0,
                  }}
                >
                  <PeterSealCompact size={28} />
                </div>
                <div
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px 12px 12px 2px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <span
                    className="animate-bounce"
                    style={{
                      animationDelay: "0ms",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#0A3161",
                      display: "inline-block",
                      opacity: 0.5,
                    }}
                  />
                  <span
                    className="animate-bounce"
                    style={{
                      animationDelay: "150ms",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#0A3161",
                      display: "inline-block",
                      opacity: 0.5,
                    }}
                  />
                  <span
                    className="animate-bounce"
                    style={{
                      animationDelay: "300ms",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#0A3161",
                      display: "inline-block",
                      opacity: 0.5,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Area */}
          <div
            style={{
              padding: "10px 16px",
              borderTopWidth: 1,
              borderTopStyle: "solid",
              borderTopColor: "#DFE1E2",
              borderRightWidth: 0,
              borderRightStyle: "none",
              borderRightColor: "transparent",
              borderBottomWidth: 0,
              borderBottomStyle: "none",
              borderBottomColor: "transparent",
              borderLeftWidth: 0,
              borderLeftStyle: "none",
              borderLeftColor: "transparent",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "9px 14px",
                backgroundColor: "#F5F6FA",
                borderRadius: 6,
                fontSize: 12,
                color: "#71767A",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Select an option above to continue
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 6,
                backgroundColor: "#DFE1E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={14} color="#71767A" />
            </div>
          </div>

          {/* Platform Attribution */}
          <div
            style={{
              padding: "6px 16px 10px",
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="56" stroke="#71767A" strokeWidth="4" fill="none" opacity="0.3" />
                <circle cx="60" cy="60" r="50" fill="#0A3161" opacity="0.15" />
                <path
                  d="M48 58 L55 65 L72 48"
                  stroke="#0A3161"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "#1B1B1B",
                fontFamily: "'Roboto', sans-serif",
                letterSpacing: "0.3px",
                fontWeight: 400,
              }}
            >
              P.E.T.E.R. Platform — Integrated Knowledge Base
            </span>
          </div>
        </div>
      )}

      {/* Floating Launch Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen
            ? "Close P.E.T.E.R. guidance panel"
            : "Open P.E.T.E.R. guidance panel"
        }
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: isOpen
            ? "#4B5563"
            : "linear-gradient(135deg, #0A3161 0%, #112E51 100%)",
          borderTopWidth: 0,
          borderTopStyle: "none",
          borderTopColor: "transparent",
          borderRightWidth: 0,
          borderRightStyle: "none",
          borderRightColor: "transparent",
          borderBottomWidth: 0,
          borderBottomStyle: "none",
          borderBottomColor: "transparent",
          borderLeftWidth: 0,
          borderLeftStyle: "none",
          borderLeftColor: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen
            ? "0 4px 12px rgba(0,0,0,0.2)"
            : "0 4px 20px rgba(10,49,97,0.35), 0 0 0 3px rgba(10,49,97,0.08)",
          zIndex: 10000,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          if (!isOpen) {
            e.currentTarget.style.boxShadow =
              "0 6px 24px rgba(10,49,97,0.4), 0 0 0 4px rgba(10,49,97,0.12)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          if (!isOpen) {
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(10,49,97,0.35), 0 0 0 3px rgba(10,49,97,0.08)";
          }
        }}
        onFocus={(e) =>
          (e.currentTarget.style.outline = "3px solid #73B3E7")
        }
        onBlur={(e) => (e.currentTarget.style.outline = "none")}
      >
        {isOpen ? (
          <X size={22} color="#FFFFFF" />
        ) : (
          <PeterSealLauncher size={32} />
        )}
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes peterSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
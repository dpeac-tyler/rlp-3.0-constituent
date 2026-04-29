import { useNavigate } from "react-router";
import { motion, type Variants } from "motion/react";
import {
  FileText,
  RefreshCw,
  Search,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useProfile } from "../components/ProfileContext";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Greeting ─────────────────────────────────────────── */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ── Mock summary data ────────────────────────────────── */

const STATS = [
  {
    label: "Active Licenses",
    value: "6",
    icon: <CheckCircle2 size={24} color="#2E8540" />,
    accent: "#2E8540",
    bg: "#F0F7F0",
    to: "/certifications",
  },
  {
    label: "Pending Submissions",
    value: "2",
    icon: <Clock size={24} color="#005EA2" />,
    accent: "#005EA2",
    bg: "#EFF6FB",
    to: "/submissions/my-submissions",
  },
  {
    label: "Expiring Soon",
    value: "3",
    icon: <AlertTriangle size={24} color="#B66A00" />,
    accent: "#E5A000",
    bg: "#FFF8E6",
    to: "/certifications",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Apply for a License",
    description: "Start a new permit or license application",
    icon: <FileText size={22} color="#005EA2" />,
    to: "/submissions/my-submissions",
    primary: true,
  },
  {
    label: "Renew a License",
    description: "Renew an existing certificate or license",
    icon: <RefreshCw size={22} color="#2E8540" />,
    to: "/renewals",
    primary: false,
  },
  {
    label: "Check Status",
    description: "View the status of your submissions",
    icon: <Search size={22} color="#0A3161" />,
    to: "/submissions/my-submissions",
    primary: false,
  },
  {
    label: "Make a Payment",
    description: "Pay fees for pending applications",
    icon: <CreditCard size={22} color="#6B4CDB" />,
    to: "/shopping-cart/cart",
    primary: false,
  },
];

const RECENT_ACTIVITY = [
  {
    id: "a1",
    type: "approved",
    title: "DNR Business License Approved",
    detail: "LIC-2025-00428 — Renewal",
    time: "2 days ago",
    color: "#2E8540",
    bg: "#F0F7F0",
    icon: <CheckCircle2 size={16} />,
  },
  {
    id: "a2",
    type: "warning",
    title: "License Expiring in 47 Days",
    detail: "LIC-2024-00876 — Type for Renewal-Workflow-Payment",
    time: "Today",
    color: "#B66A00",
    bg: "#FFF8E6",
    icon: <AlertTriangle size={16} />,
  },
  {
    id: "a3",
    type: "info",
    title: "Submission Under Review",
    detail: "LIC-2025-00533 — DNR Biz Original One, Amendment",
    time: "5 days ago",
    color: "#005EA2",
    bg: "#EFF6FB",
    icon: <TrendingUp size={16} />,
  },
  {
    id: "a4",
    type: "approved",
    title: "Certificate Downloaded",
    detail: "LIC-2025-00315 — Type for Renewal-Workflow-Payment",
    time: "1 week ago",
    color: "#2E8540",
    bg: "#F0F7F0",
    icon: <CheckCircle2 size={16} />,
  },
];

/* ── Animation variants ───────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.0, 0.0, 0.2, 1] },
  }),
};

/* ── Component ─────────────────────────────────────────── */

export function HomePage() {
  const { businessName } = useProfile();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <PageShell
      title={`${getGreeting()}.`}
      heroHeight={205}
      titleStyle={{ fontSize: isMobile ? "2rem" : "3rem" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Expiring Soon Alert ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            padding: "16px 20px",
            backgroundColor: "#FFF8E6",
            borderRadius: 6,
            borderLeftWidth: 4,
            borderLeftStyle: "solid",
            borderLeftColor: "#E5A000",
            borderTopWidth: 0,
            borderTopStyle: "none",
            borderTopColor: "transparent",
            borderRightWidth: 0,
            borderRightStyle: "none",
            borderRightColor: "transparent",
            borderBottomWidth: 0,
            borderBottomStyle: "none",
            borderBottomColor: "transparent",
          }}
          role="alert"
        >
          <AlertTriangle size={20} color="#7D4800" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#1B1B1B",
                margin: "0 0 4px 0",
              }}
            >
              Action Required — 3 Licenses Expiring Soon
            </p>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15,
                color: "#1B1B1B",
                margin: 0,
                lineHeight: "22px",
              }}
            >
              LIC-2024-00876 expires in 47 days. Renew now to avoid a lapse in coverage.
            </p>
          </div>
          <button
            onClick={() => navigate("/renewals")}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#005EA2",
              backgroundColor: "transparent",
              borderWidth: 0,
              borderStyle: "none",
              borderColor: "transparent",
              cursor: "pointer",
              padding: "0 4px",
              textDecoration: "underline",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Renew Now
          </button>
        </motion.div>

        {/* ── Stat Cards (3 columns) ───────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              onClick={() => navigate(stat.to)}
              style={{
                backgroundColor: stat.bg,
                borderRadius: 8,
                padding: "20px 22px",
                cursor: "pointer",
                borderTopWidth: 0,
                borderTopStyle: "none",
                borderTopColor: "transparent",
                borderRightWidth: 0,
                borderRightStyle: "none",
                borderRightColor: "transparent",
                borderBottomWidth: 3,
                borderBottomStyle: "solid",
                borderBottomColor: stat.accent,
                borderLeftWidth: 0,
                borderLeftStyle: "none",
                borderLeftColor: "transparent",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {stat.icon}
                <ChevronRight size={16} color={stat.accent} />
              </div>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 700,
                  color: "#1B1B1B",
                  margin: "12px 0 4px 0",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "#3D4551",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Quick Actions + Recent Activity ─────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.35, ease: "easeOut" }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              padding: "22px 24px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#1B1B1B",
                margin: "0 0 16px 0",
              }}
            >
              Quick Actions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUICK_ACTIONS.map((action, i) => (
                <motion.button
                  key={action.label}
                  onClick={() => navigate(action.to)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.25 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 16px",
                    borderRadius: 6,
                    backgroundColor: action.primary ? "#EFF6FB" : "#F5F6FA",
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                    borderTopColor: action.primary ? "#9DC3E0" : "#DFE1E2",
                    borderRightWidth: 1,
                    borderRightStyle: "solid",
                    borderRightColor: action.primary ? "#9DC3E0" : "#DFE1E2",
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                    borderBottomColor: action.primary ? "#9DC3E0" : "#DFE1E2",
                    borderLeftWidth: 1,
                    borderLeftStyle: "solid",
                    borderLeftColor: action.primary ? "#9DC3E0" : "#DFE1E2",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 8,
                      backgroundColor: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                    }}
                  >
                    {action.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#1B1B1B",
                        margin: "0 0 2px 0",
                        lineHeight: "22px",
                      }}
                    >
                      {action.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 14,
                        color: "#3D4551",
                        margin: 0,
                        lineHeight: "20px",
                      }}
                    >
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight size={18} color="#565C65" style={{ flexShrink: 0 }} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35, ease: "easeOut" }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 8,
              padding: "22px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1B1B1B",
                  margin: 0,
                }}
              >
                Recent Activity
              </h2>
              <button
                onClick={() => navigate("/submissions/my-submissions")}
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#005EA2",
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  borderStyle: "none",
                  borderColor: "transparent",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                View all
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  style={{
                    display: "flex",
                    gap: 14,
                    padding: "12px 0",
                    borderBottomWidth: i < RECENT_ACTIVITY.length - 1 ? 1 : 0,
                    borderBottomStyle: "solid",
                    borderBottomColor: "#DFE1E2",
                    borderTopWidth: 0,
                    borderTopStyle: "none",
                    borderTopColor: "transparent",
                    borderLeftWidth: 0,
                    borderLeftStyle: "none",
                    borderLeftColor: "transparent",
                    borderRightWidth: 0,
                    borderRightStyle: "none",
                    borderRightColor: "transparent",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1B1B1B",
                        margin: "0 0 3px 0",
                        lineHeight: "20px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 14,
                        color: "#3D4551",
                        margin: 0,
                        lineHeight: "19px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 13,
                      color: "#565C65",
                      flexShrink: 0,
                      marginTop: 2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.time}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* All-clear tip */}
            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                backgroundColor: "#F0F7F0",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <CheckCircle2 size={16} color="#2E8540" style={{ flexShrink: 0 }} />
              <p
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1B4620",
                  margin: 0,
                }}
              >
                All active licenses are in good standing
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Footer bar ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              color: "#3D4551",
              margin: 0,
              lineHeight: "22px",
            }}
          >
            Welcome back, <strong style={{ color: "#1B1B1B" }}>{businessName}</strong>. Need guidance? P.E.T.E.R. is always available in the bottom-right corner.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/submissions/my-submissions");
            }}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#005EA2",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            Go to Submissions <ChevronRight size={16} />
          </a>
        </motion.div>

      </div>
    </PageShell>
  );
}

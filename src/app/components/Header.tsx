import { useState } from "react";
import { useNavigate } from "react-router";
import menuSvgPaths from "../../imports/svg-653nymfya0";
import logoSvgPaths from "../../imports/svg-hjn6k2buyk";
import helpSvgPaths from "../../imports/svg-sk1u0gycbi";
import { useProfile } from "./ProfileContext";
import { useIsMobile } from "../hooks/useIsMobile";

interface HeaderProps {
  isAddressVisible: boolean;
  onToggleAddress: () => void;
  onAvatarClick?: () => void;
}

const NOTIFICATIONS = [
  { id: "n1", text: "LIC-2024-00876 expires in 47 days", type: "warning" },
  { id: "n2", text: "LIC-2024-00789 expires in 54 days", type: "warning" },
  { id: "n3", text: "LIC-2024-00654 is Suspended — action required", type: "error" },
];

export function Header({ isAddressVisible, onToggleAddress, onAvatarClick }: HeaderProps) {
  const { businessName } = useProfile();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Derive initials from business name: first letter of first two words
  const initials = businessName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <header
      className="w-full"
      style={{ backgroundColor: "rgba(22,47,82,0.96)", height: 56 }}
    >
      <div className="flex items-center justify-between w-full h-full">
        {/* Left side: Menu, Logo, Agency Name */}
        <div className="flex items-center h-full">
          {/* Menu - toggles address container */}
          <button
            onClick={onToggleAddress}
            className="flex items-center justify-center h-full cursor-pointer border-none"
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: isAddressVisible
                ? "rgba(255,255,255,0.15)"
                : "transparent",
              transition: "background-color 0.2s ease",
            }}
            aria-label={isAddressVisible ? "Collapse address panel" : "Expand address panel"}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d={menuSvgPaths.p3d5c2d00}
                fill="white"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {/* Logo — clickable, navigates to Home */}
          <div
            className="flex items-center justify-center h-full"
            style={{ paddingLeft: 20, paddingRight: 20, cursor: "pointer" }}
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to Home"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32.0006 32.0001"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path clipRule="evenodd" d={logoSvgPaths.p178e8b80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p29d23b80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p2330dd80} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p3df9e080} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p33e41300} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p388cb480} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p13a74500} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p2148c840} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p33a0c100} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p363b7840} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p13207f00} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p1d239800} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.pc4607f0} fill="white" fillRule="evenodd" />
                <path clipRule="evenodd" d={logoSvgPaths.p8a87100} fill="white" fillRule="evenodd" />
              </g>
            </svg>
          </div>

          {/* Agency Name */}
          <div className="flex items-center h-full">
            <p
              className="text-white"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? 14 : 20,
                lineHeight: isMobile ? "20px" : "32px",
                letterSpacing: "0.25px",
              }}
            >
              Name of Agency
            </p>
          </div>
        </div>

        {/* Right side: Vertical Divider, Help Icon, Notifications, Avatar */}
        <div className="flex items-center h-full">
          {/* Vertical Divider */}
          <div className="flex items-center h-full" style={{ marginRight: 15 }}>
            <svg width="1" height="32" viewBox="0 0 1 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line stroke="white" x1="0.5" x2="0.5" y1="0" y2="32" />
            </svg>
          </div>

          {/* Help Icon */}
          <div className="flex items-center justify-center h-full cursor-pointer" style={{ marginRight: 15 }}>
            <svg width="24" height="24" viewBox="0 0 19.968 19.968" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d={helpSvgPaths.p17094b80} fill="#F0F0F0" fillRule="evenodd" />
            </svg>
          </div>

          {/* Notification Bell */}
          <div style={{ position: "relative", marginRight: 18 }}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              aria-label="Notifications"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
              }}
            >
              {/* Bell SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#F0F0F0" />
              </svg>
              {/* Badge */}
              {dismissed.length < NOTIFICATIONS.length && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "#E52207",
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'Roboto', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {NOTIFICATIONS.length - dismissed.length}
                </span>
              )}
            </button>

            {/* Dropdown panel */}
            {notifOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: 320,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 8,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  zIndex: 9000,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#162F52",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 13, fontWeight: 700, color: "#FFFFFF" }}>
                    Notifications
                  </span>
                  {dismissed.length < NOTIFICATIONS.length && (
                    <button
                      onClick={() => setDismissed(NOTIFICATIONS.map((n) => n.id))}
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 11,
                        color: "#A9C4E0",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                      }}
                    >
                      Dismiss all
                    </button>
                  )}
                </div>

                <div style={{ padding: "8px 0" }}>
                  {NOTIFICATIONS.filter((n) => !dismissed.includes(n.id)).length === 0 ? (
                    <p
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 13,
                        color: "#71767A",
                        padding: "12px 16px",
                        margin: 0,
                        textAlign: "center",
                      }}
                    >
                      No new notifications
                    </p>
                  ) : (
                    NOTIFICATIONS.filter((n) => !dismissed.includes(n.id)).map((n) => (
                      <div
                        key={n.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "10px 16px",
                          borderBottomWidth: 1,
                          borderBottomStyle: "solid",
                          borderBottomColor: "#F0F0F0",
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
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: n.type === "error" ? "#B50909" : "#E5A000",
                            flexShrink: 0,
                            marginTop: 5,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: 13,
                            color: "#1B1B1B",
                            margin: "0 0 4px 0",
                            flex: 1,
                            lineHeight: "18px",
                          }}
                        >
                          {n.text}
                        </p>
                        <button
                          onClick={() => setDismissed((prev) => [...prev, n.id])}
                          aria-label="Dismiss"
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: 2,
                            color: "#A9AEB1",
                            fontSize: 14,
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div style={{ padding: "10px 16px", borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#F0F0F0", borderRightWidth: 0, borderRightStyle: "none", borderRightColor: "transparent", borderBottomWidth: 0, borderBottomStyle: "none", borderBottomColor: "transparent", borderLeftWidth: 0, borderLeftStyle: "none", borderLeftColor: "transparent" }}>
                  <button
                    onClick={() => { setNotifOpen(false); navigate("/certifications"); }}
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#005EA2",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                    }}
                  >
                    View Certifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex items-center justify-center h-full" style={{ marginRight: 20 }}>
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{ width: 40, height: 40, backgroundColor: "#009688", cursor: "pointer" }}
              onClick={onAvatarClick}
              role="button"
              tabIndex={0}
              aria-label="Account settings"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onAvatarClick?.();
                }
              }}
            >
              <span
                className="text-white"
                style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "28px", letterSpacing: "0.15px" }}
              >
                {initials || "BC"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
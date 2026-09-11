import { useEffect, useState } from "react";
import { ChevronDown, Download, ExternalLink, Eye, UserPen } from "lucide-react";

/**
 * Control icon legend — replaces the old "Icon Key" accordion.
 *
 * Matches the pattern built for rlp-3.0-agency-public: a link sits to the right
 * of the entry count in the table controls bar; clicking it reveals a legend
 * panel between the controls bar and the table.
 *
 * Usage:
 *   const { toggle, panel } = useIconLegend({ items: DOC_ICON_ITEMS, sessionKey: "icon-legend-documents" });
 *   ...
 *   <span>Showing {start} - {end} of {totalEntries} Entries{toggle}</span>
 *   </div>  // end of controls bar
 *   {panel}
 *   <table>...
 */

export interface IconItem {
  icon: React.ReactNode;
  label: string;
}

const DEFAULT_ITEMS: IconItem[] = [
  {
    icon: <Download size={16} color="#FFFFFF" />,
    label: "Download Certificate",
  },
  {
    icon: <ExternalLink size={16} color="#FFFFFF" />,
    label: "Renew Now",
  },
  {
    icon: <Eye size={16} color="#FFFFFF" />,
    label: "View Submission",
  },
  {
    icon: <UserPen size={16} color="#FFFFFF" />,
    label: "Reassign Applicant",
  },
];

interface UseIconLegendOptions {
  items?: IconItem[];
  sessionKey?: string;
  defaultOpen?: boolean;
}

export function useIconLegend({
  items,
  sessionKey = "icon-legend-open",
  defaultOpen = false,
}: UseIconLegendOptions = {}) {
  const iconItems = items || DEFAULT_ITEMS;

  const [isOpen, setIsOpen] = useState(() => {
    const stored = sessionStorage.getItem(sessionKey);
    return stored === null ? defaultOpen : stored === "true";
  });

  useEffect(() => {
    sessionStorage.setItem(sessionKey, String(isOpen));
  }, [isOpen, sessionKey]);

  const toggle = (
    <button
      type="button"
      onClick={() => setIsOpen((open) => !open)}
      aria-expanded={isOpen}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginLeft: 14,
        padding: 0,
        fontFamily: "'Public Sans', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        color: "#005EA2",
        backgroundColor: "transparent",
        borderWidth: 0,
        borderStyle: "none",
        borderColor: "transparent",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      What do the control icons mean?
      <ChevronDown
        size={14}
        aria-hidden="true"
        style={{
          flexShrink: 0,
          transform: isOpen ? "rotate(180deg)" : "none",
          transition: "transform 0.15s",
        }}
      />
    </button>
  );

  const panel = isOpen ? (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "14px 36px",
        marginBottom: 12,
        padding: "14px 18px",
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#DFE1E6",
        borderRadius: 8,
      }}
    >
      {iconItems.map((item) => (
        <div
          key={item.label}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              minWidth: 28,
              backgroundColor: "#162E51",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </div>
          <span
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              lineHeight: "20px",
              color: "#1B1B1B",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  ) : null;

  return { toggle, panel, isOpen };
}

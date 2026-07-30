import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useAgency } from "../components/AgencyContext";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

export interface InspectionItem {
  id: string;
  type: string;
  outcome: string;
  dueDate: string;
  completionDate: string;
  subject: string;
  inspector: string;
  status: string;
  source: string;
  sourceType: string;
  siteAddress: string;
  scheduledDate: string;
  startDate: string;
  requestedDate: string;
  assignedTeam: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const SITE_ADDRESS = "4900 Industrial Pkwy, Springfield, IL 62704";

export const INITIAL_INSPECTIONS: InspectionItem[] = [
  {
    id: "INS-2026-021",
    type: "Annual Compliance",
    outcome: "Pass",
    dueDate: "03/12/2026",
    completionDate: "03/12/2026",
    subject: "BoringCompany",
    inspector: "Maria Gutierrez",
    status: "Completed",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "03/12/2026",
    startDate: "03/12/2026",
    requestedDate: "02/20/2026",
    assignedTeam: "Compliance Team",
  },
  {
    id: "INS-2026-014",
    type: "Fire Safety",
    outcome: "Pass",
    dueDate: "01/22/2026",
    completionDate: "01/22/2026",
    subject: "BoringCompany",
    inspector: "James Ortiz",
    status: "Completed",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "01/22/2026",
    startDate: "01/22/2026",
    requestedDate: "01/05/2026",
    assignedTeam: "Fire Safety Team",
  },
  {
    id: "INS-2026-027",
    type: "Fire Safety",
    outcome: "—",
    dueDate: "04/18/2026",
    completionDate: "—",
    subject: "BoringCompany",
    inspector: "James Ortiz",
    status: "In Progress",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "04/18/2026",
    startDate: "04/18/2026",
    requestedDate: "04/01/2026",
    assignedTeam: "Fire Safety Team",
  },
  {
    id: "INS-2026-032",
    type: "Accessibility Compliance",
    outcome: "—",
    dueDate: "05/02/2026",
    completionDate: "—",
    subject: "BoringCompany",
    inspector: "Priya Patel",
    status: "Scheduled",
    source: "License Renewal Application",
    sourceType: "Application Submission",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "05/02/2026",
    startDate: "—",
    requestedDate: "04/10/2026",
    assignedTeam: "Accessibility Compliance Team",
  },
  {
    id: "INS-2025-098",
    type: "Workplace Safety",
    outcome: "Pass with Conditions",
    dueDate: "11/08/2025",
    completionDate: "11/08/2025",
    subject: "BoringCompany",
    inspector: "Angela Wu",
    status: "Completed",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "11/08/2025",
    startDate: "11/08/2025",
    requestedDate: "10/22/2025",
    assignedTeam: "Workplace Safety Team",
  },
  {
    id: "INS-2025-083",
    type: "Follow-Up",
    outcome: "Pass",
    dueDate: "10/15/2025",
    completionDate: "10/15/2025",
    subject: "BoringCompany",
    inspector: "David Chen",
    status: "Completed",
    source: "Follow-Up to INS-2025-076",
    sourceType: "Follow-Up Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "10/15/2025",
    startDate: "10/15/2025",
    requestedDate: "09/30/2025",
    assignedTeam: "Environmental Compliance Team",
  },
  {
    id: "INS-2025-076",
    type: "Environmental Compliance",
    outcome: "Fail",
    dueDate: "09/30/2025",
    completionDate: "09/30/2025",
    subject: "BoringCompany",
    inspector: "David Chen",
    status: "Completed",
    source: "Complaint #C-2025-341",
    sourceType: "Complaint",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "09/30/2025",
    startDate: "09/30/2025",
    requestedDate: "09/18/2025",
    assignedTeam: "Environmental Compliance Team",
  },
  {
    id: "INS-2025-061",
    type: "Health & Sanitation",
    outcome: "Pass",
    dueDate: "07/14/2025",
    completionDate: "07/14/2025",
    subject: "BoringCompany",
    inspector: "Sarah Kim",
    status: "Completed",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "07/14/2025",
    startDate: "07/14/2025",
    requestedDate: "06/28/2025",
    assignedTeam: "Health & Sanitation Team",
  },
  {
    id: "INS-2025-054",
    type: "Workplace Safety",
    outcome: "—",
    dueDate: "06/10/2025",
    completionDate: "—",
    subject: "BoringCompany",
    inspector: "Angela Wu",
    status: "Cancelled",
    source: "Recurring Schedule",
    sourceType: "Scheduled Inspection",
    siteAddress: SITE_ADDRESS,
    scheduledDate: "06/10/2025",
    startDate: "—",
    requestedDate: "05/22/2025",
    assignedTeam: "Workplace Safety Team",
  },
];

/* ── Status / outcome colors ───────────────────────────── */

export const STATUS_COLOR: Record<string, string> = {
  Scheduled: "#13669A",
  "In Progress": "#205493",
  Completed: "#417505",
  Cancelled: "#CD2026",
};

export const OUTCOME_COLOR: Record<string, string> = {
  Pass: "#417505",
  Fail: "#CD2026",
  "Pass with Conditions": "#A34900",
  "—": "#5C5F66",
};

/* ── Icon key items ────────────────────────────────────── */

const INSPECTION_ICON_ITEMS = [
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Inspection" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = "id" | "type" | "subject" | "status" | "outcome" | "dueDate" | "completionDate";
type SortDir = "asc" | "desc" | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "subject", label: "Subject" },
  { key: "status", label: "Status" },
  { key: "outcome", label: "Outcome" },
  { key: "dueDate", label: "Due Date" },
  { key: "completionDate", label: "Completion Date" },
];

const COL_WIDTHS = ["10%", "13%", "24%", "11%", "9%", "10%", "11%", "12%"];

/* ── Reusable border objects (longhand only) ───────────── */

const cellBorder: React.CSSProperties = {
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#DFE1E2",
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
};

const thBorder: React.CSSProperties = {
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#A9AEB1",
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
};

const noBorder: React.CSSProperties = {
  borderTopWidth: 0,
  borderTopStyle: "solid",
  borderTopColor: "transparent",
  borderRightWidth: 0,
  borderRightStyle: "solid",
  borderRightColor: "transparent",
  borderBottomWidth: 0,
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  borderLeftWidth: 0,
  borderLeftStyle: "solid",
  borderLeftColor: "transparent",
};

const controlBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  minWidth: 28,
  backgroundColor: "#162E51",
  borderRadius: 4,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
  ...noBorder,
};

const inputBorder: React.CSSProperties = {
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "#565C65",
  borderRightWidth: 1,
  borderRightStyle: "solid",
  borderRightColor: "#565C65",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#565C65",
  borderLeftWidth: 1,
  borderLeftStyle: "solid",
  borderLeftColor: "#565C65",
};

/* ── Agencies ──────────────────────────────────────────── */

const agencies = [
  { value: "", label: "- Please Select -" },
  { value: "agency-1", label: "Department of Professional & Financial Regulation" },
  { value: "agency-2", label: "Bureau of Consumer Credit Protection" },
];

/* ── USWDS select style (longhand borders) ─────────────── */

const uswdsSelectStyle: React.CSSProperties = {
  fontFamily: "'Public Sans', sans-serif",
  fontSize: 16,
  lineHeight: "24px",
  color: "#1B1B1B",
  height: 40,
  padding: "0 32px 0 8px",
  borderTopWidth: 1,
  borderTopStyle: "solid",
  borderTopColor: "#565C65",
  borderRightWidth: 1,
  borderRightStyle: "solid",
  borderRightColor: "#565C65",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: "#565C65",
  borderLeftWidth: 1,
  borderLeftStyle: "solid",
  borderLeftColor: "#565C65",
  borderRadius: 0,
  backgroundColor: "#FFFFFF",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  backgroundSize: "20px",
  cursor: "pointer",
};

/* ── Helpers ───────────────────────────────────────────── */

const parseDateForSort = (d: string) => {
  if (d === "—") return Infinity;
  const [mm, dd, yyyy] = d.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`).getTime();
};

const DATE_KEYS: SortKey[] = ["dueDate", "completionDate"];

/* ── Page ──────────────────────────────────────────────── */

export function InspectionsPage() {
  const navigate = useNavigate();
  const { selectedAgency, setSelectedAgency } = useAgency();
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === "asc") setSortDir("desc");
      else if (sortDir === "desc") {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setCurrentPage(0);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return INITIAL_INSPECTIONS;
    return [...INITIAL_INSPECTIONS].sort((a, b) => {
      if (DATE_KEYS.includes(sortKey)) {
        const cmp = parseDateForSort(a[sortKey]) - parseDateForSort(b[sortKey]);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a[sortKey].localeCompare(b[sortKey]);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const totalEntries = sortedData.length;
  const paginatedData = sortedData.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
  const start = totalEntries === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min(currentPage * pageSize + pageSize, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  const getPageNumbers = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const pages: (number | "...")[] = [];
    pages.push(0);
    if (current > 3) pages.push("...");
    const rangeStart = Math.max(1, current - 1);
    const rangeEnd = Math.min(total - 2, current + 1);
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);
    if (current < total - 4) pages.push("...");
    pages.push(total - 1);
    return pages;
  };

  const renderSortableTh = (key: SortKey, label: string) => (
    <th
      key={key}
      onClick={() => handleSort(key)}
      style={{
        backgroundColor: "#F0F0F0",
        color: "#1B1B1B",
        fontWeight: 700,
        fontSize: 13,
        lineHeight: "20px",
        padding: "12px 12px",
        textAlign: "left",
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        ...thBorder,
      }}
    >
      {label}
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          marginLeft: 4,
          verticalAlign: "middle",
          lineHeight: 0,
          gap: 1,
        }}
      >
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0L8 6H0L4 0Z" fill={sortKey === key && sortDir === "asc" ? "#1B1B1B" : "#A9AEB1"} />
        </svg>
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L0 0H8L4 6Z" fill={sortKey === key && sortDir === "desc" ? "#1B1B1B" : "#A9AEB1"} />
        </svg>
      </span>
    </th>
  );

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Public Sans', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "24px",
    color: "#1B1B1B",
    marginBottom: 4,
  };

  return (
    <PageShell title="Inspections">
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 4, padding: isMobile ? 16 : 24 }}>
        {/* Intro paragraph */}
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 16, lineHeight: "24px", color: "#1B1B1B", marginBottom: 32 }}>
          Review inspections conducted on your business by the regulatory agency, including
          compliance, safety, and follow-up inspections along with their status and outcome.
        </p>

        {/* USWDS-style Select Agency */}
        <div className="w-full" style={{ marginBottom: 32 }}>
          <label htmlFor="inspections-agency-select" style={labelStyle}>
            Select Agency
          </label>
          <select
            id="inspections-agency-select"
            value={selectedAgency}
            onChange={(e) => {
              setSelectedAgency(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full"
            style={uswdsSelectStyle}
          >
            {agencies.map((agency) => (
              <option key={agency.value} value={agency.value}>
                {agency.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content: gated by agency selection */}
        {!selectedAgency ? (
          <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 16, lineHeight: "26px", color: "#71767A" }}>
            No Inspections available.
          </p>
        ) : (
          <>
        {/* Icon Key */}
        <IconKeyAccordion items={INSPECTION_ICON_ITEMS} sessionKey="icon-key-inspections-open" />

        {/* Top bar: Showing X-Y of Z  |  Show dropdown */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
            Showing {start} - {end} of {totalEntries} Entries
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(0);
              }}
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: 14,
                color: "#1B1B1B",
                height: 32,
                padding: "0 24px 0 8px",
                ...inputBorder,
                borderTopColor: "#565C65",
                borderRightColor: "#565C65",
                borderBottomColor: "#565C65",
                borderLeftColor: "#565C65",
                borderRadius: 0,
                backgroundColor: "#FFFFFF",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5H7z' fill='%231B1B1B'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 4px center",
                backgroundSize: "16px",
                cursor: "pointer",
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            className="usa-table-stacked"
            style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Public Sans', sans-serif", fontSize: 14, tableLayout: "fixed" }}
          >
            <colgroup>
              {COL_WIDTHS.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {COLUMNS.map((col) => renderSortableTh(col.key, col.label))}
                <th
                  style={{
                    backgroundColor: "#F0F0F0",
                    color: "#1B1B1B",
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: "20px",
                    padding: "12px 12px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    ...thBorder,
                  }}
                >
                  Controls
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: "24px 12px", textAlign: "center", color: "#71767A", fontStyle: "italic", ...cellBorder }}>
                    No inspections found.
                  </td>
                </tr>
              )}
              {paginatedData.map((row, idx) => {
                const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                return (
                  <tr key={row.id}>
                    <td data-label="ID" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", whiteSpace: "nowrap", ...cellBorder }}>
                      {row.id}
                    </td>
                    <td data-label="Type" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", wordWrap: "break-word", overflowWrap: "break-word", ...cellBorder }}>
                      {row.type}
                    </td>
                    <td data-label="Subject" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", wordWrap: "break-word", overflowWrap: "break-word", ...cellBorder }}>
                      {row.subject}
                    </td>
                    <td data-label="Status" style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                      <span style={{ color: STATUS_COLOR[row.status] ?? "#1B1B1B" }}>{row.status}</span>
                    </td>
                    <td data-label="Outcome" style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                      <span style={{ color: OUTCOME_COLOR[row.outcome] ?? "#1B1B1B" }}>{row.outcome}</span>
                    </td>
                    <td data-label="Due Date" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>
                      {row.dueDate}
                    </td>
                    <td data-label="Completion Date" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>
                      {row.completionDate}
                    </td>
                    <td data-label="Controls" style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button title="View Inspection" style={controlBtnStyle} onClick={() => navigate(`/inspections/${row.id}`)}>
                          <Eye size={16} color="#FFFFFF" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 &&
          (() => {
            const pages = getPageNumbers(currentPage, totalPages);
            return (
              <nav aria-label="Pagination" style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, alignItems: "stretch" }}>
                  <li>
                    <button
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      aria-label="Previous page"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        height: 40,
                        padding: "0 12px",
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: 14,
                        color: currentPage === 0 ? "#757575" : "#005EA2",
                        backgroundColor: "transparent",
                        cursor: currentPage === 0 ? "default" : "pointer",
                        textDecoration: currentPage === 0 ? "none" : "underline",
                        ...noBorder,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
                      </svg>
                      Previous
                    </button>
                  </li>

                  {pages.map((page, idx) =>
                    page === "..." ? (
                      <li key={`ellipsis-${idx}`}>
                        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
                          ...
                        </span>
                      </li>
                    ) : (
                      <li key={page}>
                        <button
                          onClick={() => setCurrentPage(page as number)}
                          aria-label={`Page ${(page as number) + 1}`}
                          aria-current={currentPage === page ? "page" : undefined}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            fontFamily: "'Public Sans', sans-serif",
                            fontSize: 14,
                            fontWeight: currentPage === page ? 700 : 400,
                            color: currentPage === page ? "#FFFFFF" : "#005EA2",
                            backgroundColor: currentPage === page ? "#005EA2" : "transparent",
                            borderRadius: currentPage === page ? 2 : 0,
                            cursor: "pointer",
                            textDecoration: currentPage === page ? "none" : "underline",
                            ...noBorder,
                          }}
                        >
                          {(page as number) + 1}
                        </button>
                      </li>
                    )
                  )}

                  <li>
                    <button
                      disabled={currentPage >= totalPages - 1}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      aria-label="Next page"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        height: 40,
                        padding: "0 12px",
                        fontFamily: "'Public Sans', sans-serif",
                        fontSize: 14,
                        color: currentPage >= totalPages - 1 ? "#757575" : "#005EA2",
                        backgroundColor: "transparent",
                        cursor: currentPage >= totalPages - 1 ? "default" : "pointer",
                        textDecoration: currentPage >= totalPages - 1 ? "none" : "underline",
                        ...noBorder,
                      }}
                    >
                      Next
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            );
          })()}
          </>
        )}
      </div>
    </PageShell>
  );
}

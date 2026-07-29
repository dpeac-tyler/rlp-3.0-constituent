import { useState, useMemo } from "react";
import { Eye, X } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

interface InspectionItem {
  id: string;
  type: string;
  inspector: string;
  date: string;
  notes: string;
  result: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const INITIAL_INSPECTIONS: InspectionItem[] = [
  {
    id: "i1",
    type: "Annual Compliance Inspection",
    inspector: "Maria Gutierrez",
    date: "03/12/2026",
    notes: "Routine annual review of licensed business operations, recordkeeping, and posted signage. No violations noted; all required documentation was current and available upon request.",
    result: "Passed",
  },
  {
    id: "i2",
    type: "Fire Safety Inspection",
    inspector: "James Ortiz",
    date: "01/22/2026",
    notes: "Inspection of fire extinguishers, emergency exits, and evacuation signage per state fire code.",
    result: "Passed",
  },
  {
    id: "i3",
    type: "Workplace Safety Inspection",
    inspector: "Angela Wu",
    date: "11/08/2025",
    notes: "OSHA-aligned review of workplace safety practices, PPE availability, and hazard communication postings. Minor corrective action required for an updated SDS binder.",
    result: "Passed with Conditions",
  },
  {
    id: "i4",
    type: "Environmental Compliance Inspection",
    inspector: "David Chen",
    date: "09/30/2025",
    notes: "Review of waste disposal and storage practices found improper storage of hazardous materials near a public drainage area.",
    result: "Failed",
  },
  {
    id: "i5",
    type: "Follow-Up Inspection",
    inspector: "David Chen",
    date: "10/15/2025",
    notes: "Follow-up to the 09/30/2025 environmental compliance inspection to confirm corrective actions were completed.",
    result: "Passed",
  },
  {
    id: "i6",
    type: "Health & Sanitation Inspection",
    inspector: "Sarah Kim",
    date: "07/14/2025",
    notes: "Routine sanitation inspection covering restroom facilities, break areas, and general cleanliness standards.",
    result: "Passed",
  },
  {
    id: "i7",
    type: "Accessibility Compliance Inspection",
    inspector: "Priya Patel",
    date: "05/02/2025",
    notes: "ADA accessibility review of entrances, parking, and posted signage, scheduled at the request of the licensee.",
    result: "Scheduled",
  },
];

/* ── Status colors ─────────────────────────────────────── */

const STATUS_COLOR: Record<string, string> = {
  Passed: "#417505",
  "Passed with Conditions": "#A34900",
  Failed: "#CD2026",
  Scheduled: "#13669A",
};

/* ── Icon key items ────────────────────────────────────── */

const INSPECTION_ICON_ITEMS = [
  { icon: <Eye size={16} color="#FFFFFF" />, label: "View Inspection" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = "type" | "inspector" | "date" | "result";
type SortDir = "asc" | "desc" | null;

const COL_WIDTHS = ["20%", "15%", "28%", "12%", "13%", "12%"];

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

/* ── Helpers ───────────────────────────────────────────── */

const parseDateForSort = (d: string) => {
  const [mm, dd, yyyy] = d.split("/");
  return new Date(`${yyyy}-${mm}-${dd}`).getTime();
};

const DESC_LIMIT = 100;

/* ── View Inspection Modal ─────────────────────────────── */

function ViewInspectionModal({
  inspection,
  onClose,
}: {
  inspection: InspectionItem;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          width: 560,
          maxWidth: "90vw",
          ...noBorder,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            backgroundColor: "#122E51",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
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
          }}
        >
          <h2
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 20,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Inspection Details
          </h2>
          <button
            onClick={onClose}
            style={{
              cursor: "pointer",
              backgroundColor: "transparent",
              padding: 4,
              display: "inline-flex",
              ...noBorder,
            }}
          >
            <X size={20} color="#FFFFFF" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "12px 16px",
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
            }}
          >
            <span style={{ fontWeight: 700 }}>Inspection Type</span>
            <span>{inspection.type}</span>

            <span style={{ fontWeight: 700 }}>Inspector</span>
            <span>{inspection.inspector}</span>

            <span style={{ fontWeight: 700 }}>Inspection Date</span>
            <span>{inspection.date}</span>

            <span style={{ fontWeight: 700 }}>Result</span>
            <span style={{ color: STATUS_COLOR[inspection.result] ?? "#1B1B1B" }}>
              {inspection.result}
            </span>

            <span style={{ fontWeight: 700 }}>Notes</span>
            <span>{inspection.notes}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              padding: "10px 20px",
              backgroundColor: "#FFFFFF",
              color: "#005EA2",
              borderRadius: 4,
              cursor: "pointer",
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
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export function InspectionsPage() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewingInspection, setViewingInspection] = useState<InspectionItem | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
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
      if (sortKey === "date") {
        const cmp = parseDateForSort(a.date) - parseDateForSort(b.date);
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

  return (
    <PageShell title="Inspections">
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: 4, padding: isMobile ? 16 : 24 }}>
        {/* Intro paragraph */}
        <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 16, lineHeight: "24px", color: "#1B1B1B", margin: 0 }}>
          Review inspections conducted on your business by the regulatory agency, including
          compliance, safety, and follow-up inspections along with their results.
        </p>

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
                {renderSortableTh("type", "Inspection Type")}
                {renderSortableTh("inspector", "Inspector")}
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
                  Notes
                </th>
                {renderSortableTh("date", "Inspection Date")}
                {renderSortableTh("result", "Result")}
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
                  <td colSpan={6} style={{ padding: "24px 12px", textAlign: "center", color: "#71767A", fontStyle: "italic", ...cellBorder }}>
                    No inspections found.
                  </td>
                </tr>
              )}
              {paginatedData.map((row, idx) => {
                const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
                const isExpanded = expandedNotes.has(row.id);
                const needsTruncation = row.notes.length > DESC_LIMIT;
                return (
                  <tr key={row.id}>
                    <td data-label="Inspection Type" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", wordWrap: "break-word", overflowWrap: "break-word", ...cellBorder }}>
                      {row.type}
                    </td>
                    <td data-label="Inspector" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", wordWrap: "break-word", overflowWrap: "break-word", ...cellBorder }}>
                      {row.inspector}
                    </td>
                    <td data-label="Notes" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", wordWrap: "break-word", overflowWrap: "break-word", verticalAlign: "top", ...cellBorder }}>
                      {needsTruncation && !isExpanded ? (
                        <span>
                          {row.notes.slice(0, DESC_LIMIT)}
                          <button
                            onClick={() =>
                              setExpandedNotes((prev) => {
                                const next = new Set(prev);
                                next.add(row.id);
                                return next;
                              })
                            }
                            style={{
                              fontFamily: "'Public Sans', sans-serif",
                              fontSize: 14,
                              color: "#005EA2",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              padding: 0,
                              textDecoration: "underline",
                              ...noBorder,
                            }}
                            aria-label="Show full notes"
                          >
                            ...
                          </button>
                        </span>
                      ) : (
                        <span>{row.notes}</span>
                      )}
                    </td>
                    <td data-label="Inspection Date" style={{ padding: "14px 12px", backgroundColor: bg, color: "#1B1B1B", lineHeight: "22px", ...cellBorder }}>
                      {row.date}
                    </td>
                    <td data-label="Result" style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                      <span style={{ color: STATUS_COLOR[row.result] ?? "#1B1B1B" }}>{row.result}</span>
                    </td>
                    <td data-label="Controls" style={{ padding: "14px 12px", backgroundColor: bg, lineHeight: "22px", ...cellBorder }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button title="View Inspection" style={controlBtnStyle} onClick={() => setViewingInspection(row)}>
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

        {/* View modal */}
        {viewingInspection && (
          <ViewInspectionModal inspection={viewingInspection} onClose={() => setViewingInspection(null)} />
        )}
      </div>
    </PageShell>
  );
}

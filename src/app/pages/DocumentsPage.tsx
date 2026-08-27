import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { IconKeyAccordion } from "../components/IconKeyAccordion";
import { useToast } from "../components/ToastContext";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

interface DocumentItem {
  id: string;
  title: string;
  docType: string;
  subType: string;
  record: string;
  fileName: string;
  uploadedDate: string;
  uploadedBy: string;
}

/* ── Mock data ─────────────────────────────────────────── */

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "d1",
    title: "Signed License Application",
    docType: "Business License",
    subType: "Application",
    record: "Submission: SUB-100234",
    fileName: "license_application_signed.pdf",
    uploadedDate: "01/15/2026",
    uploadedBy: "You",
  },
  {
    id: "d2",
    title: "Proof of Address",
    docType: "Identification",
    subType: "Utility Bill",
    record: "Submission: SUB-100234",
    fileName: "utility_bill_jan2026.pdf",
    uploadedDate: "01/28/2026",
    uploadedBy: "You",
  },
  {
    id: "d3",
    title: "Certificate of Insurance",
    docType: "Insurance",
    subType: "Certificate",
    record: "License: BL-2026-0192",
    fileName: "certificate_of_insurance.pdf",
    uploadedDate: "01/18/2026",
    uploadedBy: "Agency Admin",
  },
  {
    id: "d4",
    title: "Approved Business License",
    docType: "Business License",
    subType: "Approval Letter",
    record: "License: BL-2026-0192",
    fileName: "business_license_approved.pdf",
    uploadedDate: "02/03/2026",
    uploadedBy: "Agency Admin",
  },
  {
    id: "d5",
    title: "Safety Inspection Report",
    docType: "Inspection",
    subType: "Report",
    record: "License: BL-2026-0192",
    fileName: "safety_inspection_report.pdf",
    uploadedDate: "02/18/2026",
    uploadedBy: "Agency Admin",
  },
];

/* ── Icon key items ────────────────────────────────────── */

const DOC_ICON_ITEMS = [
  { icon: <Download size={16} color="#FFFFFF" />, label: "Download Document" },
];

/* ── Column config ─────────────────────────────────────── */

type SortKey = "title" | "docType" | "uploadedDate";
type SortDir = "asc" | "desc" | null;

const COL_WIDTHS = ["20%", "18%", "16%", "16%", "12%", "12%", "6%"];

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

/* ── Main Documents Page ───────────────────────────────── */

export function DocumentsPage() {
  const { showToast } = useToast();
  const [documents] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useIsMobile();

  /* ── Search ───────────────────────────────────────────── */

  const filteredData = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return documents;
    return documents.filter((d) => d.title.toLowerCase().includes(query));
  }, [documents, searchText]);

  /* ── Sorting ──────────────────────────────────────────── */

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
    if (!sortKey || !sortDir) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (sortKey === "uploadedDate") {
        const cmp = parseDateForSort(a.uploadedDate) - parseDateForSort(b.uploadedDate);
        return sortDir === "asc" ? cmp : -cmp;
      }
      if (sortKey === "docType") {
        const cmp = `${a.docType} ${a.subType}`.localeCompare(`${b.docType} ${b.subType}`);
        return sortDir === "asc" ? cmp : -cmp;
      }
      const cmp = a.title.localeCompare(b.title);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, filteredData]);

  /* ── Pagination ───────────────────────────────────────── */

  const totalEntries = sortedData.length;
  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  const start = totalEntries === 0 ? 0 : currentPage * pageSize + 1;
  const end = Math.min(currentPage * pageSize + pageSize, totalEntries);
  const totalPages = Math.ceil(totalEntries / pageSize);

  const getPageNumbers = (
    current: number,
    total: number
  ): (number | "...")[] => {
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

  /* ── Handlers ─────────────────────────────────────────── */

  const handleDownload = (doc: DocumentItem) => {
    showToast(`Downloading ${doc.fileName}...`);
  };

  /* ── Render sortable th helper ────────────────────────── */

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

  const nonSortableTh = (label: string) => (
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
      {label}
    </th>
  );

  return (
    <PageShell title="Documents">
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
      {/* Intro paragraph */}
      <p
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 16,
          lineHeight: "24px",
          color: "#1B1B1B",
          margin: "0 0 0 0",
        }}
      >
        View and download documents related to your submissions and licenses,
        such as identification, licenses, insurance certificates, and
        inspection reports.
      </p>

      {/* Icon Key */}
      <IconKeyAccordion
        items={DOC_ICON_ITEMS}
        sessionKey="icon-key-documents-open"
      />

      {/* Search by title */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="documents-search-title"
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#1B1B1B",
            display: "block",
            marginBottom: 4,
          }}
        >
          Search
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            id="documents-search-title"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(0);
            }}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              color: "#1B1B1B",
              width: "100%",
              height: 40,
              padding: "0 12px",
              backgroundColor: "#FFFFFF",
              borderRadius: 0,
              boxSizing: "border-box",
              ...inputBorder,
            }}
          />
          <button
            type="button"
            onClick={() => setCurrentPage(0)}
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "#005EA2",
              height: 40,
              padding: "0 24px",
              borderRadius: 0,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              ...noBorder,
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Top bar: Showing X-Y of Z  |  Show dropdown */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            color: "#1B1B1B",
          }}
        >
          Showing {start} - {end} of {totalEntries} Entries
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
            }}
          >
            Show
          </span>
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
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            {COL_WIDTHS.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {renderSortableTh("title", "Title")}
              {renderSortableTh("docType", "Document Type / Sub Type")}
              {nonSortableTh("Record")}
              {nonSortableTh("Filename")}
              {renderSortableTh("uploadedDate", "Uploaded Date")}
              {nonSortableTh("Uploaded By")}
              {nonSortableTh("Controls")}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "24px 12px",
                    textAlign: "center",
                    color: "#71767A",
                    fontStyle: "italic",
                    ...cellBorder,
                  }}
                >
                  No documents found.
                </td>
              </tr>
            )}
            {paginatedData.map((row, idx) => {
              const bg = idx % 2 === 1 ? "#F0F0F0" : "#FFFFFF";
              return (
                <tr key={row.id}>
                  <td
                    data-label="Title"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.title}
                  </td>
                  <td
                    data-label="Document Type / Sub Type"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.docType} / {row.subType}
                  </td>
                  <td
                    data-label="Record"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.record}
                  </td>
                  <td
                    data-label="Filename"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.fileName}
                  </td>
                  <td
                    data-label="Uploaded Date"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      ...cellBorder,
                    }}
                  >
                    {row.uploadedDate}
                  </td>
                  <td
                    data-label="Uploaded By"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      color: "#1B1B1B",
                      lineHeight: "22px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      ...cellBorder,
                    }}
                  >
                    {row.uploadedBy}
                  </td>
                  {/* Controls */}
                  <td
                    data-label="Controls"
                    style={{
                      padding: "14px 12px",
                      backgroundColor: bg,
                      lineHeight: "22px",
                      whiteSpace: "nowrap",
                      ...cellBorder,
                    }}
                  >
                    <button
                      title="Download Document"
                      aria-label="Download Document"
                      style={controlBtnStyle}
                      onClick={() => handleDownload(row)}
                    >
                      <Download size={16} color="#FFFFFF" />
                    </button>
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
            <nav
              aria-label="Pagination"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  alignItems: "stretch",
                }}
              >
                {/* Previous */}
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
                      textDecoration:
                        currentPage === 0 ? "none" : "underline",
                      ...noBorder,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                        fill="currentColor"
                      />
                    </svg>
                    Previous
                  </button>
                </li>

                {/* Page numbers */}
                {pages.map((page, idx) =>
                  page === "..." ? (
                    <li key={`ellipsis-${idx}`}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          color: "#1B1B1B",
                        }}
                      >
                        ...
                      </span>
                    </li>
                  ) : (
                    <li key={page}>
                      <button
                        onClick={() => setCurrentPage(page as number)}
                        aria-label={`Page ${(page as number) + 1}`}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: 14,
                          fontWeight: currentPage === page ? 700 : 400,
                          color:
                            currentPage === page ? "#FFFFFF" : "#005EA2",
                          backgroundColor:
                            currentPage === page ? "#005EA2" : "transparent",
                          borderRadius: currentPage === page ? 2 : 0,
                          cursor: "pointer",
                          textDecoration:
                            currentPage === page ? "none" : "underline",
                          ...noBorder,
                        }}
                      >
                        {(page as number) + 1}
                      </button>
                    </li>
                  )
                )}

                {/* Next */}
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
                      color:
                        currentPage >= totalPages - 1
                          ? "#757575"
                          : "#005EA2",
                      backgroundColor: "transparent",
                      cursor:
                        currentPage >= totalPages - 1
                          ? "default"
                          : "pointer",
                      textDecoration:
                        currentPage >= totalPages - 1
                          ? "none"
                          : "underline",
                      ...noBorder,
                    }}
                  >
                    Next
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          );
        })()}
      </div>
    </PageShell>
  );
}

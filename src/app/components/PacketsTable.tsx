import React, { useState } from "react";
import { Eye, UserPen } from "lucide-react";

interface ChildSubmission {
  id: string;
  applicationName: string;
  submissionNumber: string;
  constituentName: string;
  status: string;
  lastUpdated: string;
}

interface Packet {
  id: string;
  licenseType: string;
  applicationName: string;
  submissionNumber: string;
  constituentName: string;
  status: string;
  lastUpdated: string;
  children: ChildSubmission[];
}

const MOCK_DATA: Packet[] = [
  {
    id: "1",
    licenseType: "Firearms Business License",
    applicationName: "FBLA - Company",
    submissionNumber: "700024500",
    constituentName: "Boring Company 155",
    status: "Pending",
    lastUpdated: "07/08/2025",
    children: [
      {
        id: "1-1",
        applicationName: "FBLA - Owner",
        submissionNumber: "700024501",
        constituentName: "Jerome Tinder",
        status: "Awaiting Application",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-2",
        applicationName: "FBLA - Manager",
        submissionNumber: "700024502",
        constituentName: "Shiela Benefits",
        status: "Awaiting Application",
        lastUpdated: "07/08/2025",
      },
      {
        id: "1-3",
        applicationName: "FBLA - Officer",
        submissionNumber: "700024503",
        constituentName: "Ricky Schuler",
        status: "Denied",
        lastUpdated: "07/08/2025",
      },
    ],
  },
];

const COLUMNS = [
  { key: "licenseType", label: "License Type" },
  { key: "applicationName", label: "Application Name" },
  { key: "submissionNumber", label: "Submission Number" },
  { key: "constituentName", label: "Constituent Name" },
  { key: "status", label: "Status" },
  { key: "lastUpdated", label: "Last Updated" },
];

const STATUS_COLOR: Record<string, string> = {
  Approved: "#2E8540",
  Pending: "#8F5800",
  Rejected: "#D54309",
  Denied: "#B50909",
  Draft: "#71767A",
  "Awaiting Application": "#8F5800",
};

const childCellStyle: React.CSSProperties = {
  padding: "10px 12px",
  backgroundColor: "#E8F0F8",
  color: "#1B1B1B",
  lineHeight: "22px",
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
  wordWrap: "break-word",
  overflowWrap: "break-word",
  fontSize: 13,
};

export function PacketsTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState(10);

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalEntries = MOCK_DATA.length;
  const start = 1;
  const end = Math.min(pageSize, totalEntries);

  return (
    <div>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
          Showing {start} - {end} of {totalEntries} Entries
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'Roboto', sans-serif", fontSize: 14, color: "#1B1B1B" }}>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: 14,
              color: "#1B1B1B",
              height: 32,
              padding: "0 24px 0 8px",
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
      <div style={{ overflowX: "hidden" }}>
        <table
          className="usa-table-stacked"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'Roboto', sans-serif",
            fontSize: 14,
            tableLayout: "fixed",
          }}
        >
          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "13%" }} />
          </colgroup>
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  style={{
                    backgroundColor: "#F0F0F0",
                    color: "#1B1B1B",
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: "20px",
                    padding: "12px 12px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
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
                  }}
                >
                  {col.label}
                </th>
              ))}
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
                }}
              >
                Controls
              </th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((row, idx) => {
              const isStripe = idx % 2 === 1;
              const isExpanded = expandedRows.has(row.id);
              const cellBase: React.CSSProperties = {
                padding: "14px 12px",
                backgroundColor: isStripe ? "#F0F0F0" : "#FFFFFF",
                color: "#1B1B1B",
                lineHeight: "22px",
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
                wordWrap: "break-word",
                overflowWrap: "break-word",
              };

              return (
                <React.Fragment key={row.id}>
                  <tr>
                    {/* License Type */}
                    <td data-label="License Type" style={cellBase}>
                      <button
                        onClick={() => toggleExpand(row.id)}
                        title={isExpanded ? "Collapse" : "Expand"}
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          fontFamily: "'Roboto', sans-serif",
                          fontSize: 14,
                          color: "#1B1B1B",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 18,
                            height: 18,
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#1B1B1B",
                            borderRadius: 2,
                            fontSize: 14,
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          {isExpanded ? "−" : "+"}
                        </span>
                        {row.licenseType}
                      </button>
                    </td>
                    {/* Application Name */}
                    <td data-label="Application Name" style={cellBase}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {row.applicationName}
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 11,
                            color: "#fff",
                            textTransform: "uppercase",
                            backgroundColor: "#5c5c5c",
                            borderRadius: 2,
                            padding: "1px 6px",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                          }}
                        >
                          Primary
                        </span>
                      </span>
                    </td>
                    {/* Submission Number */}
                    <td data-label="Submission Number" style={cellBase}>{row.submissionNumber}</td>
                    {/* Constituent Name */}
                    <td data-label="Constituent Name" style={cellBase}>{row.constituentName}</td>
                    {/* Status */}
                    <td data-label="Status" style={{ ...cellBase, color: STATUS_COLOR[row.status] || "#1B1B1B" }}>
                      {row.status}
                    </td>
                    {/* Last Updated */}
                    <td data-label="Last Updated" style={cellBase}>{row.lastUpdated}</td>
                    {/* Controls */}
                    <td data-label="Controls" style={cellBase}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button
                          title="View Packet"
                          style={{
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
                            border: "none",
                          }}
                        >
                          <Eye size={16} color="#FFFFFF" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Child rows */}
                  {isExpanded &&
                    row.children.map((child) => (
                      <tr key={child.id}>
                        <td data-label="License Type" style={{ ...childCellStyle, paddingLeft: 32 }}>—</td>
                        <td data-label="Application Name" style={childCellStyle}>{child.applicationName}</td>
                        <td data-label="Submission Number" style={childCellStyle}>{child.submissionNumber}</td>
                        <td data-label="Constituent Name" style={childCellStyle}>{child.constituentName}</td>
                        <td data-label="Status" style={{ ...childCellStyle, color: STATUS_COLOR[child.status] || "#1B1B1B" }}>
                          {child.status}
                        </td>
                        <td data-label="Last Updated" style={childCellStyle}>{child.lastUpdated}</td>
                        <td data-label="Controls" style={childCellStyle}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            {child.status === "Denied" && (
                              <button
                                title="Reassign Applicant"
                                style={{
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
                                  border: "none",
                                }}
                              >
                                <UserPen size={16} color="#FFFFFF" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router";
import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";

/* ── Types ─────────────────────────────────────────────── */

interface InspectionRecord {
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

interface InspectionDetailPageProps {
  inspections: InspectionRecord[];
  basePath: string;
  statusColor: Record<string, string>;
  outcomeColor: Record<string, string>;
}

/* ── Field / section helpers ───────────────────────────── */

function Field({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="inspection-detail-field">
      <p
        className="inspection-detail-field-label"
        style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#1B1B1B", margin: "0 0 4px 0" }}
      >
        {label}
      </p>
      <p
        className="inspection-detail-field-value"
        style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: color ?? "#1B1B1B", margin: 0 }}
      >
        {value}
      </p>
    </div>
  );
}

function Section({
  title,
  left,
  right,
  isMobile,
  className,
}: {
  title: string;
  left: React.ReactNode;
  right: React.ReactNode;
  isMobile: boolean;
  className?: string;
}) {
  return (
    <div className={`inspection-detail-section ${className ?? ""}`} style={{ marginBottom: 32 }}>
      <h2
        className="inspection-detail-section-title"
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#1B1B1B",
          margin: "0 0 16px 0",
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "#DFE1E2",
        }}
      >
        {title}
      </h2>
      <div className="inspection-detail-section-columns" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 20 : 48 }}>
        <div className="inspection-detail-section-column inspection-detail-section-column--left" style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>{left}</div>
        <div className="inspection-detail-section-column inspection-detail-section-column--right" style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>{right}</div>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export function InspectionDetailPage({ inspections, basePath, statusColor, outcomeColor }: InspectionDetailPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const inspection = inspections.find((i) => i.id === id);

  return (
    <PageShell title="Inspections">
      <div className="inspection-detail-breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
        <button
          className="inspection-detail-breadcrumb-back"
          onClick={() => navigate(basePath)}
          style={{
            fontFamily: "'Public Sans', sans-serif",
            fontSize: 14,
            color: "#005EA2",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
            borderWidth: 0,
            borderStyle: "none",
            borderColor: "transparent",
          }}
        >
          Back to Inspections
        </button>
        {inspection && (
          <span className="inspection-detail-breadcrumb-current" style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 14, color: "#1B1B1B" }}>
            {">"} {inspection.id}
          </span>
        )}
      </div>

      {!inspection ? (
        <div className="inspection-detail-not-found" style={{ backgroundColor: "#FFFFFF", borderRadius: 4, padding: isMobile ? 16 : 24 }}>
          <p style={{ fontFamily: "'Public Sans', sans-serif", color: "#1B1B1B", margin: 0 }}>
            Inspection not found.
          </p>
        </div>
      ) : (
        <div
          className="inspection-detail-card"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            padding: 24,
          }}
        >
          <div
            className="inspection-detail-panel"
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#DFE1E2",
            }}
          >
            {/* Header bar */}
            <div className="inspection-detail-header" style={{ backgroundColor: "#122E51", borderRadius: "4px 4px 0 0", padding: "16px 24px" }}>
              <h1 className="inspection-detail-header-title" style={{ fontFamily: "'Public Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                Inspection Details
              </h1>
            </div>

            {/* Body */}
            <div className="inspection-detail-body" style={{ padding: 24 }}>
              <Section
                title="Inspection Information"
                className="inspection-detail-section--info"
                isMobile={isMobile}
                left={
                  <>
                    <Field label="Inspection Number" value={inspection.id} />
                    <Field label="Inspection Type" value={inspection.type} />
                    <Field label="Status" value={inspection.status} color={statusColor[inspection.status]} />
                    <Field label="Outcome" value={inspection.outcome} color={outcomeColor[inspection.outcome]} />
                  </>
                }
                right={
                  <>
                    <Field label="Source Type" value={inspection.source} />
                    <Field label="Source Reference" value={inspection.sourceType} />
                    <Field label="Subject Name" value={inspection.subject} />
                    <Field label="Site Address" value={inspection.siteAddress} />
                  </>
                }
              />

              <Section
                title="Scheduling Information"
                className="inspection-detail-section--scheduling"
                isMobile={isMobile}
                left={<Field label="Due Date" value={inspection.dueDate} />}
                right={<Field label="Completion Date" value={inspection.completionDate} />}
              />
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

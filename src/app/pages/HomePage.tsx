import { PageShell } from "../components/PageShell";
import { useIsMobile } from "../hooks/useIsMobile";

export function HomePage() {
  const isMobile = useIsMobile();

  return (
    <PageShell title="Welcome back." heroHeight={205} titleStyle={{ fontSize: isMobile ? "2rem" : "3rem" }}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          padding: isMobile ? 16 : 24,
        }}
      >
        <p
          style={{
            fontFamily: "'Roboto', sans-serif",
            color: "#1B1B1B",
            margin: 0,
          }}
        >
          Good afternoon. From here you can easily:
        </p>
        <ul
          style={{
            fontFamily: "'Roboto', sans-serif",
            color: "#1B1B1B",
            marginTop: 8,
            marginBottom: 0,
            paddingLeft: 20,
          }}
        >
          <li>Add, Edit, and Update information about yourself under your <a href="#" style={{ color: "#005EA2", textDecoration: "underline" }}>Account</a> section</li>
          <li>View the content and status of all your <a href="#" style={{ color: "#005EA2", textDecoration: "underline" }}>Submissions</a></li>
          <li>Manage your existing <a href="#" style={{ color: "#005EA2", textDecoration: "underline" }}>Certificate/License/Permit</a></li>
          <li>Purchase items you had previously added to your <a href="#" style={{ color: "#005EA2", textDecoration: "underline" }}>Shopping Cart</a></li>
          <li>Navigate to the <a href="#" style={{ color: "#005EA2", textDecoration: "underline" }}>State Portal</a> to search for more applications</li>
        </ul>
      </div>
    </PageShell>
  );
}
import { PageShell } from "../components/PageShell";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning.";
  if (hour < 17) return "Good afternoon.";
  return "Good evening.";
}

export function HomePage() {
  return (
    <PageShell title={getGreeting()} titleStyle={{ fontSize: "3rem" }} heroHeight={205}>
      <div style={{ background: "#fff", minHeight: "100%", padding: "1rem" }}>
        <p style={{ fontFamily: "'Roboto', sans-serif", color: "#1B1B1B" }}>Homepage content here</p>
      </div>
    </PageShell>
  );
}

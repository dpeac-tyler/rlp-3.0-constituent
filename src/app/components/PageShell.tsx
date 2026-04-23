import heroBg from "@/assets/28c9e8735508f793aebc982b410fd632f2bdc8d0.png";
import { useIsMobile } from "../hooks/useIsMobile";

interface PageShellProps {
  title: string;
  children: React.ReactNode;
  heroHeight?: number;
  titleStyle?: React.CSSProperties;
}

export function PageShell({ title, children, heroHeight = 80, titleStyle }: PageShellProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Hero banner with background image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: heroHeight,
          backgroundColor: "#E0EDF5",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Roboto', sans-serif",
            color: "#1B1B1B",
            position: "absolute",
            left: isMobile ? 16 : 35,
            top: "50%",
            transform: "translateY(-50%)",
            ...titleStyle,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Content area below hero */}
      <div
        className="flex-1"
        style={{ backgroundColor: "#FAFAFA", padding: isMobile ? 12 : 20 }}
      >
        {children}
      </div>
    </>
  );
}
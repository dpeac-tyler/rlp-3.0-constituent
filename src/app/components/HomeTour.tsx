import { TourProvider, useTour, type StepType } from "@reactour/tour";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";

const STORAGE_KEY = "home-tour-dismissed";

interface SidebarControl {
  isMobile: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const noop = () => {};

const SidebarControlContext = createContext<SidebarControl>({
  isMobile: false,
  openSidebar: noop,
  closeSidebar: noop,
});

/** Lets Layout hand the tour control over the mobile nav drawer, so tour steps can open/close it as they go. */
export function SidebarControlProvider({
  isMobile,
  openSidebar,
  closeSidebar,
  children,
}: SidebarControl & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isMobile, openSidebar, closeSidebar }),
    [isMobile, openSidebar, closeSidebar]
  );
  return <SidebarControlContext.Provider value={value}>{children}</SidebarControlContext.Provider>;
}

function buildHomeTourSteps({ isMobile, openSidebar, closeSidebar }: SidebarControl): StepType[] {
  return [
    {
      selector: "#tour-nav-home",
      content: "1. This is your main navigation — jump between Home, your account, and all your business services from here.",
      action: () => { if (isMobile) openSidebar(); },
    },
    {
      selector: "#tour-nav-services",
      content: "2. All of your business and asset services — Affiliations, Certifications, Submissions, and more — live in this section.",
      action: () => { if (isMobile) openSidebar(); },
    },
    {
      selector: "#tour-header-account",
      content: "3. Manage your account details, or log out, from the header at any time.",
      action: () => { if (isMobile) closeSidebar(); },
    },
    {
      selector: "#tour-banner",
      content: "4. Keep an eye on this banner for important announcements about the portal.",
      action: () => { if (isMobile) closeSidebar(); },
    },
    {
      selector: "#tour-tile-business",
      content: "5. Quick links to your business account info, submissions, and certifications.",
      action: () => { if (isMobile) closeSidebar(); },
    },
    {
      selector: "#tour-tile-asset",
      content: "6. Manage asset-specific submissions and certifications from this tile.",
      action: () => { if (isMobile) closeSidebar(); },
    },
  ];
}

/** Marks the tour dismissed and closes the mobile drawer whenever the tour transitions from open to closed, regardless of how it was closed (X, mask click, Esc). */
function TourCloseSync() {
  const { isOpen } = useTour();
  const { closeSidebar } = useContext(SidebarControlContext);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      closeSidebar();
    }
    wasOpen.current = isOpen;
  }, [isOpen, closeSidebar]);

  return null;
}

export function HomeTourProvider({ children }: { children: ReactNode }) {
  const sidebarControl = useContext(SidebarControlContext);
  const steps = useMemo(
    () => buildHomeTourSteps(sidebarControl),
    [sidebarControl.isMobile, sidebarControl.openSidebar, sidebarControl.closeSidebar]
  );

  return (
    <TourProvider
      steps={steps}
      showBadge={false}
      padding={{ mask: 6, popover: [12, 12] }}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: 8,
          fontFamily: "'Public Sans', sans-serif",
          fontSize: 14,
          color: "#1B1B1B",
          maxWidth: "min(320px, calc(100vw - 32px))",
        }),
        dot: (base, state) => ({
          ...base,
          background: state?.current ? "#005EA2" : "#C9C9C9",
        }),
        button: (base) => ({ ...base, color: "#005EA2" }),
        close: (base) => ({ ...base, color: "#5C6B7A", top: 12, right: 12 }),
      }}
    >
      <TourCloseSync />
      {children}
    </TourProvider>
  );
}

/** Auto-starts the tour once per browser session, then remembers it was seen. */
export function useHomeTourAutoStart() {
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    const timer = setTimeout(() => setIsOpen(true), 600);
    return () => clearTimeout(timer);
  }, [setIsOpen]);
}

/** Returns a function that restarts the tour from the first step, for a manual "Take a tour" trigger. */
export function useStartHomeTour() {
  const { setIsOpen, setCurrentStep } = useTour();
  return () => {
    setCurrentStep(0);
    setIsOpen(true);
  };
}

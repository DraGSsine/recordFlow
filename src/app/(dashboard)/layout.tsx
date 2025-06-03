import { DashboardNavBar, LandingNavBar } from "@/components/NavBars";
import Wrapper from "@/components/wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper>
      <main>
        <DashboardNavBar />
        {children}
      </main>
    </Wrapper>
  );
}

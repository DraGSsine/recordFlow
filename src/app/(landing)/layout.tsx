import { AuthModal } from "@/components/landing/auth-modal";
import { LandingNavBar } from "@/components/NavBars";
import Wrapper from "@/components/wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper>
      <main>
        <LandingNavBar />
        {children}
      </main>
      <AuthModal/>
    </Wrapper>
  );
}

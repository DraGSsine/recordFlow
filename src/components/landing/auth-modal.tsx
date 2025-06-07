"use client";
import { Button } from "../ui/button";
import { useContext } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { LandingContext } from "@/context/landing-context-provider";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function AuthModal({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isAuthModalOpen, setIsAuthModalOpen } = useContext(LandingContext);
  const handleAuth = async (provider: "google" | "github" | "facebook" | "apple") => {
    console.log("sign in with " + provider);
    return await authClient.signIn.social({ provider });
  };
  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-md p-6 bg-background/80 backdrop-blur-sm rounded-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Welcome to RecordFlow</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose how you'd like to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <Button
            onClick={() => handleAuth("google")}
            variant="outline"
            className="w-full flex items-center border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md space-x-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              />
            </svg>
            <span className="text-left">Continue with Google</span>
          </Button>

          <Button
            onClick={() => handleAuth("github")}
            variant="outline"
            className="w-full flex items-center border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md space-x-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span className="text-left">Continue with GitHub</span>
          </Button>

          <Button
            onClick={() => handleAuth("apple")}
            variant="outline"
            className="w-full flex items-center border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md space-x-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
              />
            </svg>
            <span className="text-left">Continue with Apple</span>
          </Button>

          <Button
            onClick={() => handleAuth("facebook")}
            variant="outline"
            className="w-full flex items-center border-muted-foreground/20 hover:bg-accent hover:text-accent-foreground rounded-lg shadow-md space-x-4"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.008c4.781-.75 8.438-4.89 8.438-9.88z"
              />
            </svg>
            <span className="text-left">Continue with Facebook</span>
          </Button>
        </div>

        <div className="bg-muted/50 px-6 py-4 border-t mt-6">
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

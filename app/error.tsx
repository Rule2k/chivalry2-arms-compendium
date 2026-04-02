"use client";

import { Button } from "@/common/components/button";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="compendium-page max-w-2xl">
        <div className="compendium-content flex flex-col items-center gap-4 py-12 text-center">
          <p className="font-sc text-sm uppercase tracking-[0.28em] text-[var(--crimson)]">
            Compendium Fault
          </p>
          <h1 className="font-ornate text-4xl font-bold text-[var(--royal-blue)]">
            The archive could not be opened.
          </h1>
          <p className="max-w-xl text-base leading-7 text-[#5b4d40]">
            A rendering or catalog error interrupted the page. Retry the render, then inspect
            the catalog pipeline if the fault persists.
          </p>
          {error.digest ? (
            <p className="font-sc text-xs uppercase tracking-[0.22em] text-[#7a6a5a]">
              Digest {error.digest}
            </p>
          ) : null}
          <Button
            className="px-5 py-2"
            onClick={reset}
            variant="duel"
          >
            Retry Render
          </Button>
        </div>
      </section>
    </main>
  );
};

export default GlobalError;

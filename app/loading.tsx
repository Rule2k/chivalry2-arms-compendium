const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="compendium-page max-w-2xl">
        <div className="compendium-content flex flex-col items-center gap-4 py-12 text-center">
          <p className="font-sc text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Opening The Archive
          </p>
          <h1 className="font-ornate text-4xl font-bold text-[var(--royal-blue)]">
            Cataloguing the armoury...
          </h1>
          <div className="ornamental-rule text-xl">&#9884;</div>
        </div>
      </section>
    </main>
  );
};

export default Loading;

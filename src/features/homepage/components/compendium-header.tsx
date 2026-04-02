export const CompendiumHeader = () => {
  return (
    <header className="mb-6 border-b-[3px] border-double border-[var(--border-gold)] px-0 py-6 text-center md:mb-8 md:py-7">
      <h1 className="font-ornate text-[2rem] leading-none font-bold tracking-[0.2em] text-[var(--royal-blue)] md:text-[2.6rem] md:tracking-[0.25em]">
        <span className="font-sc mb-1 block text-[0.55em] font-semibold tracking-[0.5em] text-[var(--gold)]">
          Chivalry 2
        </span>
        ARMS COMPENDIUM
      </h1>
      <div className="ornamental-rule my-2 text-sm">&#9884;</div>
      <p className="font-ornate text-base italic text-[var(--royal-blue-light)] md:text-[1.05rem]">
        A scholarly record of every blade, axe, and bludgeon in the realm
      </p>
      <div className="font-ornate mt-4 inline-block bg-[var(--royal-blue)] px-7 py-[5px] text-[11px] font-bold uppercase tracking-[0.45em] text-[var(--gold-bright)]">
        Compiled by the Royal Scribe
      </div>
    </header>
  );
};

export default function Footer() {
  return (
    <footer className="border-t border-dim-2 bg-void">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-[10px] tracking-widest text-dim sm:flex-row">
        <span>ALMAS.SYS © {new Date().getFullYear()}</span>
        <span>BUILT WITH REACT + TAILWIND — HOSTED ON THE EDGE</span>
      </div>
    </footer>
  );
}

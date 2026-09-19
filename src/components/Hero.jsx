export default function Hero() {
  return (
    <section id="top" className="identity-hero" aria-labelledby="hero-title">
      <article className="identity-card" lang="en">
        <header className="identity-status">
          <span className="identity-brand">ML / SWE</span>
          <span className="identity-label">SYSTEM ONLINE</span>
          <span className="identity-signal" aria-hidden="true"><i /><i /><i /><i /></span>
        </header>
        <div className="identity-credentials">
          <div>
            <p className="identity-label">ENGINEER</p>
            <p className="identity-id">ALM-9.2</p>
          </div>
          <div className="identity-access" aria-hidden="true">
            <p className="identity-label">ACCESS</p>
            <p className="identity-mask">**********</p>
          </div>
        </div>
        <div className="identity-profile">
          <div className="identity-avatar">
            <img
              src="/alife.png"
              alt="Alif Masrur"
              className="identity-photo"
            />
          </div>
          <div className="identity-details">
            <p className="identity-system">SYSTEM.PORTFOLIO</p>
            <span className="identity-mark" aria-hidden="true">/</span>
            <p className="identity-label identity-code-label">SEC CODE</p>
            <p className="identity-code">7731A-M-0426</p>
            <p className="identity-japanese" lang="ja">エンジニア</p>
            <h1 id="hero-title" className="identity-title">
              <span className="sr-only">Alif Masrur — </span>
              MACHINE<br />LEARNING ENG.
            </h1>
            <p className="identity-japanese" lang="ja">機械学習</p>
          </div>
        </div>
        <p className="identity-bio">
          My name is Alif Masrur. I am a machine learning &amp; software
          engineer. I like building things from scratch to really understand
          how they work — from Transformer architectures to MLOps pipelines
          that ship themselves.
        </p>
        <div className="px-5 py-5">
            <a href="/resume-alif-english.pdf"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block border border-phosphor px-5 py-3 text-sm text-phosphor transition-colors hover:bg-phosphor/10">
                
              VIEW RESUME ↗
            </a>
        </div>

        <footer className="identity-footer">
          <span aria-hidden="true">✳</span>
          <span>MACHINE LEARNING ENGINEER</span>
          <span aria-hidden="true">✳</span>
        </footer>
      </article>
    </section>
  );
}

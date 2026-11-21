import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

export default function CertificateModal({
  title,
  subtitle,
  images,
  url,
  onClose,
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const closeBtnRef = useRef(null);

  const count = images?.length ?? 0;
  const activeImage = images?.[index] ?? null;
  const verifyUrl = activeImage?.url || url;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && count > 1) {
        e.preventDefault();
        setIndex((curr) => (curr + 1) % count);
      } else if (e.key === "ArrowLeft" && count > 1) {
        e.preventDefault();
        setIndex((curr) => (curr - 1 + count) % count);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, onClose]);

  if (!activeImage) return null;

  function step(delta) {
    if (count <= 1) return;
    setIndex((curr) => (curr + delta + count) % count);
  }

  return (
    <div
      className="cert-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      onClick={onClose}
    >
      <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-head">
          <div className="cert-modal-heading">
            <h3 id="cert-modal-title">{title}</h3>
            {subtitle && <p className="cert-modal-sub">{subtitle}</p>}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="ascii-btn"
            onClick={onClose}
          >
            <span>[{t("closeModal")}]</span>
          </button>
        </div>

        <div className="cert-modal-stage">
          <img
            src={activeImage.src}
            alt={activeImage.label || title}
            className="cert-modal-img"
          />
        </div>

        <div className="cert-modal-foot">
          <span className="cert-modal-caption">
            {activeImage.label || title}
          </span>

          <div className="cert-modal-actions">
            {count > 1 && (
              <span className="cert-modal-pager">
                <button
                  type="button"
                  className="ascii-btn"
                  onClick={() => step(-1)}
                >
                  <span>[{t("prevCert")}]</span>
                </button>
                <span className="muted">
                  {index + 1} / {count}
                </span>
                <button
                  type="button"
                  className="ascii-btn"
                  onClick={() => step(1)}
                >
                  <span>[{t("nextCert")}]</span>
                </button>
              </span>
            )}

            <a
              href={activeImage.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              [{t("openFull")}]
            </a>

            {verifyUrl && (
              <a href={verifyUrl} target="_blank" rel="noopener noreferrer">
                [{t("verifyLink")}]
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

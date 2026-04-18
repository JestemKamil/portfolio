import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prywatność",
  description:
    "Informacja o prywatności i przetwarzaniu danych w portfolio oraz narzędziach online Kamila Wąsika.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ paddingTop: "7rem", paddingBottom: "5rem", maxWidth: "800px" }}>
      <div className="section-label">Prywatność</div>
      <h1 style={{ fontFamily: "var(--ff-head)", fontSize: "2.3rem", lineHeight: 1.15, marginBottom: "1rem" }}>
        Polityka prywatności (wersja skrócona)
      </h1>
      <p className="section-sub" style={{ marginBottom: "2rem" }}>
        Ta strona opisuje, jak portfolio i narzędzia online (w tym Kreator CV) obsługują dane użytkownika.
      </p>

      <section style={{ padding: 0 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Jakie dane są przetwarzane</h2>
        <p style={{ marginBottom: "1rem", color: "var(--ink-2)" }}>
          W formularzach kontaktowych i kanałach kontaktu przetwarzane są dane przekazane dobrowolnie (np. adres
          e-mail). Kreator CV działa lokalnie w przeglądarce i zapisuje dane dokumentu wyłącznie w pamięci lokalnej
          urządzenia (localStorage).
        </p>
      </section>

      <section style={{ padding: 0 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Kreator CV i localStorage</h2>
        <p style={{ marginBottom: "1rem", color: "var(--ink-2)" }}>
          Dane wpisane do kreatora CV nie są przesyłane na serwer aplikacji. Użytkownik może je samodzielnie usunąć
          przez wyczyszczenie formularza lub usunięcie danych witryny w ustawieniach przeglądarki.
        </p>
      </section>

      <section style={{ padding: 0 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Analityka</h2>
        <p style={{ marginBottom: "1rem", color: "var(--ink-2)" }}>
          Strona korzysta z Google Analytics 4 oraz Microsoft Clarity do anonimowej analizy ruchu i poprawy jakości
          działania serwisu.
        </p>
      </section>

      <section style={{ padding: 0 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Kontakt</h2>
        <p style={{ color: "var(--ink-2)" }}>
          W sprawach prywatności można skontaktować się przez e-mail:{" "}
          <a href="mailto:kontakt@kamil-wasik.pl" style={{ color: "var(--accent)" }}>
            kontakt@kamil-wasik.pl
          </a>
          .
        </p>
      </section>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn-ghost">
          Powrót do strony głównej
        </Link>
      </div>
    </main>
  );
}

import { contactChannels } from "@/components/home/content";
import { ContactLink } from "@/components/home/primitives";

export function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-row">
          <div>
            <div className="section-label">Kontakt</div>
            <h2>
              Porozmawiajmy
              <br />o Twoim projekcie.
            </h2>
            <p className="section-sub">
              Masz pomysł na stronę lub sklep? Chcesz odświeżyć istniejącą witrynę? Napisz — odpiszę
              w ciągu 24 godzin.
            </p>
            <div className="contact-info">
              {contactChannels.map((channel) => (
                <ContactLink key={channel.label} channel={channel} />
              ))}
            </div>
            <div className="vat-note">
              <svg viewBox="0 0 24 24" className="vat-icon">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Wystawiam faktury VAT
            </div>
          </div>
          <div className="avail-card">
            <div className="avail-status">
              <span className="avail-dot" />
              Dostępny do nowych projektów
            </div>
            <p className="avail-text">
              Aktualnie przyjmuję nowe zlecenia. Współpracuję zarówno z firmami szukającymi
              jednorazowej realizacji, jak i z klientami wymagającymi stałego wsparcia technicznego i
              utrzymania strony.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

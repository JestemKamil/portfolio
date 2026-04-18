import type { ReactNode } from "react";
import type { CvData, CvTemplateKey } from "@/components/cv-builder/types";

type ContactsProps = {
  personal: CvData["personal"];
  separator?: string;
};

function Contacts({ personal, separator = " · " }: ContactsProps) {
  const values = [personal.email, personal.phone, personal.city, personal.website, personal.linkedin].filter(Boolean);
  return values.map((value, index) => (
    <span key={`${value}-${index}`}>
      {index > 0 ? separator : ""}
      {value}
    </span>
  ));
}

function ConsentClause({ personal }: { personal: CvData["personal"] }) {
  if (!personal.consentEnabled || !personal.consentText.trim()) {
    return null;
  }

  return <p className="cv-consent">{personal.consentText}</p>;
}

function EditorialTemplate({ data }: { data: CvData }) {
  const { personal, summary, experience, education, skills, projects, languages, certificates } = data;
  return (
    <div className="cv-inner">
      <div className="cv-head">
        <div className="cv-name">{personal.name || "Imię Nazwisko"}</div>
        {personal.title ? <div className="cv-title">{personal.title}</div> : null}
        <div className="cv-contact">
          <Contacts personal={personal} />
        </div>
      </div>
      {summary ? (
        <div className="cv-section">
          <p className="cv-summary">{summary}</p>
        </div>
      ) : null}
      {experience.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Doświadczenie</div>
          {experience.map((item, index) => (
            <div key={`${item.role}-${item.company}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.role || "—"}</span>
                  {item.company ? <span className="cv-entry-sub cv-muted"> · {item.company}</span> : null}
                </div>
                <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
              </div>
              {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
      {projects.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Dodatkowe atuty</div>
          {projects.map((item, index) => (
            <div key={`${item.name}-${item.role}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.name || "—"}</span>
                  {item.role ? <span className="cv-entry-sub cv-muted"> · {item.role}</span> : null}
                </div>
              </div>
              {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
      {education.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Wykształcenie</div>
          {education.map((item, index) => (
            <div key={`${item.school}-${item.degree}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.degree || item.school}</span>
                  {item.degree && item.school ? <span className="cv-entry-sub cv-muted"> · {item.school}</span> : null}
                </div>
                <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
              </div>
              {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
      {skills.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Umiejętności</div>
          <div>
            {skills.map((skill) => (
              <span key={skill} className="cv-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {languages.length || certificates.length ? (
        <div className="cv-section cv-grid-two">
          {languages.length ? (
            <div>
              <div className="cv-section-head">Języki</div>
              {languages.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.level ? ` — ${item.level}` : ""}
                </div>
              ))}
            </div>
          ) : null}
          {certificates.length ? (
            <div>
              <div className="cv-section-head">Certyfikaty</div>
              {certificates.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.issuer ? <span className="cv-muted"> · {item.issuer}</span> : null}
                  {item.date ? <span className="cv-muted"> · {item.date}</span> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <ConsentClause personal={personal} />
    </div>
  );
}

function MonoTemplate({ data }: { data: CvData }) {
  const { personal, summary, experience, education, skills, projects, languages, certificates } = data;
  return (
    <div className="cv-inner">
      <div className="cv-head">
        <div>
          <div className="cv-name">{personal.name || "Imię Nazwisko"}</div>
          {personal.title ? <div className="cv-title">{personal.title}</div> : null}
        </div>
        <div className="cv-contact">
          {[personal.email, personal.phone, personal.city, personal.website, personal.linkedin]
            .filter(Boolean)
            .map((value, index) => (
              <div key={`${value}-${index}`}>{value}</div>
            ))}
        </div>
      </div>
      {summary ? (
        <div className="cv-section">
          <div className="cv-section-head">Profil</div>
          <div className="cv-entry-body">{summary}</div>
        </div>
      ) : null}
      {experience.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Doświadczenie</div>
          {experience.map((item, index) => (
            <div key={`${item.role}-${item.company}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.role || "—"}</span>
                  {item.company ? <span className="cv-entry-sub cv-muted"> {item.company}</span> : null}
                </div>
                <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
              </div>
              {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
      {projects.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Dodatkowe atuty</div>
          {projects.map((item, index) => (
            <div key={`${item.name}-${item.role}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.name || "—"}</span>
                  {item.role ? <span className="cv-entry-sub cv-muted"> {item.role}</span> : null}
                </div>
              </div>
              {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
            </div>
          ))}
        </div>
      ) : null}
      {education.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Edukacja</div>
          {education.map((item, index) => (
            <div key={`${item.school}-${item.degree}-${index}`} className="cv-entry">
              <div className="cv-entry-head">
                <div>
                  <span className="cv-entry-title">{item.degree || item.school}</span>
                  {item.degree && item.school ? <span className="cv-entry-sub cv-muted"> {item.school}</span> : null}
                </div>
                <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {skills.length ? (
        <div className="cv-section">
          <div className="cv-section-head">Umiejętności</div>
          <div>
            {skills.map((skill) => (
              <span key={skill} className="cv-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {languages.length || certificates.length ? (
        <div className="cv-section cv-grid-two">
          {languages.length ? (
            <div>
              <div className="cv-section-head">Języki</div>
              {languages.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.level ? ` :: ${item.level}` : ""}
                </div>
              ))}
            </div>
          ) : null}
          {certificates.length ? (
            <div>
              <div className="cv-section-head">Certyfikaty</div>
              {certificates.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.date ? ` [${item.date}]` : ""}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <ConsentClause personal={personal} />
    </div>
  );
}

function CompactTemplate({ data }: { data: CvData }) {
  const { personal, summary, experience, education, skills, projects, languages, certificates } = data;
  return (
    <div className="cv-inner">
      <div className="cv-stripe">
        <div className="cv-stripe-inner">
          <div>
            <div className="cv-name">{personal.name || "Imię Nazwisko"}</div>
            {personal.title ? <div className="cv-title">{personal.title}</div> : null}
          </div>
          <div className="cv-contact">
            {[personal.email, personal.phone, personal.city].filter(Boolean).map((value, index) => (
              <div key={`${value}-${index}`}>{value}</div>
            ))}
            {personal.website || personal.linkedin ? <div>{personal.website || personal.linkedin}</div> : null}
          </div>
        </div>
      </div>
      <div className="cv-body">
        <div>
          {summary ? <div className="cv-summary">{summary}</div> : null}
          {experience.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Doświadczenie</div>
              {experience.map((item, index) => (
                <div key={`${item.role}-${item.company}-${index}`} className="cv-entry">
                  <div className="cv-entry-head">
                    <div>
                      <span className="cv-entry-title">{item.role || "—"}</span>
                      {item.company ? <span className="cv-entry-sub cv-muted"> · {item.company}</span> : null}
                    </div>
                    <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
                  </div>
                  {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
          {projects.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Dodatkowe atuty</div>
              {projects.map((item, index) => (
                <div key={`${item.name}-${item.role}-${index}`} className="cv-entry">
                  <div className="cv-entry-head">
                    <div>
                      <span className="cv-entry-title">{item.name || "—"}</span>
                      {item.role ? <span className="cv-entry-sub cv-muted"> · {item.role}</span> : null}
                    </div>
                  </div>
                  {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          {skills.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Umiejętności</div>
              <div>
                {skills.map((skill) => (
                  <span key={skill} className="cv-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {education.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Edukacja</div>
              {education.map((item, index) => (
                <div key={`${item.school}-${item.degree}-${index}`} className="cv-entry">
                  <div className="cv-entry-title">{item.degree || item.school}</div>
                  {item.school && item.degree ? <div className="cv-entry-sub cv-muted">{item.school}</div> : null}
                  <div className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</div>
                </div>
              ))}
            </div>
          ) : null}
          {languages.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Języki</div>
              {languages.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  <strong>{item.name}</strong>
                  {item.level ? <span className="cv-muted"> — {item.level}</span> : null}
                </div>
              ))}
            </div>
          ) : null}
          {certificates.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Certyfikaty</div>
              {certificates.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  <strong>{item.name}</strong>
                  {item.issuer ? (
                    <div className="cv-muted">
                      {item.issuer}
                      {item.date ? ` · ${item.date}` : ""}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <ConsentClause personal={personal} />
    </div>
  );
}

function CleanTemplate({ data }: { data: CvData }) {
  const { personal, summary, experience, education, skills, projects, languages, certificates } = data;
  const contacts = [personal.email, personal.phone, personal.city, personal.website || personal.linkedin].filter(Boolean);

  return (
    <div className="cv-inner">
      <div className="cv-clean-head">
        <div>
          <div className="cv-name">{personal.name || "Imię Nazwisko"}</div>
          {personal.title ? <div className="cv-title">{personal.title}</div> : null}
        </div>
        <div className="cv-clean-contact">
          {contacts.map((value, index) => (
            <div key={`${value}-${index}`}>{value}</div>
          ))}
        </div>
      </div>

      {summary ? <div className="cv-clean-summary">{summary}</div> : null}

      <div className="cv-clean-main">
        <div>
          {experience.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Doświadczenie</div>
              {experience.map((item, index) => (
                <div key={`${item.role}-${item.company}-${index}`} className="cv-entry">
                  <div className="cv-entry-head">
                    <div>
                      <span className="cv-entry-title">{item.role || "—"}</span>
                      {item.company ? <span className="cv-entry-sub cv-muted"> · {item.company}</span> : null}
                    </div>
                    <span className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</span>
                  </div>
                  {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
          {projects.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Dodatkowe atuty</div>
              {projects.map((item, index) => (
                <div key={`${item.name}-${item.role}-${index}`} className="cv-entry">
                  <div className="cv-entry-head">
                    <span className="cv-entry-title">{item.name || "—"}</span>
                    {item.role ? <span className="cv-entry-sub cv-muted">{item.role}</span> : null}
                  </div>
                  {item.desc ? <div className="cv-entry-body">{item.desc}</div> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="cv-clean-side">
          {skills.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Umiejętności</div>
              <div>
                {skills.map((skill) => (
                  <span key={skill} className="cv-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {education.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Edukacja</div>
              {education.map((item, index) => (
                <div key={`${item.school}-${item.degree}-${index}`} className="cv-entry">
                  <div className="cv-entry-title">{item.degree || item.school}</div>
                  {item.school && item.degree ? <div className="cv-entry-sub cv-muted">{item.school}</div> : null}
                  <div className="cv-entry-meta">{[item.from, item.to].filter(Boolean).join(" – ")}</div>
                </div>
              ))}
            </div>
          ) : null}
          {languages.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Języki</div>
              {languages.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.level ? <span className="cv-muted"> — {item.level}</span> : null}
                </div>
              ))}
            </div>
          ) : null}
          {certificates.length ? (
            <div className="cv-section">
              <div className="cv-section-head">Certyfikaty</div>
              {certificates.map((item, index) => (
                <div key={`${item.name}-${index}`} className="cv-entry-body">
                  {item.name}
                  {item.issuer ? <span className="cv-muted"> · {item.issuer}</span> : null}
                  {item.date ? <span className="cv-muted"> · {item.date}</span> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <ConsentClause personal={personal} />
    </div>
  );
}

export const CV_TEMPLATES: Record<CvTemplateKey, { label: string; render: (data: CvData) => ReactNode }> = {
  editorial: { label: "Klasyczny", render: (data) => <EditorialTemplate data={data} /> },
  mono: { label: "Techniczny", render: (data) => <MonoTemplate data={data} /> },
  compact: { label: "Nowoczesny", render: (data) => <CompactTemplate data={data} /> },
  clean: { label: "Minimalny", render: (data) => <CleanTemplate data={data} /> },
};

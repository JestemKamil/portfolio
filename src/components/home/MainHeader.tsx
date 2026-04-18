import { navLinks } from "@/components/home/content";

type MainHeaderProps = {
  basePath?: string;
};

export function MainHeader({ basePath = "" }: MainHeaderProps) {
  const logoHref = basePath ? `${basePath}#hero` : "#hero";

  return (
    <nav>
      <div className="nav-inner">
        <a href={logoHref} className="nav-logo">
          Kamil <em>Wąsik</em>
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={`${basePath}${link.href}`} className={link.cta ? "nav-cta" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

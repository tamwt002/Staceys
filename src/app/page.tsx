const teas = [
  {
    name: "Gyokuro",
    origin: "Uji, Kyoto, Japan",
    type: "Green",
    notes:
      "Deep umami, dried seaweed, lingering sweetness. Shade-grown for three weeks before harvest.",
    price: "$9.00",
  },
  {
    name: "Silver Needle",
    origin: "Fuding, Fujian, China",
    type: "White",
    notes:
      "Fresh cucumber, pale honeydew, barely-there amber. Minimal processing — just withered and dried.",
    price: "$10.00",
  },
  {
    name: "Dongding",
    origin: "Nantou, Taiwan",
    type: "Oolong",
    notes: "Toasted caramel, ripe stone fruit, exceptionally clean finish.",
    price: "$8.00",
  },
  {
    name: "High Mountain Ali Shan",
    origin: "Alishan, Taiwan",
    type: "Oolong",
    notes:
      "Floral, creamy, light orchid. Grown at 1,200m. Better on the third steep than the first.",
    price: "$10.00",
  },
  {
    name: "Darjeeling First Flush",
    origin: "Makaibari Estate, West Bengal",
    type: "Black",
    notes:
      "Muscatel, dried apricot, spring meadow. The year's first picking, March to April only.",
    price: "$8.00",
  },
  {
    name: "Assam GFBOP",
    origin: "Hathikuli Estate, Assam",
    type: "Black",
    notes: "Malt, dark chocolate, pleasantly astringent. Takes milk well.",
    price: "$7.00",
  },
  {
    name: "Hojicha",
    origin: "Kyoto, Japan",
    type: "Roasted",
    notes:
      "Toasted wood, caramel, very low caffeine. Good in the evening.",
    price: "$7.00",
  },
];

const logoPlaceholders = [
  "Broadsheet Sydney",
  "Time Out Sydney",
  "Good Food",
  "The Saturday Paper",
  "Concrete Playground",
];

export default function Home() {
  return (
    <div className="layout">
      {/* Book-spine vertical label — the site's one aesthetic risk */}
      <aside className="spine" aria-hidden="true">
        <span className="spine-text">Tino&apos;s Tea · King Street, Newtown NSW</span>
      </aside>

      <div className="main-content">
        <header className="site-header">
          <div className="header-row">
            <span className="shop-name">Tino&apos;s Tea</span>
            <nav aria-label="Site navigation">
              <ul className="site-nav">
                <li>
                  <a href="#menu">Menu</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#brewing">Brewing</a>
                </li>
                <li>
                  <a href="#find-us">Find&nbsp;us</a>
                </li>
              </ul>
            </nav>
            <p className="header-meta">Tue–Sun · 10:00–18:00 · 14 King St, Newtown NSW</p>
          </div>
          <hr className="rule-draw" aria-hidden="true" />
        </header>

        <main>
          {/* ── Menu ──────────────────────────────────────────── */}
          <section id="menu" className="section">
            <p className="section-label" aria-hidden="true">
              The Menu
            </p>
            <table className="menu-table" aria-label="Tea menu">
              <thead>
                <tr>
                  <th scope="col">Tea</th>
                  <th scope="col">Origin</th>
                  <th scope="col">Type</th>
                  <th scope="col">Character</th>
                  <th scope="col">Per cup</th>
                </tr>
              </thead>
              <tbody>
                {teas.map((tea) => (
                  <tr key={tea.name}>
                    <td className="tea-name">{tea.name}</td>
                    <td className="tea-origin">{tea.origin}</td>
                    <td className="tea-type">{tea.type}</td>
                    <td className="tea-notes">{tea.notes}</td>
                    <td className="tea-price">{tea.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="menu-footnote">
              All teas also available loose by weight. Ask at the counter.
            </p>
          </section>

          {/* ── As seen in ───────────────────────────────────── */}
          <section className="logo-strip" aria-label="As featured in">
            <p className="logo-strip-label">As featured in</p>
            <ul className="logo-list">
              {logoPlaceholders.map((name) => (
                <li key={name} className="logo-slot" aria-label={name}>
                  <span className="logo-slot-inner">LOGO</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── About ─────────────────────────────────────────── */}
          <section id="about" className="section">
            <p className="section-label" aria-hidden="true">
              About
            </p>
            <div className="about-grid">
              <h2 className="about-headline">A small shop. A short list.</h2>
              <div className="about-body">
                <p>
                  Tino&apos;s opened in 2019 on King Street, Newtown — halfway
                  between the station and the pub that plays jazz on Sundays.
                  We keep the menu short on purpose. Every tea here was tasted
                  before it was bought, and most come from farms we&apos;ve
                  visited or correspond with directly.
                </p>
                <p>
                  We don&apos;t serve lattes. We serve tea, made properly, in the
                  right vessel for what it is — a gaiwan for oolongs, a kyusu
                  for the Japanese greens, a plain white cup for everything
                  else. We&apos;re also happy to talk about brewing for as long
                  as you&apos;d like.
                </p>
                <p>
                  The menu changes with the seasons and with what&apos;s good.
                  First flush Darjeelings arrive in autumn. Shincha in winter.
                  Whatever that means for the menu at any given moment,
                  it&apos;s written on the board by the door.
                </p>
              </div>
            </div>
          </section>

          {/* ── Brewing ───────────────────────────────────────── */}
          <section id="brewing" className="section">
            <p className="section-label" aria-hidden="true">
              Brewing notes
            </p>
            <div className="brewing-grid">
              <p className="brewing-intro">
                Five things that matter more than equipment.
              </p>
              <ol className="brewing-steps" aria-label="Brewing steps">
                <li>
                  Start with water that hasn&apos;t been over-boiled. Reboiling
                  drives off dissolved oxygen and flattens the flavour. 80°C
                  for greens and whites; 95°C for black.
                </li>
                <li>
                  Warm the vessel first. Thirty seconds with hot water, then
                  empty it completely. Cold ceramic drops the temperature more
                  than you expect.
                </li>
                <li>
                  Measure by weight, not by eye. Three to five grams per 150ml
                  is a reliable starting point across most styles.
                </li>
                <li>
                  Keep the first steep short. Two minutes for black; forty-five
                  seconds for a good oolong or green. You can always go longer
                  next time.
                </li>
                <li>
                  The second steep is often the best. Don&apos;t discard leaves after
                  the first cup — most of the teas on this list are worth four
                  or five steeps.
                </li>
              </ol>
            </div>
          </section>
        </main>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer id="find-us" className="site-footer">
          <div>
            <p className="footer-name">Tino&apos;s Tea</p>
            <p className="footer-tagline">Est. 2019</p>
          </div>
          <div>
            <p className="footer-heading">Hours</p>
            <p className="footer-body">
              Tuesday – Friday&nbsp;&nbsp;&nbsp;10:00–18:00
              <br />
              Saturday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;09:00–18:00
              <br />
              Sunday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10:00–16:00
              <br />
              Monday&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Closed
            </p>
          </div>
          <div>
            <p className="footer-heading">Find us</p>
            <p className="footer-body">
              14 King Street
              <br />
              Newtown NSW 2042
              <br />
              <br />
              <a href="mailto:hello@tinosteashop.com.au">
                hello@tinosteashop.com.au
              </a>
              <br />
              <br />
              No reservations needed.
              <br />
              Walk in.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

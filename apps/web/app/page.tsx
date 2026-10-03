import Link from "next/link";

const setupSteps = [
  { number: "01", title: "Connect PostgreSQL", detail: "Configure the server-side Supabase database connection.", state: "PENDING" },
  { number: "02", title: "Initialize the API", detail: "Start the Spring Boot service and apply versioned migrations.", state: "PENDING" },
  { number: "03", title: "Set up your organization", detail: "Create the tenant and secure user access.", state: "UP NEXT" },
];

export default function OverviewPage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">WORKSPACE OVERVIEW</p>
          <h1>Build your operations workspace</h1>
          <p className="page-description">Set up the secure data foundation before bringing live manufacturing work into one place.</p>
        </div>
        <span className="phase-badge"><span className="status-dot" /> FOUNDATION PHASE</span>
      </div>

      <section className="welcome-panel" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <div className="panel-kicker"><span className="sparkle" aria-hidden="true">✳</span> YOUR ERP FOUNDATION</div>
          <h2 id="welcome-title">One connected view of your business starts here.</h2>
          <p>This workspace is being prepared for real, tenant-scoped ERP data. No sample orders, stock balances, or financial figures are shown.</p>
          <Link className="text-link" href="/settings">Review workspace setup <span aria-hidden="true">→</span></Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="orbit orbit-outer" /><div className="orbit orbit-middle" /><div className="orbit orbit-inner" />
          <div className="orbit-core"><span>M</span></div>
          <span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" />
        </div>
      </section>

      <section className="setup-section" aria-labelledby="setup-title">
        <div className="section-heading">
          <div><p className="eyebrow">GETTING STARTED</p><h2 id="setup-title">Foundation checklist</h2></div>
          <Link href="https://supabase.com/dashboard" className="subtle-link" target="_blank" rel="noreferrer">Open Supabase <span aria-hidden="true">↗</span></Link>
        </div>
        <ol className="setup-list">
          {setupSteps.map((step) => (
            <li className="setup-row" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-copy"><h3>{step.title}</h3><p>{step.detail}</p></div>
              <span className={`step-state${step.state === "UP NEXT" ? " step-state-next" : ""}`}>{step.state}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="data-note"><span aria-hidden="true">ⓘ</span> Live operational data will appear after the database and API are connected.</p>
    </div>
  );
}

import { notFound } from "next/navigation";
import { modulePages } from "@/lib/modules";

type ModuleRouteProps = {
  params: Promise<{ module: string[] }>;
};

export default async function ModuleRoute({ params }: ModuleRouteProps) {
  const { module } = await params;
  const page = modulePages[module.join("/")];

  if (!page) {
    notFound();
  }

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{page.group.toUpperCase()}</p>
          <h1>{page.title}</h1>
          <p className="page-description">{page.description}</p>
        </div>
        <span className="phase-badge"><span className="status-dot" /> FOUNDATION PHASE</span>
      </div>

      <section className="module-empty-state" aria-labelledby="module-empty-title">
        <div className="empty-icon" aria-hidden="true"><span /></div>
        <p className="eyebrow">READY FOR LIVE DATA</p>
        <h2 id="module-empty-title">This module is waiting for its API connection.</h2>
        <p>The interface is in place. Records and actions will be added with the backend workflow, authorization, and database migrations for this module.</p>
      </section>
    </div>
  );
}

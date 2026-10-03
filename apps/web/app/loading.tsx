export default function Loading() {
  return (
    <section className="module-empty-state route-state" role="status" aria-live="polite" aria-busy="true">
      <span className="route-state-indicator" aria-hidden="true" />
      <p className="eyebrow">LOADING WORKSPACE</p>
      <h1>Opening this page</h1>
      <p>Please wait while the workspace loads.</p>
    </section>
  );
}

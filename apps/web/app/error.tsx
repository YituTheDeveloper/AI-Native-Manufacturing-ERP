"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="module-empty-state route-state" role="alert">
      <span className="route-state-error" aria-hidden="true">!</span>
      <p className="eyebrow">PAGE COULD NOT LOAD</p>
      <h1>Something went wrong.</h1>
      <p>The request did not complete. You can try loading this page again.</p>
      <button className="retry-button" onClick={reset}>Try again</button>
    </section>
  );
}

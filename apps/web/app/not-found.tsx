import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="eyebrow">PAGE NOT FOUND</p>
      <h1>This workspace page doesn’t exist yet.</h1>
      <Link className="text-link" href="/">Return to overview <span aria-hidden="true">→</span></Link>
    </div>
  );
}

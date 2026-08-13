import { notFound } from "next/navigation";

// Catch-all: any URL that doesn't match a real route in this locale segment
// triggers the not-found.jsx design.
export default function NotFoundCatchAll() {
  notFound();
}

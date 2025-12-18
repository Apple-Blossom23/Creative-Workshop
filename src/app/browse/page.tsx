import { Suspense } from "react";
import { BrowseClient } from "@/app/browse/browse-client";

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseClient />
    </Suspense>
  );
}

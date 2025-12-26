import { Suspense } from "react";
import { BrowseClient } from "@/app/browse/browse-client";

export default function Page() {
  return (
    <Suspense>
      <BrowseClient />
    </Suspense>
  );
}

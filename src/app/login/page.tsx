import { Suspense } from "react";

import LoginForm from "./LoginForm";
import PageLoading from "@/components/PageLoading";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <LoginForm />
    </Suspense>
  );
}

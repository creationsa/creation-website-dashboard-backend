"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0e1512",
          color: "#f2f5f4",
          padding: "24px",
        }}
      >
        <h1 style={{ fontSize: "40px", margin: 0 }}>Something Went Wrong</h1>
        <p style={{ color: "#9db0b5", margin: 0, maxWidth: "480px" }}>
          An unexpected error occurred. Please try again, or head back home.
          <br />
          حدث خطأ غير متوقع. برجاء المحاولة مرة أخرى، أو العودة للصفحة
          الرئيسية.
        </p>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button
            onClick={reset}
            style={{
              border: "1px solid #2dd4bf",
              color: "#2dd4bf",
              background: "transparent",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Try Again &middot; إعادة المحاولة
          </button>
          <Link
            href="/"
            style={{
              border: "1px solid #2dd4bf",
              color: "#2dd4bf",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              textDecoration: "none",
            }}
          >
            Home &middot; الرئيسية
          </Link>
        </div>
      </body>
    </html>
  );
}

import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

if (!apiUrl) {
  console.error("✗ NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  process.exitCode = 1;
} else {
  const checks = [
    ["Beranda", frontendUrl],
    ["Halaman activity", `${frontendUrl}/activity`],
    ["Halaman gallery", `${frontendUrl}/gallery`],
    ["Halaman profile", `${frontendUrl}/profile`],
    ["Profile API", `${apiUrl}/profile`],
    ["Activity API", `${apiUrl}/activities`],
    ["Gallery API", `${apiUrl}/gallery`],
  ];

  let failed = false;

  for (const [label, url] of checks) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      if (response.ok) {
        console.log(`✓ ${label} terhubung (${response.status})`);
      } else {
        failed = true;
        console.error(`✗ ${label} merespons ${response.status}`);
      }
    } catch (error) {
      failed = true;
      const message = error instanceof Error ? error.message : "koneksi gagal";
      console.error(`✗ ${label} tidak dapat dihubungi: ${message}`);
    }
  }

  if (failed) {
    console.error("\nPastikan frontend, backend, dan database sedang aktif.");
    process.exitCode = 1;
  } else {
    console.log("\nSemua layanan lokal siap digunakan.");
  }
}

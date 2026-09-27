import esbuild from "esbuild";
import fs from "fs";

let checkoutAppUrl = process.env.CHECKOUT_APP_URL;

// Local development fallback: read from .env.local if the
// environment variable is not already available.
if (!checkoutAppUrl && fs.existsSync(".env.local")) {
  const env = fs.readFileSync(".env.local", "utf-8");

  checkoutAppUrl = env
    .split("\n")
    .find((line) => line.startsWith("CHECKOUT_APP_URL="))
    ?.split("=")
    .slice(1)
    .join("=")
    .trim();
}

if (!checkoutAppUrl) {
  throw new Error("CHECKOUT_APP_URL is not configured.");
}

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  format: "esm",
  outfile: "dist/checkout-sdk.js",

  define: {
    CHECKOUT_APP_URL: JSON.stringify(checkoutAppUrl),
  },
});

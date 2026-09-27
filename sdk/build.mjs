import esbuild from "esbuild";
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");

const checkoutAppUrl = env
  .split("\n")
  .find((line) => line.startsWith("CHECKOUT_APP_URL="))
  ?.split("=")[1]
  ?.trim();

if (!checkoutAppUrl) {
  throw new Error("CHECKOUT_APP_URL is missing from .env.local");
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

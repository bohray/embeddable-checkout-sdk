# Embeddable Checkout SDK

A lightweight embeddable checkout system that allows a merchant website to launch a hosted payment experience through a small JavaScript SDK.

The project consists of three pieces:

1. **Checkout SDK** — a small TypeScript SDK that creates and manages the checkout iframe.
2. **Hosted Checkout** — a standalone Next.js checkout application responsible for product display, payment form, validation, and payment simulation.
3. **Demo Merchant** — a ProductDash application that integrates the SDK and displays checkout callback events.

---

## Live Demo

### Demo Merchant

https://product-dashboard-seven-nu.vercel.app/

### Checkout

https://embeddable-checkout-sdk-gamma.vercel.app/

### SDK

https://sdk-sepia.vercel.app/checkout-sdk.js

---

## Architecture

```text
                         Merchant Website
                    ProductDash Demo Site
                             │
                             │ CheckoutSDK.open()
                             ▼
                    ┌──────────────────┐
                    │   Checkout SDK   │
                    │   TypeScript     │
                    └────────┬─────────┘
                             │
                             │ Creates iframe
                             ▼
                    ┌──────────────────┐
                    │ Hosted Checkout  │
                    │     Next.js      │
                    └────────┬─────────┘
                             │
                             ├── Product API
                             │
                             └── Payment Simulator
                                      │
                                      ▼
                              postMessage()
                                      │
                                      ▼
                    ┌──────────────────┐
                    │  Merchant Site   │
                    │    Callbacks     │
                    └──────────────────┘
```

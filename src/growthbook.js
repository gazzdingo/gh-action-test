import { GrowthBook } from "@growthbook/growthbook-react";

// Initialize GrowthBook
export const gb = new GrowthBook({
  apiHost: process.env.REACT_APP_GROWTHBOOK_API_HOST || "https://cdn.growthbook.io",
  clientKey: process.env.REACT_APP_GROWTHBOOK_CLIENT_KEY || "sdk-n68bM3IuYasa1951", // Replace with your actual client key
  enableDevMode: process.env.NODE_ENV === "development",
  trackingCallback: (experiment, result) => {
    // Track experiment views in your analytics
    console.log("Experiment viewed", {
      experimentId: experiment.key,
      variationId: result.key,
      userId: gb.getAttributes().id,
    });
  }
});

// Default attributes for targeting
gb.setAttributes({
  id: "demo-user", // You would typically get this from your auth system
  email: "test@example.com",
  browser: navigator.userAgent.includes("Chrome") ? "chrome" : "other",
  url: window.location.href,
  environment: process.env.NODE_ENV || "development"
});

// Load feature flags from GrowthBook
gb.loadFeatures();

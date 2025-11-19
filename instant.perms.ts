import type { InstantRules } from "@instantdb/react";

const rules = {
  "messages": {
    "allow": {
      "view": "true",
      "create": "true",
      "update": "true",
      "delete": "true"
    }
  },
  "$files": {
    "allow": {
      // Allow anyone to view, create, and delete files
      // Simple permissions for private chat between two people
      "view": "true",
      "create": "true",
      "delete": "true"
    }
  }
} satisfies InstantRules;

export default rules;

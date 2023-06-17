import useNotifications from "@/utils/notifications";

const { faker } = require("@faker-js/faker");
const { showNotification } = useNotifications();

export async function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text);
    showNotification("success", "Copied link to clipboard");
  } catch (e) {
    showNotification("error", "We couldn't copy your link to the clipboard");
  }
}

export function generateProjectId() {
  return `${faker.string.alphanumeric({ casing: "upper", length: 3 })}-${faker.string.numeric(3)}`;
}

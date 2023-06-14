import useNotifications from "@/utils/notifications";

const { showNotification } = useNotifications();

export async function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text);
    showNotification("success", "Copied link to clipboard");
  } catch (e) {
    showNotification("error", "We couldn't copy your link to the clipboard");
  }
}

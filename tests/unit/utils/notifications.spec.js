import useNotifications from "@/utils/notifications";
import { ElNotification } from "element-plus";

jest.mock("element-plus", () => ({
  ElNotification: jest.fn(),
}));

describe("Notification", () => {
  it("Should be able to send a notification", () => {
    const { showNotification } = useNotifications();
    showNotification("error", "Title example", "Example message");
    expect(ElNotification).toBeCalledWith({
      title: "Title example",
      message: "Example message",
      type: "error",
      customClass: "notification",
    });
  });
});

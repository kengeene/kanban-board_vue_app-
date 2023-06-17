import { ElNotification } from "element-plus";

const useNotifications = () => {
  const showNotification = (notificationType, notificationTitle, notificationMessage) => {
    ElNotification({
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType, // success or error
      customClass: "notification",
    });
  };

  return {
    showNotification,
  };
};

export default useNotifications;

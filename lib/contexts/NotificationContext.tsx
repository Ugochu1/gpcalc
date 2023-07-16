import { ContextProps } from "./AuthContext";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import styles from "./NotificationContext.module.scss";

interface NotificationContext {
  setNotification: (message: string) => void;
  notification: string;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContext>({
  setNotification: () => null,
  notification: "",
  showNotification: false,
  setShowNotification: () => null,
});

function Notification({
  children,
  onEnd,
}: {
  children: ReactNode;
  onEnd: () => void;
}) {
  const TIME_TO_END = Date.now() + 1000 * 5;
  const [timeout, updateTimeout] = useState<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [top, setTop] = useState<number>(-100);

  useEffect(() => {
    setTop(10);
    // set a timeout
    const t = setTimeout(() => {
      setTop(-100);
    }, 5 * 1000);
    updateTimeout(t);
    return () => clearTimeout(t);
  }, []);

  function transitionToEnd() {
    setTop(-100);
  }

  function handleTransitionEnd() {
    if (top !== -100) return;
    onEnd();
  }

  function pauseTimeout() {
    if (!timeout) return;
    clearTimeout(timeout);
    setRemainingTime(TIME_TO_END - Date.now());
  }

  function resumeTimeout() {
    const t = setTimeout(() => setTop(-100), remainingTime);
    updateTimeout(t);
  }

  return (
    <div
      className={`${styles.design}`}
      style={{ top: `${top}px` }}
      onTransitionEnd={handleTransitionEnd}
      onMouseOver={pauseTimeout}
      onMouseLeave={resumeTimeout}
    >
      <div className="text-right text-2xl">
        <span className="cursor-pointer" onClick={transitionToEnd}>
          &times;
        </span>
      </div>
      {children}
    </div>
  );
}

export default function NotificationProvider({ children }: ContextProps) {
  const [notification, setNotification] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const context: NotificationContext = {
    notification,
    setNotification,
    showNotification,
    setShowNotification,
  };

  function onEnd() {
    setShowNotification(false);
  }

  return (
    <NotificationContext.Provider value={context}>
      {showNotification && (
        <Notification onEnd={onEnd}>{notification}</Notification>
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  return useContext(NotificationContext);
}

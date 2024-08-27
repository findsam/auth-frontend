import { useSelf } from "~/libs/queries";
import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  const { refetch } = useSelf();
  if (!auth?.user) return;

  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        Welcome to your account, {auth.user?.firstName} {auth.user?.lastName}.
        <br />
        <ul>
          <li>Account created: {renderTime(auth?.user?.meta?.createdAt)}</li>
          <li>Email: {auth?.user?.email}</li>
          <li>
            Verified?:{" "}
            {auth?.user?.security?.emailVerified === false ? "No" : "Yes"}
          </li>
          <li>
            2FA Enabled?:{" "}
            {auth?.user?.security?.hasTwoFactor === false ? "No" : "Yes"}
          </li>
          <li>Last updated: {renderTime(auth?.user?.meta?.lastUpdate)}</li>
        </ul>
        <br />
        <button onClick={async () => await refetch()}>
          Check Token Health
        </button>
      </div>
    </>
  );
};

export default Settings;

const renderTime = (timestamp: Date) =>
  new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

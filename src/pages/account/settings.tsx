import { useNavigate } from "react-router-dom";
import { useArchive, useSelf, useUpdateUser } from "~/libs/queries";
import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { refetch } = useSelf();
  const { mutateAsync: archiveUser } = useArchive();
  const { mutateAsync: updateUser } = useUpdateUser();

  if (!auth?.user) return;

  const FIRST_NAMES = ["John", "Tyler", "Simon"];
  const LAST_NAMES = ["McGregor", "Giovanni", "Cian"];

  const random = (arr: string[]) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

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
            Verified?: {auth?.user?.security?.emailVerified ? "Yes" : "No"}
          </li>
          <li>
            2FA Enabled?: {auth?.user?.security?.hasTwoFactor ? "Yes" : "No"}
          </li>
          <li>Last updated: {renderTime(auth?.user?.meta?.lastUpdate)}</li>
          <li>Archived: {auth?.user?.meta?.isArchived ? "Yes" : "No"}</li>
        </ul>
        <br />
        <button
          onClick={async () => {
            const name = random(FIRST_NAMES);
            await updateUser({
              firstName: name,
              lastName: random(LAST_NAMES),
              email: name + "@dev.dev",
            });
          }}
        >
          Update User
        </button>
        <button
          onClick={async () => await refetch()}
          style={{ background: "#42f584", borderColor: "#1aad50" }}
        >
          Refresh User (Development)
        </button>
        <button
          onClick={async () => {
            await archiveUser();
            navigate("/account/sign-in");
          }}
          style={{ background: "#e35462", borderColor: "#db1629" }}
        >
          Archive Account{" "}
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

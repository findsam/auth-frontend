import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArchive, useSelf } from "~/libs/queries";
import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { refetch } = useSelf();
  const { mutateAsync } = useArchive();
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
            Verified?: {auth?.user?.security?.emailVerified ? "Yes" : "No"}
          </li>
          <li>
            2FA Enabled?: {auth?.user?.security?.hasTwoFactor ? "Yes" : "No"}
          </li>
          <li>Last updated: {renderTime(auth?.user?.meta?.lastUpdate)}</li>
          <li>Archived: {auth?.user?.meta?.isArchived ? "Yes" : "No"}</li>
        </ul>
        <br />
        <button>Update User</button>
        <button
          onClick={async () => await refetch()}
          style={{ background: "#42f584", borderColor: "#1aad50" }}
        >
          Refresh User (Development)
        </button>
        <button
          onClick={async () => {
            await mutateAsync();
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

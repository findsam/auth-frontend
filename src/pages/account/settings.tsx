import { usePing, useRefresh } from "~/libs/queries";
import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  const pingQuery = usePing();
  const refreshQuery = useRefresh();

  return (
    <>
      Welcome to the settings page <br />{" "}
      <p style={{ textTransform: "uppercase", color: "var(--)" }}>
        {auth.user?.firstName + " " + auth.user?.lastName}
      </p>
      <button onClick={async () => await pingQuery.refetch()}>
        PING URSELF :D{" "}
      </button>
      --
      <button onClick={async () => await refreshQuery.refetch()}>
        Refresh{" "}
      </button>
    </>
  );
};

export default Settings;

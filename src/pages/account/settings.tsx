import { useRefresh, useSelf } from "~/libs/queries";
import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  const { refetch } = useSelf();

  return (
    <>
      <div className="container">
        Welcome to your account, {auth.user?.firstName} {auth.user?.lastName}.
        <button onClick={async () => await refetch()}>ping user</button>
      </div>
    </>
  );
};

export default Settings;

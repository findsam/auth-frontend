import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      Welcome to the settings page,{" "}
      {auth.user?.firstName + " " + auth.user?.lastName}
    </>
  );
};

export default Settings;

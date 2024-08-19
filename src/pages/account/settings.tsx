import { useAuth } from "~/libs/useAuth";

const Settings: React.FC = () => {
  const auth = useAuth();
  console.log({ auth });
  return <>Settings :D</>;
};

export default Settings;

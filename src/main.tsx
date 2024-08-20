import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import SignIn from "~/pages/account/signIn";
import AuthProvider from "~/libs/authCtx";
import SignUp from "~/pages/account/signUp";
import Settings from "~/pages/account/settings";
import { useAuth } from "~/libs/useAuth";
import "~/libs/_.css";

const ErrorBoundary = () => {
  let error = useRouteError();
  return <div>{JSON.stringify(error)}</div>;
};

const Private = () => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <Outlet /> : <Navigate to="account/sign-in" replace />;
};

const routes = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Navigate to="account/sign-in" replace /> },
      { path: "account/sign-in", element: <SignIn /> },
      { path: "account/sign-up", element: <SignUp /> },
    ],
  },
  {
    element: <Private />,
    children: [
      {
        path: "/account/settings",
        element: <Settings />,
      },
    ],
  },
];

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AuthProvider>
  </QueryClientProvider>
);

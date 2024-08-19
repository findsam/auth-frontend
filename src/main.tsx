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

const ErrorBoundary = () => {
  let error = useRouteError();
  return <div>{JSON.stringify(error)}</div>;
};

const Layout = () => <Outlet />;

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Navigate to="account/sign-in" replace /> },
      { path: "account/sign-in", element: <SignIn /> },
      { path: "account/sign-up", element: <SignUp /> },
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

import { ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import SignIn from "~/pages/account/signIn";

const ErrorBoundary = () => {
  let error = useRouteError();
  return <div>{JSON.stringify(error)}</div>;
};

const Layout = () => {
  return <Outlet />;
};

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [{ path: "account/sign-in", element: <SignIn /> }],
  },
];

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </QueryClientProvider>
);

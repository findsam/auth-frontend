import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "~/pages/account/signIn";

const routes = [
  {
    children: [
      {
        path: "/account/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={createBrowserRouter(routes)} />
  </QueryClientProvider>
);

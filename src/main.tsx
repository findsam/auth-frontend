import { createRoot } from "react-dom/client";
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

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={createBrowserRouter(routes)} />
);

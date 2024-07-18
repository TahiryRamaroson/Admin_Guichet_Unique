import {
  ServerStackIcon,
  RectangleStackIcon,
  ComputerDesktopIcon,
  CogIcon,
  HomeIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";
import { Home, Annonce, Gestion, Utilisateur, Profil} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Accueil",
        path: "/home",
        element: <Home />,
        op: "",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "Paramétrage",
        path: "/gestion",
        element: <Gestion />,
        op: "",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Historique",
        path: "/annonce",
        element: <Annonce />,
        op: "",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Utilisateur",
        path: "/utilisateur",
        element: <Utilisateur />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Profil",
        path: "/profil",
        element: <Profil />,
        op: "none",
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;

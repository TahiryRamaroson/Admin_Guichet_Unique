import {
  PresentationChartBarIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { Home, Annonce, Gestion, Details, Marque, Modele, Categorie, Etat, Pays, Energie, Boitevitesse } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <PresentationChartBarIcon {...icon} />,
        name: "Statistique",
        path: "/home",
        element: <Home />,
        op: "",
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Annonce",
        path: "/annonce",
        element: <Annonce />,
        op: "",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Gestion",
        path: "/gestion",
        element: <Gestion />,
        op: "",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Details",
        path: "/details",
        element: <Details />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Marque",
        path: "/marque",
        element: <Marque />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Modèle",
        path: "/modele",
        element: <Modele />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Catégorie",
        path: "/categorie",
        element: <Categorie />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Etat",
        path: "/etat",
        element: <Etat />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Pays",
        path: "/pays",
        element: <Pays />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Energie",
        path: "/energie",
        element: <Energie />,
        op: "none",
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Boite de vitesse",
        path: "/boitevitesse",
        element: <Boitevitesse />,
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

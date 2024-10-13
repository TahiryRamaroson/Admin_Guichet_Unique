import {
  ServerStackIcon,
  RectangleStackIcon,
  CogIcon,
  HomeIcon,
  ArrowPathRoundedSquareIcon,
  UserGroupIcon,
  IdentificationIcon,
} from "@heroicons/react/24/solid";
import { ParametrageMotifMigration, ParametrageCauseDeces, ParametrageCategoriePlainte, ParametrageActionPlainte, Accueil, Historique, Parametrage, Utilisateur, Profil, Localisation, ParametrageAntecedentMedical} from "@/pages/page";
import { SignIn, SignUp } from "@/pages/auth";
import { MapPinIcon } from "@heroicons/react/24/outline";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "page",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Accueil",
        path: "/accueil",
        element: <Accueil />,
        op: "",
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Gestion d'utilisateur",
        path: "/utilisateur",
        element: <Utilisateur />,
        op: "",
      },
      {
        icon: <IdentificationIcon {...icon} />,
        name: "Gestion de profil",
        path: "/profil",
        element: <Profil />,
        op: "none",
      },
      {
        icon: <MapPinIcon {...icon} />,
        name: "Gestion de localisation",
        path: "/localisation",
        element: <Localisation />,
        op: "",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "Paramétrage",
        path: "/parametrage",
        element: <Parametrage />,
        op: "",
      },
      {
        icon: <ArrowPathRoundedSquareIcon {...icon} />,
        name: "Historique",
        path: "/historique",
        element: <Historique />,
        op: "",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "action-plainte",
        path: "/parametrage-action-plainte",
        element: <ParametrageActionPlainte />,
        op: "none",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "antecedent-medical",
        path: "/parametrage-antecedent-medical",
        element: <ParametrageAntecedentMedical />,
        op: "none",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "categorie-plainte",
        path: "/parametrage-categorie-plainte",
        element: <ParametrageCategoriePlainte />,
        op: "none",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "cause-deces",
        path: "/parametrage-cause-deces",
        element: <ParametrageCauseDeces />,
        op: "none",
      },
      {
        icon: <CogIcon {...icon} />,
        name: "motif-migration",
        path: "/parametrage-motif-migration",
        element: <ParametrageMotifMigration />,
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

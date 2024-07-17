import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Gestion() {

  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour vérifier la présence du token dans le localStorage
    const checkToken = () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        navigate('/auth/sign-in');
      }

      try {
        const decodedtoken = jwtDecode(token);
        const now = Date.now() / 1000;
        if(now > decodedtoken.exp) localStorage.removeItem('authToken');
      } catch (error) {
        localStorage.removeItem('authToken');
        navigate('/auth/sign-in');
      }

    };

    // Appel de la fonction de vérification lors du chargement de la page
    checkToken();
    }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">

    <Link to="/dashboard/marque"> 
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Marque
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/modele">
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Modèle
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/categorie">
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Catégorie
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/etat">
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Etat
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/pays">
      <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
        <CardBody
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
        >
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Pays
          </Typography>
        </CardBody>
      </Card>
    </Link>

    <Link to="/dashboard/energie">
    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
      <CardBody
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-4xl font-normal"
        >
          Energie
        </Typography>
      </CardBody>
    </Card>
    </Link>

    <Link to="/dashboard/boitevitesse">
    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8 mb-10">
      <CardBody
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
      >
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-4xl font-normal"
        >
          Boite de vitesse
        </Typography>
      </CardBody>
    </Card>
    </Link>
    </div>
    
  );
}

export default Gestion;

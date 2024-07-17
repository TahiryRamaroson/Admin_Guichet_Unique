import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Carousel,
  } from "@material-tailwind/react";
import {useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Details() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { id, datePub, prix, utilisateur, voiture } = location.state;

  useEffect(() => {
    // Fonction pour vérifier la présence du token dans le localStorage
    const checkToken = () => {
      const token = localStorage.getItem('authToken');

      // Si le token est présent, l'utilisateur est connecté
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
      <Card className="mt-6 w-full" style={{margin:'auto'}}>
          <Typography variant="h2" color="blue-gray" className="mb-2 mt-6 text-center">
            {voiture.marque.nom + " " + voiture.modele.nom}
          </Typography>
          <Typography className="text-center">
            demande effectué par {utilisateur.nom + " " + utilisateur.prenom} le {datePub}
          </Typography>
        <CardBody className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-2">
          <Card className="mt-6 w-full" style={{margin:'auto'}} color="gray" variant="gradient">
            <CardBody>
            <Typography className="mt-2">Marque: {voiture.marque.nom} </Typography>
            <Typography className="mt-2">Modèle: {voiture.modele.nom} </Typography>
            <Typography className="mt-2">Catégorie: {voiture.categorie.nom} </Typography>
            <Typography className="mt-2">Année de mise en circulation: {voiture.modele.anneeSortie} </Typography>
            <Typography className="mt-2">Energie: {voiture.energie.nom} </Typography>
            <Typography className="mt-2">Boite de vitesse: {voiture.boite.nom} </Typography>
            <Typography className="mt-2">Etat: {voiture.etatVoiture.nom} </Typography>
            <Typography className="mt-2">Kilometrage: {voiture.kilometrage} </Typography>
            <Typography className="mt-2">matricule: {voiture.matricule} </Typography>
            </CardBody>
          </Card>
          <Card className="mt-6 w-full" style={{margin:'auto'}} color="gray" variant="gradient">
            <CardBody>
            <Typography variant="h3" color="green" className="mt-2">{prix} Ar</Typography>
              Description: Si vous recherchez une Toyota Land Cruiser qui allie puissance, confort et polyvalence, ne cherchez pas plus loin.
              Cette voiture a été entretenue régulièrement, avec un historique complet disponible sur demande.
              Pneu neuve, Vidange faite...

            </CardBody>
          </Card>
        </CardBody>
        <CardFooter className="pt-0 w-full ">
            <Carousel className="rounded-xl">
            <img
                src="/img/Occasion360_logo.png"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="/img/Occasion360_logo.png"
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src="/img/Occasion360_logo.png"
                alt="image 3"
                className="h-full w-full object-cover"
            />
            </Carousel>
        </CardFooter>
      </Card>
    );
  }
  
  export default Details;
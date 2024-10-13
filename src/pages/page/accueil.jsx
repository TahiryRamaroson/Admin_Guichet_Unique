import React, {useEffect, useState} from "react";
import { api_url } from "@/configs/api-url";
import {
  Typography,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { UsersIcon, UserGroupIcon, UserIcon, FaceSmileIcon, CalendarDaysIcon, ExclamationTriangleIcon, ArrowsRightLeftIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function Accueil() {

  const navigate = useNavigate();

  const [nombreUtilisateur, setNombreUtilisateur] = useState(0);
  const [nombreMenage, setNombreMenage] = useState(0);
  const [nombreIndividu, setNombreIndividu] = useState(0);
  const [nombreNaissance, setNombreNaissance] = useState(0);
  const [nombreNaissanceValide, setNombreNaissanceValide] = useState(0);
  const [nombreGrossesse, setNombreGrossesse] = useState(0);
  const [nombreGrossesseValide, setNombreGrossesseValide] = useState(0);
  const [nombreDeces, setNombreDeces] = useState(0);
  const [nombreDecesValide, setNombreDecesValide] = useState(0);
  const [nombreMigrationEntrante, setNombreMigrationEntrante] = useState(0);
  const [nombreMigrationEntranteValide, setNombreMigrationEntranteValide] = useState(0);
  const [nombreMigrationSortante, setNombreMigrationSortante] = useState(0);
  const [nombreMigrationSortanteValide, setNombreMigrationSortanteValide] = useState(0);
  const [nombrePlainte, setNombrePlainte] = useState(0);
  const [nombrePlainteValide, setNombrePlainteValide] = useState(0);
  const [nombrePlainteTraite, setNombrePlainteTraite] = useState(0);
  const [nombrePlainteEnCours, setNombrePlainteEnCours] = useState(0);
  const [nombrePlainteNonTraite, setNombrePlainteNonTraite] = useState(0);

  const checkToken = () => {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      navigate('/auth/sign-in');
    }

    try {
      const decodedtoken = jwtDecode(token);
      const now = Date.now() / 1000;
      if(now > decodedtoken.exp) {
        sessionStorage.removeItem('authToken');
        navigate('/auth/sign-in');
      }
    } catch (error) {
      sessionStorage.removeItem('authToken');
      navigate('/auth/sign-in');
    }

  };

  const getNombreUtilisateur = async () => {
  
    const apiNombreUtilisateur = `${api_url}/api/StatistiqueInterne/nombreUtilisateur`; 

    try {
      const reponseNombreUtilisateur = await fetch(apiNombreUtilisateur, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreUtilisateur.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreUtilisateur.json();
      setNombreUtilisateur(data);
      console.log("dataNombreUtilisateur après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreMenage = async () => {
  
    const apiNombreMenage = `${api_url}/api/StatistiqueInterne/nombreMenage`; 

    try {
      const reponseNombreMenage = await fetch(apiNombreMenage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreMenage.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreMenage.json();
      setNombreMenage(data);
      console.log("dataNombreMenage après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreIndividu = async () => {
  
    const apiNombreIndividu = `${api_url}/api/StatistiqueInterne/nombreIndividu`; 

    try {
      const reponseNombreIndividu = await fetch(apiNombreIndividu, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreIndividu.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreIndividu.json();
      setNombreIndividu(data);
      console.log("dataNombreIndividu après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreNaissance = async () => {
  
    const apiNombreNaissance = `${api_url}/api/StatistiqueInterne/nombreNaissance`; 

    try {
      const reponseNombreNaissance = await fetch(apiNombreNaissance, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreNaissance.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreNaissance.json();
      setNombreNaissance(data);
      console.log("dataNombreNaissance après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreNaissanceValide = async () => {
  
    const apiNombreNaissanceValide = `${api_url}/api/StatistiqueInterne/nombreNaissanceValide`; 

    try {
      const reponseNombreNaissanceValide = await fetch(apiNombreNaissanceValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreNaissanceValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreNaissanceValide.json();
      setNombreNaissanceValide(data);
      console.log("dataNombreNaissanceValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreGrossesse = async () => {
  
    const apiNombreGrossesse = `${api_url}/api/StatistiqueInterne/nombreGrossesse`; 

    try {
      const reponseNombreGrossesse = await fetch(apiNombreGrossesse, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreGrossesse.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreGrossesse.json();
      setNombreGrossesse(data);
      console.log("dataNombreGrossesse après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreGrossesseValide = async () => {
  
    const apiNombreGrossesseValide = `${api_url}/api/StatistiqueInterne/nombreGrossesseValide`; 

    try {
      const reponseNombreGrossesseValide = await fetch(apiNombreGrossesseValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreGrossesseValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreGrossesseValide.json();
      setNombreGrossesseValide(data);
      console.log("dataNombreGrossesseValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreDeces = async () => {
  
    const apiNombreDeces = `${api_url}/api/StatistiqueInterne/nombreDeces`; 

    try {
      const reponseNombreDeces = await fetch(apiNombreDeces, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreDeces.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreDeces.json();
      setNombreDeces(data);
      console.log("dataNombreDeces après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreDecesValide = async () => {
  
    const apiNombreDecesValide = `${api_url}/api/StatistiqueInterne/nombreDecesValide`; 

    try {
      const reponseNombreDecesValide = await fetch(apiNombreDecesValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreDecesValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreDecesValide.json();
      setNombreDecesValide(data);
      console.log("dataNombreDecesValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreMigrationEntrante = async () => {
  
    const apiNombreMigrationEntrante = `${api_url}/api/StatistiqueInterne/nombreMigrationEntrante`; 

    try {
      const reponseNombreMigrationEntrante = await fetch(apiNombreMigrationEntrante, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreMigrationEntrante.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreMigrationEntrante.json();
      setNombreMigrationEntrante(data);
      console.log("dataNombreMigrationEntrante après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreMigrationEntranteValide = async () => {
  
    const apiNombreMigrationEntranteValide = `${api_url}/api/StatistiqueInterne/nombreMigrationEntranteValide`; 

    try {
      const reponseNombreMigrationEntranteValide = await fetch(apiNombreMigrationEntranteValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreMigrationEntranteValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreMigrationEntranteValide.json();
      setNombreMigrationEntranteValide(data);
      console.log("dataNombreMigrationEntranteValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreMigrationSortante = async () => {
  
    const apiNombreMigrationSortante = `${api_url}/api/StatistiqueInterne/nombreMigrationSortante`; 

    try {
      const reponseNombreMigrationSortante = await fetch(apiNombreMigrationSortante, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreMigrationSortante.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreMigrationSortante.json();
      setNombreMigrationSortante(data);
      console.log("dataNombreMigrationSortante après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreMigrationSortanteValide = async () => {
  
    const apiNombreMigrationSortanteValide = `${api_url}/api/StatistiqueInterne/nombreMigrationSortanteValide`; 

    try {
      const reponseNombreMigrationSortanteValide = await fetch(apiNombreMigrationSortanteValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreMigrationSortanteValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreMigrationSortanteValide.json();
      setNombreMigrationSortanteValide(data);
      console.log("dataNombreMigrationSortanteValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombrePlainte = async () => {
  
    const apiNombrePlainte = `${api_url}/api/StatistiqueInterne/nombrePlainte`; 

    try {
      const reponseNombrePlainte = await fetch(apiNombrePlainte, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombrePlainte.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombrePlainte.json();
      setNombrePlainte(data);
      console.log("dataNombrePlainte après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombrePlainteValide = async () => {
  
    const apiNombrePlainteValide = `${api_url}/api/StatistiqueInterne/nombrePlainteValide`; 

    try {
      const reponseNombrePlainteValide = await fetch(apiNombrePlainteValide, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombrePlainteValide.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombrePlainteValide.json();
      setNombrePlainteValide(data);
      console.log("dataNombrePlainteValide après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombrePlainteTraite = async () => {
  
    const apiNombrePlainteTraite = `${api_url}/api/StatistiqueInterne/nombrePlainteTraite`; 

    try {
      const reponseNombrePlainteTraite = await fetch(apiNombrePlainteTraite, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombrePlainteTraite.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombrePlainteTraite.json();
      setNombrePlainteTraite(data);
      console.log("dataNombrePlainteTraite après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombrePlainteEnCours = async () => {
  
    const apiNombrePlainteEnCours = `${api_url}/api/StatistiqueInterne/nombrePlainteEnCours`; 

    try {
      const reponseNombrePlainteEnCours = await fetch(apiNombrePlainteEnCours, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombrePlainteEnCours.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombrePlainteEnCours.json();
      setNombrePlainteEnCours(data);
      console.log("dataNombrePlainteEnCours après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombrePlainteNonTraite = async () => {
  
    const apiNombrePlainteNonTraite = `${api_url}/api/StatistiqueInterne/nombrePlainteNonTraite`; 

    try {
      const reponseNombrePlainteNonTraite = await fetch(apiNombrePlainteNonTraite, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombrePlainteNonTraite.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombrePlainteNonTraite.json();
      setNombrePlainteNonTraite(data);
      console.log("dataNombrePlainteNonTraite après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  useEffect(() => {
    checkToken();
    getNombreUtilisateur();
    getNombreMenage();
    getNombreIndividu();
    getNombreNaissance();
    getNombreNaissanceValide();
    getNombreGrossesse();
    getNombreGrossesseValide();
    getNombreDeces();
    getNombreDecesValide();
    getNombreMigrationEntrante();
    getNombreMigrationEntranteValide();
    getNombreMigrationSortante();
    getNombreMigrationSortanteValide();
    getNombrePlainte();
    getNombrePlainteValide();
    getNombrePlainteTraite();
    getNombrePlainteEnCours();
    getNombrePlainteNonTraite();
  }, [navigate]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 xl:grid-cols-3">
        
          <StatisticsCard
            title="Nombre d'utilisateurs inscrit"
            color="green"
            icon={React.createElement(UsersIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreUtilisateur} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de ménages enregistré"
            color="green"
            icon={React.createElement(UserGroupIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreMenage} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre d'individus enregistré"
            color="green"
            icon={React.createElement(UserIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreIndividu} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de naissances validé"
            color="green"
            icon={React.createElement(FaceSmileIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreNaissanceValide} /> sur <NumberFormatter number={nombreNaissance} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de grossesses validé"
            color="green"
            icon={React.createElement(CalendarDaysIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreGrossesseValide} /> sur <NumberFormatter number={nombreGrossesse} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de décès validé"
            color="green"
            icon={React.createElement(ExclamationTriangleIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreDecesValide} /> sur <NumberFormatter number={nombreDeces} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de migration entrante validé"
            color="green"
            icon={React.createElement(ArrowsRightLeftIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreMigrationEntranteValide} /> sur <NumberFormatter number={nombreMigrationEntrante} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de migration sortante validé"
            color="green"
            icon={React.createElement(ArrowsRightLeftIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreMigrationSortanteValide} /> sur <NumberFormatter number={nombreMigrationSortante} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de plaintes validé"
            color="green"
            icon={React.createElement(ChatBubbleLeftRightIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombrePlainteValide} /> sur <NumberFormatter number={nombrePlainte} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Plainte (Non traitée/En cours/Traitée)"
            color="green"
            icon={React.createElement(ChatBubbleLeftRightIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombrePlainteNonTraite} />/<NumberFormatter number={nombrePlainteEnCours} />/<NumberFormatter number={nombrePlainteTraite}/></strong>
              </Typography>
            }
          />
      </div>
    </div>
  );
}

export default Accueil;

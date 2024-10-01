import React, {useEffect, useState} from "react";
import { api_url } from "@/configs/api-url";
import {
  Typography,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { UsersIcon, UserGroupIcon, MapPinIcon} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NumberFormatter from "@/widgets/layout/number-formatter";

export function Accueil() {

  const navigate = useNavigate();

  const [nombreUtilisateur, setNombreUtilisateur] = useState(0);
  const [nombreMenage, setNombreMenage] = useState(0);
  const [nombreRegion, setNombreRegion] = useState(0);
  const [nombreDistrict, setNombreDistrict] = useState(0);
  const [nombreCommune, setNombreCommune] = useState(0);
  const [nombreFokontany, setNombreFokontany] = useState(0);

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

  const getNombreRegion = async () => {
  
    const apiNombreRegion = `${api_url}/api/StatistiqueInterne/nombreRegion`; 

    try {
      const reponseNombreRegion = await fetch(apiNombreRegion, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreRegion.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreRegion.json();
      setNombreRegion(data);
      console.log("dataNombreRegion après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreDistrict = async () => {
  
    const apiNombreDistrict = `${api_url}/api/StatistiqueInterne/nombreDistrict`; 

    try {
      const reponseNombreDistrict = await fetch(apiNombreDistrict, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreDistrict.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreDistrict.json();
      setNombreDistrict(data);
      console.log("dataNombreDistrict après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreCommune = async () => {
  
    const apiNombreCommune = `${api_url}/api/StatistiqueInterne/nombreCommune`; 

    try {
      const reponseNombreCommune = await fetch(apiNombreCommune, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreCommune.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreCommune.json();
      setNombreCommune(data);
      console.log("dataNombreCommune après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getNombreFokontany = async () => {
  
    const apiNombreFokontany = `${api_url}/api/StatistiqueInterne/nombreFokontany`; 

    try {
      const reponseNombreFokontany = await fetch(apiNombreFokontany, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseNombreFokontany.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseNombreFokontany.json();
      setNombreFokontany(data);
      console.log("dataNombreFokontany après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  useEffect(() => {
    checkToken();
    getNombreUtilisateur();
    getNombreMenage();
    getNombreRegion();
    getNombreDistrict();
    getNombreCommune();
    getNombreFokontany();
  }, [navigate]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        
          <StatisticsCard
            title="Nombre d'utilisateur inscrit"
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
            title="Nombre de ménage enregistré"
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
            title="Nombre de Région dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreRegion} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de District dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreDistrict} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de Commune dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreCommune} /></strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre de Fokontany dans la base de recensement"
            color="green"
            icon={React.createElement(MapPinIcon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong><NumberFormatter number={nombreFokontany} /></strong>
              </Typography>
            }
          />
      </div>
    </div>
  );
}

export default Accueil;

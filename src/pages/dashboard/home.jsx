import React, {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";
import { StatisticsCard } from "@/widgets/cards";
import { CheckCircleIcon, UserGroupIcon, Square3Stack3DIcon, TruckIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Home() {

  const navigate = useNavigate();
  const [dataStat, setDataStat] = useState([]);

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

    const getStat = async () => {
  
      const apiPays = "https://api-finalclouds5-production.up.railway.app/stats"; 

      try {
        const reponsePays = await fetch(apiPays, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
          },
        });
        if (!reponsePays.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponsePays.json();
        setDataStat(data.result);
        console.log("dataStat après la mise à jour d'état :", data);
      } catch (error) {
        console.error("nisy erreuuuurrrr: " + error.message);
      }

    };

    // Appel de la fonction de vérification lors du chargement de la page
    checkToken();
    getStat();
    }, []);

    if (dataStat.totalBenefice == null) {
      dataStat.totalBenefice = 0;
    }
    if (dataStat.totalChiffreAffaire == null) {
      dataStat.totalChiffreAffaire = 0;
    }

    const ConfigUser = {
      type: "line",
      height: 240,
      series: [
        {
          name: "Utilisateurs",
          data: dataStat.usersParMois ? dataStat.usersParMois.data : [],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: dataStat.usersParMois ? dataStat.usersParMois.labels : [],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

    const ConfigAnnonce = {
      type: "line",
      height: 240,
      series: [
        {
          name: "Annonces",
          data: dataStat.annonceParMois ? dataStat.annonceParMois.data : [],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        stroke: {
          lineCap: "round",
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: dataStat.annonceParMois ? dataStat.annonceParMois.labels : [],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#dddddd",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        
          <StatisticsCard
            title="Nombre total de voiture vendues"
            icon={React.createElement(TruckIcon, {
              className: "w-6 h-6 text-black",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong>{dataStat.nbVoitureVendues}</strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="Nombre total d'utilisateurs"
            icon={React.createElement(UserGroupIcon, {
              className: "w-6 h-6 text-black",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong>{dataStat.nbUtilisateurs}</strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="total des bénéfices"
            icon={React.createElement(BanknotesIcon, {
              className: "w-6 h-6 text-black",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong>{dataStat.totalBenefice} Ar</strong>
              </Typography>
            }
          />
          <StatisticsCard
            title="total des chiffres d'affaires"
            icon={React.createElement(CheckCircleIcon, {
              className: "w-6 h-6 text-black",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600 text-center">
                <strong>{dataStat.totalChiffreAffaire} Ar</strong>
              </Typography>
            }
          />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
      <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Nombre d&apos;inscription par mois
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...ConfigUser} />
          </CardBody>
      </Card>

      <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
              <Square3Stack3DIcon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
              Nombre d&apos;annonce par mois
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="px-2 pb-0">
            <Chart {...ConfigAnnonce} />
          </CardBody>
      </Card>

      </div>
    </div>
  );
}

export default Home;

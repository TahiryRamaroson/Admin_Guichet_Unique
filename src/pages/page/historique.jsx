import {
  Card,
  CardBody,
  Input,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
  SpeedDial,
  Tooltip,
  SpeedDialHandler,
  IconButton,
  SpeedDialContent,
  SpeedDialAction,
  Drawer,

} from "@material-tailwind/react";
import { api_url } from "@/configs/api-url";
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import DateFormatter from "@/widgets/layout/date-formatter";

export function Historique() {

  const navigate = useNavigate();

  const [dataHistoriqueApplication, setDataHistoriqueApplication] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [dataAction, setDataAction] = useState([]);
  const [dataComposant, setDataComposant] = useState([]);

  const [formExcel, setFormExcel] = useState({
    debut: '',
    fin: '',
  });

  const [formCSV, setFormCSV] = useState({
    debut: '',
    fin: '',
  });

  const [formFiltre, setFormFiltre] = useState({
    text: '',
    action: '',
    composant: '',
    date: null,
  });

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

  const getHistoriqueApplication = async (pageNumber) => {
  
    const apiHistoriqueApplication = `${api_url}/api/HistoriqueApplications/page/${pageNumber}`; 

    try {
      const reponseHistoriqueApplication = await fetch(apiHistoriqueApplication, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseHistoriqueApplication.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseHistoriqueApplication.json();
      setDataHistoriqueApplication(data.historiqueApplication);
      setTotalPages(data.totalPages);
      console.log("dataHistoriqueApplication après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const downloadCSV = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/HistoriqueApplications/export/csv`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formCSV),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HistoriqueApplication_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadExcel = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${api_url}/api/HistoriqueApplications/export/excel`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formExcel),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `HistoriqueApplications_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const getFilteredHistoriqueApplication = async (pageNumber) => {
    
    const apiFiltre = `${api_url}/api/HistoriqueApplications/filtre/page/${pageNumber}`;

    try {
      const response = await fetch(apiFiltre , {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
        body: JSON.stringify(formFiltre),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la demande.');
      }

      const data = await response.json();
      console.log('Réponse de API Filtre :', data);
      setDataHistoriqueApplication(data.historiqueApplication);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error.message);
    }
  };

  const getAction = async () => {
  
    const apiAction = `${api_url}/api/HistoriqueApplications/action`; 
    try {
      const reponseAction = await fetch(apiAction, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseAction.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseAction.json();
      setDataAction(data);
      console.log("dataAction après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

  const getComposant = async () => {
  
    const apiComposant = `${api_url}/api/HistoriqueApplications/composant`; 
    try {
      const reponseComposant = await fetch(apiComposant, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if (!reponseComposant.ok) {
        throw new Error('Erreur lors de la demande.');
      }
      const data = await reponseComposant.json();
      setDataComposant(data);
      console.log("dataComposant après la mise à jour d'état :", data);
    } catch (error) {
      console.error("Error: " + error.message);
    }

  };

    useEffect(() => {
      checkToken();
      getAction();
      getComposant();
    }, [navigate]);

    useEffect(() => {
      if (isFiltered) {
        getFilteredHistoriqueApplication(pageNumber);
      } else {
        getHistoriqueApplication(pageNumber);
      }
    }, [pageNumber, isFiltered]);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const [openExcel, setOpenExcel] = useState(false);
    const openDrawerExcel = () => setOpenExcel(true);
    const closeDrawerExcel = () => setOpenExcel(false);

    const [openCSV, setOpenCSV] = useState(false);
    const openDrawerCSV = () => setOpenCSV(true);
    const closeDrawerCSV = () => setOpenCSV(false);

    const changeExcel = (e) => {
      const { name, value } = e.target;
      setFormExcel({
        ...formExcel,
        [name]: value,
      });
      console.log(formExcel);
    };

    const changeCSV = (e) => {
      const { name, value } = e.target;
      setFormCSV({
        ...formCSV,
        [name]: value,
      });
      console.log(formCSV);
    };

    const changeFiltre = (e) => {
      const { name, value } = e.target;
      setFormFiltre({
        ...formFiltre,
        [name]: value,
      });
      console.log(formFiltre);
    };

    const changeSelectAction = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        action: value,
      }));
      console.log(formFiltre);
    };

    const changeSelectComposant = (value) => {
      setFormFiltre((prevFormModif) => ({
        ...prevFormModif,
        composant: value,
      }));
      console.log(formFiltre);
    };

    const submitFiltre = async (e) => {
      e.preventDefault();

      setIsFiltered(true);
      setPageNumber(1);
    };

    const resetFiltre = () => {
      setFormFiltre((prevFormFiltre) => ({
        ...prevFormFiltre,
        text: '',
        action: '',
        composant: '',
        date: null
      }));
      setIsFiltered(false);
      setPageNumber(1);
    };

    const getActionNameByName = (name) => {
      const Action = dataAction.find(Action => Action === name);
      return Action ? Action : '';
    };

    const getComposantNameByName = (name) => {
      const Composant = dataComposant.find(Composant => Composant === name);
      return Composant ? Composant : '';
    };
    

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">

        <Drawer placement="left" open={openExcel} onClose={closeDrawerExcel} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Historique de l&apos;application
              </Typography>
            </div>
            <form onSubmit={downloadExcel} className="flex flex-col gap-6 p-4">
              <Input value={formExcel.debut} label="début" name="debut" type="date" color="green" onChange={changeExcel} />
              <Input value={formExcel.fin} label="fin" name="fin" type="date" color="green" onChange={changeExcel} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Exporter Excel</Button>
            </form>
        </Drawer>

        <Drawer placement="right" open={openCSV} onClose={closeDrawerCSV} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Historique de l&apos;application
              </Typography>
            </div>
            <form onSubmit={downloadCSV} className="flex flex-col gap-6 p-4">
              <Input value={formCSV.debut} label="début" name="debut" type="date" color="green" onChange={changeCSV} />
              <Input value={formCSV.fin} label="fin" name="fin" type="date" color="green" onChange={changeCSV} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Exporter CSV</Button>
            </form>
        </Drawer>

      <Card className="h-full w-full">
      <Typography
            variant="h1"
            color="black"
            className="mt-6 mb-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Historique d&apos;utilisation de l&apos;application
          </Typography>

          <Card color="transparent" shadow={false} className="p-6 text-center mb-14">
              
              <SpeedDial placement="bottom">
                <Tooltip placement="top" color="light" content="Exporter" delay={500}>
                  <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full border-2" color="white">
                      <ArrowUpTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    </IconButton>
                  </SpeedDialHandler>
                </Tooltip>
                <SpeedDialContent className="flex-row">
                  <SpeedDialAction onClick={openDrawerExcel} className="h-16 w-16 hover:animate-pulse">
                    <DocumentIcon className="h-5 w-5" />
                    <Typography color="black" className="text-xs font-normal">
                      Excel
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction onClick={openDrawerCSV} className="h-16 w-16 hover:animate-pulse">
                    <DocumentIcon className="h-5 w-5" />
                    <Typography color="black" className="text-xs font-normal">
                      CSV
                    </Typography>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
          </Card>
        
        <form onSubmit={submitFiltre}>
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input label="Utilisateur"
            name="text"
            value={formFiltre.text}
            onChange={changeFiltre}
            color="green"
            />

            <Select label="Action"
            color="green"
            value={formFiltre.action}
            name="action"
            onChange={changeSelectAction}
            selected={() =>{return getActionNameByName(formFiltre.action)}}
            >
                  {dataAction && dataAction.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                  ))};
            </Select>

            <Select label="Module"
            color="green"
            value={formFiltre.composant}
            name="composant"
            onChange={changeSelectComposant}
            selected={() =>{return getComposantNameByName(formFiltre.composant)}}
            >
                  {dataComposant && dataComposant.map((item) => (
                    <Option key={item} value={item}>{item}</Option>
                  ))};
            </Select>

            <Input label="Date"
            name="date"
            value={formFiltre.date || ''}
            type="date"
            onChange={changeFiltre}
            color="green"
            />

            <Button variant="outlined" type="submit" className="rounded-full border-2 w-[11%]" color="green">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </Button>
            <Button variant="outlined" className="rounded-full border-2 w-[11%]" color="red" onClick={resetFiltre}>
              <ArrowPathIcon className="h-4 w-4" />
            </Button>
                              
          </div>
        </form>
      
      <CardBody className="overflow-scroll px-0">
        <table className="mt-6 w-full min-w-max table-auto">
          <thead>
            <tr>
              
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Utilisateur
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Profil
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Module
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Action
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="medium"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Url
                  </Typography>
                </th>
              
            </tr>
          </thead>
          <tbody>
              {dataHistoriqueApplication && dataHistoriqueApplication.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.utilisateur ? item.utilisateur.nom : ''} {item.utilisateur ? item.utilisateur.prenom : ''}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.utilisateur.profil ? item.utilisateur.profil.nom : ''}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.composant}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.action}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <DateFormatter date={item.dateAction} />

                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.urlAction}
                          </Typography>
                    </td> 
                  </tr>
                ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {pageNumber} sur {totalPages === 0 ? 1 : totalPages}
          </Typography>
          <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage} disabled={pageNumber === 1}>
            Précédent
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={pageNumber === totalPages}>
            Suivant
          </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Historique;

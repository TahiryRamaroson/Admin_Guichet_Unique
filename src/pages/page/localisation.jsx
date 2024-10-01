import {useEffect, useState} from "react";
import axios from "axios";
import { api_url } from "@/configs/api-url";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Input,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function Localisation() {

  const navigate = useNavigate();

  const [typeRegion, setTypeRegion] = useState("CSV");
  const [typeDistrict, setTypeDistrict] = useState("CSV");
  const [typeCommune, setTypeCommune] = useState("CSV");
  const [typeFokontany, setTypeFokontany] = useState("CSV");

  const [fileExcelRegion, setFileExcelRegion] = useState(null);
  const [fileCSVRegion, setFileCSVRegion] = useState(null);
  const [fileExcelDistrict, setFileExcelDistrict] = useState(null);
  const [fileCSVDistrict, setFileCSVDistrict] = useState(null);
  const [fileExcelCommune, setFileExcelCommune] = useState(null);
  const [fileCSVCommune, setFileCSVCommune] = useState(null);
  const [fileExcelFokontany, setFileExcelFokontany] = useState(null);
  const [fileCSVFokontany, setFileCSVFokontany] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!open);

    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenSuccess = () => setOpenSuccess(!open);

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

  const importCSVRegion = async (event) => {
    event.preventDefault();
    if (!fileCSVRegion) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVRegion);

    try {
      const response = await axios.post(`${api_url}/api/Regions/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importExcelRegion = async (event) => {
    event.preventDefault();
    if (!fileExcelRegion) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelRegion);

    try {
      const response = await axios.post(`${api_url}/api/Regions/import/excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importCSVDistrict = async (event) => {
    event.preventDefault();
    if (!fileCSVDistrict) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVDistrict);

    try {
      const response = await axios.post(`${api_url}/api/Districts/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importExcelDistrict = async (event) => {
    event.preventDefault();
    if (!fileExcelDistrict) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelDistrict);

    try {
      const response = await axios.post(`${api_url}/api/Districts/import/excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importCSVCommune = async (event) => {
    event.preventDefault();
    if (!fileCSVCommune) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVCommune);

    try {
      const response = await axios.post(`${api_url}/api/Communes/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importExcelCommune = async (event) => {
    event.preventDefault();
    if (!fileExcelCommune) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelCommune);

    try {
      const response = await axios.post(`${api_url}/api/Communes/import/excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importCSVFokontany = async (event) => {
    event.preventDefault();
    if (!fileCSVFokontany) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileCSVFokontany);

    try {
      const response = await axios.post(`${api_url}/api/Fokontany/import/csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const importExcelFokontany = async (event) => {
    event.preventDefault();
    if (!fileExcelFokontany) {
      alert('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('Fichier', fileExcelFokontany);

    try {
      const response = await axios.post(`${api_url}/api/Fokontany/import/excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      if(response.data.error){
        setErrorMessage(response.data.error);
        setOpenError(true);
        await new Promise(r => setTimeout(r, 2000));
        setOpenError(false);
        return;
      }
      console.log('Réponse du serveur:', response.data);
      setOpenSuccess(true);
        await new Promise(r => setTimeout(r, 500));
      setOpenSuccess(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier:', error);
    }
  };

  const downloadCSVRegion = async () => {
    try {
      const response = await fetch(`${api_url}/api/Regions/export/csv`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `region_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadExcelRegion = async () => {
    try {
      const response = await fetch(`${api_url}/api/Regions/export/excel`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `region_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadCSVDistrict = async () => {
    try {
      const response = await fetch(`${api_url}/api/Districts/export/csv`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `District_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadExcelDistrict = async () => {
    try {
      const response = await fetch(`${api_url}/api/Districts/export/excel`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `District_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadCSVCommune = async () => {
    try {
      const response = await fetch(`${api_url}/api/Communes/export/csv`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Commune_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadExcelCommune = async () => {
    try {
      const response = await fetch(`${api_url}/api/Communes/export/excel`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Commune_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadCSVFokontany = async () => {
    try {
      const response = await fetch(`${api_url}/api/Fokontany/export/csv`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Fokontany_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const downloadExcelFokontany = async () => {
    try {
      const response = await fetch(`${api_url}/api/Fokontany/export/excel`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Fokontany_${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, [navigate]);

  const handleFileCSVChangeRegion = (event) => {
    setFileCSVRegion(event.target.files[0]);
  };

  const handleFileExcelChangeRegion = (event) => {
    setFileExcelRegion(event.target.files[0]);
  };

  const handleFileCSVChangeDistrict = (event) => {
    setFileCSVDistrict(event.target.files[0]);
  };

  const handleFileExcelChangeDistrict = (event) => {
    setFileExcelDistrict(event.target.files[0]);
  };

  const handleFileCSVChangeCommune = (event) => {
    setFileCSVCommune(event.target.files[0]);
  };

  const handleFileExcelChangeCommune = (event) => {
    setFileExcelCommune(event.target.files[0]);
  };

  const handleFileCSVChangeFokontany = (event) => {
    setFileCSVFokontany(event.target.files[0]);
  };

  const handleFileExcelChangeFokontany = (event) => {
    setFileExcelFokontany(event.target.files[0]);
  };

  return (
    <div className="mt-12 mb-12">
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mb-10 place-items-center">
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Régions
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeRegion}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeRegion("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeRegion("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeRegion === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeRegion === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                        <Button onClick={downloadCSVRegion} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                        <Typography className="mt-6">ou</Typography> 
                        <form onSubmit={importCSVRegion} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeRegion}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                        <Button onClick={downloadExcelRegion} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                        <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importExcelRegion} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeRegion}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Districts
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeDistrict}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeDistrict("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeDistrict("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeDistrict === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeDistrict === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                        <Button onClick={downloadCSVDistrict} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                        <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importCSVDistrict} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeDistrict}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                        <Button onClick={downloadExcelDistrict} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                        <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importExcelDistrict} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeDistrict}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Communes
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeCommune}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeCommune("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeCommune("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeCommune === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeCommune === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                      <Button onClick={downloadCSVCommune} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                      <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importCSVCommune} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeCommune}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                      <Button onClick={downloadExcelCommune} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                      <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importExcelCommune} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeCommune}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
            <Card variant="gradient" className="w-[50%] max-w-[20rem] p-5 mt-6 rounded">
                <CardHeader contentCenter shadow={false} className="bg-transaparent mt-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="flex justify-center"
                    >
                      Fokontany
                    </Typography>
                </CardHeader>
              <CardBody
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center flex justify-center m-auto"
              >
                <Tabs value={typeFokontany}>
                    <TabsHeader className="relative z-0">
                      <Tab value="CSV" onClick={() => setTypeFokontany("CSV")}>
                        CSV
                      </Tab>
                      <Tab value="Excel" onClick={() => setTypeFokontany("Excel")}>
                        Excel
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: typeFokontany === "CSV" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: typeFokontany === "CSV" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="CSV" className="p-0">
                      <Button onClick={downloadCSVFokontany} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                      <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importCSVFokontany} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="Fichier"
                                type="file"
                                onChange={handleFileCSVChangeFokontany}
                              />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                      <TabPanel value="Excel" className="p-0">
                      <Button onClick={downloadExcelFokontany} variant="outlined" color="green" className="mt-6" fullWidth>Exporter</Button>
                      <Typography className="mt-6">ou</Typography>
                        <form onSubmit={importExcelFokontany} encType="multipart/form-data">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="Fichier"
                                  type="file"
                                  onChange={handleFileExcelChangeFokontany}
                                />
                            </div>
                            <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                                Importer
                            </Button>
                        </form>
                      </TabPanel>
                    </TabsBody>
                </Tabs>
              </CardBody>
            </Card>
        </div>

        <Dialog open={openError} handler={handleOpenError} size="md" className="bg-transparent">
          <Card color="red" className="w-full text-center flex justify-center opacity-[75%]">
            <ExclamationCircleIcon className="h-10 w-10 m-auto mt-5" color="white"/>
            <Typography variant="h3" color="white" className="mt-5">Une erreur s&apos;est produite</Typography>
            <Typography variant="paragraph" color="white" className="mt-5 mb-5">{errorMessage}</Typography>
          </Card>
        </Dialog>

        <Dialog open={openSuccess} handler={handleOpenSuccess} size="sm" className="bg-transparent">
          <Card color="green" className="w-full text-center flex justify-center opacity-[75%]">
            <CheckCircleIcon className="h-10 w-10 m-auto mt-5 mb-5" color="white"/>
          </Card>
        </Dialog>
    </div>
  );
}

export default Localisation;

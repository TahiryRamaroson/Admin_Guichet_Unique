import { api_url } from "@/configs/api-url";
import axios from "axios";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Tooltip,
    Dialog,
    DialogBody,
    Drawer,
    SpeedDialAction,
    SpeedDialContent,
    IconButton,
    SpeedDialHandler,
    SpeedDial
  } from "@material-tailwind/react";

  import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon, DocumentIcon, ArrowDownTrayIcon, ArrowUpTrayIcon} from "@heroicons/react/24/solid";

  import {useEffect, useState} from "react";
  import { useNavigate } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";
  import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
  
  export function ParametrageMotifMigration() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [dataMotifMigration, setDataMotifMigration] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formFiltre, setFormFiltre] = useState({
      nom: '',
    });
    const [formAjout, setFormAjout] = useState({
      nom: '',
    });
    const [formModif, setFormModif] = useState({
      nom: '',
    });
    const [idModif, setIdModif] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);

    const [openAjout, setOpenAjout] = useState(false);
    const handleOpenAjout = () => setOpenAjout(!openAjout);

    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = (item) => {
      setIdModif(item.id)
      setFormModif({
        nom: item.nom,
      });
      setOpenModif(true);
      };

    const [openExcel, setOpenExcel] = useState(false);
    const openDrawerExcel = () => setOpenExcel(true);
    const closeDrawerExcel = () => setOpenExcel(false);
    const [fileExcel, setFileExcel] = useState(null);

    const [openCSV, setOpenCSV] = useState(false);
    const openDrawerCSV = () => setOpenCSV(true);
    const closeDrawerCSV = () => setOpenCSV(false);
    const [fileCSV, setFileCSV] = useState(null);

    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!openError);

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

      const getMotifMigration = async (pageNumber) => {
  
        const apiMotifMigration = `${api_url}/api/MotifMigrations/page/${pageNumber}`; 
  
        try {
          const reponseMotifMigration = await fetch(apiMotifMigration, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
          });
          if (!reponseMotifMigration.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseMotifMigration.json();
          setDataMotifMigration(data.motifMigration);
          setTotalPages(data.totalPages);
          console.log("dataMotifMigration après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const deleteMotifMigration = async (id) => {
  
        const apiMotifMigration = `${api_url}/api/MotifMigrations/${id}`; 
  
        try {
          const reponseMotifMigration = await fetch(apiMotifMigration, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
          });
          if (!reponseMotifMigration.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseMotifMigration.json();
          if(data.error){
            setErrorMessage(data.error);
            setOpenError(true);
          }
          getMotifMigration(pageNumber);
          console.log("dataMotifMigration après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const postMotifMigration = async (e) => {
        e.preventDefault();
    
        const apiAjout = `${api_url}/api/MotifMigrations`;
  
        if (formAjout.nom == '') {
          setOpenError(true);
          setErrorMessage('Veuillez remplir tous les champs.');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setOpenError(false);
          return;
        }
    
        try {
          const response = await fetch(apiAjout , {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
            body: JSON.stringify(formAjout),
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de la demande.');
          }
    
          const data = await response.json();
          if(data.error){
            setErrorMessage(data.error);
            setFormAjout({nom:''});
            setOpenAjout(false);
            setOpenError(true);
          }
          setFormAjout({nom:''});
          setOpenAjout(false);
          setPageNumber(1);
          getMotifMigration(pageNumber);
          console.log('Réponse de API Ajout :', data);
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
      };

      const putMotifMigration = async (id) => {
  
        const apiMotifMigration = `${api_url}/api/MotifMigrations/${id}`; 
  
        try {
          const reponseMotifMigration = await fetch(apiMotifMigration, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
            body: JSON.stringify(formModif),
          });
          if (!reponseMotifMigration.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseMotifMigration.json();
          if(data.error){
            setErrorMessage(data.error);
            setOpenError(true);
          }
          getMotifMigration(pageNumber);
          console.log("dataMotifMigration après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const getFilteredMotifMigration = async (pageNumber) => {
    
        const apiFiltre = `${api_url}/api/MotifMigrations/filtre/page/${pageNumber}`;
  
        if (formFiltre.nom == '') {
          throw new Error('Champ vide.');
        }
    
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
          setDataMotifMigration(data.motifMigration);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
      };

      const downloadCSV = async () => {
        try {
          const response = await fetch(`${api_url}/api/MotifMigrations/export/csv`, {
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
          a.download = `MotifMigration_${new Date().toISOString()}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (error) {
          console.error('Erreur:', error);
        }
      };
  
      const downloadExcel = async () => {
        try {
          const response = await fetch(`${api_url}/api/MotifMigrations/export/excel`, {
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
          a.download = `MotifMigration_${new Date().toISOString()}.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (error) {
          console.error('Erreur:', error);
        }
      };
  
      const importCSV = async (event) => {
        event.preventDefault();
        if (!fileCSV) {
          alert('Veuillez sélectionner un fichier.');
          return;
        }
    
        const formData = new FormData();
        formData.append('Fichier', fileCSV);
    
        try {
          const response = await axios.post(`${api_url}/api/MotifMigrations/import/csv`, formData, {
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
  
      const importExcel = async (event) => {
        event.preventDefault();
        if (!fileExcel) {
          alert('Veuillez sélectionner un fichier.');
          return;
        }
    
        const formData = new FormData();
        formData.append('Fichier', fileExcel);
    
        try {
          const response = await axios.post(`${api_url}/api/MotifMigrations/import/excel`, formData, {
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

    useEffect(() => {
      checkToken();
    }, [navigate]);
      
    useEffect(() => {
      if (isFiltered) {
        getFilteredMotifMigration(pageNumber);
        } else {
        getMotifMigration(pageNumber);
        }
    }, [pageNumber, isFiltered]);

    useEffect(() => {
      console.log(idModif + " ---------------------------");
    }, [idModif]);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const changeAjout = (e) => {
      const { name, value } = e.target;
      setFormAjout({
        ...formAjout,
        [name]: value,
      });
      console.log(formAjout);
    };

    const changeModif = (e) => {
      const { name, value } = e.target;
      setFormModif({
        ...formModif,
        [name]: value,
      });
      console.log(formModif);
    };

    const changeFiltre = (e) => {
      const { name, value } = e.target;
      setFormFiltre({
        ...formFiltre,
        [name]: value,
      });
      console.log(formFiltre);
    };

    const submitFiltre = async (e) => {
      e.preventDefault();

      if (formFiltre.nom == '') {
        throw new Error('Champ vide.');
      }

      setIsFiltered(true);
      setPageNumber(1);
    };

    const resetFiltre = () => {
      setFormFiltre((prevFormFiltre) => ({
          ...prevFormFiltre,
          nom: '',
        }));
      setIsFiltered(false);
      setPageNumber(1);
    };

    const handleFileCSVChange = (event) => {
        setFileCSV(event.target.files[0]);
    };
  
    const handleFileExcelChange = (event) => {
      setFileExcel(event.target.files[0]);
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">

        <Drawer placement="right" open={openExcel} onClose={closeDrawerExcel} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Motif de migration
              </Typography>
            </div>
            <form onSubmit={importExcel} className="flex flex-col gap-6 p-4" encType="multipart/form-data">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Importer un fichier Excel
              </Typography>
              <Input name="Fichier" type="file" onChange={handleFileExcelChange} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Importer</Button>
            </form>
        </Drawer>

        <Drawer placement="right" open={openCSV} onClose={closeDrawerCSV} className="p-4 text-center">
            <div className="text-center">
              <Typography variant="h5" color="black">
                Motif de migration
              </Typography>
            </div>
            <form onSubmit={importCSV} className="flex flex-col gap-6 p-4" encType="multipart/form-data">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Importer un fichier CSV
              </Typography>
              <Input name="Fichier" type="file" onChange={handleFileCSVChange} />
              <Button type="submit" color="green" variant="gradient" fullWidth={false}>Importer</Button>
            </form>
        </Drawer>

    <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Liste des Motifs de migration
          </Typography>

          <Card color="transparent" shadow={false} className="p-6 text-center mb-2">
            <div className="flex justify-center gap-4">
              <SpeedDial placement="left">
              <Tooltip placement="top" color="light" content="Exporter" delay={500}>
                <SpeedDialHandler>
                  <IconButton size="lg" className="rounded-full" color="gray">
                    <ArrowUpTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </IconButton>
                </SpeedDialHandler>
              </Tooltip>
              <SpeedDialContent className="flex-row">
                <SpeedDialAction onClick={downloadExcel} className="h-16 w-16 hover:animate-pulse">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="black" className="text-xs font-normal">
                    Excel
                  </Typography>
                </SpeedDialAction>
                <SpeedDialAction onClick={downloadCSV} className="h-16 w-16 hover:animate-pulse">
                  <DocumentIcon className="h-5 w-5" />
                  <Typography color="black" className="text-xs font-normal">
                    CSV
                  </Typography>
                </SpeedDialAction>
              </SpeedDialContent>
              </SpeedDial>
              <SpeedDial placement="right">
                <Tooltip placement="top" color="light" content="Importer" delay={500}>
                  <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full border-2" color="white">
                      <ArrowDownTrayIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
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
            </div>
          </Card>

        <div className="mt-5 mb-5 flex items-center justify-center">
          <Button onClick={handleOpenAjout} className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <PlusIcon className="h-4 w-4" />
            <span className="ml-2">Ajout</span>
          </Button>

          <Dialog open={openAjout} handler={handleOpenAjout} size="sm">
            <DialogBody>
              <form onSubmit={postMotifMigration} className="mt-2 mb-2 w-full">
                <Card className="w-full">
                <Typography variant="h3" color="black" className="mt-6 flex justify-center gap-1 font-normal">
                  Ajout
                </Typography>
                  <CardBody>
                          <div className="mb-1 mt-3 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="mb-3">
                              Nom
                            </Typography>
                            <Input
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="nom"
                              value={formAjout.nom}
                              onChange={changeAjout}
                              required
                            />
                          </div>
                  </CardBody>
                </Card>

                <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                  Ajouter
                </Button>
              </form>
            </DialogBody>
          </Dialog>

        </div>
        
        <form onSubmit={submitFiltre}>
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input 
            label="recherche"
            name="nom"
            color="green"
            value={formFiltre.nom}
            onChange={changeFiltre}
            />

            <Button variant="outlined" type="submit" className="rounded-full border-2" color="green">
              <MagnifyingGlassIcon className="h-4 w-4 transform rotate-90" />
            </Button>
            <Button variant="outlined" className="rounded-full border-2" color="red" onClick={resetFiltre}>
              <ArrowPathIcon className="h-4 w-4" />
            </Button>
            
                              
          </div>
        </form>
      
      <CardBody className="overflow-scroll px-0">
        <table className="mt-6 w-full min-w-max table-auto">
          <thead>
            <tr>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-start"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Nom
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
              
            </tr>
          </thead>
          <tbody>
            {dataMotifMigration && dataMotifMigration.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.nom}
                          </Typography>
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">
                      <Button onClick={() => handleOpenModif(item)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          <PencilIcon className="h-4 w-4" />
                      </Button>

                      <Tooltip content="Supprimer">
                          <Button onClick={() => deleteMotifMigration(item.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
                    </td>
                  </tr>
              ))}
              <Dialog open={openModif} handler={handleOpenModif} size="sm">
                <DialogBody>
                  <form onSubmit={() => putMotifMigration(idModif)} className="mt-2 mb-2 w-full">
                    <Card className="w-full">
                    <Typography variant="h3" color="black" className="mt-6 flex justify-center gap-1 font-normal">
                      Modification
                    </Typography>
                      <CardBody>
                              <div className="mb-1 mt-3 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                  Nom
                                </Typography>
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="nom"
                                  //value={formModif.nom}
                                  defaultValue={formModif.nom}
                                  onChange={changeModif}
                                  required
                                />
                              </div>
                      </CardBody>
                    </Card>
                                
                    <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                      Modifier
                    </Button>
                  </form>
                </DialogBody>
              </Dialog>
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
  
  export default ParametrageMotifMigration;
  
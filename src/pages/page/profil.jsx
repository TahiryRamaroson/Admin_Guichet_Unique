import { api_url } from "@/configs/api-url";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Tooltip,
    Dialog,
    DialogBody
  } from "@material-tailwind/react";

  import { PencilIcon, TrashIcon, PlusIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";

  import {useEffect, useState} from "react";
  import { useNavigate } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";
  import { ArrowPathIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
  
  export function Profil() {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [dataProfil, setDataProfil] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formFiltre, setFormFiltre] = useState({
      text: '',
    });
    const [formAjout, setFormAjout] = useState({
      nom: '',
      description: '',
    });
    const [formModif, setFormModif] = useState({
      nom: '',
      description: '',
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
        description: item.description,
      });
      setOpenModif(true);
      };

    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!openError);

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

      const getProfil = async (pageNumber) => {
  
        const apiProfil = `${api_url}/api/Profils/page/${pageNumber}`; 
  
        try {
          const reponseProfil = await fetch(apiProfil, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
          });
          if (!reponseProfil.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseProfil.json();
          setDataProfil(data.profils);
          setTotalPages(data.totalPages);
          console.log("dataProfil après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const deleteProfil = async (id) => {
  
        const apiProfil = `${api_url}/api/Profils/${id}`; 
  
        try {
          const reponseProfil = await fetch(apiProfil, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
          });
          if (!reponseProfil.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseProfil.json();
          if(data.error){
            setErrorMessage(data.error);
            setOpenError(true);
          }
          getProfil(pageNumber);
          console.log("dataProfil après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const postProfil = async (e) => {
        e.preventDefault();
    
        const apiAjout = `${api_url}/api/Profils`;
  
        if (formAjout.nom == '' || formAjout.description == '') {
          throw new Error('Champ vide.');
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
            setFormAjout({nom:'', description:''});
            setOpenAjout(false);
            setOpenError(true);
          }
          setFormAjout({nom:'', description:''});
          setOpenAjout(false);
          setPageNumber(1);
          getProfil(pageNumber);
          console.log('Réponse de API Ajout :', data);
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
      };

      const putProfil = async (id) => {
  
        const apiProfil = `${api_url}/api/Profils/${id}`; 
  
        try {
          const reponseProfil = await fetch(apiProfil, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
            },
            body: JSON.stringify(formModif),
          });
          if (!reponseProfil.ok) {
            throw new Error('Erreur lors de la demande.');
          }
          const data = await reponseProfil.json();
          if(data.error){
            setErrorMessage(data.error);
            setOpenError(true);
          }
          getProfil(pageNumber);
          console.log("dataProfil après la mise à jour d'état :", data);
        } catch (error) {
          console.error("Error: " + error.message);
        }
  
      };

      const getFilteredProfil = async (pageNumber) => {
    
        const apiFiltre = `${api_url}/api/Profils/filtre/page/${pageNumber}`;
  
        if (formFiltre.text == '') {
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
          setDataProfil(data.profils);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
      };

    useEffect(() => {
      checkToken();
    }, [navigate]);
      
    useEffect(() => {
      if (isFiltered) {
        getFilteredProfil(pageNumber);
        } else {
        getProfil(pageNumber);
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

      if (formFiltre.text == '') {
        throw new Error('Champ vide.');
      }

      setIsFiltered(true);
      setPageNumber(1);
    };

    const resetFiltre = () => {
      setFormFiltre({text: ''})
      setIsFiltered(false);
      setPageNumber(1);
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Liste des profils
          </Typography>
        <div className="mt-5 mb-5 flex items-center justify-center">
          <Button onClick={handleOpenAjout} className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <PlusIcon className="h-4 w-4" />
            <span className="ml-2">Ajout</span>
          </Button>

          <Dialog open={openAjout} handler={handleOpenAjout} size="sm">
            <DialogBody>
              <form onSubmit={postProfil} className="mt-2 mb-2 w-full">
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
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Description
                            </Typography>
                            <Input
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="description"
                              value={formAjout.description}
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
                              
            <Input label="recherche"
            name="text"
            color="green"
            value={formFiltre.text}
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-start"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Description
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
              
            </tr>
          </thead>
          <tbody>
            {dataProfil && dataProfil.map((item) => (
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.description}
                          </Typography>
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">
                      <Button onClick={() => handleOpenModif(item)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          <PencilIcon className="h-4 w-4" />
                      </Button>

                      <Tooltip content="Supprimer">
                          <Button onClick={() => deleteProfil(item.id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
                    </td>

                  </tr>
              ))}
              <Dialog open={openModif} handler={handleOpenModif} size="sm">
                <DialogBody>
                  <form onSubmit={() => putProfil(idModif)} className="mt-2 mb-2 w-full">
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
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                  Description
                                </Typography>
                                <Input
                                  size="lg"
                                  color="green"
                                  variant="standard"
                                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                  labelProps={{
                                    className: "before:content-none after:content-none",
                                  }}
                                  name="description"
                                  //value={formModif.description}
                                  defaultValue={formModif.description}
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
        
      </div>
    );
  }
  
  export default Profil;
  
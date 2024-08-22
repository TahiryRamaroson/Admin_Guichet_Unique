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
  
  export function Profil() {

    const navigate = useNavigate();
    const [dataProfil, setDataProfil] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formFiltre, setFormFiltre] = useState({
      text: '',
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

      const getProfil = async (pageNumber) => {
  
        const apiProfil = `https://localhost:7128/api/Profils/page/${pageNumber}`; 
  
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

    const [openAjout, setOpenAjout] = useState(false);
    const handleOpenAjout = () => setOpenAjout(!openAjout);

    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = () => setOpenModif(!openModif);

    useEffect(() => {
      checkToken();
    }, [navigate]);
      
    useEffect(() => {
      getProfil(pageNumber);
    }, [pageNumber]);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
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
  
      // Votre logique pour envoyer les données vers l'API
      const apiFiltre = `https://localhost:7128/api/Profils/filtre/page/1`;

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

          <Dialog open={openAjout} handler={handleOpenAjout} className="bg-transparent" size="sm">
            <DialogBody>
              <form className="mt-2 mb-2 w-full">
                <Card className="w-full">
                <Typography variant="h3" color="black" className="mt-6 flex justify-center gap-1 font-normal">
                  Ajout
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
                              value=""
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
                              name="newanneeSortie"
                              value=""
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
            value={formFiltre.text}
            onChange={changeFiltre}
            />

            <Button variant="outlined" type="submit" className="rounded-full border-2" color="green">
              <MagnifyingGlassIcon className="h-5 w-5" />
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
                    variant="medium"
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
                    variant="medium"
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
                      <Button onClick={handleOpenModif} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Dialog open={openModif} handler={handleOpenModif} className="bg-transparent" size="sm">
                        <DialogBody>
                          <form className="mt-2 mb-2 w-full">
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
                                          value=""
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
                                          name="newanneeSortie"
                                          value=""
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

                      <Tooltip content="Supprimer">
                          <Button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                      </Tooltip>
                    </td>

                  </tr>
              ))}
          </tbody>
        </table>
      </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {pageNumber} sur {totalPages}
          </Typography>
          <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
            Précédent
          </Button>
          <Button variant="outlined" size="sm" onClick={handleNextPage}>
            Suivant
          </Button>
          </div>
        </CardFooter>
    </Card>
        
      </div>
    );
  }
  
  export default Profil;
  
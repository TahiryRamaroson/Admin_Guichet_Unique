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

  useEffect(() => {
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

    checkToken();
    }, [navigate]);

    const [openAjout, setOpenAjout] = useState(false);
    const handleOpenAjout = () => setOpenAjout(!openAjout);

    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = () => setOpenModif(!openModif);

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
        
        <form>
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input label="recherche"
            name="nom"
            value=""
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  <tr>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Rabe
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Koto
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
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 ">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 sur 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Précédent
          </Button>
          <Button variant="outlined" size="sm">
            Suivant
          </Button>
        </div>
      </CardFooter>
    </Card>
        
      </div>
    );
  }
  
  export default Profil;
  
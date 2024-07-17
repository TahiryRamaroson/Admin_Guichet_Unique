import {
    Card,
    Popover,
    PopoverHandler,
    PopoverContent,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";

  import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

  import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function Boitevitesse() {

    const navigate = useNavigate();
    const [dataBoites, setDataBoites] = useState([]);
    const [formAjout, setFormAjout] = useState({
        nom: '',
    });
    const [formModif, setFormModif] = useState({
        nom: '',
    });

    const getBoites = async () => {
  
      const apiBoites = "https://api-finalclouds5-production.up.railway.app/boitevitesses"; 

      try {
        const reponsePays = await fetch(apiBoites, {
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
        setDataBoites(data.result);
        console.log("dataBoites après la mise à jour d'état :", data);
      } catch (error) {
        console.error("nisy erreuuuurrrr: " + error.message);
      }

  };

    useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken');

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

    

    checkToken();
    getBoites();
    }, []);

    const changeAjout = (e) => {
        const { name, value } = e.target;
        setFormAjout({
          ...formAjout,
          nom: value,
        });
        console.log(formAjout);
    };
  
    const changeModif = (e) => {
        const { name, value } = e.target;
        setFormModif({
          ...formModif,
          nom: value,
        });
        console.log(formModif);
    };

    const submitAjout = async (e) => {
        e.preventDefault();
    
        // Votre logique pour envoyer les données vers l'API
        const apiajoutBoites = "https://api-finalclouds5-production.up.railway.app/boitevitesses";

        if (formAjout.nom == '') {
          alert("Veuillez compléter tous les champs");
          throw new Error('Champ vide.');
        }
    
        try {
          const response = await fetch(apiajoutBoites , {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            },
            body: JSON.stringify(formAjout),
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de la demande.');
          }
    
          const responseData = await response.json();
          console.log('Réponse de API ajout marque :', responseData);
          //dataMarques.push(responseData.result);
          getBoites();
          // Si nécessaire, effectuez des actions supplémentaires après la soumission réussie
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
    };

    const submitModif = async (e, id) => {
        e.preventDefault();
    
        // Votre logique pour envoyer les données vers l'API
        const apimodifBoite = "https://api-finalclouds5-production.up.railway.app/boitevitesses/" + id;

        if (formModif.nom == '') {
          alert("Veuillez compléter tous les champs");
          throw new Error('Champ vide.');
        }
    
        try {
          const response = await fetch(apimodifBoite , {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            },
            body: JSON.stringify(formModif),
          });
    
          if (!response.ok) {
            throw new Error('Erreur lors de la demande.');
          }
    
          const responseData = await response.json();
          console.log('Réponse de API ajout boite :', responseData);
          //dataMarques.push(responseData.result);
          getBoites();
          // Si nécessaire, effectuez des actions supplémentaires après la soumission réussie
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
      };
  
    const submitDelete = async (id) => {
    
        // Votre logique pour envoyer les données vers l'API
        const apidelBoite = "https://api-finalclouds5-production.up.railway.app/boitevitesses/" + id;
    
        try {
          const response = await fetch(apidelBoite , {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
            },
            
          });
    
    
          //const responseData = await response.json();
          //console.log('Réponse de API ajout marque :', responseData);
          getBoites();
        } catch (error) {
          console.error('Erreur lors de la soumission du formulaire :', error.message);
        }
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
      
        <div className="mt-5 ml-10 mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
                Ajouter une boite de vitesse
            </Typography>
          </div>
        </div>
        <form  onSubmit={submitAjout} >

        <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          
            <Input 
              label="Nom de la boite"
              name="nomBoite"
              value={formAjout.nomBoite}
              onChange={changeAjout}
              required
            />

            <Button variant="gradient" type="submit">Valider</Button>
          
        </div>

        </form>
      
      <CardBody className="overflow-scroll px-0">
        <table className="mt-12 w-full min-w-max table-auto">
          <thead>
            <tr>
              
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Boite de vitesse 
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    
                  </Typography>
                </th>
              
            </tr>
          </thead>
          <tbody>
          { dataBoites && dataBoites.map(
                ({id, nom}) => (
                  <tr key={id}>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nom}
                          </Typography>
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">

                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <PopoverHandler>
                        
                          <IconButton variant="text">
                          <Tooltip content="Modifier Boite de vitesse">
                            <Button>
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                            </Tooltip>
                          </IconButton>
                        
                      </PopoverHandler>
                      <PopoverContent>
                        <Card color="transparent" shadow={false}>
                          <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e) => submitModif(e, id)}>
                            <div className="mb-1 flex flex-col gap-6">
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Nouveau nom
                              </Typography>
                              <Input
                              size="lg"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="newnomBoite"
                              value={formModif.newnomBoite}
                              onChange={changeModif}
                              required
                              />
                            </div>
                            <Button className="mt-6" type="submit" fullWidth>
                              Valider
                            </Button>
                          </form>
                        </Card>
                      </PopoverContent>
                    </Popover>
                      

                      <Tooltip content="Supprimer Boite de vitesse">
                        <IconButton variant="text" className="ml-10">
                          <Button onClick={() => submitDelete(id)}>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </IconButton>
                      </Tooltip>
                    </td>

                  </tr>
                ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 ">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
        
      </div>
    );
  }
  
  export default Boitevitesse;
  
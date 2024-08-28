import { api_url } from "@/configs/api-url";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Tooltip,
    Select, 
    Option,
    Chip,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Dialog,
    DialogBody
  } from "@material-tailwind/react";

import { PencilIcon, InformationCircleIcon, PlusIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";

import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ArrowPathIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
  
  export function Utilisateur() {

    const [type, setType] = useState("card");
    const [errorMessage, setErrorMessage] = useState('');
    const [dataUtilisateur, setDataUtilisateur] = useState([]);
    const [dataProfil, setDataProfil] = useState([]);
    const [formAjout, setFormAjout] = useState({
      nom: '',
      prenom: '',
      contact: '',
      adresse: '',
      email: '',
      motDePasse: '',
      idProfil: null,
      statut: null
    });
    const [formModif, setFormModif] = useState({
      nom: '',
      prenom: '',
      contact: '',
      adresse: '',
      email: '',
      motDePasse: '',
      idProfil: null,
      statut: null
    });
    const [idModif, setIdModif] = useState('');
    const [formFiltre, setFormFiltre] = useState({
      text: '',
      idProfil: -1,
      statut: -1
    });
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);

    const navigate = useNavigate();

    const getProfil = async () => {
  
      const apiProfil = `${api_url}/api/Profils`; 

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
        setDataProfil(data);
        console.log("dataProfil après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const getUtilisateur = async (pageNumber) => {
  
      const apiUtilisateur = `${api_url}/api/Utilisateurs/page/${pageNumber}`; 

      try {
        const reponseUtilisateur = await fetch(apiUtilisateur, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        if (!reponseUtilisateur.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseUtilisateur.json();
        setDataUtilisateur(data.utilisateurs);
        setTotalPages(data.totalPages);
        console.log("dataUtilisateur après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const postUtilisateur = async (e) => {
      e.preventDefault();
  
      const apiAjout = `${api_url}/api/Utilisateurs`;

      if (formAjout.nom == '' || formAjout.prenom == '' || formAjout.idProfil == null || formAjout.statut == null ||
        formAjout.adresse == '' || formAjout.contact == '' || formAjout.email == '' || formAjout.motDePasse == ''
      ) {
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
          resetFormAjout();
          setOpenAjout(false);
          setOpenError(true);
        }
        resetFormAjout();
        setOpenAjout(false);
        setPageNumber(1);
        getUtilisateur(pageNumber);
        console.log('Réponse de API Ajout :', data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };

    const putUtilisateur = async (id) => {
  
      const apiUtilisateur = `${api_url}/api/Utilisateurs/${id}`; 

      try {
        const reponseUtilisateur = await fetch(apiUtilisateur, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
          },
          body: JSON.stringify(formModif),
        });
        if (!reponseUtilisateur.ok) {
          throw new Error('Erreur lors de la demande.');
        }
        const data = await reponseUtilisateur.json();
        if(data.error){
          setErrorMessage(data.error);
          setOpenError(true);
        }
        getUtilisateur(pageNumber);
        console.log("dataUtilisateur après la mise à jour d'état :", data);
      } catch (error) {
        console.error("Error: " + error.message);
      }

    };

    const getFilteredUtilisateur = async (pageNumber) => {
    
      const apiFiltre = `${api_url}/api/Utilisateurs/filtre/page/${pageNumber}`;
  
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
        setDataUtilisateur(data.utilisateurs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire :', error.message);
      }
    };

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

    useEffect(() => {
      checkToken();
      getProfil();
    }, [navigate]);

    useEffect(() => {
      if (isFiltered) {
        getFilteredUtilisateur(pageNumber);
        getProfil()
        } else {
        getUtilisateur(pageNumber);
        }
    }, [pageNumber, isFiltered]);

    useEffect(() => {
      console.log("Updated formAjout:", formAjout);
    }, [formAjout]);

    useEffect(() => {
      console.log(idModif + " ---------------------------");
    }, [idModif]);

    const [openAjout, setOpenAjout] = useState(false);
    const handleOpenAjout = () => setOpenAjout(!openAjout);

    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = (item) => {
      setIdModif(item.id)
      setFormModif({
        nom: item.nom,
        prenom: item.prenom,
        contact: item.contact,
        adresse: item.adresse,
        email: item.email,
        motDePasse: '',
        idProfil: item.profil.id,
        statut: item.statut
      });
      console.log(formModif);
      setOpenModif(true);
      };

    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(!openError);

    const handlePreviousPage = () => {
      setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
      
    const handleNextPage = () => {
      setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const changeAjout = (e) => {
      const { name, value } = e.target || e;
      setFormAjout((prevFormAjout) => ({
      ...prevFormAjout,
      [name]: value,
      }));
    };

    const changeAjoutSelectProfil = (value) => {
      setFormAjout((prevFormAjout) => ({
        ...prevFormAjout,
        idProfil: value,
      }));
    };

    const getProfilNameById = (id) => {
      const profil = dataProfil.find(profil => profil.id === id);
      return profil ? profil.nom : '';
    };

    const resetFormAjout = () => {
      setFormAjout({nom:'', prenom: '', contact: '', adresse: '', email: '', motDePasse: '', idProfil: null, statut: null});
    };

    const changeModif = (e) => {
      const { name, value } = e.target;
      setFormModif({
        ...formModif,
        [name]: value,
      });
      console.log(formModif);
    };

    const changeModifSelectProfil = (value) => {
      setFormModif((prevFormModif) => ({
        ...prevFormModif,
        idProfil: value,
      }));
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

      setIsFiltered(true);
      setPageNumber(1);
    };

    const resetFiltre = () => {
      setFormFiltre({text: '', idProfil: -1, statut: -1})
      setIsFiltered(false);
      setPageNumber(1);
    };

    const changeFiltreSelectProfil = (value) => {
      setFormFiltre((prevFormFiltre) => ({
        ...prevFormFiltre,
        idProfil: value,
      }));
    };

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
          <Typography
            variant="h1"
            color="black"
            className="mt-6 flex justify-center gap-1 text-4xl font-normal"
          >
            Liste des utilisateurs
          </Typography>
        <div className="mt-5 mb-5 flex items-center justify-center">
            <Button onClick={handleOpenAjout} className="flex items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              <PlusIcon className="h-4 w-4" />
              <span className="ml-2">Ajout</span>
            </Button>

            <Dialog open={openAjout} handler={handleOpenAjout} size="sm">
                <DialogBody>
                  <form onSubmit={postUtilisateur} className="mt-2 mb-2 w-full">
                    <Card className="w-full">
                      <Typography variant="h3" color="black" className="mt-6 flex justify-center gap-1 font-normal">
                        Ajout
                      </Typography>
                      <CardBody>
                        <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0">
                      <Tab value="card" onClick={() => setType("card")}>
                        Page 1
                      </Tab>
                      <Tab value="paypal" onClick={() => setType("paypal")}>
                        Page 2
                      </Tab>
                    </TabsHeader>
                    <TabsBody
                      className="!overflow-x-hidden !overflow-y-visible"
                      animate={{
                        initial: {
                          x: type === "card" ? 400 : -400,
                        },
                        mount: {
                          x: 0,
                        },
                        unmount: {
                          x: type === "card" ? 400 : -400,
                        },
                      }}
                    >
                      <TabPanel value="card" className="p-0">
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
                            value={formAjout.nom}
                            onChange={changeAjout}
                            required
                          />
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Prénom
                          </Typography>
                          <Input
                            size="lg"
                            color="green"
                            variant="standard"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: "before:content-none after:content-none",
                            }}
                            name="prenom"
                            value={formAjout.prenom}
                            onChange={changeAjout}
                            required
                          />
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Profil
                          </Typography>
                          <Select
                            color="green"
                            variant="standard" 
                            name="idProfil"
                            size="lg"
                            value={formAjout.idProfil}
                            onChange={(e) => changeAjoutSelectProfil(e)}
                            selected={() =>{return getProfilNameById(formAjout.idProfil)}}
                          >
                                {dataProfil && dataProfil.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                          </Select>
                          <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Statut
                          </Typography>
                          <Select
                            color="green"
                            variant="standard" 
                            size="lg"
                            name="statut"
                            selected={(element) =>
                              {
                               if (element) {
                                const selectedValue = element.props.value;
                                formAjout.statut = selectedValue;
                                if(selectedValue == 0) return "désactivé"
                                return "activé";
                               }
                              }
                            }
                          >
                          
                                <Option value={0}>désactivé</Option>
                                <Option value={5}>activé</Option>
                          </Select>
                        </div>
                      </TabPanel>
                      <TabPanel value="paypal" className="p-0">
                        <div className="mb-1 mt-3 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Adresse
                            </Typography>
                            <Input
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="adresse"
                              value={formAjout.adresse}
                              onChange={changeAjout}
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Contact
                            </Typography>
                            <Input
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="contact"
                              value={formAjout.contact}
                              onChange={changeAjout}
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Email
                            </Typography>
                            <Input
                              type="email"
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="email"
                              value={formAjout.email}
                              onChange={changeAjout}
                              required
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                              Mot de passe
                            </Typography>
                            <Input
                              type="password"
                              size="lg"
                              color="green"
                              variant="standard"
                              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                              labelProps={{
                                className: "before:content-none after:content-none",
                              }}
                              name="motDePasse"
                              value={formAjout.motDePasse}
                              onChange={changeAjout}
                              required
                            />
                        </div>
                      </TabPanel>
                    </TabsBody>
                        </Tabs>
                      </CardBody>
                    </Card>
                    <Button fullWidth className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2" type="submit">
                      Ajouter
                    </Button>
                  </form>
                </DialogBody>
            </Dialog>

        </div>
        
        <form onSubmit={submitFiltre} >
          <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
                              
            <Input 
              label="recherche"
              name="text"
              color="green"
              value={formFiltre.text}
              onChange={changeFiltre}
            />

            <Select
              color="green"
              label="Profil"
              name="idProfil"
              size="lg"
              value={formFiltre.idProfil}
              onChange={(e) => changeFiltreSelectProfil(e)}
              selected={() =>{return getProfilNameById(formFiltre.idProfil)}}
            >
                  {dataProfil && dataProfil.map(({id, nom}) => (
                    <Option key={id} value={id}>{nom}</Option>
                  ))};
            </Select>

            <Select
              color="green"
              label="Statut"
              size="lg"
              name="statut"
              selected={(element) =>
                {
                 if (element) {
                  const selectedValue = element.props.value;
                  formFiltre.statut = selectedValue;
                  if(selectedValue == 0) return "désactivé"
                  return "activé";
                 }
                }
              }
            >
                          
                <Option value={0}>désactivé</Option>
                <Option value={5}>activé</Option>
            </Select>

            <Button variant="outlined" className="rounded-full border-2 w-[11%]" type="submit" color="green">
              <MagnifyingGlassIcon className="h-4 w-4 transform rotate-90" />
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
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-start "
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Matricule
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
                    Prénom
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
                    Profil
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Statut
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                </th>
              
            </tr>
          </thead>
          <tbody>
            {dataUtilisateur && dataUtilisateur.map((item) => (
                  <tr key={item.id}>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.matricule}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.nom}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.prenom}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.profil ? item.profil.nom: ''}
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Chip
                            variant="ghost"
                            color={item.statut === 5 ? "green" : item.statut === 0 ? "red" : "default"}
                            size="sm"
                            value={item.statut === 5 ? "activé" : item.statut === 0 ? "désactivé" : "default"}
                            icon={
                              <span className={`mx-auto mt-1 block h-2 w-2 rounded-full ${
                                item.statut === 5 ? "bg-green-900" : item.statut === 0 ? "bg-red-900" : "bg-default"
                                } content-['']`} />
                            }
                          />
                        </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                      <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                          <div className="w-80">
                            <Typography color="black" className="font-medium">
                              Email: {item.email}
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Contact: {item.contact}
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Adresse: {item.adresse}
                            </Typography>
                          </div>
                        }>
                        <InformationCircleIcon className="h-8 w-8" color="black" />
                      </Tooltip>
                    
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">
                      <Button onClick={() => handleOpenModif(item)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          <PencilIcon className="h-4 w-4" />
                      </Button>
                    </td>

                  </tr>
              ))}
              <Dialog open={openModif} handler={handleOpenModif} size="sm">
                <DialogBody>
                <form onSubmit={() => putUtilisateur(idModif)} className="mt-2 mb-2 w-full">
                  <Card className="w-full">
                    <Typography variant="h3" color="black" className="mt-6 flex justify-center gap-1 font-normal">
                      Modification
                    </Typography>
                    <CardBody>
                      <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0">
                          <Tab value="card" onClick={() => setType("card")}>
                            Page 1
                          </Tab>
                          <Tab value="paypal" onClick={() => setType("paypal")}>
                            Page 2
                          </Tab>
                        </TabsHeader>
                        <TabsBody
                          className="!overflow-x-hidden !overflow-y-visible"
                          animate={{
                            initial: {
                              x: type === "card" ? 400 : -400,
                            },
                            mount: {
                              x: 0,
                            },
                            unmount: {
                              x: type === "card" ? 400 : -400,
                            },
                          }}
                        >
                          <TabPanel value="card" className="p-0">
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
                                defaultValue={formModif.nom}
                                onChange={changeModif}
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Prénom
                              </Typography>
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="prenom"
                                defaultValue={formModif.prenom}
                                onChange={changeModif}
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Profil
                              </Typography>
                              <Select
                                color="green"
                                variant="standard"
                                name="profil"
                                size="lg"
                                value={formModif.idProfil}
                                onChange={(e) => changeModifSelectProfil(e)}
                                selected={() =>{return getProfilNameById(formModif.idProfil)}}
                              >
                                {dataProfil && dataProfil.map(({id, nom}) => (
                                  <Option key={id} value={id}>{nom}</Option>
                                ))};
                              </Select>
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Statut
                              </Typography>
                              <Select
                                color="green"
                                variant="standard"
                                size="lg"
                                name="statut"
                                value={formModif.statut}
                                selected={(element) =>
                                  {
                                   if (element) {
                                    const selectedValue = element.props.value;
                                    formModif.statut = selectedValue;
                                    if(selectedValue == 0) return "désactivé"
                                    return "activé";
                                   }
                                  }
                                }
                              >
                                <Option value={0}>désactivé</Option>
                                <Option value={5}>activé</Option>
                              </Select>
                            </div>
                          </TabPanel>
                          <TabPanel value="paypal" className="p-0">
                            <div className="mb-1 mt-3 flex flex-col gap-6">
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Adresse
                              </Typography>
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="adresse"
                                defaultValue={formModif.adresse}
                                onChange={changeModif}
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Contact
                              </Typography>
                              <Input
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="contact"
                                defaultValue={formModif.contact}
                                onChange={changeModif}
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Email
                              </Typography>
                              <Input
                                type="email"
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="email"
                                defaultValue={formModif.email}
                                onChange={changeModif}
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Mot de passe
                              </Typography>
                              <Input
                                type="password"
                                size="lg"
                                color="green"
                                variant="standard"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="motDePasse"
                                defaultValue={formModif.motDePasse}
                                onChange={changeModif}
                                required
                              />
                            </div>
                          </TabPanel>
                        </TabsBody>
                      </Tabs>
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
  
  export default Utilisateur;
  
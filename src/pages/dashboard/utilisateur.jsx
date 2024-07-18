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
    Select, 
    Option,
    Chip,
  } from "@material-tailwind/react";

  import { PencilIcon, TrashIcon, InformationCircleIcon, PlusIcon } from "@heroicons/react/24/solid";

  import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function Utilisateur() {

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
        <Popover
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <PopoverHandler>
            
              <Button className="flex items-center">
                <PlusIcon className="h-4 w-4" />
                <span className="ml-2">Ajout</span>
              </Button>
            
          </PopoverHandler>
          <PopoverContent>
            <Card color="transparent" shadow={false}>
              <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
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
                    name="nom"
                    value=""
                    required
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Nouvelle année de sortie
                  </Typography>
                  <Input
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="newanneeSortie"
                    value=""
                    required
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Nouvelle marque
                  </Typography>
                  <Select 
                    label="Marque"
                    name="newMarque"
                    size="lg"
                  >
                        <Option value="">test</Option>
                  </Select>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Nouvelle catégorie
                  </Typography>
                  <Select 
                    label="Catégorie"
                    size="lg"
                    name="newCategorie"
                  >
                    
                        <Option value="">test</Option>
                  </Select>
                </div>
                <Button className="mt-6" type="submit" fullWidth>
                  Valider
                </Button>
              </form>
            </Card>
          </PopoverContent>
        </Popover>
        </div>
        
      
      <CardBody className="overflow-scroll px-0">
        <table className="mt-12 w-full min-w-max table-auto">
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
                    Prénom
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
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Intervenant
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
                            color="green"
                            size="xs"
                            value="actif"
                            icon={
                              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
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
                              Email: example@gmail.com
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Contact: 032 01 404 37
                            </Typography>
                            <Typography color="black" className="font-medium">
                              Adresse: Lot III F Anosizato
                            </Typography>
                          </div>
                        }>
                        <InformationCircleIcon className="h-8 w-8" color="black" />
                      </Tooltip>
                    
                    </td>
                    
                    <td className="p-4 border-b border-blue-gray-50">

                    <Popover
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <PopoverHandler>
                        
                            <Button>
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                        
                      </PopoverHandler>
                      <PopoverContent>
                        <Card color="transparent" shadow={false}>
                          <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
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
                                name="nom"
                                value=""
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Nouvelle année de sortie
                              </Typography>
                              <Input
                                size="lg"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                  className: "before:content-none after:content-none",
                                }}
                                name="newanneeSortie"
                                value=""
                                required
                              />
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Nouvelle marque
                              </Typography>
                              <Select 
                                label="Marque"
                                name="newMarque"
                                size="lg"
                              >
                                    <Option value="">test</Option>
                              </Select>
                              <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Nouvelle catégorie
                              </Typography>
                              <Select 
                                label="Catégorie"
                                size="lg"
                                name="newCategorie"
                              >
                                
                                    <Option value="">test</Option>
                              </Select>
                            </div>
                            <Button className="mt-6" type="submit" fullWidth>
                              Valider
                            </Button>
                          </form>
                        </Card>
                      </PopoverContent>
                    </Popover>
                      

                      <Tooltip content="Supprimer">
                          <Button className="ml-5">
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
          Page 1 of 10
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
  
  export default Utilisateur;
  
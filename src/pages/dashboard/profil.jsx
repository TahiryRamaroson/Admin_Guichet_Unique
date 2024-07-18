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
    Select, 
    Option,
  } from "@material-tailwind/react";

  import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

  import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
  
  export function Profil() {

    return (
      <div className="mt-12 mb-8 flex flex-col gap-12">
    <Card className="h-full w-full">
      
        <div className="mt-5 ml-10 mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
                Ajouter un Profil
            </Typography>
          </div>
        </div>
        <form>
        <div className="ml-10 mr-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          
          <Input label="Nom du modèle"
          name="nom"
          value=""
          required
          />

          <Input label="Année de sortie" type="number"
          name="anneeSortie"
          value=""
          required
          />

          <Select label="Marque"
          >
            <Option value="">test</Option>
          </Select>

          <Select label="Catégorie"
          >
            <Option value="">test</Option>
          </Select>

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
                    Modèle
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
                    Année de sortie
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
                    Marque
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
                    Catégorie
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
                  <tr>
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
                            2000
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Bema
                          </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          4-4
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
                        
                          <Tooltip content="Modifier">
                            <Button>
                                <PencilIcon className="h-4 w-4" />
                            </Button>
                            </Tooltip>
                        
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
                        <IconButton variant="text" className="ml-10">
                          <Button>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </IconButton>
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
  
  export default Profil;
  
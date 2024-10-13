import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Parametrage() {

  const navigate = useNavigate();

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
  }, [navigate]);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 mb-10 place-items-center">

      <Link to="/page/parametrage-action-plainte"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8 mb-10">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Action des plaintes
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/page/parametrage-antecedent-medical"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8 mb-10">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Antécédent médical
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/page/parametrage-categorie-plainte"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8 mb-10">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Catégorie de plaintes
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/page/parametrage-cause-deces"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8 mb-10">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Cause de décès
            </Typography>
          </CardBody>
        </Card>
      </Link>

      <Link to="/page/parametrage-motif-migration"> 
        <Card color="green" variant="gradient" className="w-80 max-w-[20rem] p-8 mb-10">
          <CardBody
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-8 rounded-none border-none border-white/10 pb-8 text-center"
          >
            <Typography
              variant="h1"
              color="white"
              className="mt-6 flex justify-center gap-1 text-4xl font-normal"
            >
              Motif de migration
            </Typography>
          </CardBody>
        </Card>
      </Link>

    </div>
    
  );
}

export default Parametrage;

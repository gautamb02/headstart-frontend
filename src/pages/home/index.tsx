import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useOrganizationContext } from "../../context/organization/context";
import Header from "./Header";
import { fetchOrganizations } from "../../context/organization/actions";

const Home: React.FC = () => {
  const { dispatch } = useOrganizationContext();

  useEffect(() => {
    fetchOrganizations(dispatch);
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="w-5/6 mx-auto">
        <Header />
        
      </div>
    </>
  );
};

export default Home;

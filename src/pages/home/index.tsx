import { useEffect } from "react";
import { useOrganizationContext } from "../../context/organization/context";
import Header from "../../components/Header";
import { fetchOrganizations } from "../../context/organization/actions";
import Applications from "./Applications";

const Home: React.FC = () => {
  const { dispatch } = useOrganizationContext();

  useEffect(() => {
    fetchOrganizations(dispatch);
  }, [dispatch]);
  return (
    <>
     
      <div className="w-5/6 mx-auto">
        <Header />
        <Applications/>
      </div>
    </>
  );
};

export default Home;

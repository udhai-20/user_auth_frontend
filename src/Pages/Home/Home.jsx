import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../actions/action";
import { useNavigate } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { Card } from "../../Components/Card";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.loading);

  const getAvailableUser = useSelector((state) => state?.user.user);
  const getCurrentUser = useSelector((state) => state?.user?.currentUser);
  console.log('getCurrentUser:', getCurrentUser);
  useEffect(() => {
    (async () => {
      await getAllUsers(dispatch, navigate,getCurrentUser?.id||getCurrentUser?._id);
    })();
    // eslint-disable-next-line 
  }, []);

  console.log(isLoading,getAvailableUser);
  return (
    <>
      {/* <div>Home</div> */}
      <div>{isLoading ? "Loading..." :""}</div>
      <Grid w={"90%"} margin={"auto"} templateColumns="repeat(4, 1fr)" gap={6}>
        {getAvailableUser?.map((user) => (
          <GridItem key={user.id}>
           <Card name={user.userName} email={user.email} bio={user.bio} pic={user.pic} isPublic={user.isPublic}/>
          </GridItem>
        ))}
        
      </Grid>
    </>
  );
};

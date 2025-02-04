import { useSelector } from "react-redux";

export const Home = () => {
  const {user} = useSelector(state => state.auth)
  console.log("USer Home", user)
  return <h2>Hello {user.userName}</h2>;
};

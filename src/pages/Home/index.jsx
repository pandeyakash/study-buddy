import { useSelector } from "react-redux";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";

export const Home = () => {
  const {user} = useSelector(state => state.auth)
  console.log("USer Home", user)
  return (
    <div>
    <h2>Hello {user.userName}</h2>
    {
      (user.userName && user.email) && <LogoutButton />
    }
    </div>
  )
};

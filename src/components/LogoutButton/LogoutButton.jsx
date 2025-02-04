import { Button } from "@mui/material";
import { logoutUser } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

export const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        console.log("Inside Button");
        
        dispatch(logoutUser());
    }
    return (
        <Button variant="contained" onClick={handleLogout}>
            Logout
        </Button>
    )
}
import { Avatar as MUIAvatar, } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
var md5 = require('md5');



const UserAvatar = ({ email }) => {
    return <MUIAvatar
        sx={{ width: 90, height: 90, bgcolor: "#fff", color: "#C4C4C4", }}
        alt={email}
        children={<PersonIcon sx={{ fontSize: "65px", border: "10px solid #C4C4C4", p: 0.75, borderRadius: "50%" }} />}
        src={email && 'http://www.gravatar.com/avatar/' + md5(email) + '.jpg?s=' + 500}
    />
}

export default UserAvatar
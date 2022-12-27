import sha256 from "sha256"
const JWT_SECRET = "1489762686428241269211535257083137611647994491166203518518119805951418187673510467706374747799644670"

export const checkOrCreateData = () => {
    if(localStorage.getItem('userList') === null){
        const hashedPass = sha256("Admin@123")
        const adminUser = [{
            username: "admin",
            password: hashedPass,
            name: "Dr. B. F. Momin",
            role: "admin"
        }]
        localStorage.setItem('userList', JSON.stringify(adminUser))
    }
    if(localStorage.getItem('loggedInUser') === null){
        localStorage.setItem('loggedInUser', '{}')
    }
}

export const loginUser = (body) => {
    const userList = JSON.parse(localStorage.getItem('userList'));
    let {username, password} = body;
    const hashedPassword = sha256(password);
    let value;
    let hasFound = false;
    userList.forEach(user => {
        if(user['username'] === username && user['password'] === hashedPassword){
            localStorage.setItem('loggedInUser', JSON.stringify(user))
            hasFound = true;
            value = {
                status: 201,
                message: "Logged In Successfully!",
                role: user['role']
            }
        }
    });
    if(hasFound){
        return value;
    }
    return {
        status: 401,
        message: "Invalid Credentials",
    }
}

/*
const userModel = {
    username: "",
    password: "",
    name: "",
    role: "admin/user"
}
*/
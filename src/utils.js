import sha256 from "sha256"

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

export const registerUser = (body) => {
    // check if username exists
    let userList = JSON.parse(localStorage.getItem('userList'));
    for(let i=0; i<userList.length; i++){
        if(userList[i]['username'] === body['username']){
            return {
                status: 401,
                message: "Username already exists!"
            }
        }
    }
    body['password'] = sha256(body['password']);
    body['role'] = 'user';
    // add to the list
    userList.push(body);
    localStorage.setItem('userList', JSON.stringify(userList));
    localStorage.setItem('loggedInUser', JSON.stringify(body));
    return {
        status: 201,
        message: "Signed Up Successfully!",
    }
}

export const logoutUser = () => {
    localStorage.setItem('loggedInUser', "{}")
}

export const isLoggedIn = () => {
    const val = localStorage.getItem("loggedInUser");
    if(val === "{}"){
        return false;
    }
    return true
}

/*
const userModel = {
    username: "",
    password: "",
    name: "",
    role: "admin/user"
}
*/
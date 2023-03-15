

const Login = async (email, password) => {    // login function to send a post request to the backend to login a user
    axios.post(`${BACKEND_BASE_URL}/api/auth/login`, {   // backend url is defined in the config.js file
        "email": email,
        "password": password
    }).then((response) => {    // if the login is successful, the user is redirected to the profile page
        localStorage.setItem('user', JSON.stringify(response.data.user));   
        // window.location.href = '../Profile/profile.html';   
    }).catch (error => {    // if the login is not successful, an error message is displayed
        console.log(error);
        document.getElementById('error-message').innerHTML = error.response.data.message;
    })
}

const loginForm = document.getElementById('login-form');  // get the login form ???
loginForm.addEventListener('submit', async (e) => {    // event listener for the login form
    document.getElementById('error-message').innerHTML = '';  
    document.getElementById('login-button').innerText = 'Logging in...';
    console.log('login form submitted');
    e.preventDefault();  
    const email = document.getElementById('username').value;  
    const password = document.getElementById('password').value;

    // check email and password
    if(!email || !password) {
        document.getElementById('error-message').innerHTML = 'Please enter your email and password';
        return;
    }
    if(!email.includes('@')) {
        document.getElementById('error-message').innerHTML = 'Please enter a valid email';
        return;
    }

    await Login(email, password);

    /////////////////////////////////////////////////////////////////////////
    // access cookie from the api cookie section   
    const cookie = document.cookie;
    console.log(cookie.jwt);
    /////////////////////////////////////////////////////////////////////////

    console.log("login successful")
    document.getElementById('login-button').innerText = 'Log in';
});


const Login = async (email, password) => {
    // api call to locahost:3000/api/auth/login
    const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
        withCredentials: true, // should be there
        credentials: 'include' // should be there   
    });
    const data = await response.json();
    console.log(data);
    if(data) {
        console.log('login successful');
        window.location.href = '../Profile/profile.html';
    }
    else {
        document.getElementById('error-message').innerHTML = data.message;
    }
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
    // const cookie = document.cookie;
    // console.log(cookie.jwt);
    /////////////////////////////////////////////////////////////////////////

    console.log("login successful")
    document.getElementById('login-button').innerText = 'Log in';
});


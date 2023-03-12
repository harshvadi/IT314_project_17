

const Login = async (email, password) => {
    axios.post(`${BACKEND_BASE_URL}/api/auth/login`, {
        "email": email,
        "password": password
    }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '../Profile/profile.html';
    }).catch (error => {
        console.log(error);
        document.getElementById('error-message').innerHTML = error.response.data.message;
    })
}

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
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
    Login(email, password);
    console.log("login successful")
    document.getElementById('login-button').innerText = 'Log in';
});


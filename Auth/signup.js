const Signup = async (firstname, email, username, role, password) => {
    // api call to locahost:3000/api/auth/register
    const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname,
            email,
            username,
            role,
            password,
        }),
        withCredentials: true, // should be there
        credentials: 'include' // should be there   
    });
    const data = await response.json();
    console.log(data);
    if(data) {
        console.log('Signup successful');
        window.location.href = '../Profile/profile.html';
    }
    else {
        document.getElementById('error-message').innerHTML = data.message;
    }
}
console.log("signup.js loaded")
const signupForm = document.getElementById('signup-form');  // get the signup form ???
console.log("signup.js loaded")
signupForm.addEventListener('submit', async (e) => {    // event listener for the signup form
    console.log("signup.js loaded")
    document.getElementById('error-message').innerHTML = '';  
    document.getElementById('signup-button').innerText = 'Signing up...';
    console.log('Signup form submitted');
    e.preventDefault();  
    const firstname = document.getElementById('name').value;
    const email = document.getElementById('username').value;  
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    
    if(!firstname || !email || !username || !password || !confirm_password) {    // check all fields
        document.getElementById('error-message').innerHTML = 'Please enter all the fields';
        return;
    }
    if(!email.includes('@')) {   // check email
        document.getElementById('error-message').innerHTML = 'Please enter a valid email';
        return;
    }
    // compare passwords  
    if(password != confirm_password) {
        document.getElementById('error-message').innerHTML = 'The passwords you entered do not match';
        return;
    }
    console.log("begin signup")
    await Signup(firstname, email, username, role, password);

    /////////////////////////////////////////////////////////////////////////
    // access cookie from the api cookie section   
    // const cookie = document.cookie;
    // console.log(cookie.jwt);
    /////////////////////////////////////////////////////////////////////////

    console.log("Signup successful")
    document.getElementById('signup-button').innerText = 'Sign up';
});



// redirect to another pages
const clickone_btn_1 = document.getElementById('active-hover-sidebar-1');
const clickone_btn_2 = document.getElementById('active-hover-sidebar-2');
const clickone_btn_3 = document.getElementById('active-hover-sidebar-3');

const logoutuseradmin = document.getElementById('logoutuseradmin');
logoutuseradmin.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin-info');
    window.location.href = '../index.html';
});

clickone_btn_1.addEventListener('click', () => {
    console.log('clicked');
    console.log("already on this")
});

clickone_btn_2.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = './adminmanage.html';
});

clickone_btn_3.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = './surveymanage.html';
});

const GetDOMAdminUserFit = (data) => {

    const oneuserRow = `<tr>
    <td>${data.name}</td>
    <td>${data.username}</td>
    <td>${data.email}</td>
    <td>
        <button type="button" class="btn btn-danger remove-btn" id="${data.username}">Remove</button>
    </td>
  </tr>`;

    return oneuserRow;
}

let totalpollsconducted = 0;

const loadPromotedPolls = async () => {
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/getpromoted', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        }),
        withCredentials: true,
        credentials: 'include' 
    });

    const data = await response.json();
    const firstbox = document.getElementById('item3-third');
    firstbox.innerText = data.data.length;
    // fetch the localstorage and update the third value
    const currentadmininfo = JSON.parse(localStorage.getItem("admin-info"));
    currentadmininfo.third = data.data.length;
    localStorage.setItem("admin-info",JSON.stringify(currentadmininfo));
}

const greetadmin = document.getElementById('admin-greeting');
const currentadmininfo = JSON.parse(localStorage.getItem("user"));
greetadmin.innerText = `Hello ${currentadmininfo.name}!`;


const loadUserDataAtAdmin = async () => {

    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/getallusers', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        }),
        withCredentials: true,
        credentials: 'include'
    });

    const data = await response.json();
    const firstbox = document.getElementById('item1-first');
    const secondbox = document.getElementById('item2-second');
    firstbox.innerText = data.data.length;
    const currentadmininfo = JSON.parse(localStorage.getItem("admin-info"));
    if(!currentadmininfo){
        localStorage.setItem("admin-info",JSON.stringify({first: data.data.length, second: 0, third: 0}));
    }
    else{currentadmininfo.first = data.data.length;
    localStorage.setItem("admin-info",JSON.stringify(currentadmininfo));}

    const table = document.getElementById('useradmin-tbody');
    let oneuserRow = '';
    console.log(data);
    for(let i = 0; i < data.data.length; i++) {
        if(data.data[i].pollscreated){
            totalpollsconducted += data.data[i].pollscreated.length;
        }
        console.log(data.data[i]);
        oneuserRow += GetDOMAdminUserFit(data.data[i]);
    }
    table.innerHTML = oneuserRow;
    secondbox.innerText = totalpollsconducted;
    const currentadmininfo2 = JSON.parse(localStorage.getItem("admin-info"));
    currentadmininfo2.second = totalpollsconducted;
    localStorage.setItem("admin-info",JSON.stringify(currentadmininfo2));
}

window.addEventListener('load', async function(){
    await loadUserDataAtAdmin();
    await loadPromotedPolls();
});

const table = document.getElementById('useradmintable');

table.addEventListener('click', async (e) => {
    const id = e.target.id;
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/removeuser', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            username: id
        }),
        withCredentials: true, // should be there
        credentials: 'include' // should be there
    });
    const data = await response.json();
    alert(data.message);
    window.location.reload();
});

const clickone_btn_1 = document.getElementById('active-hover-sidebar-1');
const clickone_btn_2 = document.getElementById('active-hover-sidebar-2');
const clickone_btn_3 = document.getElementById('active-hover-sidebar-3');

clickone_btn_1.style.backgroundColor = "none";
clickone_btn_3.style.backgroundColor = "none";

clickone_btn_1.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = 'http://localhost:5500/admin/admin.html';
});

clickone_btn_2.addEventListener('click', () => {
    console.log('clicked');
    console.log("already on this")
});

clickone_btn_3.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = 'http://localhost:5500/admin/surveymanage.html';
});

const loadAdmininfo = (admin_info) => {
    const firstbox = document.getElementById('item1-first');
    const secondbox = document.getElementById('item2-second');
    const thirdbox = document.getElementById('item3-third');

    firstbox.innerText = admin_info.first;
    secondbox.innerText = admin_info.second;
    thirdbox.innerText = admin_info.third;
}

window.addEventListener('load', function () {

    const admin_info = JSON.parse(localStorage.getItem("admin-info"));
    if(!admin_info){
        // this.window,location.href = "http://localhost:5500/admin/admin.html";
        return;
    }
    loadAdmininfo(admin_info);
});

const promoteuserform = document.getElementById('promoteuserform');
const demoteuserform = document.getElementById('demoteuserform');

const searchbtnone = document.getElementById('searchbutton1');
const searchbtntwo = document.getElementById('searchbutton2');

const getuserdetails = async (username) => {
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/getsingleuserinfo', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            token: localStorage.getItem('token')
        }),
        withCredentials: true,
        credentials: 'include'
    });
    return response;
}



searchbtnone.addEventListener('click', async function (e) {
    const username = document.getElementById('promoteusername').value;
    let data = await getuserdetails(username);
    if (data.status === 200) {
        data = await data.json();
        data = data.user;
        const userinfo = document.getElementById('user-promoted-content');
        userinfo.innerHTML = `<div class="mycon1" ><table class="table">
        <thead class="table-secondary">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
        <tr>
<td>${data.name}</td>
<td>${data.username}</td>
<td>${data.email}</td>
<td>${data.role}</td>
</tr>
        </tbody>
      </table></div>`;
      // remove disabled attribute from promote button
        const promotebtn = document.getElementById('promotebtn');
        promotebtn.removeAttribute('disabled');

    }else{
        data = await data.json();

        const userinfo = document.getElementById('user-promoted-content');
        userinfo.innerHTML = `<tr>
        <td>error</td>
      </tr>`;
    }
});

searchbtntwo.addEventListener('click', async function (e) {
    const username = document.getElementById('demoteusername').value;
    let data = await getuserdetails(username);
    if (data.status === 200) {
        data = await data.json();
        data = data.user;
        const userinfo = document.getElementById('user-demoted-content');
        userinfo.innerHTML = `<div class="mycon2" ><table class="table">
        <thead class="table-secondary">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
        <tr>
<td>${data.name}</td>
<td>${data.username}</td>
<td>${data.email}</td>
<td>${data.role}</td>
</tr>
        </tbody>
      </table></div>`;
      // remove disabled attribute from promote button
        const promotebtn = document.getElementById('demotedbtn');
        promotebtn.removeAttribute('disabled');
    }else{
        const userinfo = document.getElementById('user-demoted-content');
        userinfo.innerHTML = `<tr>
        <td>error</td>
      </tr>`;
    }
});


promoteuserform.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('promoteusername').value;
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/promoteuser', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            token: localStorage.getItem('token')
        }),
        withCredentials: true,
        credentials: 'include'
    });
    if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        window.location.reload();
    } else {
        const data = await response.json();
        alert(data.message);
    }
});

demoteuserform.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('demoteusername').value;
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/demoteuser', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            token: localStorage.getItem('token')
        }),
        withCredentials: true,
        credentials: 'include'
    });
    if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        window.location.reload();
    } else {
        const data = await response.json();
        alert(data.message);
    }
});

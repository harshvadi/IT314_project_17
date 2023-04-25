

const clickone_btn_111 = document.getElementById('active-hover-sidebar-111');
const clickone_btn_222 = document.getElementById('active-hover-sidebar-222');
const clickone_btn_333 = document.getElementById('active-hover-sidebar-333');


clickone_btn_111.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = './admin.html';
});

clickone_btn_333.addEventListener('click', () => {
    console.log('clicked');
    console.log("already on this")
});

clickone_btn_222.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = './adminmanage.html';
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


const greetadmin2 = document.getElementById('admin-greeting-3');
const currentadmininfo2 = JSON.parse(localStorage.getItem("user"));
greetadmin2.innerText = `Hello ${currentadmininfo2.name}!`;


const surveymanage_input = document.getElementById('surveymanage-input');
const sumbitform = document.getElementById('getuserinfo');

sumbitform.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log("hereh")
    // get last info from the url by splitting it
    const pollid = document.getElementById('surveymanage-input').split('/').pop();
    console.log(pollid);
    const response = await fetch('https://quickpolls-2zqu.onrender.com/api/getallpolls', {
        method: 'POST',
        headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pollid: pollid,
            token: localStorage.getItem('token')
        }),
    });
    if(response.status === 200){
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
    }

});

window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user.role;
    if(role != 'admin') {
        window.location.href = '../Feed/feed.html';
    }
}
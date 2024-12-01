const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
const closeIcon = document.getElementById('close-icon');
const openDialogButton = document.getElementById('openDialogButton');
const myDialog = document.getElementById('myDialog');
const closeDialogButton = document.getElementById('closeDialogButton');
const overlay = document.createElement('div'); 

// Настраиваем элемент затемнения
overlay.classList.add('overlay'); 
document.body.appendChild(overlay); 


menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
closeIcon.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

openDialogButton.addEventListener('click', () => {
    myDialog.showModal();
    overlay.classList.add('active'); 
});
closeDialogButton.addEventListener('click', () => {
    myDialog.close();
    overlay.classList.remove('active'); 
});
window.addEventListener('click', function (event) {
    if (event.target === myDialog) {
        myDialog.close();
        overlay.classList.remove('active'); 
    }
});
document.getElementById('burger-menu').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); 
});
document.getElementById('burger-menu').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); 
});

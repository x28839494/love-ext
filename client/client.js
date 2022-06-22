import { io } from "socket.io-client"
let $ = (el)=> {
    return document.querySelector(el)
}
let socket = io.connect("https://chrome-ext.vercel.app/");
let $form = $("#messForm");
let $name = $("#name");
let $textarea = $("#message");
let $all_messages = $("#all_mess");

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit("send mess", {
        mess: $textarea.value,
        name: $name.value,
        user: "D"
    });
    $textarea.value = '';
});

socket.on("add mess",  (data) => {
    console.log(data)
    if(data.user === 'D') {
        const el = document.createElement('SPAN');
        el.classList.add(data.className)
        el.innerHTML = "<b>" + data.name + "</b>: " + data.mess;
        $all_messages.appendChild(el)
    }
    heartAnimation()
});


const heartAnimation = () => {
   $('.heart').classList.add('animation');
   setTimeout(() => {
       $('.heart').classList.remove('animation');
   }, 3000)
}
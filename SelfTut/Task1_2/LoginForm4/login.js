var modal = document.getElementById('loginid');

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function showPassword() {
    var x = document.getElementById("passwordsignup");
    var y = document.getElementById("retypepassword");
    var z = document.getElementById("passwordlogin");
    if (x.type === "password") {
        x.type = "text";
    } else x.type = "password";

    if (y.type === "password") {
        y.type = "text";
    } else y.type = "password";

    if (z.type === "password") {
        z.type = "text";
    } else z.type = "password";

}


var signuparea = document.getElementById('signuparea');
var passwordsignup = document.getElementById('passwordsignup');
var retypepassword = document.getElementById("retypepassword");

function store() {
    if (signuparea.value == "" || passwordsignup.value == "" || retypepassword.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return false;
    } else if (passwordsignup.value != retypepassword.value) {
        alert("Password không trùng khớp");
        return false;
    } else {
        localStorage.setItem('name', signuparea.value);
        localStorage.setItem('password', passwordsignup.value);
        alert("Đăng ký thành công. Bạn có thể tiến hành đăng nhập");
        return true;
    }
}

function dangnhap() {
    var storedName = localStorage.getItem('name');
    var storedPassword = localStorage.getItem('password');

    var inputName = document.getElementById('loginarea');
    var inputPassword = document.getElementById('passwordlogin');

    if (inputName.value == storedName && inputPassword.value == storedPassword) {
        alert("Thông tin hợp lệ. Đăng nhập thành công.");
        return true;
    }
    else {
        alert("Thông tin không hợp lệ, vui lòng kiểm tra lại.");
        return false;
    }

}




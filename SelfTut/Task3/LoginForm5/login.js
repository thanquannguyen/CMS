displaylist();

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
    var button1 = document.getElementById("showPass1");
    var button2 = document.getElementById("showPass2");
    if (button1.checked) {
        if (x.type === "password") {
            x.type = "text";
        }

        if (y.type === "password") {
            y.type = "text";
        }
    } else {
        x.type = "password";
        y.type = "password";
    }

    if (button2.checked) {
        if (z.type === "password") {
            z.type = "text";
        }
    } else {
        z.type = "password";
    }


}


// var signuparea = document.getElementById('signuparea');
// var passwordsignup = document.getElementById('passwordsignup');
// var retypepassword = document.getElementById("retypepassword");

function store() {

    // if (signuparea.value == "" || passwordsignup.value == "" || retypepassword.value == "") {
    //     alert("Vui lòng nhập đầy đủ thông tin");
    //     return false;
    // } else if (passwordsignup.value != retypepassword.value) {
    //     alert("Password không trùng khớp");
    //     return false;
    // } else {
    //     localStorage.setItem('name', signuparea.value);
    //     localStorage.setItem('password', passwordsignup.value);
    //     alert("Đăng ký thành công. Bạn có thể tiến hành đăng nhập");
    //     return true;
    // }
    let signuparea = document.getElementById('signuparea');
    let passwordsignup = document.getElementById('passwordsignup');
    let retypepassword = document.getElementById("retypepassword");


    let email = document.getElementById('signuparea').value;
    let password = document.getElementById('passwordsignup').value;
    if (signuparea.value == "" || passwordsignup.value == "" || retypepassword.value == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return false;
    } else if (passwordsignup.value != retypepassword.value) {
        alert("Password không trùng khớp!");
        return false;
    } else {
        let data = JSON.parse(localStorage.getItem('data')) || [];
        let exist = data.length && JSON.parse(localStorage.getItem('data')).some(data => data.email.toLowerCase() == email.toLowerCase());
        if (!exist) {
            data.push({
                email,
                password
            });
            localStorage.setItem('data', JSON.stringify(data));
            alert("Đăng ký thành công. Bạn có thể tiến hành đăng nhập");
            document.querySelector('form').reset();
        } else {
            alert("Tài khoản này đã được đăng kí. Vui lòng đăng nhập.");
        }
        displaylist();
    }
}

function dangnhap() {
    // var storedName = localStorage.getItem('name');
    // var storedPassword = localStorage.getItem('password');

    // var inputName = document.getElementById('loginarea');
    // var inputPassword = document.getElementById('passwordlogin');

    // if (inputName.value == storedName && inputPassword.value == storedPassword) {
    //     alert("Thông tin hợp lệ. Đăng nhập thành công.");
    //     return true;
    // } else {
    //     alert("Thông tin không hợp lệ, vui lòng kiểm tra lại.");
    //     return false;
    // }

    let inputName = document.getElementById('loginarea').value;
    let inputPassword = document.getElementById('passwordlogin').value;
    let data = JSON.parse(localStorage.getItem('data')) || [];
    let exist = data.length && JSON.parse(localStorage.getItem('data')).some(data => data.email.toLowerCase() == inputName.toLowerCase());
    if (!exist) {
        alert("Tài khoản không tồn tại, vui lòng đăng ký.");
    } else {
        let checkpass = data.length && JSON.parse(localStorage.getItem('data')).some(data => data.password.toLowerCase() == inputPassword.toLowerCase());
        if (checkpass) {
            alert("Đăng nhập thành công.");
            document.getElementsByClassName('modal-content')[0].reset();
        } else {
            alert("Mật khẩu không đúng");
        }
    }

}

function displaylist() {
    console.log('Account Updated: ', localStorage.getItem('data'));
    let exist = localStorage.getItem('data');
    if (exist) {
        let output = document.querySelector('tbody');
        output.innerHTML = "";
        JSON.parse(exist).forEach(data => {
            output.innerHTML += `
            <tr>
                <td>${data.email}</td>
                <td>${data.password}</td>
            </tr>
            `;
        })
    }
}
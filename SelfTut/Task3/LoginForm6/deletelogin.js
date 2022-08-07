$(document).ready(function () {
    $(".instruction").click(function () {
        alert(`
    Test Flow:
        Đăng kí tài khoản:
            Thử để trống
            Thử nhập password không trùng nhau.
            Thử nhập email đã có trong db.
        Đăng nhập:
            Thử nhập 1 email không có trong db.
            Thử nhập sai password.
        `);
    });

    $(".deletecredential").click(function () {
        info = $(this).parents('tr').find("td:eq(0)").text();
        // console.log(info);

        let data = JSON.parse(localStorage.getItem('data')) || [];
        for (var i = 0; i < data.length; i++) {
            let check = data[i].email;
            if (info == check) {
                // console.log(check);
                data.splice(i, 1);

            }
        }
        data = JSON.stringify(data);
        localStorage.setItem('data', data);
        $(this).closest('tr').remove();

    });
});
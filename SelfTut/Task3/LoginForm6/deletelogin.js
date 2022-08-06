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
        // let datas = JSON.parse(localStorage.getItem('data')) || [];

        // $('tbody td:first-child').each(function () {
        //     for (let i = 0; i <= datas.length; i++) {
        //         var data = datas[i];
        //         console.log($(this).text());
        //         if ($(this).text() === data.email) {
        //             datas.splice(i, 1);
        //             $(this).closest('tr').remove();
        //         }
        //     }
        // })
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
        // if (data.email == $('td:first-child')) {
        //     data[0].delete({
        //         email,
        //         password
        //     });
        //     localStorage.setItem('data', JSON.stringify(data));
        // }
    });
});
$(function () {
    //1.获取用户信息
    getUserInof();

    //2.退出
    $('#logout').on('click', function () {
        layui.layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地token，2.页面跳转，3.关闭询问框
            localStorage.removeItem('token')
            location.href = '/login.html';
            layui.layer.close(index);
          });
    })
})

function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /* headers: {
            Authorization:localStorage.getItem('token') || ''
        }, */
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data)
        },
        
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar')
        .html(text)
        .show()
    }
}
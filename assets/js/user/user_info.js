$(function () {
    var form = layui.form
    var layer=layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须1到6位'
            }
        }
    })

    //2.用户渲染
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val('formUserInfo',res.data)
            }
        })
    }

    //3.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('恭喜您，用户信息修改成功！')
                window.parent.getUserInof()
            }
        })
    })
})
$(function () {
    //1.点击显示和隐藏登录和注册的表单
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //2.自定义校验规则
    var form = layui.form
    var layer=layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //确认密码校验规则
        repwd: function (value) {
            var pwd=$('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '俩次密码输入不一致！'
            }
        }
    })

    //3.监听注册表单发起ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message, {icon: 5})
                // alert(res.message)
                layer.msg('恭喜您，注册成功', { icon: 6 })
                //成功后跳转到登陆页面
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

     //4.监听登录表单发起ajax请求
     $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message, {icon: 5})
                //登陆后，提示信息，保存token,跳转页面
                layer.msg('恭喜您，登录成功', { icon: 6 })
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
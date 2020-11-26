$.ajaxPrefilter(function (options) {
    
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    if (options.url.indexOf('/my/') !== -1) {
         options.headers= {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            //1。清空本地token 2.跳转页面
            localStorage.removeItem('token');
            location.href='/login.html'
        }
    }
})
function createItem(key, value) {
    if (!value)
        value = '';
    var html = $('<div class="layui-inline layui-col-md12">\n' +
        '<label class="layui-form-label">' + key +
        '<span\n' +
        'style="color: red;">*</span></label>\n' +
        '<div class="layui-input-block">\n' +
        '<input value="' + value +
        '" id="' + key +
        '" name="' + key +
        '" placeholder="请输入' + key +
        '" type="text"\n' +
        'class="layui-input" lay-verify="required" required/>\n' +
        '</div>\n' +
        '</div>');
    return html
}

function collectData() {
    var data = {};
    keys.forEach(function (each) {
        data[each] = $("#" + each).val()
    });
    return data
}

$(function () {
    for (var key in parent.old_rows) {
        keys.push(key);
        values.push(parent.old_rows[key]);
    }
    keys.forEach(function (each, index) {
        $("#main").append(createItem(each, values[index]))
    });
    $("#btnClose").on('click', function (e) {
        // var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(parent.layer_index); //再执行关闭
    });
    console.log(parent.old_rows);
    $("#btnSubmit").on('click', function (e) {
        var data = {
            'new': collectData(),
            'old': parent.old_rows,
        };
        data['tablename'] = parent.table_name;
        data['database'] = getCookie('schema');
        data['action'] = action;

        console.log(data);
        $.ajax({
            url: '/datamanage/change',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data['message'] == 'ok') {
                    parent.layer.msg('修改成功', {
                        time: 2000, //20s后自动关闭
                        btn: ['确定'],
                    });
                    parent.layer.close(parent.layer_index);
                    parent.$("#mytab").bootstrapTable('refresh');
                } else {
                    layui.use('layer', function () {
                        var layer = layui.layer
                        layer.msg('修改失败', {
                            time: 2000, //20s后自动关闭
                            btn: ['确定'],
                            success: function (layero) {
                                var btn = layero.find('.layui-layer-btn');
                                btn.find('.layui-layer-btn0').attr({
                                    onclick: refresh()
                                });
                            }
                        });
                    })
                }
            }
        })
    })
});

function refresh() {
    parent.location.reload();
}

function getCookie(cookie_name) {
    var allcookies = document.cookie;
    //索引长度，开始索引的位置
    var cookie_pos = allcookies.indexOf(cookie_name);

    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1;
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
            cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
    }
    return value;
}
$(function () {
// 表格
    layui.use(['table','form'], function () {
        var table = layui.table;
        var form = layui.form;

        table.render({
            elem: '#test'
            , height: 750
            , url: 'get_all_data'
            , page: true
            , limit: 20
            , limits: [20, 50, 100]
            , method: 'post'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                {field: 'index', width: 100, sort: true, fixed: true, title: '序号'},
                {field: 'id', width: 150, title: '项目编号'},
                {field: 'name', width: 400, title: '项目名称'},
                {field: 'unit', width: 250, title: '项目牵头承担单位'},
                {field: 'master', width: 130, title: '项目负责人'},
                {field: 'CFexpenditure', width: 150, sort: true, title: '中央财政经费（万元）'},
                {field: 'cycle', width: 150, title: '项目实施周期（年）'},
                {field: 'specialProj', width: 180, sort: true, title: '所属专项'},
                {field: 'publicDate', width: 150, sort: true, title: '公示日期'},
//                {fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo'}
            ]]
            , parseData: function (res) { //将原始数据解析成 table 组件所规定的数据，res为从url中get到的数据
                var result;
                console.log(this);
                console.log(JSON.stringify(res));
                if (this.page.curr) {
                    result = res.data.slice(this.limit * (this.page.curr - 1), this.limit * this.page.curr);
                }
                else {
                    result = res.data.slice(0, this.limit);
                }
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": result //解析数据列表
                };
            }
        });
//表格重载 数据查询
      var $ = layui.$, active = {
          reload: function(){
//              var name = $('#name').val();
//              var master = $('#master').val();
//              var unit = $('#unit').val();

              form.on('submit(search-btn)',function(data){
                   //执行重载
                  table.reload('test', {
                      page: {
                          curr: 1 //重新从第 1 页开始
                      }
                      ,where: data.field
                  });
                  return false;
              });

//              //执行重载
//              table.reload('test', {
//                  method: 'POST'
//                  ,url:'get_data_from_mysql'
//                  ,page: {
//                      curr: 1 //重新从第 1 页开始
//                  }
//                  ,where: {
//                      name: name,
//                      master: master,
//                      unit: unit,
//                  }
//              });
          }
      };

      form.on('submit(searchBtn)',function(data){
           //执行重载
          table.reload('test', {
              page: {
                  curr: 1 //重新从第 1 页开始
              }
              ,where: data.field
          });
          return false;
      });

      //按钮绑定事件
//      $('#search-btn').on('click', function(){
//
//      });
//      $('#reset-btn').click(function () {
//          table.reload('email_form', {
//              // method: 'POST'
//              url:"{:url('/background/EmailManagement/status_show')}"
//              ,page: {
//                  curr: 1 //重新从第 1 页开始
//              }
//          });
//      })

    });
});
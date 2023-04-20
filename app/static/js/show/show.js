$(function () {
    var myChart = echarts.init(document.getElementById("network"));
    var color_pool = ['#2980B9', '#E74C3C', '#48C9B0', '#F7DC6F', '#B9770E', '#8E44AD', '#797D7F', '#7B241C', '#EC7063', '#884EA0',
        '#AF7AC5', '#5DADE2', '#1ABC9C', '#27AE60', '#F39C12', '#EDBB99', '#F5B7B1', '#FAD7A0']

// 表格
    layui.config({
        base: '/static/js/show/layui/lay/modules/'
    }).use(['table', 'dropdown', 'element'], function () {
        var table = layui.table;
        var dropdown = layui.dropdown;
        var element = layui.element;

        table.render({
            elem: '#test',
            url: '/api/statistic_info',
            where: {xhrFields: {withCredentials: true}, crossDomain: true},
            cellMinWidth: 80,//全局定义常规单元格的最小宽度，layui 2.2.1 新增
            cols: [[
                {field: 'name', width: 160, sort: true, fixed: true, title: '数据集名称'},
                {field: 'nodes', width: 80, title: '节点数'},
                {field: 'edges', width: 80, sort: true, title: '边数'},
                {field: 'density', width: 180, title: '网络密度'},
                {field: 'degree_max', width: 80, title: '最大度'},
                {field: 'degree_min', width: 80, sort: true, title: '最小度'},
                {field: 'degree_avg', width: 180, title: '平均度'},
                {field: 'clustering', width: 180, sort: true, title: '平均聚集系数'},
                {fixed: 'right', width: 178, align: 'center', toolbar: '#barDemo'}
            ]],
            done: function (res) {
                dropdown.suite();
                dropdown.onFilter('algo', function (event) {
                    $.ajax({
                        url: '/api/args',
                        type: 'get',
                        data: {
                            'method': event
                        },
                        async: true,
                        success: function (data) {
                            $('#algoIntro').empty();
                            for (var key in data) {
                                $('#algoIntro').append(
                                    $(
                                        "<div class='layui-col-md3'>" +
                                        "<form class='layui-form layui-form-pane' action=''>" +
                                        "<div class='layui-form-item'>" +
                                        "<label class='layui-form-label'>" + key +
                                        "</label>" +
                                        "<input class='layui-input' type='text' class='form-control' name='role' id='" + key +
                                        "' value='" + data[key] + "'>" +
                                        "</div>" +
                                        "</form>" +
                                        "</div>")
                                );
                            }
                            $('#algoIntro').append($("<div class='layui-col-md3'>" +
                                "<button class='layui-btn' id='exec'>运行</button>" +
                                "</div>"));
                        }
                    })
                });
            }
        });
        //监听工具条
        table.on('tool', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                myChart.showLoading();
                $.ajax({
                    url: '/api/dataset',
                    type: 'get',
                    data: {
                        dataset: data.name
                    },
                    success: function (graph) {
                        var net = JSON.parse(JSON.stringify(graph));
                        myChart.hideLoading();
                        var labels = graph['label'];
                        var edges = [];
                        for (var i = 0; i < graph.nodes.length; i++) {
                            graph.nodes[i].category = labels[graph.nodes[i].name][1];
                            graph.nodes[i].name = graph.nodes[i].name.toString();
                        }
                        for (var j = 0; j < graph.edges.length; j++) {
                            edges.push([graph.edges[j].source, graph.edges[j].target, 0, 0]);
                            graph.edges[j].source = graph.edges[j].source.toString();
                            graph.edges[j].target = graph.edges[j].target.toString();
                        }
                        if (labels) {
                            var categories = [];
                            var legend = [];
                            for (var i = 0; i < graph.classes; i++) {
                                categories[i] = {
                                    name: '类别' + (i + 1)
                                };
                                legend[i] = {
                                    name: '类别' + (i + 1)
                                };
                            }
                        }
                        var option = {
                            tooltip: {},
                            // backgroundColor: '#eee',
                            color: color_pool,
                            legend: {
                                data: legend,
                            },
                            series: [{
                                type: 'graph',
                                layout: 'force',
                                symbolSize: 12,
                                roam: true,
                                force: { //力引导图基本配置
                                    repulsion: 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
                                    gravity: 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                    edgeLength: 150,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
                                    layoutAnimation: false
                                    //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
                                },
                                zoom: 1,
                                data: graph.nodes,
                                links: graph.edges,
                                categories: categories,
                                label: {
                                    normal: {
                                        show: false,
                                        textStyle: {
                                            fontSize: 10
                                        },
                                    }
                                },
                                edgeLabel: {
                                    show: true,
                                    normal: {
                                        textStyle: {
                                            fontSize: 20
                                        }
                                    }
                                },
                                normal: {
                                    width: 0.3,
                                    curveness: 0.3,
                                    opacity: 0.7
                                }
                            }]
                        };
                        myChart.setOption(option);
                    }
                });
            }
        });
    });


});

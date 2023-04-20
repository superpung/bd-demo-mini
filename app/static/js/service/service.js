require(['jquery', 'echarts', 'dataTool'], function ($, echarts) {
    var color_pool = ['#2980B9', '#E74C3C', '#48C9B0', '#F7DC6F', '#B9770E', '#8E44AD', '#797D7F', '#7B241C', '#EC7063', '#884EA0',
        '#AF7AC5', '#5DADE2', '#1ABC9C', '#27AE60', '#F39C12', '#EDBB99', '#F5B7B1', '#FAD7A0']
    var origin_net, net, task_id;
    function apiFn() {
        this.hostname = ""
    }

    apiFn.prototype = {
        Init: function () {
            this.departmentFn();
            this.policyFn();
            this.contentFn();
            this.publicNumFn();
            setInterval(function () {
                numInit()
            }, 6000);
        },
        // 算法运行时间
        departmentFn: function () {
            var dataArr = [
                { name: '算法运行时间：', value: 300 },
            ];
            // 中间滚动数据展示
            for (var j = 0; j < dataArr.length; j++) {
                $(".main_list_title").text(dataArr[j].name)
            }
        },
        // 算法运行结果
        policyFn: function () {
            $(".main_bottom_t_l_main2").jCarouselLite({
                vertical: true,
                hoverPause: true,
                visible: 4,
                auto: 1000,
                speed: 500
            });
        },
        // 初始化网络可视化
        contentFn: function () {
            var network1 = $('#contentId');

            //原始网络
            var dataType = '';
            $("#choose_dataset").on('click', function (e) {
                $("#upload").trigger('click')
                dataType = e.target.name
            });

            $("#upload").on('change', function (e) {
                let fileObj = this.files[0]
                if (!fileObj)
                    return
                let formFile = new FormData();
                formFile.append("file", fileObj); //加入文件对象
                formFile.append("data_type", dataType);
                var element = $("<div style='width: 100%;height: 100%'></div>")
                var myChart = echarts.init(element.get(0))
                $.ajax({
                    url: "/api/data",
                    data: formFile,
                    type: "post",
                    dataType: "json",
                    cache: false,//上传文件无需缓存
                    processData: false,//用于对data参数进行序列化处理 这里必须false
                    contentType: false, //必须
                    beforeSend: function () {
                        network1.empty()
                        if (dataType === 'network') {
                            $("#contentId").append(element)
                            myChart.resize()
                            myChart.showLoading()
                        }
                    },
                    success: function (data) {
                        net = data
                        if (dataType === 'network') {
                            let option = {
                                tooltip: {},
                                series: [{
                                    type: 'graph',
                                    layout: 'force',
                                    roam: true,
                                    force: {
                                        repulsion: 150,
                                        edgeLength: 200,
                                        layoutAnimation: false
                                    },
                                    edgeSymbol: ['', 'arrow'],
                                    data: net.nodes,
                                    links: net.edges,
                                    label: {
                                        normal: {
                                            show: false,
                                            textStyle: {
                                                fontSize: 10
                                            },
                                        }
                                    },
                                    itemStyle: {
                                        color: '#FD9133'
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
                            myChart.hideLoading();
                            myChart.setOption(option);
                        } else if (dataType === 'text') {
                            network1.html(data.data)
                        }
                    },
                })

            })
        },
        // 网络算法可视化
        publicNumFn: function () {
            $("#algoT1").on('click', function (e) {
                algoT1(e.target, net)
            });
        }
    }
    var start = new apiFn();
    start.Init()

    function algoT1(element, graph) {
        var dataArray = [];
        for (var j = 0; j < graph.edges.length; j++) {
            dataArray[j] = new Array(4);
            for (var k = 0; k < 2; k++) {
                if (k === 0) {
                    dataArray[j][k] = parseInt(graph.edges[j].source)
                } else
                    dataArray[j][k] = parseInt(graph.edges[j].target)
            }
            dataArray[j][2] = dataArray[j][3] = 1;
        }
        let api = parseInt(element.id)
        $("#algoIntro").empty();
        switch (api) {
            case 2:
                $("#algoIntro").append('计算网络中节点的度中心性');
                break;
            case 3:
                $("#algoIntro").append('计算网络中节点的紧密度中心性');
                break;
            case 4:
                $("#algoIntro").append('计算网络中节点的介数中心性');
                break;
            case 5:
                $("#algoIntro").append('计算网络中边的介数中心性');
                break;
            case 6:
                $("#algoIntro").append('计算网络中的流紧密中心性');
                break;
            case 7:
                $("#algoIntro").append('计算网络中的流介数中心性');
                break;
            case 8:
                $("#algoIntro").append('计算网络中的特征向量中心性');
                break;
            case 9:
                $("#algoIntro").append('计算网络中的特征向量中心性');
                break;
            case 10:
                $("#algoIntro").append('计算网络中的加载中心性');
                break;
            case 11:
                $("#algoIntro").append('计算网络中未连边的节点之间有边的概率');
                break;
            case 12:
                $("#algoIntro").append('对网络中的节点之间有无边进行预测，即概率的计算');
                break;
            case 13:
                $("#algoIntro").append('通过 Adamic-Adar index算法进行链接预测');
                break;
            case 14:
                $("#algoIntro").append('通过偏好连接方法对节点进行评分');
                break;
            case 15:
                $("#algoIntro").append('利用异步的fluid社团检测方法对社团进行划分，该算法需要提前指定社团个数');
                break;
            case 16:
                $("#algoIntro").append('利用异步标签传播算法对网络进行社团划分');
                break;
            case 17:
                $("#algoIntro").append('标签传播算法是基于图的半监督学习方法，基本思路是从已标记的节点的标签信息来预测未标记的节点的标签信息，利用样本间的关系，建立完全图模型。');
                break;
            default:
                break;
        }
        let startTime = new Date();
        $.ajax({
            type: "POST",
            url: "/api/",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                data: dataArray,
                api: api,
                para: 2,
            }),
            dataType: "JSON",
            success: function (data, message) {
                timeCntFn(startTime, new Date());
                let net = JSON.parse(JSON.stringify(graph));
                let cnt = 20;
                let option
                $('#network2').empty();
                $("#algoRes").empty();
                var tmpelement=$("<div style='width:100%;height:100%'></div>")
                $('#network2').append(tmpelement)
                myChart1 = echarts.init(tmpelement.get(0));
                myChart1.resize();
                myChart1.showLoading();
                if (api === 5 || (api >= 11 && api <= 14)) {
                    data = data.slice(0, cnt);
                    var network2 = $('#network2');
                    Object.keys(data).forEach(function (v, k) {
                        var link = {
                            source: data[v][0],
                            target: data[v][1]
                        }
                        var wid = data[v][2] > 1 ? data[v][2] : (data[v][2] * 10 + 3);
                        link.lineStyle = {
                            width: wid,
                            color: '#00fff6'
                        }
                        net.edges.push(link);
                    });
                    option = {
                        tooltip: {},
                        series: [{
                            type: 'graph',
                            layout: 'force',
                            roam: true,
                            force: {
                                repulsion: 150,
                                edgeLength: 200,
                                layoutAnimation: false
                            },
                            edgeSymbol: ['', 'arrow'],
                            data: net.nodes,
                            links: net.edges,
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        fontSize: 10
                                    },
                                }
                            },
                            itemStyle: {
                                color: '#FD9133'
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
                    Object.keys(data).forEach(function (v, k) {
                        $("#algoRes").append('[' + data[v][0] + ',' + data[v][1] + ',' + data[v][2] + ']');
                        $("#algoRes").append("<br/>");
                    });
                } else if (api >= 15) {
                    var network2 = $('#network2');
                    cnt = 0;
                    var categories = [];
                    for (let [key, value] of Object.entries(data)) {
                        cnt++;
                        var community = Array.from(value);
                        community.forEach(function (value) {
                            net.nodes.forEach(node => {
                                if (value == node.name) {
                                    node.category = parseInt(key);
                                }
                            })
                        })
                    }
                    var legend = [];
                    for (var i = 0; i < cnt; i++) {
                        categories[i] = {
                            name: '社团' + (i + 1)
                        };
                        legend[i] = {
                            name: '社团' + (i + 1)
                        };
                    }
                    option = {
                        tooltip: {},
                        legend: {
                            data: legend,
                            textStyle: {
                                color: 'white'
                            }
                        },
                        series: [{
                            type: 'graph',
                            layout: 'force',
                            roam: true,
                            force: {
                                repulsion: 150,
                                edgeLength: 200,
                                layoutAnimation: false
                            },
                            edgeSymbol: ['', 'arrow'],
                            categories: categories,
                            data: net.nodes,
                            links: net.edges,
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
                    Object.keys(data).forEach(function (v, k) {
                        $("#algoRes").append("[");
                        for (var i = 0; i < data[v].length - 1; i++) {
                            $("#algoRes").append(data[v][i] + ',');
                        }
                        $("#algoRes").append(data[v][data[v].length - 1] + ']');
                        $("#algoRes").append("<br/>");
                    });
                }
                else {
                    net.nodes.forEach(node => {
                        if (!isNaN(data[node.name])) {
                            node.symbolSize = Math.abs(data[node.name] * 100) + 10;
                        }
                    });
                    option = {
                        tooltip: {},
                        series: [{
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 5,
                            roam: true,
                            force: {
                                repulsion: 150,
                                edgeLength: 200,
                                layoutAnimation: false
                            },
                            edgeSymbol: ['', 'arrow'],
                            data: net.nodes,
                            links: net.edges,
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        fontSize: 10
                                    },
                                }
                            },
                            itemStyle: {
                                color: '#FD9133'
                            },
                            edgeLabel: {
                                show: true,
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },

                        }]
                    };
                    Object.keys(data).forEach(function (key) {
                        $("#algoRes").append(key + ':' + data[key]);
                        $("#algoRes").append("<br/>");
                    });
                }
                myChart1.hideLoading();
                myChart1.setOption(option);
                if (message > 0) {
                    alert("请求已提交！我们会尽快与您取得联系");
                }
            },
            error: function (message) {
                $("#request-process-patent").html("提交数据失败！");
            }
        }
        );
    }

    function timeCntFn(startTime, endTime) {
        let res = Math.floor(Math.floor(endTime - startTime));
        console.log(res + 'ms');
        $("#time").empty();
        $("#time").append(res + 'ms');
    }
})

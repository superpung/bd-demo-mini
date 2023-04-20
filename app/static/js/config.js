/**
 * Created by wangyq on 2016/8/31.
 */
require.config({
    baseUrl: "../static/js/",
    paths: {
        jquery: "jquery-3.2.1.min",
        echarts: "echarts.min",
        dataTool: "dataTool.min",
        bmap: "bmap.min",
        /*echarts_wordcloud: "wordcloud"
        backbone: "backbone",
        context: "context",
        layer: "layer",
        echarts: "echarts.min",
        worldjs: "world",
		dataTool: "dataTool.min"*/
    },
    waitSeconds: 0,
    shim: {
        dataTool:["echarts"]
        /*
        bootstrap: ["jquery"],
        underscore: {
            exports: "_",
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone",
        },
        context: ["jquery"],
        layer: ["jquery"],
        dataTool:["echarts"]
        */
    },
});
/*
require(["jquery", "layer"], function ($) {
    layer.config({
        path: '/biosafety/js/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
});
*/

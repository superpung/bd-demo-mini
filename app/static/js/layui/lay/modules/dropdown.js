/**
 * layui_dropdown
 * v2.3.3
 * by Microanswer
 * http://layuidropdown.microanswer.cn/
 **/
layui.define(["jquery", "laytpl"], function (n) {
    var r = layui.jquery || layui.$, s = layui.laytpl, e = "a", d = {}, h = "1", c = "2", m = "3";

    function f(n) {
        if (!n) throw new Error("菜单条目内必须填写内容。");
        if ("hr" === n) return "hr";
        if (0 !== n.indexOf("{")) throw new Error("除了分割线hr，别的菜单条目都必须保证是合格的Javascript对象或json对象。");
        return new Function("return " + n)()
    }

    function l(n) {
        if (n && 0 < n.length) {
            for (var i = 0, t = new Array(n.length), o = 0; o < n.length; o++) for (var e = n[o], d = 0; d < e.length; d++) e[d].header && e[d].fixed && (i++, t[o] = e[d], e.splice(d, 1), d--);
            if (0 < i) return t
        }
        return null
    }

    var a = window.MICROANSWER_DROPDOWAN || "dropdown",
        p = "<div tabindex='0' class='layui-anim layui-anim-upbit layu-dropdown-root' " + a + "-id='{{d.downid}}' style='display: none;z-index: {{d.zIndex}}'>{{# if (d.arrow){ }}<div class='layu-dropdown-pointer'></div>{{# } }}<div class='layu-dropdown-content' style='margin: {{d.gap}}px {{d.gap}}px;background-color: {{d.backgroundColor}};min-width: {{d.minWidth}}px;max-width: {{d.maxWidth}}px;min-height: {{d.minHeight}}px;max-height: {{d.maxHeight}}px;white-space: {{d.nowrap?\"nowrap\":\"normal\"}}'>",
        u = "</div></div>",
        w = p + "<div class='layu-dropdown-content-table' cellpadding='0' cellspacing='0'>{{# if (d.fixHeaders && d.fixHeaders.length > 0){ }}<div class='layu-dropdown-content-thead'><div class='layu-dropdown-content-tr'>{{# layui.each(d.fixHeaders, function(i, fixHeader){ }}{{# if (fixHeader) { }}<div class='layu-dropdown-content-th'><div class='layu-dropdown-menu-fixed-head {{(d.menuSplitor && i < (d.menus.length-1))?\"layu-menu-splitor\":\"\"}}'><div class='layu-menu-fixed-head' style='text-align: {{fixHeader.align||\"center\"}}'>{{fixHeader.header}}</div></div></div>{{# } else { }}<th><div class='layu-dropdown-menu-fixed-head {{(d.menuSplitor && i < (d.menus.length-1))?\"layu-menu-splitor\":\"\"}}'><div class='layu-menu-fixed-head'>&nbsp;</div></div></th>{{# } }}{{# }); }}</div></div>{{# } }}<div class='layu-dropdown-content-tbody'><div class='layu-dropdown-content-tr'>{{# layui.each(d.menus, function(i, menu){ }}<div class='layu-dropdown-content-td' valign='top'><div class='layu-dropdown-menu-wrap {{(d.menuSplitor && i < (d.menus.length-1))?\"layu-menu-splitor\":\"\"}} layu-overflowauto' style='min-height: {{d.minHeight}}px;max-height: {{d.maxHeight - ((d.fixHeaders)?24:0)}}px;'><ul class='layu-dropdown-menu' style=''>{{# layui.each(menu, function(index, item){ }}<li class='layu-menu-item-wrap {{(d.fixHeaders && d.fixHeaders.length) > 0?\"layu-nomargin\":\"\"}}'>{{# if ('hr' === item) { }}<hr>{{# } else if (item.header) { }}{{# if (item.withLine) { }}<fieldset class=\"layui-elem-field layui-field-title layu-menu-header layu-withLine\"><legend>{{item.header}}</legend></fieldset>{{# } else { }}<div class='layu-menu-header' style='text-align: {{item.align||\"left\"}}'>{{item.header}}</div>{{# } }}{{# } else { }}<div class='layu-menu-item'><a href='javascript:;' lay-event='{{item.event}}'>{{# if (item.layIcon){ }}<i class='layui-icon {{item.layIcon}}'></i>&nbsp;{{# } }}<span class='{{item.txtClass||\"\"}}'>{{item.txt}}</span></a></div>{{# } }}</li>{{# }); }}</ul></div></div>{{#});}}</div></div></div>" + u,
        v = {
            menus: [],
            templateMenu: "",
            templateMenuStr: "",
            template: "",
            showBy: "click",
            align: "left",
            minWidth: 76,
            maxWidth: 500,
            minHeight: 10,
            maxHeight: 400,
            zIndex: 891,
            gap: 8,
            onHide: function (n, i) {
            },
            onShow: function (n, i) {
            },
            scrollBehavior: "follow",
            backgroundColor: "#FFF",
            cssLink: "https://cdn.jsdelivr.net/gh/microanswer/layui_dropdown@2.3.3/dist/dropdown.css",
            immed: !1,
            arrow: !0,
            templateMenuSptor: "[]",
            menuSplitor: !0
        };

    function y(n) {
        "string" == typeof n && (n = r(n)), this.$dom = n
    }

    function o(n, e) {
        r(n || "[lay-" + a + "]").each(function () {
            var n = r(this), i = new Function("return " + (n.attr("lay-" + a) || "{}"))();
            n.removeAttr("lay-" + a);
            var t = r.extend({}, i, e || {}), o = n.data(a) || new y(n);
            n.data(a, o), o.init(t)
        })
    }

    y.prototype.onMenuLaytplEnd = function (n) {
        var i = this;
        i.downHtml = n, i.initEvent(), i.option.immed && i.downHtml && i.show()
    }, y.prototype.init = function (n) {
        var i = this;
        if (i.fcd = !1, i.mic = !1, i.opened = !1, i.option ? i.option = r.extend(i.option, n || {}) : i.option = r.extend({
            downid: String(Math.random()).split(".")[1],
            filter: i.$dom.attr("lay-filter")
        }, v, n), 20 < i.option.gap && (i.option.gap = 20), i.$down && (i.$down.remove(), i.$down = void 0), i.option.menus && 0 < i.option.menus.length) {
            var t = i.option.menus[0];
            Array.isArray(t) || (i.option.menus = [i.option.menus]), i.option.fixHeaders = l(i.option.menus), i.option.nowrap = !0, s(w).render(i.option, function (n) {
                i.onMenuLaytplEnd(n)
            })
        } else if (i.option.templateMenu || i.option.templateMenuStr) {
            var o, e;
            if (i.option.templateMenu) e = -1 === i.option.templateMenu.indexOf("#") ? "#" + i.option.templateMenu : i.option.templateMenu, o = r(e).text(); else i.option.templateMenuStr && (o = i.option.templateMenuStr);
            var d = r.extend(r.extend({}, i.option), i.option.data || {});
            s(o).render(d, function (n) {
                i.option.menus = function (n, i) {
                    if (!n) return "";
                    if (!i) throw new Error("请指定菜单模板限定符。");
                    for (var t, o, e = i.charAt(0), d = i.charAt(1), a = n.length, r = 0, s = h, l = !1, p = []; r < a;) {
                        var u = n.charAt(r);
                        s !== h || l ? s !== c || l ? s === m && (l ? (o.srcStr += u, l = !1) : "\\" === u ? l = !0 : u === d ? (o = f(o.srcStr), t.push(o), s = c) : o.srcStr += u) : e === u ? (o = {srcStr: ""}, s = m) : d === u && (s = h) : e === u && (t = [], p.push(t), s = c), r += 1
                    }
                    return p
                }(n, i.option.templateMenuSptor), i.option.fixHeaders = l(i.option.menus), i.option.nowrap = !0, s(w).render(i.option, function (n) {
                    i.onMenuLaytplEnd(n)
                })
            })
        } else if (i.option.template) {
            var a;
            a = -1 === i.option.template.indexOf("#") ? "#" + i.option.template : i.option.template, (d = r.extend(r.extend({}, i.option), i.option.data || {})).nowrap = !1, s(p + r(a).html() + u).render(d, function (n) {
                i.onMenuLaytplEnd(n)
            })
        } else layui.hint().error("下拉框目前即没配置菜单项，也没配置下拉模板。[#" + (i.$dom.attr("id") || "") + ",filter=" + i.option.filter + "]")
    }, y.prototype.initSize = function () {
        if (this.$down && (this.$down.find(".layu-dropdown-pointer").css({
            width: 2 * this.option.gap,
            height: 2 * this.option.gap
        }), !this._sized)) {
            var n = 0;
            this.$down.find(".dropdown-menu-wrap").each(function () {
                n = Math.max(n, r(this).height())
            }), this.$down.find(".dropdown-menu-wrap").css({height: n}), this._sized = !0
        }
    }, y.prototype.initPosition = function () {
        if (this.$down) {
            var n, i, t, o, e = this.$dom.offset(), d = this.$dom.outerHeight(), a = this.$dom.outerWidth(), r = e.left,
                s = e.top - window.pageYOffset, l = this.$down.outerHeight(), p = this.$down.outerWidth();
            i = d + s, (n = "right" === this.option.align ? r + a - p + this.option.gap : "center" === this.option.align ? r + (a - p) / 2 : r - this.option.gap) + p >= window.innerWidth && (n = window.innerWidth - p - 2 * this.option.gap), t = n < r ? a < p ? r - n + a / 2 : p / 2 : a < p ? n + (r + a - n) / 2 : p / 2, t -= this.option.gap;
            var u = this.$arrowDom;
            o = -this.option.gap, u.css("left", t), u.css("right", "unset"), i + l >= window.innerHeight ? (i = s - l, o = l - this.option.gap, u.css("top", o).addClass("bottom")) : u.css("top", o).removeClass("bottom"), this.$down.css("left", n), this.$down.css("top", i)
        }
    }, y.prototype.show = function () {
        var t, n, i = this, o = !1;
        i.$down || (i.$down = r(i.downHtml), i.$dom.after(i.$down), i.$arrowDom = i.$down.find(".layu-dropdown-pointer"), o = !0), i.initPosition(), i.opening = !0, setTimeout(function () {
            i.$down.focus()
        }, 100), i.$down.addClass("layui-show"), i.initSize(), i.opened = !0, o && i.initDropdownEvent(), t = i, n = d[e] || [], r.each(n, function (n, i) {
            i(t)
        }), o && i.onSuccess(), i.option.onShow && i.option.onShow(i.$dom, i.$down)
    }, y.prototype.hide = function () {
        this.opened && (this.fcd = !1, this.$down.removeClass("layui-show"), this.opened = !1, this.option.onHide && this.option.onHide(this.$dom, this.$down))
    }, y.prototype.hideWhenCan = function () {
        this.mic || this.opening || this.fcd || this.hide()
    }, y.prototype.toggle = function () {
        this.opened ? this.hide() : this.show()
    }, y.prototype.onSuccess = function () {
        this.option.success && this.option.success(this.$down)
    }, y.prototype._onScroll = function () {
        var n = this;
        n.opened && ("follow" === this.option.scrollBehavior ? setTimeout(function () {
            n.initPosition()
        }, 10) : this.hide())
    }, y.prototype.initEvent = function () {
        var n, i, t, o = this;
        o.initEvented || (o.initEvented = !0, i = function (n) {
            n !== o && o.hide()
        }, (t = d[n = e] || []).push(i), d[n] = t, r(window).on("scroll", function () {
            o._onScroll()
        }), o.$dom.parents().on("scroll", function () {
            o._onScroll()
        }), r(window).on("resize", function () {
            o.opened && o.initPosition()
        }), o.initDomEvent())
    }, y.prototype.initDomEvent = function () {
        var n = this;
        n.$dom.mouseenter(function () {
            n.mic = !0, "hover" === n.option.showBy && (n.fcd = !0, n.show())
        }), n.$dom.mouseleave(function () {
            n.mic = !1
        }), "click" === n.option.showBy && n.$dom.on("click", function () {
            n.fcd = !0, n.toggle()
        }), n.$dom.on("blur", function () {
            n.fcd = !1, n.hideWhenCan()
        })
    }, y.prototype.initDropdownEvent = function () {
        var o = this;
        o.$down.find(".layu-dropdown-menu-wrap").on("mousewheel", function (n) {
            var i = r(this);
            (n = n || window.event).cancelable = !0, n.cancelBubble = !0, n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), n.returnValue = !1, o.scrolling && i.finish();
            var t = -n.originalEvent.wheelDelta || n.originalEvent.detail;
            0 < t ? (50 < t && (t = 50), o.scrolling = !0, i.animate({scrollTop: i.scrollTop() + t}, {
                duration: 170,
                complete: function () {
                    o.scrolling = !1
                }
            })) : t < 0 ? (t < -50 && (t = -50), o.scrolling = !0, i.animate({scrollTop: i.scrollTop() + t}, {
                duration: 170,
                complete: function () {
                    o.scrolling = !1
                }
            })) : o.scrolling = !1
        }), o.$down.mouseenter(function () {
            o.mic = !0, o.$down.focus()
        }), o.$down.mouseleave(function () {
            o.mic = !1
        }), o.$down.on("blur", function () {
            o.fcd = !1, o.hideWhenCan()
        }), o.$down.on("focus", function () {
            o.opening = !1
        }), o.option.menus && r("[" + a + "-id='" + o.option.downid + "']").on("click", "a", function () {
            var n = (r(this).attr("lay-event") || "").trim();
            n ? (layui.event.call(this, a, a + "(" + o.option.filter + ")", n), o.hide()) : layui.hint().error("菜单条目[" + this.outerHTML + "]未设置event。")
        })
    }, o(), window[a + "_useOwnCss"] || layui.link(window[a + "_cssLink"] || v.cssLink, function () {
    }, a + "_css"), n(a, {
        suite: o, onFilter: function (n, i) {
            layui.onevent(a, a + "(" + n + ")", function (n) {
                i && i(n)
            })
        }, hide: function (n) {
            r(n).each(function () {
                var n = r(this).data(a);
                n && n.hide()
            })
        }, show: function (i, t) {
            r(i).each(function () {
                var n = r(this).data(a);
                n ? n.show() : (layui.hint().error("警告：尝试在选择器【" + i + "】上进行下拉框show操作，但此选择器对应的dom并没有初始化下拉框。"), (t = t || {}).immed = !0, o(i, t))
            })
        }, version: "2.3.3"
    })
});
/************************************************
 * REVOLUTION 5.4.5 EDIT LAYER TIMELINE JS
 * @version: 2.0 (17.05.2017)
 * @author ThemePunch
 ************************************************/

if (function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)return i(g, !0);
                    if (f)return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {exports: {}};
                b[g][0].call(k.exports, function (a) {
                    var c = b[g][1][a];
                    return e(c || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }

        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)e(d[g]);
        return e
    }({
        1: [function (a, b, c) {
            "use strict";
            function d(a) {
                a.fn.perfectScrollbar = function (a) {
                    return this.each(function () {
                        if ("object" == typeof a || void 0 === a) {
                            var b = a;
                            f.get(this) || e.initialize(this, b)
                        } else {
                            var c = a;
                            "update" === c ? e.update(this) : "destroy" === c && e.destroy(this)
                        }
                    })
                }
            }

            var e = a("../main"), f = a("../plugin/instances");
            if ("function" == typeof define && define.amd) define(["jquery"], d); else {
                var g = window.jQuery ? window.jQuery : window.$;
                void 0 !== g && d(g)
            }
            b.exports = d
        }, {"../main": 7, "../plugin/instances": 18}],
        2: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                var c = a.className.split(" ");
                c.indexOf(b) < 0 && c.push(b), a.className = c.join(" ")
            }

            function e(a, b) {
                var c = a.className.split(" "), d = c.indexOf(b);
                d >= 0 && c.splice(d, 1), a.className = c.join(" ")
            }

            c.add = function (a, b) {
                a.classList ? a.classList.add(b) : d(a, b)
            }, c.remove = function (a, b) {
                a.classList ? a.classList.remove(b) : e(a, b)
            }, c.list = function (a) {
                return a.classList ? Array.prototype.slice.apply(a.classList) : a.className.split(" ")
            }
        }, {}],
        3: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                return window.getComputedStyle(a)[b]
            }

            function e(a, b, c) {
                return "number" == typeof c && (c = c.toString() + "px"), a.style[b] = c, a
            }

            function f(a, b) {
                for (var c in b) {
                    var d = b[c];
                    "number" == typeof d && (d = d.toString() + "px"), a.style[c] = d
                }
                return a
            }

            var g = {};
            g.e = function (a, b) {
                var c = document.createElement(a);
                return c.className = b, c
            }, g.appendTo = function (a, b) {
                return b.appendChild(a), a
            }, g.css = function (a, b, c) {
                return "object" == typeof b ? f(a, b) : void 0 === c ? d(a, b) : e(a, b, c)
            }, g.matches = function (a, b) {
                return void 0 !== a.matches ? a.matches(b) : void 0 !== a.matchesSelector ? a.matchesSelector(b) : void 0 !== a.webkitMatchesSelector ? a.webkitMatchesSelector(b) : void 0 !== a.mozMatchesSelector ? a.mozMatchesSelector(b) : void 0 !== a.msMatchesSelector ? a.msMatchesSelector(b) : void 0
            }, g.remove = function (a) {
                void 0 !== a.remove ? a.remove() : a.parentNode && a.parentNode.removeChild(a)
            }, g.queryChildren = function (a, b) {
                return Array.prototype.filter.call(a.childNodes, function (a) {
                    return g.matches(a, b)
                })
            }, b.exports = g
        }, {}],
        4: [function (a, b, c) {
            "use strict";
            var d = function (a) {
                this.element = a, this.events = {}
            };
            d.prototype.bind = function (a, b) {
                void 0 === this.events[a] && (this.events[a] = []), this.events[a].push(b), this.element.addEventListener(a, b, !1)
            }, d.prototype.unbind = function (a, b) {
                var c = void 0 !== b;
                this.events[a] = this.events[a].filter(function (d) {
                    return !(!c || d === b) || (this.element.removeEventListener(a, d, !1), !1)
                }, this)
            }, d.prototype.unbindAll = function () {
                for (var a in this.events)this.unbind(a)
            };
            var e = function () {
                this.eventElements = []
            };
            e.prototype.eventElement = function (a) {
                var b = this.eventElements.filter(function (b) {
                    return b.element === a
                })[0];
                return void 0 === b && (b = new d(a), this.eventElements.push(b)), b
            }, e.prototype.bind = function (a, b, c) {
                this.eventElement(a).bind(b, c)
            }, e.prototype.unbind = function (a, b, c) {
                this.eventElement(a).unbind(b, c)
            }, e.prototype.unbindAll = function () {
                for (var a = 0; a < this.eventElements.length; a++)this.eventElements[a].unbindAll()
            }, e.prototype.once = function (a, b, c) {
                var d = this.eventElement(a), e = function (a) {
                    d.unbind(b, e), c(a)
                };
                d.bind(b, e)
            }, b.exports = e
        }, {}],
        5: [function (a, b, c) {
            "use strict";
            b.exports = function () {
                function a() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }

                return function () {
                    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
                }
            }()
        }, {}],
        6: [function (a, b, c) {
            "use strict";
            var d = a("./class"), e = a("./dom"), f = c.toInt = function (a) {
                return parseInt(a, 10) || 0
            }, g = c.clone = function (a) {
                if (null === a)return null;
                if (a.constructor === Array)return a.map(g);
                if ("object" == typeof a) {
                    var b = {};
                    for (var c in a)b[c] = g(a[c]);
                    return b
                }
                return a
            };
            c.extend = function (a, b) {
                var c = g(a);
                for (var d in b)c[d] = g(b[d]);
                return c
            }, c.isEditable = function (a) {
                return e.matches(a, "input,[contenteditable]") || e.matches(a, "select,[contenteditable]") || e.matches(a, "textarea,[contenteditable]") || e.matches(a, "button,[contenteditable]")
            }, c.removePsClasses = function (a) {
                for (var b = d.list(a), c = 0; c < b.length; c++) {
                    var e = b[c];
                    0 === e.indexOf("ps-") && d.remove(a, e)
                }
            }, c.outerWidth = function (a) {
                return f(e.css(a, "width")) + f(e.css(a, "paddingLeft")) + f(e.css(a, "paddingRight")) + f(e.css(a, "borderLeftWidth")) + f(e.css(a, "borderRightWidth"))
            }, c.startScrolling = function (a, b) {
                d.add(a, "ps-in-scrolling"), void 0 !== b ? d.add(a, "ps-" + b) : (d.add(a, "ps-x"), d.add(a, "ps-y"))
            }, c.stopScrolling = function (a, b) {
                d.remove(a, "ps-in-scrolling"), void 0 !== b ? d.remove(a, "ps-" + b) : (d.remove(a, "ps-x"), d.remove(a, "ps-y"))
            }, c.env = {
                isWebKit: "WebkitAppearance" in document.documentElement.style,
                supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
                supportsIePointer: null !== window.navigator.msMaxTouchPoints
            }
        }, {"./class": 2, "./dom": 3}],
        7: [function (a, b, c) {
            "use strict";
            var d = a("./plugin/destroy"), e = a("./plugin/initialize"), f = a("./plugin/update");
            b.exports = {initialize: e, update: f, destroy: d}
        }, {"./plugin/destroy": 9, "./plugin/initialize": 17, "./plugin/update": 21}],
        8: [function (a, b, c) {
            "use strict";
            b.exports = {
                handlers: ["click-rail", "drag-scrollbar", "keyboard", "wheel", "touch"],
                maxScrollbarLength: null,
                minScrollbarLength: null,
                scrollXMarginOffset: 0,
                scrollYMarginOffset: 0,
                stopPropagationOnClick: !0,
                suppressScrollX: !1,
                suppressScrollY: !1,
                swipePropagation: !0,
                useBothWheelAxes: !1,
                wheelPropagation: !1,
                wheelSpeed: 1,
                theme: "default"
            }
        }, {}],
        9: [function (a, b, c) {
            "use strict";
            var d = a("../lib/helper"), e = a("../lib/dom"), f = a("./instances");
            b.exports = function (a) {
                var b = f.get(a);
                b && (b.event.unbindAll(), e.remove(b.scrollbarX), e.remove(b.scrollbarY), e.remove(b.scrollbarXRail), e.remove(b.scrollbarYRail), d.removePsClasses(a), f.remove(a))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18}],
        10: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                function c(a) {
                    return a.getBoundingClientRect()
                }

                var d = function (a) {
                    a.stopPropagation()
                };
                b.settings.stopPropagationOnClick && b.event.bind(b.scrollbarY, "click", d), b.event.bind(b.scrollbarYRail, "click", function (d) {
                    var f = e.toInt(b.scrollbarYHeight / 2), i = b.railYRatio * (d.pageY - window.pageYOffset - c(b.scrollbarYRail).top - f), j = b.railYRatio * (b.railYHeight - b.scrollbarYHeight), k = i / j;
                    0 > k ? k = 0 : k > 1 && (k = 1), h(a, "top", (b.contentHeight - b.containerHeight) * k), g(a), d.stopPropagation()
                }), b.settings.stopPropagationOnClick && b.event.bind(b.scrollbarX, "click", d), b.event.bind(b.scrollbarXRail, "click", function (d) {
                    var f = e.toInt(b.scrollbarXWidth / 2), i = b.railXRatio * (d.pageX - window.pageXOffset - c(b.scrollbarXRail).left - f), j = b.railXRatio * (b.railXWidth - b.scrollbarXWidth), k = i / j;
                    0 > k ? k = 0 : k > 1 && (k = 1), h(a, "left", (b.contentWidth - b.containerWidth) * k - b.negativeScrollAdjustment), g(a), d.stopPropagation()
                })
            }

            var e = a("../../lib/helper"), f = a("../instances"), g = a("../update-geometry"), h = a("../update-scroll");
            b.exports = function (a) {
                d(a, f.get(a))
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        11: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                function c(c) {
                    var e = d + c * b.railXRatio, g = Math.max(0, b.scrollbarXRail.getBoundingClientRect().left) + b.railXRatio * (b.railXWidth - b.scrollbarXWidth);
                    b.scrollbarXLeft = 0 > e ? 0 : e > g ? g : e;
                    var h = f.toInt(b.scrollbarXLeft * (b.contentWidth - b.containerWidth) / (b.containerWidth - b.railXRatio * b.scrollbarXWidth)) - b.negativeScrollAdjustment;
                    j(a, "left", h)
                }

                var d = null, e = null, h = function (b) {
                    c(b.pageX - e), i(a), b.stopPropagation(), b.preventDefault()
                }, k = function () {
                    f.stopScrolling(a, "x"), b.event.unbind(b.ownerDocument, "mousemove", h)
                };
                b.event.bind(b.scrollbarX, "mousedown", function (c) {
                    e = c.pageX, d = f.toInt(g.css(b.scrollbarX, "left")) * b.railXRatio, f.startScrolling(a, "x"), b.event.bind(b.ownerDocument, "mousemove", h), b.event.once(b.ownerDocument, "mouseup", k), c.stopPropagation(), c.preventDefault()
                })
            }

            function e(a, b) {
                function c(c) {
                    var e = d + c * b.railYRatio, g = Math.max(0, b.scrollbarYRail.getBoundingClientRect().top) + b.railYRatio * (b.railYHeight - b.scrollbarYHeight);
                    b.scrollbarYTop = 0 > e ? 0 : e > g ? g : e;
                    var h = f.toInt(b.scrollbarYTop * (b.contentHeight - b.containerHeight) / (b.containerHeight - b.railYRatio * b.scrollbarYHeight));
                    j(a, "top", h)
                }

                var d = null, e = null, h = function (b) {
                    c(b.pageY - e), i(a), b.stopPropagation(), b.preventDefault()
                }, k = function () {
                    f.stopScrolling(a, "y"), b.event.unbind(b.ownerDocument, "mousemove", h)
                };
                b.event.bind(b.scrollbarY, "mousedown", function (c) {
                    e = c.pageY, d = f.toInt(g.css(b.scrollbarY, "top")) * b.railYRatio, f.startScrolling(a, "y"), b.event.bind(b.ownerDocument, "mousemove", h), b.event.once(b.ownerDocument, "mouseup", k), c.stopPropagation(), c.preventDefault()
                })
            }

            var f = a("../../lib/helper"), g = a("../../lib/dom"), h = a("../instances"), i = a("../update-geometry"), j = a("../update-scroll");
            b.exports = function (a) {
                var b = h.get(a);
                d(a, b), e(a, b)
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        12: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                function c(c, d) {
                    var e = a.scrollTop;
                    if (0 === c) {
                        if (!b.scrollbarYActive)return !1;
                        if (0 === e && d > 0 || e >= b.contentHeight - b.containerHeight && 0 > d)return !b.settings.wheelPropagation
                    }
                    var f = a.scrollLeft;
                    if (0 === d) {
                        if (!b.scrollbarXActive)return !1;
                        if (0 === f && 0 > c || f >= b.contentWidth - b.containerWidth && c > 0)return !b.settings.wheelPropagation
                    }
                    return !0
                }

                var d = !1;
                b.event.bind(a, "mouseenter", function () {
                    d = !0
                }), b.event.bind(a, "mouseleave", function () {
                    d = !1
                });
                var g = !1;
                b.event.bind(b.ownerDocument, "keydown", function (j) {
                    if (!j.isDefaultPrevented || !j.isDefaultPrevented()) {
                        var k = f.matches(b.scrollbarX, ":focus") || f.matches(b.scrollbarY, ":focus");
                        if (d || k) {
                            var l = document.activeElement ? document.activeElement : b.ownerDocument.activeElement;
                            if (l) {
                                if ("IFRAME" === l.tagName) l = l.contentDocument.activeElement; else for (; l.shadowRoot;)l = l.shadowRoot.activeElement;
                                if (e.isEditable(l))return
                            }
                            var m = 0, n = 0;
                            switch (j.which) {
                                case 37:
                                    m = -30;
                                    break;
                                case 38:
                                    n = 30;
                                    break;
                                case 39:
                                    m = 30;
                                    break;
                                case 40:
                                    n = -30;
                                    break;
                                case 33:
                                    n = 90;
                                    break;
                                case 32:
                                    n = j.shiftKey ? 90 : -90;
                                    break;
                                case 34:
                                    n = -90;
                                    break;
                                case 35:
                                    n = j.ctrlKey ? -b.contentHeight : -b.containerHeight;
                                    break;
                                case 36:
                                    n = j.ctrlKey ? a.scrollTop : b.containerHeight;
                                    break;
                                default:
                                    return
                            }
                            i(a, "top", a.scrollTop - n), i(a, "left", a.scrollLeft + m), h(a), (g = c(m, n)) && j.preventDefault()
                        }
                    }
                })
            }

            var e = a("../../lib/helper"), f = a("../../lib/dom"), g = a("../instances"), h = a("../update-geometry"), i = a("../update-scroll");
            b.exports = function (a) {
                d(a, g.get(a))
            }
        }, {
            "../../lib/dom": 3,
            "../../lib/helper": 6,
            "../instances": 18,
            "../update-geometry": 19,
            "../update-scroll": 20
        }],
        13: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                function c(c, d) {
                    var e = a.scrollTop;
                    if (0 === c) {
                        if (!b.scrollbarYActive)return !1;
                        if (0 === e && d > 0 || e >= b.contentHeight - b.containerHeight && 0 > d)return !b.settings.wheelPropagation
                    }
                    var f = a.scrollLeft;
                    if (0 === d) {
                        if (!b.scrollbarXActive)return !1;
                        if (0 === f && 0 > c || f >= b.contentWidth - b.containerWidth && c > 0)return !b.settings.wheelPropagation
                    }
                    return !0
                }

                function d(a) {
                    var b = a.deltaX, c = -1 * a.deltaY;
                    return void 0 !== b && void 0 !== c || (b = -1 * a.wheelDeltaX / 6, c = a.wheelDeltaY / 6), a.deltaMode && 1 === a.deltaMode && (b *= 10, c *= 10), b !== b && c !== c && (b = 0, c = a.wheelDelta), [b, c]
                }

                function e(b, c) {
                    var d = a.querySelector("textarea:hover, .ps-child:hover");
                    if (d) {
                        if ("TEXTAREA" !== d.tagName && !window.getComputedStyle(d).overflow.match(/(scroll|auto)/))return !1;
                        var e = d.scrollHeight - d.clientHeight;
                        if (e > 0 && !(0 === d.scrollTop && c > 0 || d.scrollTop === e && 0 > c))return !0;
                        var f = d.scrollLeft - d.clientWidth;
                        if (f > 0 && !(0 === d.scrollLeft && 0 > b || d.scrollLeft === f && b > 0))return !0
                    }
                    return !1
                }

                function h(h) {
                    var j = d(h), k = j[0], l = j[1];
                    e(k, l) || (i = !1, b.settings.useBothWheelAxes ? b.scrollbarYActive && !b.scrollbarXActive ? (l ? g(a, "top", a.scrollTop - l * b.settings.wheelSpeed) : g(a, "top", a.scrollTop + k * b.settings.wheelSpeed), i = !0) : b.scrollbarXActive && !b.scrollbarYActive && (k ? g(a, "left", a.scrollLeft + k * b.settings.wheelSpeed) : g(a, "left", a.scrollLeft - l * b.settings.wheelSpeed), i = !0) : (g(a, "top", a.scrollTop - l * b.settings.wheelSpeed), g(a, "left", a.scrollLeft + k * b.settings.wheelSpeed)), f(a), (i = i || c(k, l)) && (h.stopPropagation(), h.preventDefault()))
                }

                var i = !1;
                void 0 !== window.onwheel ? b.event.bind(a, "wheel", h) : void 0 !== window.onmousewheel && b.event.bind(a, "mousewheel", h)
            }

            var e = a("../instances"), f = a("../update-geometry"), g = a("../update-scroll");
            b.exports = function (a) {
                d(a, e.get(a))
            }
        }, {"../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        14: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                b.event.bind(a, "scroll", function () {
                    f(a)
                })
            }

            var e = a("../instances"), f = a("../update-geometry");
            b.exports = function (a) {
                d(a, e.get(a))
            }
        }, {"../instances": 18, "../update-geometry": 19}],
        15: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                function c() {
                    var a = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                    return 0 === a.toString().length ? null : a.getRangeAt(0).commonAncestorContainer
                }

                function d() {
                    j || (j = setInterval(function () {
                        return f.get(a) ? (h(a, "top", a.scrollTop + k.top), h(a, "left", a.scrollLeft + k.left), void g(a)) : void clearInterval(j)
                    }, 50))
                }

                function i() {
                    j && (clearInterval(j), j = null), e.stopScrolling(a)
                }

                var j = null, k = {top: 0, left: 0}, l = !1;
                b.event.bind(b.ownerDocument, "selectionchange", function () {
                    a.contains(c()) ? l = !0 : (l = !1, i())
                }), b.event.bind(window, "mouseup", function () {
                    l && (l = !1, i())
                }), b.event.bind(window, "mousemove", function (b) {
                    if (l) {
                        var c = {x: b.pageX, y: b.pageY}, f = {
                            left: a.offsetLeft,
                            right: a.offsetLeft + a.offsetWidth,
                            top: a.offsetTop,
                            bottom: a.offsetTop + a.offsetHeight
                        };
                        c.x < f.left + 3 ? (k.left = -5, e.startScrolling(a, "x")) : c.x > f.right - 3 ? (k.left = 5, e.startScrolling(a, "x")) : k.left = 0, c.y < f.top + 3 ? (f.top + 3 - c.y < 5 ? k.top = -5 : k.top = -20, e.startScrolling(a, "y")) : c.y > f.bottom - 3 ? (c.y - f.bottom + 3 < 5 ? k.top = 5 : k.top = 20, e.startScrolling(a, "y")) : k.top = 0, 0 === k.top && 0 === k.left ? i() : d()
                    }
                })
            }

            var e = a("../../lib/helper"), f = a("../instances"), g = a("../update-geometry"), h = a("../update-scroll");
            b.exports = function (a) {
                d(a, f.get(a))
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        16: [function (a, b, c) {
            "use strict";
            function d(a, b, c, d) {
                function e(c, d) {
                    var e = a.scrollTop, f = a.scrollLeft, g = Math.abs(c), h = Math.abs(d);
                    if (h > g) {
                        if (0 > d && e === b.contentHeight - b.containerHeight || d > 0 && 0 === e)return !b.settings.swipePropagation
                    } else if (g > h && (0 > c && f === b.contentWidth - b.containerWidth || c > 0 && 0 === f))return !b.settings.swipePropagation;
                    return !0
                }

                function i(b, c) {
                    h(a, "top", a.scrollTop - c), h(a, "left", a.scrollLeft - b), g(a)
                }

                function j() {
                    u = !0
                }

                function k() {
                    u = !1
                }

                function l(a) {
                    return a.targetTouches ? a.targetTouches[0] : a
                }

                function m(a) {
                    return !(!a.targetTouches || 1 !== a.targetTouches.length) || !(!a.pointerType || "mouse" === a.pointerType || a.pointerType === a.MSPOINTER_TYPE_MOUSE)
                }

                function n(a) {
                    if (m(a)) {
                        v = !0;
                        var b = l(a);
                        q.pageX = b.pageX, q.pageY = b.pageY, r = (new Date).getTime(), null !== t && clearInterval(t), a.stopPropagation()
                    }
                }

                function o(a) {
                    if (!v && b.settings.swipePropagation && n(a), !u && v && m(a)) {
                        var c = l(a), d = {
                            pageX: c.pageX,
                            pageY: c.pageY
                        }, f = d.pageX - q.pageX, g = d.pageY - q.pageY;
                        i(f, g), q = d;
                        var h = (new Date).getTime(), j = h - r;
                        j > 0 && (s.x = f / j, s.y = g / j, r = h), e(f, g) && (a.stopPropagation(), a.preventDefault())
                    }
                }

                function p() {
                    !u && v && (v = !1, clearInterval(t), t = setInterval(function () {
                        return f.get(a) ? Math.abs(s.x) < .01 && Math.abs(s.y) < .01 ? void clearInterval(t) : (i(30 * s.x, 30 * s.y), s.x *= .8, void(s.y *= .8)) : void clearInterval(t)
                    }, 10))
                }

                var q = {}, r = 0, s = {}, t = null, u = !1, v = !1;
                c && (b.event.bind(window, "touchstart", j), b.event.bind(window, "touchend", k), b.event.bind(a, "touchstart", n), b.event.bind(a, "touchmove", o), b.event.bind(a, "touchend", p)), d && (window.PointerEvent ? (b.event.bind(window, "pointerdown", j), b.event.bind(window, "pointerup", k), b.event.bind(a, "pointerdown", n), b.event.bind(a, "pointermove", o), b.event.bind(a, "pointerup", p)) : window.MSPointerEvent && (b.event.bind(window, "MSPointerDown", j), b.event.bind(window, "MSPointerUp", k), b.event.bind(a, "MSPointerDown", n), b.event.bind(a, "MSPointerMove", o), b.event.bind(a, "MSPointerUp", p)))
            }

            var e = a("../../lib/helper"), f = a("../instances"), g = a("../update-geometry"), h = a("../update-scroll");
            b.exports = function (a) {
                if (e.env.supportsTouch || e.env.supportsIePointer) {
                    d(a, f.get(a), e.env.supportsTouch, e.env.supportsIePointer)
                }
            }
        }, {"../../lib/helper": 6, "../instances": 18, "../update-geometry": 19, "../update-scroll": 20}],
        17: [function (a, b, c) {
            "use strict";
            var d = a("../lib/helper"), e = a("../lib/class"), f = a("./instances"), g = a("./update-geometry"), h = {
                "click-rail": a("./handler/click-rail"),
                "drag-scrollbar": a("./handler/drag-scrollbar"),
                keyboard: a("./handler/keyboard"),
                wheel: a("./handler/mouse-wheel"),
                touch: a("./handler/touch"),
                selection: a("./handler/selection")
            }, i = a("./handler/native-scroll");
            b.exports = function (a, b) {
                b = "object" == typeof b ? b : {}, e.add(a, "ps-container");
                var c = f.add(a);
                c.settings = d.extend(c.settings, b), e.add(a, "ps-theme-" + c.settings.theme), c.settings.handlers.forEach(function (b) {
                    h[b](a)
                }), i(a), g(a)
            }
        }, {
            "../lib/class": 2,
            "../lib/helper": 6,
            "./handler/click-rail": 10,
            "./handler/drag-scrollbar": 11,
            "./handler/keyboard": 12,
            "./handler/mouse-wheel": 13,
            "./handler/native-scroll": 14,
            "./handler/selection": 15,
            "./handler/touch": 16,
            "./instances": 18,
            "./update-geometry": 19
        }],
        18: [function (a, b, c) {
            "use strict";
            function d(a) {
                function b() {
                    i.add(a, "ps-focus")
                }

                function c() {
                    i.remove(a, "ps-focus")
                }

                var d = this;
                d.settings = h.clone(j), d.containerWidth = null, d.containerHeight = null, d.contentWidth = null, d.contentHeight = null, d.isRtl = "rtl" === k.css(a, "direction"), d.isNegativeScroll = function () {
                    var b = a.scrollLeft, c = null;
                    return a.scrollLeft = -1, c = a.scrollLeft < 0, a.scrollLeft = b, c
                }(), d.negativeScrollAdjustment = d.isNegativeScroll ? a.scrollWidth - a.clientWidth : 0, d.event = new l, d.ownerDocument = a.ownerDocument || document, d.scrollbarXRail = k.appendTo(k.e("div", "ps-scrollbar-x-rail"), a), d.scrollbarX = k.appendTo(k.e("div", "ps-scrollbar-x"), d.scrollbarXRail), d.scrollbarX.setAttribute("tabindex", 0), d.event.bind(d.scrollbarX, "focus", b), d.event.bind(d.scrollbarX, "blur", c), d.scrollbarXActive = null, d.scrollbarXWidth = null, d.scrollbarXLeft = null, d.scrollbarXBottom = h.toInt(k.css(d.scrollbarXRail, "bottom")), d.isScrollbarXUsingBottom = d.scrollbarXBottom === d.scrollbarXBottom, d.scrollbarXTop = d.isScrollbarXUsingBottom ? null : h.toInt(k.css(d.scrollbarXRail, "top")), d.railBorderXWidth = h.toInt(k.css(d.scrollbarXRail, "borderLeftWidth")) + h.toInt(k.css(d.scrollbarXRail, "borderRightWidth")), k.css(d.scrollbarXRail, "display", "block"), d.railXMarginWidth = h.toInt(k.css(d.scrollbarXRail, "marginLeft")) + h.toInt(k.css(d.scrollbarXRail, "marginRight")), k.css(d.scrollbarXRail, "display", ""), d.railXWidth = null, d.railXRatio = null, d.scrollbarYRail = k.appendTo(k.e("div", "ps-scrollbar-y-rail"), a), d.scrollbarY = k.appendTo(k.e("div", "ps-scrollbar-y"), d.scrollbarYRail), d.scrollbarY.setAttribute("tabindex", 0), d.event.bind(d.scrollbarY, "focus", b), d.event.bind(d.scrollbarY, "blur", c), d.scrollbarYActive = null, d.scrollbarYHeight = null, d.scrollbarYTop = null, d.scrollbarYRight = h.toInt(k.css(d.scrollbarYRail, "right")), d.isScrollbarYUsingRight = d.scrollbarYRight === d.scrollbarYRight, d.scrollbarYLeft = d.isScrollbarYUsingRight ? null : h.toInt(k.css(d.scrollbarYRail, "left")), d.scrollbarYOuterWidth = d.isRtl ? h.outerWidth(d.scrollbarY) : null, d.railBorderYWidth = h.toInt(k.css(d.scrollbarYRail, "borderTopWidth")) + h.toInt(k.css(d.scrollbarYRail, "borderBottomWidth")), k.css(d.scrollbarYRail, "display", "block"), d.railYMarginHeight = h.toInt(k.css(d.scrollbarYRail, "marginTop")) + h.toInt(k.css(d.scrollbarYRail, "marginBottom")), k.css(d.scrollbarYRail, "display", ""), d.railYHeight = null, d.railYRatio = null
            }

            function e(a) {
                return a.getAttribute("data-ps-id")
            }

            function f(a, b) {
                a.setAttribute("data-ps-id", b)
            }

            function g(a) {
                a.removeAttribute("data-ps-id")
            }

            var h = a("../lib/helper"), i = a("../lib/class"), j = a("./default-setting"), k = a("../lib/dom"), l = a("../lib/event-manager"), m = a("../lib/guid"), n = {};
            c.add = function (a) {
                var b = m();
                return f(a, b), n[b] = new d(a), n[b]
            }, c.remove = function (a) {
                delete n[e(a)], g(a)
            }, c.get = function (a) {
                return n[e(a)]
            }
        }, {
            "../lib/class": 2,
            "../lib/dom": 3,
            "../lib/event-manager": 4,
            "../lib/guid": 5,
            "../lib/helper": 6,
            "./default-setting": 8
        }],
        19: [function (a, b, c) {
            "use strict";
            function d(a, b) {
                return a.settings.minScrollbarLength && (b = Math.max(b, a.settings.minScrollbarLength)), a.settings.maxScrollbarLength && (b = Math.min(b, a.settings.maxScrollbarLength)), b
            }

            function e(a, b) {
                var c = {width: b.railXWidth};
                b.isRtl ? c.left = b.negativeScrollAdjustment + a.scrollLeft + b.containerWidth - b.contentWidth : c.left = a.scrollLeft, b.isScrollbarXUsingBottom ? c.bottom = b.scrollbarXBottom - a.scrollTop : c.top = b.scrollbarXTop + a.scrollTop, h.css(b.scrollbarXRail, c);
                var d = {top: a.scrollTop, height: b.railYHeight};
                b.isScrollbarYUsingRight ? b.isRtl ? d.right = b.contentWidth - (b.negativeScrollAdjustment + a.scrollLeft) - b.scrollbarYRight - b.scrollbarYOuterWidth : d.right = b.scrollbarYRight - a.scrollLeft : b.isRtl ? d.left = b.negativeScrollAdjustment + a.scrollLeft + 2 * b.containerWidth - b.contentWidth - b.scrollbarYLeft - b.scrollbarYOuterWidth : d.left = b.scrollbarYLeft + a.scrollLeft, h.css(b.scrollbarYRail, d), h.css(b.scrollbarX, {
                    left: b.scrollbarXLeft,
                    width: b.scrollbarXWidth - b.railBorderXWidth
                }), h.css(b.scrollbarY, {top: b.scrollbarYTop, height: b.scrollbarYHeight - b.railBorderYWidth})
            }

            var f = a("../lib/helper"), g = a("../lib/class"), h = a("../lib/dom"), i = a("./instances"), j = a("./update-scroll");
            b.exports = function (a) {
                var b = i.get(a);
                b.containerWidth = a.clientWidth, b.containerHeight = a.clientHeight, b.contentWidth = a.scrollWidth, b.contentHeight = a.scrollHeight;
                var c;
                a.contains(b.scrollbarXRail) || (c = h.queryChildren(a, ".ps-scrollbar-x-rail"), c.length > 0 && c.forEach(function (a) {
                    h.remove(a)
                }), h.appendTo(b.scrollbarXRail, a)), a.contains(b.scrollbarYRail) || (c = h.queryChildren(a, ".ps-scrollbar-y-rail"), c.length > 0 && c.forEach(function (a) {
                    h.remove(a)
                }), h.appendTo(b.scrollbarYRail, a)), !b.settings.suppressScrollX && b.containerWidth + b.settings.scrollXMarginOffset < b.contentWidth ? (b.scrollbarXActive = !0, b.railXWidth = b.containerWidth - b.railXMarginWidth, b.railXRatio = b.containerWidth / b.railXWidth, b.scrollbarXWidth = d(b, f.toInt(b.railXWidth * b.containerWidth / b.contentWidth)), b.scrollbarXLeft = f.toInt((b.negativeScrollAdjustment + a.scrollLeft) * (b.railXWidth - b.scrollbarXWidth) / (b.contentWidth - b.containerWidth))) : b.scrollbarXActive = !1, !b.settings.suppressScrollY && b.containerHeight + b.settings.scrollYMarginOffset < b.contentHeight ? (b.scrollbarYActive = !0, b.railYHeight = b.containerHeight - b.railYMarginHeight, b.railYRatio = b.containerHeight / b.railYHeight, b.scrollbarYHeight = d(b, f.toInt(b.railYHeight * b.containerHeight / b.contentHeight)), b.scrollbarYTop = f.toInt(a.scrollTop * (b.railYHeight - b.scrollbarYHeight) / (b.contentHeight - b.containerHeight))) : b.scrollbarYActive = !1, b.scrollbarXLeft >= b.railXWidth - b.scrollbarXWidth && (b.scrollbarXLeft = b.railXWidth - b.scrollbarXWidth), b.scrollbarYTop >= b.railYHeight - b.scrollbarYHeight && (b.scrollbarYTop = b.railYHeight - b.scrollbarYHeight), e(a, b), b.scrollbarXActive ? g.add(a, "ps-active-x") : (g.remove(a, "ps-active-x"), b.scrollbarXWidth = 0, b.scrollbarXLeft = 0, j(a, "left", 0)), b.scrollbarYActive ? g.add(a, "ps-active-y") : (g.remove(a, "ps-active-y"), b.scrollbarYHeight = 0, b.scrollbarYTop = 0, j(a, "top", 0))
            }
        }, {"../lib/class": 2, "../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-scroll": 20}],
        20: [function (a, b, c) {
            "use strict";
            var d, e, f = a("./instances"), g = document.createEvent("Event"), h = document.createEvent("Event"), i = document.createEvent("Event"), j = document.createEvent("Event"), k = document.createEvent("Event"), l = document.createEvent("Event"), m = document.createEvent("Event"), n = document.createEvent("Event"), o = document.createEvent("Event"), p = document.createEvent("Event");
            g.initEvent("ps-scroll-up", !0, !0), h.initEvent("ps-scroll-down", !0, !0), i.initEvent("ps-scroll-left", !0, !0), j.initEvent("ps-scroll-right", !0, !0), k.initEvent("ps-scroll-y", !0, !0), l.initEvent("ps-scroll-x", !0, !0), m.initEvent("ps-x-reach-start", !0, !0), n.initEvent("ps-x-reach-end", !0, !0), o.initEvent("ps-y-reach-start", !0, !0), p.initEvent("ps-y-reach-end", !0, !0), b.exports = function (a, b, c) {
                if (void 0 === a)throw"You must provide an element to the update-scroll function";
                if (void 0 === b)throw"You must provide an axis to the update-scroll function";
                if (void 0 === c)throw"You must provide a value to the update-scroll function";
                "top" === b && 0 >= c && (a.scrollTop = c = 0, a.dispatchEvent(o)), "left" === b && 0 >= c && (a.scrollLeft = c = 0, a.dispatchEvent(m));
                var q = f.get(a);
                "top" === b && c >= q.contentHeight - q.containerHeight && (c = q.contentHeight - q.containerHeight, c - a.scrollTop <= 1 ? c = a.scrollTop : a.scrollTop = c, a.dispatchEvent(p)), "left" === b && c >= q.contentWidth - q.containerWidth && (c = q.contentWidth - q.containerWidth, c - a.scrollLeft <= 1 ? c = a.scrollLeft : a.scrollLeft = c, a.dispatchEvent(n)), d || (d = a.scrollTop), e || (e = a.scrollLeft), "top" === b && d > c && a.dispatchEvent(g), "top" === b && c > d && a.dispatchEvent(h), "left" === b && e > c && a.dispatchEvent(i), "left" === b && c > e && a.dispatchEvent(j), "top" === b && (a.scrollTop = d = c, a.dispatchEvent(k)), "left" === b && (a.scrollLeft = e = c, a.dispatchEvent(l))
            }
        }, {"./instances": 18}],
        21: [function (a, b, c) {
            "use strict";
            var d = a("../lib/helper"), e = a("../lib/dom"), f = a("./instances"), g = a("./update-geometry"), h = a("./update-scroll");
            b.exports = function (a) {
                var b = f.get(a);
                b && (b.negativeScrollAdjustment = b.isNegativeScroll ? a.scrollWidth - a.clientWidth : 0, e.css(b.scrollbarXRail, "display", "block"), e.css(b.scrollbarYRail, "display", "block"), b.railXMarginWidth = d.toInt(e.css(b.scrollbarXRail, "marginLeft")) + d.toInt(e.css(b.scrollbarXRail, "marginRight")), b.railYMarginHeight = d.toInt(e.css(b.scrollbarYRail, "marginTop")) + d.toInt(e.css(b.scrollbarYRail, "marginBottom")), e.css(b.scrollbarXRail, "display", "none"), e.css(b.scrollbarYRail, "display", "none"), g(a), h(a, "top", a.scrollTop), h(a, "left", a.scrollLeft), e.css(b.scrollbarXRail, "display", ""), e.css(b.scrollbarYRail, "display", ""))
            }
        }, {"../lib/dom": 3, "../lib/helper": 6, "./instances": 18, "./update-geometry": 19, "./update-scroll": 20}]
    }, {}, [1]), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext)var audioContext = new AudioContext, audiosource = audioContext.createBufferSource(); else audiosource = null;
var tpLayerTimelinesRev = new function () {
    function checkAvailableAutoTimes() {
        var a = jQuery(".mastertimer-timeline-selector-row.selected").length;
        jQuery(".autotiming-action").addClass("notclickable"), a > 1 ? jQuery(".autotiming-action").removeClass("notclickable") : 1 == a && (jQuery(".autotiming-action-3").removeClass("notclickable"), jQuery(".autotiming-action-4").removeClass("notclickable"), jQuery(".autotiming-action-5").removeClass("notclickable"), jQuery(".autotiming-action-6").removeClass("notclickable"))
    }

    function addIconFunction() {
        jQuery("#tp-addiconbutton, .addbutton-icon").click(function () {
            jQuery("#dialog_insert_icon").dialog({
                width: 491,
                height: 500,
                dialogClass: "tpdialogs",
                resize: function () {
                    var a = jQuery("#dialog_insert_icon");
                    a.css({width: a.parent().width() - 30, height: a.parent().height() - 60})
                },
                modal: !0,
                create: function (a, b) {
                    var c = jQuery(a.target), document_sheets = document.styleSheets,d=false, e = jQuery("#dialog_insert_icon");
                    if(document_sheets)
                    {
                        d = {};
                        var _local_index = 0;
                        jQuery.each(document_sheets,function (index1,sheet1) {
                            if(sheet1.href)
                            {
                                d[_local_index]=sheet1;
                                _local_index++;
                            }
                            else if(sheet1.cssRules)
                            {
                                jQuery.each(sheet1.cssRules,function (index2,sheet2) {
                                    if(sheet2.href && sheet2.styleSheet)
                                    {
                                        d[_local_index]=sheet2.styleSheet;
                                        _local_index++;
                                    }
                                });
                            }
                        });
                    }
                    e.parent().css({
                        padding: "0px",
                        border: "none",
                        borderRadius: "0px"
                    }), e.parent().find(".ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix.ui-draggable-handle").addClass("tp-slider-new-dialog-title"), d && jQuery.each(d, function (a, b) {
                        var d = !1, e = "";
                        try {
                            null !== b.cssRules & void 0 != b.cssRules && jQuery.each(b.cssRules, function (a, b) {
                                b && null !== b && "null" !== b && void 0 != b.selectorText && jQuery.each(rs_icon_sets, function (a, c) {
                                    if (b.selectorText.split(c).length > 1 && b.cssText.split("content").length > 1) {
                                        var f = b.selectorText.split("::before")[0].split(":before")[0];
                                        void 0 != f && void 0 != (f = f.split(".")[1]) && (0 == d && (d = !0, e = '<ul class="tp-icon-preview-list lastaddediconset">'), e = e + '<li><i class="' + f + '"></i></li>')
                                    }
                                })
                            })
                        } catch (a) {
                        }
                        if (d) {
                            e += "</ul>", c.append(e);
                            var f = c.find(".lastaddediconset").find("li").first().find("i");
                            c.find(".lastaddediconset").prepend("<h3>" + f.css("fontFamily") + "</h3>").removeClass("lastaddediconset")
                        }
                    }), c.on("click", "li", function () {
                        jQuery("#dialog_addbutton").length > 0 && "none" !== jQuery("#dialog_addbutton").closest(".tpdialogs").css("display") ? jQuery(".addbutton-icon:visible").length > 0 ? (jQuery(".addbutton-icon").html(jQuery(this).html()), jQuery("#dialog_insert_icon").dialog("close"), setExampleButtons()) : (jQuery(".lasteditedlayertext").length > 0 ? jQuery(".lasteditedlayertext").val(jQuery(".lasteditedlayertext").val() + jQuery(this).html()).blur().focus() : jQuery("#layer_text").val(jQuery("#layer_text").val() + jQuery(this).html()).blur().focus(), jQuery("#dialog_insert_icon").dialog("close")) : (jQuery(".lasteditedlayertext").length > 0 ? jQuery(".lasteditedlayertext").val(jQuery(".lasteditedlayertext").val() + jQuery(this).html()).blur().focus() : jQuery(".layer_text").val(jQuery("#layer_text").val() + jQuery(this).html()).blur().focus(), jQuery("#dialog_insert_icon").dialog("close")), u.updateLayerFromFields()
                    })
                }
            })
        })
    }

    function reBlurFocus(a, b, c) {
        jQuery("#rs-animation-tab-button").hasClass("selected") || jQuery("#rs-loopanimation-tab-button").hasClass("selected") || (b = Number(b) + a, b = Math.round(100 * b) / 100, c.val(b), jQuery(":focus").blur(), c.focus())
    }

    function basicClicksAndHovers() {
        jQuery(".rs-staticcustomstylechange").change(function () {
            t.rebuildLayerIdle(jQuery(".slide_layer.layer_selected"))
        }), jQuery(".rs-layer-settings-tabs li").click(function () {
            var a = jQuery(this);
            "#rs-animation-tab-button" != a.attr("id") && 0 == a.closest("#rs-animation-tab-button").length && "#rs-loopanimation-tab-button" != a.attr("id") && 0 == a.closest("#rs-loopanimation-tab-button").length ? (t.stopAllLayerAnimation(), setTimeout(function () {
                u.removeCurrentLayerRotatable(), u.makeCurrentLayerRotatable(), jQuery("#hide_layer_content_editor").click()
            }, 19)) : jQuery(this).hasClass("selected") || (t.stopAllLayerAnimation(), "#rs-animation-tab-button" == a.attr("id") || 0 != a.closest("#rs-animation-tab-button").length ? (t.animateCurrentSelectedLayer(3), u.removeCurrentLayerRotatable(), jQuery("#hide_layer_content_editor").click()) : (t.callCaptionLoops(), u.removeCurrentLayerRotatable(), jQuery("#hide_layer_content_editor").click()))
        }), jQuery("#divLayers").click(function () {
            t.stopAllLayerAnimation(), u.removeCurrentLayerRotatable(), setTimeout(function () {
                t.checkAnimationTab() && t.animateCurrentSelectedLayer(4), t.checkLoopTab() && t.callCaptionLoops()
            }, 19)
        }), jQuery("#layeranimation-playpause").click(function () {
            var a = jQuery(this);
            a.hasClass("inpause") ? (a.removeClass("inpause"), t.checkAnimationTab() && (t.stopAllLayerAnimation(), t.animateCurrentSelectedLayer(5), u.removeCurrentLayerRotatable())) : (a.addClass("inpause"), t.stopAllLayerAnimation())
        }), jQuery("#loopanimation-playpause").click(function () {
            var a = jQuery(this);
            a.hasClass("inpause") ? (a.removeClass("inpause"), t.checkLoopTab() && (t.stopAllLayerAnimation(), t.callCaptionLoops(), u.removeCurrentLayerRotatable())) : (a.addClass("inpause"), t.stopAllLayerAnimation())
        }), jQuery("#rs-style-tab-button").click(function () {
            setTimeout(function () {
                jQuery(".slide_layer").each(function () {
                    t.rebuildLayerIdle(jQuery(this));
                    var a = jQuery(this).find(".innerslide_layer").first();
                    if (a.length > 0 && void 0 != a.data("hoveranim")) {
                        var b = a.data("hoveranim");
                        b.seek(b.endTime())
                    }
                })
            }, 19)
        }), jQuery("#toggle-idle-hover").click(function () {
            setTimeout(function () {
                t.rebuildLayerIdle(jQuery(".slide_layer.layer_selected"))
            }, 19)
        }), jQuery("#style_form_wrapper").on("colorchanged", function () {
            t.rebuildLayerIdle(jQuery(".slide_layer.layer_selected"))
        })
    }

    function preparePeviewAnimations() {
        jQuery(".rs-inoutanimationfield").on("change", function () {
            t.checkAnimationTab() && (t.stopAllLayerAnimation(), setTimeout(function () {
                t.animateCurrentSelectedLayer(50)
            }, 19))
        })
    }

    function prepareLoopAnimations() {
        jQuery(".rs-loopanimationfield").on("change", function () {
            t.checkLoopTab() && (t.stopAllLayerAnimation(), setTimeout(function () {
                t.callCaptionLoops()
            }, 19))
        })
    }

    function checkSFXAnimations(a, b, c, d, e, f) {
        if (void 0 !== b && b.indexOf("block") >= 0) {
            var g = new Object;
            switch (0 === c.find(".tp-blockmask_in").length && (c.append('<div class="tp-blockmask_in"></div>'), c.append('<div class="tp-blockmask_out"></div>')), g.ft = [{
                scaleY: 1,
                scaleX: 0,
                transformOrigin: "0% 50%"
            }, {scaleY: 1, scaleX: 1, ease: e, immediateRender: !1}], g.t = {
                scaleY: 1,
                scaleX: 0,
                transformOrigin: "100% 50%",
                ease: e,
                immediateRender: !1
            }, g.bmask_in = c.find(".tp-blockmask_in"), g.bmask_out = c.find(".tp-blockmask_out"), g.type = "block", b) {
                case"blocktoleft":
                case"blockfromright":
                    g.ft[0].transformOrigin = "100% 50%", g.t.transformOrigin = "0% 50%";
                    break;
                case"blockfromtop":
                case"blocktobottom":
                    g.ft = [{scaleX: 1, scaleY: 0, transformOrigin: "50% 0%"}, {
                        scaleX: 1,
                        scaleY: 1,
                        ease: e,
                        immediateRender: !1
                    }], g.t = {scaleX: 1, scaleY: 0, transformOrigin: "50% 100%", ease: e, immediateRender: !1};
                    break;
                case"blocktotop":
                case"blockfrombottom":
                    g.ft = [{scaleX: 1, scaleY: 0, transformOrigin: "50% 100%"}, {
                        scaleX: 1,
                        scaleY: 1,
                        ease: e,
                        immediateRender: !1
                    }], g.t = {scaleX: 1, scaleY: 0, transformOrigin: "50% 0%", ease: e, immediateRender: !1}
            }
            return g.ft[1].overwrite = "auto", g.t.overwrite = "auto", g
        }
        return c.find(".tp-blockmask").remove(), !1
    }

    function shuffleArray(a) {
        for (var c, d, b = a.length; 0 !== b;)d = Math.floor(Math.random() * b), b -= 1, c = a[b], a[b] = a[d], a[d] = c;
        return a
    }

    function getSplitTextDirs(a, b) {
        var c = new Array;
        switch (b) {
            case"forward":
            case"random":
                for (var d = 0; d <= a; d++)c.push(d);
                "random" === b && (c = shuffleArray(c));
                break;
            case"backward":
                for (var d = 0; d <= a; d++)c.push(a - d);
                break;
            case"middletoedge":
                var e = Math.ceil(a / 2), f = e - 1, g = e + 1;
                c.push(e);
                for (var d = 0; d < e; d++)f >= 0 && c.push(f), g <= a && c.push(g), f--, g++;
                break;
            case"edgetomiddle":
                for (var f = a, g = 0, d = 0; d <= Math.floor(a / 2); d++)c.push(f), g < f && c.push(g), f--, g++
        }
        return c
    }

    function getCycles(a) {
        var b = {};
        for (var c in a)"string" == typeof a[c] && a[c].indexOf("|") >= 0 && (void 0 === b[c] && (b[c] = {index: 0}), b[c].values = a[c].replace("[", "").replace("]", "").split("|"), b[c].len = b[c].values.length - 1);
        return b
    }

    function theLayerInAnimation(a) {
        var b = a.closest(".slide_layer"), c = u.getSerialFromID(b.attr("id")), d = new Object;
        d = jQuery.extend(!0, {}, d, u.getLayer(c)), 0 == b.children(".tp-mask-wrap").length && b.wrapInner('<div style="width:100%;height:100%;position:relative;" class="tp-mask-wrap"></div>');
        var e = b.find(".tp-mask-wrap"), g = (d.animation, b.hasClass("slide_layer_type_column") ? b.find(".column_background").first() : void 0), h = d.frames.frame_0.speed / 1e3, i = d.frames.frame_0.easing, j = d.frames.frame_0.splitdelay / 100, k = d.frames.frame_0.split, l = d.frames.frame_999.split, m = a, n = new Object, o = new Object, p = d.frames.frame_0.split_direction;
        if (n.transx = 0, n.transy = 0, n.transz = 0, n.rotatex = 0, n.rotatey = 0, n.rotatez = 0, n.scalex = 1, n.scaley = 1, n.skewx = 0, n.skewy = 0, n.opac = 0, n.tper = parseFloat(d.deformation.pers), n.origin = "center,center", o.transx = 0, o.transy = 0, o.transz = parseFloat(d.deformation.z), o.rotatex = parseFloat(d.deformation.xrotate), o.rotatey = parseFloat(d.deformation.yrotate), o.rotatez = parseFloat(d["2d_rotation"]), o.scalex = parseFloat(d.deformation.scalex), o.scaley = parseFloat(d.deformation.scaley), o.skewx = parseFloat(d.deformation.skewx), o.skewy = parseFloat(d.deformation.skewy), o.opac = parseFloat(d.deformation.opacity), o.tper = parseFloat(d.deformation.pers), n["-webkit-filter"] = "", n.filter = "", o["-webkit-filter"] = "", o.filter = "", void 0 !== d.deformation.blurfilter && parseInt(d.deformation.blurfilter, 0) > 0 || void 0 !== d.blurfilter_start && parseInt(d.blurfilter_start, 0) > 0) {
            var q = "blur(" + parseInt(d.deformation.blurfilter, 0) + "px)", r = "inherit" === d.blurfilter_start ? q : "blur(" + parseInt(d.blurfilter_start, 0) + "px)";
            n["-webkit-filter"] = r, n.filter = r, o["-webkit-filter"] = q, o.filter = q
        }
        if (void 0 !== d.deformation.grayscalefilter && parseInt(d.deformation.grayscalefilter, 0) > 0 || void 0 !== d.grayscalefilter_start && parseInt(d.grayscalefilter_start, 0) > 0) {
            var s = "grayscale(" + parseInt(d.deformation.grayscalefilter, 0) + "%)", t = "inherit" === d.grayscalefilter_start ? s : "grayscale(" + parseInt(d.grayscalefilter_start, 0) + "%)";
            n["-webkit-filter"] = "" === n["-webkit-filter"] ? t : n["-webkit-filter"] + " " + t, n.filter = "" === n.filter ? t : n.filter + " " + t, o["-webkit-filter"] = "" === o["-webkit-filter"] ? s : o["-webkit-filter"] + " " + s, o.filter = "" === o.filter ? s : o.filter + " " + s
        }
        if (void 0 !== d.deformation.brightnessfilter && 100 != parseInt(d.deformation.brightnessfilter, 0) || void 0 !== d.brightnessfilter_start && 100 != parseInt(d.brightnessfilter_start, 0)) {
            var v = "brightness(" + parseInt(d.deformation.brightnessfilter, 0) + "%)", w = "inherit" === d.brightnessfilter_start ? v : "brightness(" + parseInt(d.brightnessfilter_start, 0) + "%)";
            n["-webkit-filter"] = "" === n["-webkit-filter"] ? w : n["-webkit-filter"] + " " + w, n.filter = "" === n.filter ? w : n.filter + " " + w, o["-webkit-filter"] = "" === o["-webkit-filter"] ? v : o["-webkit-filter"] + " " + v, o.filter = "" === o.filter ? v : o.filter + " " + v
        }
        var x = d.layer_2d_origin_x + "%", y = d.layer_2d_origin_y + "%", z = x + " " + y;
        if (void 0 != a.data("mySplitText") && ("none" != k || "none" != l))try {
            a.data("mySplitText").revert()
        } catch (a) {
        }
        switch ("chars" == k || "words" == k || "lines" == k || "chars" == l || "words" == l || "lines" == l ? a.find("a").length > 0 ? a.data("mySplitText", new SplitText(a.find("a"), {type: "lines,words,chars"})) : a.data("mySplitText", new SplitText(a, {type: "lines,words,chars"})) : a.data("mySplitText", "none"), k) {
            case"chars":
                m = a.data("mySplitText").chars;
                break;
            case"words":
                m = a.data("mySplitText").words;
                break;
            case"lines":
                m = a.data("mySplitText").lines
        }
        m.length;
        punchgs.TweenLite.killTweensOf(a, !1), punchgs.TweenLite.killTweensOf(m, !1), punchgs.TweenLite.set(e, {clearProps: "transform"}), punchgs.TweenLite.set(a, {clearProps: "transform"}), punchgs.TweenLite.set(m, {clearProps: "transform"});
        var B = new punchgs.TimelineLite, C = new punchgs.TimelineLite;
        m != a && B.add(punchgs.TweenLite.set(a, {
            scaleX: o.scalex,
            scaleY: o.scaley,
            rotationX: o.rotatex,
            rotationY: o.rotatey,
            rotationZ: o.rotatez,
            x: o.transx,
            y: o.transy,
            z: o.transz + 1,
            skewX: o.skewx,
            skewY: o.skewy,
            transformPerspective: o.tper,
            transformOrigin: z,
            autoAlpha: o.opac,
            overwrite: "all"
        })), a.data("timer") && clearTimeout(a.data("timer")), a.data("timera") && clearTimeout(a.data("timera"));
        var D = checkSFXAnimations(d, d.frames.frame_0.sfx_effect, e, j, i, h);
        if (!1 !== D) "block" === D.type && (D.ft[0].background = window.RevColor.get(d.frames.frame_0.sfxcolor), B.add(punchgs.TweenLite.fromTo(D.bmask_in, h / 2, D.ft[0], D.ft[1], j)), B.add(punchgs.TweenLite.fromTo(D.bmask_in, h / 2, D.ft[1], D.t, j + h / 2)), B.add(C.set(m, {clearProps: "transform"}), 0), B.add(C.staggerFromTo(m, .05, {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 0
        }, {x: 0, y: 0, autoAlpha: 1, delay: h / 2}, j), 0)); else {
            n.transx = checkAnimValue(d.x_start, o.transx, a, "horizontal", m.length), n.transy = checkAnimValue(d.y_start, o.transy, a, "vertical", m.length), n.transz = checkAnimValue(d.z_start, o.transz, a, void 0, m.length), n.rotatex = checkAnimValue(d.x_rotate_start, o.rotatex, a, void 0, m.length), n.rotatey = checkAnimValue(d.y_rotate_start, o.rotatey, a, void 0, m.length), n.rotatez = checkAnimValue(d.z_rotate_start, o.rotatez, a, void 0, m.length), n.scalex = checkAnimValue(d.scale_x_start, o.scalex, a, void 0, m.length), n.scaley = checkAnimValue(d.scale_y_start, o.scaley, a, void 0, m.length), n.skewx = checkAnimValue(d.skew_x_start, o.skewx, a, void 0, m.length), n.skewy = checkAnimValue(d.skew_y_start, o.skewy, a, void 0, m.length), n.opac = checkAnimValue(d.opacity_start, o.opac, a, void 0, m.length), n.tper = d.deformation.pers, B.add(C.set(m, {clearProps: "transform"}), 0);
            var E = {
                scaleX: n.scalex,
                scaleY: n.scaley,
                rotationX: n.rotatex,
                rotationY: n.rotatey,
                rotationZ: n.rotatez,
                x: n.transx,
                y: n.transy,
                z: n.transz,
                skewX: n.skewx,
                skewY: n.skewy,
                transformPerspective: n.tper,
                transformOrigin: z,
                autoAlpha: n.opac,
                "-webkit-filter": n["-webkit-filter"],
                filter: n.filter
            }, F = {
                scaleX: o.scalex,
                scaleY: o.scaley,
                rotationX: o.rotatex,
                rotationY: o.rotatey,
                rotationZ: o.rotatez,
                x: o.transx,
                y: o.transy,
                z: o.transz,
                skewX: o.skewx,
                skewY: Number(o.skewy),
                transformPerspective: o.tper,
                transformOrigin: z,
                ease: i,
                autoAlpha: o.opac,
                overwrite: "all",
                force3D: "auto",
                "-webkit-filter": o["-webkit-filter"],
                filter: o.filter
            };
            if (d.frames.frame_0.use_text_c && (E.color = d.frames.frame_0.text_c, F.color = window.RevColor.get(u.getVal(d.static_styles, "color"))), d.frames.frame_0.use_bg_c && (E.backgroundColor = d.frames.frame_0.bg_c, F.backgroundColor = window.RevColor.get(d.deformation["background-color"])), m.length > 1) {
                var G = getSplitTextDirs(m.length - 1, p), H = {
                    from: getCycles(jQuery.extend({}, E, !0)),
                    to: getCycles(jQuery.extend({}, F, !0))
                };
                for (var I in m) {
                    var J = jQuery.extend({}, E, !0), K = jQuery.extend({}, F, !0);
                    for (var L in H.from)J[L] = parseInt(H.from[L].values[H.from[L].index], 0), H.from[L].index = H.from[L].index < H.from[L].len ? H.from[L].index + 1 : 0;
                    B.add(C.fromTo(m[G[I]], h, J, K, j * I), 0)
                }
            } else B.add(C.staggerFromTo(m, h, jQuery.extend({}, E, !0), jQuery.extend({}, F, !0), j))
        }
        if (void 0 != g && B.add(punchgs.TweenLite.fromTo(g, h, {
                scaleX: n.scalex,
                scaleY: n.scaley,
                rotationX: n.rotatex,
                rotationY: n.rotatey,
                rotationZ: n.rotatez,
                x: n.transx,
                y: n.transy,
                z: n.transz,
                skewX: n.skewx,
                skewY: n.skewy,
                transformPerspective: n.tper,
                transformOrigin: z,
                autoAlpha: n.opac
            }, {
                scaleX: o.scalex,
                scaleY: o.scaley,
                rotationX: o.rotatex,
                rotationY: o.rotatey,
                rotationZ: o.rotatez,
                x: o.transx,
                y: o.transy,
                z: o.transz,
                skewX: o.skewx,
                skewY: Number(o.skewy),
                transformPerspective: o.tper,
                transformOrigin: z,
                ease: i,
                autoAlpha: o.opac,
                overwrite: "all",
                force3D: "auto"
            }), 0), d.mask_start || B.add(punchgs.TweenLite.set(e, {overflow: "visible"}), 0), d.mask_start) {
            var M = new Object;
            M.x = checkAnimValue(d.mask_x_start, d.mask_x_start, a, "horizontal"), M.y = checkAnimValue(d.mask_y_start, d.mask_y_start, a, "vertical"), B.add(punchgs.TweenLite.fromTo(e, h, {
                overflow: "hidden",
                x: M.x,
                y: M.y
            }, {x: 0, y: 0, ease: i}), 0)
        }
        return d.mask_start || d.mask_end ? e.addClass("tp-showmask") : e.removeClass("tp-showmask"), a.data("startanimobj", n), B.add(punchgs.TweenLite.fromTo(jQuery("#startanim_wrapper"), C.totalDuration(), {
            autoAlpha: 1,
            width: 0
        }, {
            width: 67,
            ease: i
        }), 0), m != a && B.add(punchgs.TweenLite.fromTo(a.parent(), .2, {autoAlpha: 0}, {autoAlpha: 1}), 0), B
    }

    function theLayerOutAnimation(a) {
        var b = a.closest(".slide_layer"), c = u.getSerialFromID(b.attr("id")), d = new Object;
        d = jQuery.extend(!0, {}, d, u.getLayer(c));
        var e = b.find(".tp-mask-wrap"), f = b.hasClass("slide_layer_type_column") ? b.find(".column_background").first() : void 0, g = d.frames.frame_999.animation, h = d.frames.frame_999.speed / 1e3, i = d.frames.frame_999.easing, j = d.frames.frame_999.splitdelay / 100, k = d.frames.frame_999.split, l = a;
        if (theanim = new Object, theresult = new Object, originx = d.layer_2d_origin_x + "%", originy = d.layer_2d_origin_y + "%", origin = originx + " " + originy, $splitdir = d.frames.frame_999.split_direction, i = "nothing" == i ? d.frames.frame_999.easing : i, theanim.transx = 0, theanim.transy = 0, theanim.transz = 0, theanim.rotatex = 0, theanim.rotatey = 0, theanim.rotatez = 0, theanim.scalex = 1, theanim.scaley = 1, theanim.skewx = 0, theanim.skewy = 0, theanim.opac = 0, theanim.tper = parseFloat(d.deformation.pers), theresult.transx = 0, theresult.transy = 0, theresult.transz = parseFloat(d.deformation.z), theresult.rotatex = parseFloat(d.deformation.xrotate), theresult.rotatey = parseFloat(d.deformation.yrotate), theresult.rotatez = parseFloat(d["2d_rotation"]), theresult.scalex = parseFloat(d.deformation.scalex), theresult.scaley = parseFloat(d.deformation.scaley), theresult.skewx = parseFloat(d.deformation.skewx), theresult.skewy = parseFloat(d.deformation.skewy), theresult.opac = parseFloat(d.deformation.opacity), theresult.tper = parseFloat(d.deformation.pers), theanim["-webkit-filter"] = "", theanim.filter = "", theresult["-webkit-filter"] = "", theresult.filter = "", void 0 !== d.deformation.blurfilter && parseInt(d.deformation.blurfilter, 0) > 0 || void 0 !== d.blurfilter_start && parseInt(d.blurfilter_start, 0) > 0) {
            var m = "blur(" + parseInt(d.deformation.blurfilter, 0) + "px)", n = "inherit" === d.blurfilter_end ? m : "blur(" + parseInt(d.blurfilter_end, 0) + "px)";
            theanim["-webkit-filter"] = n, theanim.filter = n, theresult["-webkit-filter"] = m, theresult.filter = m
        }
        if (void 0 !== d.deformation.grayscalefilter && parseInt(d.deformation.grayscalefilter, 0) > 0 || void 0 !== d.grayscalefilter_end && parseInt(d.grayscalefilter_end, 0) > 0) {
            var o = "grayscale(" + parseInt(d.deformation.grayscalefilter, 0) + "%)", p = "inherit" === d.grayscalefilter_end ? o : "grayscale(" + parseInt(d.grayscalefilter_end, 0) + "%)";
            theanim["-webkit-filter"] = "" === theanim["-webkit-filter"] ? p : theanim["-webkit-filter"] + " " + p, theanim.filter = "" === theanim.filter ? p : theanim.filter + " " + p, theresult["-webkit-filter"] = "" === theresult["-webkit-filter"] ? o : theresult["-webkit-filter"] + " " + o, theresult.filter = "" === theresult.filter ? o : theresult.filter + " " + o
        }
        if (void 0 !== d.deformation.brightnessfilter && 100 != parseInt(d.deformation.brightnessfilter, 0) || void 0 !== d.brightnessfilter_end && 100 != parseInt(d.brightnessfilter_end, 0)) {
            var q = "brightness(" + parseInt(d.deformation.brightnessfilter, 0) + "%)", r = "inherit" === d.brightnessfilter_end ? q : "brightness(" + parseInt(d.brightnessfilter_end, 0) + "%)";
            theanim["-webkit-filter"] = "" === theanim["-webkit-filter"] ? r : theanim["-webkit-filter"] + " " + r, theanim.filter = "" === theanim.filter ? r : theanim.filter + " " + r, theresult["-webkit-filter"] = "" === theresult["-webkit-filter"] ? q : theresult["-webkit-filter"] + " " + q, theresult.filter = "" === theresult.filter ? q : theresult.filter + " " + q
        }
        switch (k) {
            case"chars":
                l = a.data("mySplitText").chars;
                break;
            case"words":
                l = a.data("mySplitText").words;
                break;
            case"lines":
                l = a.data("mySplitText").lines
        }
        var t = (l.length, new punchgs.TimelineLite), v = new punchgs.TimelineLite;
        null == g && (g = "auto"), d.mask_end && ("auto" !== g || d.mask_start) || t.add(punchgs.TweenLite.set(e, {overflow: "visible"}));
        var w = checkSFXAnimations(d, d.frames.frame_999.sfx_effect, e, j, i, h);
        if (!1 !== w) "block" === w.type && (w.ft[0].background = window.RevColor.get(d.frames.frame_999.sfxcolor), t.add(punchgs.TweenLite.fromTo(w.bmask_out, h / 2, w.ft[0], w.ft[1], j)), t.add(punchgs.TweenLite.fromTo(w.bmask_out, h / 2, w.ft[1], w.t, j + h / 2)), t.add(v.set(l, {clearProps: "transform"}), 0), t.add(v.staggerTo(l, .05, {
            x: 0,
            y: 0,
            autoAlpha: 0,
            delay: h / 2
        }, j), 0)); else {
            if ("auto" === g) theanim = a.data("startanimobj"); else {
                d.mask_end || "auto" === g && d.mask_start;
                theanim.transx = checkAnimValue(d.x_end, theresult.transx, a, "horizontal", l.length), theanim.transy = checkAnimValue(d.y_end, theresult.transy, a, "vertical", l.length), theanim.transz = checkAnimValue(d.z_end, theresult.transz, a, void 0, l.length), theanim.rotatex = checkAnimValue(d.x_rotate_end, theresult.rotatex, a, void 0, l.length), theanim.rotatey = checkAnimValue(d.y_rotate_end, theresult.rotatey, a, void 0, l.length), theanim.rotatez = checkAnimValue(d.z_rotate_end, theresult.rotatez, a, void 0, l.length), theanim.scalex = checkAnimValue(d.scale_x_end, theresult.scalex, a, void 0, l.length), theanim.scaley = checkAnimValue(d.scale_y_end, theresult.scaley, a, void 0, l.length), theanim.skewx = checkAnimValue(d.skew_x_end, theresult.skewx, a, void 0, l.length), theanim.skewy = checkAnimValue(d.skew_y_end, theresult.skewy, a, void 0, l.length), theanim.opac = checkAnimValue(d.opacity_end, theresult.opac, a, void 0, l.length), theanim.tper = d.deformation.pers
            }
            t.add(v.staggerTo(l, .001, {
                "-webkit-filter": theresult["-webkit-filter"],
                filter: theresult.filter
            }, j - .001));
            var y = {
                scaleX: theanim.scalex,
                scaleY: theanim.scaley,
                rotationX: theanim.rotatex,
                rotationY: theanim.rotatey,
                rotationZ: theanim.rotatez,
                x: theanim.transx,
                y: theanim.transy,
                z: theanim.transz + 1,
                skewX: theanim.skewx,
                skewY: theanim.skewy,
                opacity: theanim.opac,
                transformPerspective: theanim.tper,
                transformOrigin: origin,
                ease: i,
                "-webkit-filter": theanim["-webkit-filter"],
                filter: theanim.filter
            };
            if (d.frames.frame_999.use_text_c && (y.color = d.frames.frame_999.text_c), d.frames.frame_999.use_bg_c && (y.backgroundColor = d.frames.frame_999.bg_c), l.length > 1) {
                var z = getSplitTextDirs(l.length - 1, $splitdir), A = {to: getCycles(jQuery.extend({}, y, !0))};
                for (var B in l) {
                    var C = jQuery.extend({}, y, !0);
                    for (var D in A.to)C[D] = parseInt(A.to[D].values[A.to[D].index], 0), A.to[D].index = A.to[D].index < A.to[D].len ? A.to[D].index + 1 : 0;
                    t.add(v.to(l[z[B]], h, C, j * B), 0)
                }
            } else t.add(v.staggerTo(l, h, jQuery.extend({}, y, !0), j))
        }
        if (void 0 != f && t.add(punchgs.TweenLite.to(f, h, {
                scaleX: theanim.scalex,
                scaleY: theanim.scaley,
                rotationX: theanim.rotatex,
                rotationY: theanim.rotatey,
                rotationZ: theanim.rotatez,
                x: theanim.transx,
                y: theanim.transy,
                z: theanim.transz + 1,
                skewX: theanim.skewx,
                skewY: theanim.skewy,
                opacity: theanim.opac,
                transformPerspective: theanim.tper,
                transformOrigin: origin,
                ease: i
            }, j), 0), d.mask_end) {
            var E = new Object;
            E.x = checkAnimValue(d.mask_x_end, d.mask_x_end, a), E.y = checkAnimValue(d.mask_y_end, d.mask_y_end, a), t.add(punchgs.TweenLite.to(e, h, {
                x: E.x,
                y: E.y,
                ease: i,
                overflow: "hidden"
            }, j), 0)
        } else if ("auto" === g && d.mask_start) {
            var E = new Object;
            E.x = checkAnimValue(d.mask_x_start, d.mask_x_start, a), E.y = checkAnimValue(d.mask_y_start, d.mask_y_start, a), t.add(punchgs.TweenLite.to(e, h, {
                x: E.x,
                y: E.y,
                ease: i
            }, j), 0)
        }
        return t.add(punchgs.TweenLite.fromTo(jQuery("#endanim_timerunnerbox"), v.totalDuration(), {x: 0}, {
            x: -67,
            ease: i
        }), 0), t.add(punchgs.TweenLite.fromTo(jQuery("#endanim_timerunner"), v.totalDuration(), {x: 0}, {
            x: -67,
            ease: i
        }), 0), l != a && t.add(punchgs.TweenLite.fromTo(a.parent(), .2, {autoAlpha: 1}, {autoAlpha: 0}), v.totalDuration() - .2), t
    }

    function createGlobalTimeline(a, b) {
        a && t.stopAllLayerAnimation();
        var c = jQuery("#mastertimer-position");
        void 0 != c.data("tl") && c.data("tl").kill();
        var d = new punchgs.TimelineLite;
        d.pause(), jQuery(" .slide_layer .innerslide_layer").each(function () {
            var a = jQuery(this);
            a.data("inanim", theLayerInAnimation(a)), a.data("outanim", theLayerOutAnimation(a));
            var b = u.getSerialFromID(a.closest(".slide_layer").attr("id"));
            params = u.getLayer(b), d.add(a.data("inanim"), params.frames.frame_0.time / 1e3);
            var c = params.frames.frame_999.endspeed;
            void 0 == c && (c = params.frames.frame_0.speed), d.add(a.data("outanim"), params.frames.frame_999.time / 1e3)
        }), c.data("tl", d)
    }

    function loadMusicTimeLine(a, b) {
        if (null === audioContext || !AudioContext)return !1;
        var c = new XMLHttpRequest, d = a.references.sorttable.timeline, e = null;
        c.open("GET", b, !0), c.responseType = "arraybuffer", c.onreadystatechange = function (b) {
            4 == c.readyState && (200 == c.status ? audioContext.decodeAudioData(c.response, function (b) {
                e = b, d.data("audiobuffer", b), displayAudioBuffer(a, b)
            }, onDecodeError) : console.log("error during the load.Wrong url or cross origin issue"))
        }, c.send()
    }

    function onDecodeError() {
        alert("error while decoding your Audio file.")
    }

    function getStartSec(a) {
        return void 0 == a ? -1 : "" == a ? -1 : " " == a ? -1 : jQuery.isNumeric(a) ? a : a.split(":").length > 1 ? 60 * parseInt(a.split(":")[0], 0) + parseInt(a.split(":")[1], 0) : a
    }

    function displayAudioBuffer(a, b) {
        try {
            var c = a.references.sorttable.timeline, d = b.getChannelData(0), f = (c.find(".timeline_full"), 100 * b.duration), g = 19, i = (a.video_data.start_at, getStartSec(a.video_data.start_at)), j = getStartSec(a.video_data.end_at);
            i = -1 == i ? 0 : i, j = -1 == j ? 999999999 : j, i /= 60, j /= 60, j = j > b.duration ? b.duration : j, i *= b.sampleRate, j *= b.sampleRate, f = (j - i) / b.sampleRate * 100, c.find("canvas").remove();
            var k = document.createElement("canvas");
            k.width = t.mainMaxTimeLeft, k.height = g, c.append('<div class="timeline_audio"></div>'), c.find(".timeline_audio").append(k);
            var l = c.find("canvas");
            punchgs.TweenLite.set(l, {zIndex: 2, top: 3, left: 0, position: "absolute"});
            var m = k.getContext("2d");
            d.length;
            m.save(), m.fillStyle = "transparent", m.fillRect(0, 0, f, g), m.strokeStyle = "#333", m.translate(0, g / 2), m.globalAlpha = .5;
            for (var o = 0, p = j - i, q = 0; q < j - i; q += 200) {
                var r = Math.floor(f * q / p), s = d[i + q] * g;
                m.beginPath(), m.moveTo(r, 0), m.lineTo(r + 1, s), m.stroke(), o++
            }
            if ("none" != a.video_data.videoloop)for (var u = m.getImageData(0, 0, f, g), v = t.mainMaxTimeLeft / f, q = 0; q < v; q++)m.beginPath(), m.moveTo(q * f, -50), m.lineTo(q * f, g), m.lineWidth = 3, m.strokeStyle = "#c0392b", m.stroke(), m.putImageData(u, q * f, 0);
            m.restore(), audio = jQuery(a.references.sorttable.timeline[0]).find(".timeline_audio"), void 0 !== audio && audio.length > 0 && punchgs.TweenLite.set(audio, {
                left: 15 + a.frames.frame_0.time / 10,
                width: (a.frames.frame_999.time - a.frames.frame_0.time + a.frames.frame_999.split_extratime + a.frames.frame_999.speed) / 10
            })
        } catch (j) {
            console.log("Drawing of Audio Map failed !")
        }
    }

    var t = this, u = new Object, sortMode = "time", __ctime, __ctimeb, __ctimei, __coffset = 0;
    t.timelinetype = "absolute", t.mainMaxTimeLeft = 0, t.layout = "desktop", t.timercorrectur = 0, t.init = function () {
        u = UniteLayersRev, g_rebuildTimer = 999, g_slideTime = u.getMaintime(), g_keyTimer = 0, t.mainMaxTimeLeft = jQuery("#mastertimer-maxtime").position().left, initSlideDuration(), initSortbox(), initMasterTimer(), preparePeviewAnimations(), prepareLoopAnimations(), showHideTimeines(), basicClicksAndHovers(), addIconFunction(), t.addToSortbox(), jQuery("#slide_transition, #slot_amount, #transition_rotation").change(function () {
            setFakeAnim()
        });
        var a;
        jQuery(window).resize(function () {
            clearTimeout(a), a = setTimeout(function () {
                t.resetSlideAnimations(!1)
            }, 250)
        });
        var b = !1;
        jQuery("#thelayer-editor-wrapper").hover(function () {
            b = !0
        }, function () {
            b = !1
        }), jQuery("#fake-select-title-wrapper").click(function () {
            jQuery("#slide-animation-settings-content-tab").click(), jQuery("html,body").animate({scrollTop: -100 + jQuery("#slide-animation-settings-content-tab").offset().top}, 200)
        }), jQuery(".slide-trans-menu-element").each(function () {
            var a = jQuery(this);
            a.text(a.text().toLowerCase()), a.click(function () {
                var a = jQuery(this);
                jQuery(".slide-trans-menu-element").removeClass("selected"), a.addClass("selected"), jQuery(".slide-trans-checkelement").hide(), jQuery("." + a.data("reference")).show()
            })
        }), jQuery(".slide-trans-menu-element").first().click();
        var c = function () {
            var a = jQuery(".slide-trans-cur-ul");
            for (var b in choosen_slide_transition) {
                var c = "";
                c += ' data-duration="' + transition_settings.duration[b] + '"', c += ' data-ease_in="' + transition_settings.ease_in[b] + '"', c += ' data-ease_out="' + transition_settings.ease_out[b] + '"', c += ' data-rotation="' + transition_settings.rotation[b] + '"', c += ' data-slot="' + transition_settings.slot[b] + '"', a.append('<li value="' + choosen_slide_transition[b] + '"' + c + ' class="justaddedtrans draggable-trans-element">' + jQuery('input[name="slide_transition[]"][value="' + choosen_slide_transition[b] + '"]').parent().text() + '<i class="remove-trans-from-list eg-icon-cancel"></i></li>'), jQuery(".justaddedtrans").data("animval", choosen_slide_transition[b]), jQuery(".justaddedtrans").removeClass("justaddedtrans")
            }
            setFakeAnim()
        };
        "undefined" != typeof choosen_slide_transition && c();
        var g, d = new punchgs.TimelineLite, f = jQuery("#form_slide_params").offset();
        jQuery("body").on("click", ".remove-trans-from-list", function () {
            var a = jQuery(this), b = a.parent(), c = b.data("animval"), d = !1;
            return jQuery(".slide-trans-checkelement").each(function () {
                var a = jQuery(this), b = a.find("input");
                b.val() == c && (b.removeAttr("checked"), d = !0)
            }), d && jQuery(".remove-trans-from-list").length > 1 ? (b.remove(), jQuery(".slide-trans-cur-ul li:first-child").click()) : alert(rev_lang.cant_remove_last_transition), !1
        }), jQuery(".slide-trans-checkelement").on("mouseover", function (a) {
            var b = jQuery(this).find('input[name="slide_transition[]"]'), c = jQuery(".slide-trans-example-inner .slotholder"), e = jQuery(".slide-trans-example-inner .oldslotholder"), g = jQuery(".slide-trans-example");
            c.find(".slot").each(function () {
                jQuery(this).remove()
            }), e.find(".slot").each(function () {
                jQuery(this).remove()
            }), d.kill(), punchgs.TweenLite.set(c, {clearProps: "transform"}), punchgs.TweenLite.set(e, {clearProps: "transform"}), punchgs.TweenLite.set(c.find(".defaultimg"), {
                clearProps: "transform",
                autoAlpha: 1
            }), punchgs.TweenLite.set(e.find(".defaultimg"), {
                clearProps: "transform",
                autoAlpha: 1
            }), d = slideAnimation(c, e, b.val(), d, !0), d.pause(.001), punchgs.TweenLite.to(g, .2, {
                top: a.pageY - f.top,
                overwrite: "all",
                autoAlpha: 1,
                ease: punchgs.Power3.easeInOut,
                onComplete: function () {
                    setTimeout(function () {
                        d.play()
                    }, 100)
                }
            })
        }), jQuery(".slide-trans-checkelement").on("mouseleave", function () {
            clearTimeout(g);
            jQuery(this).find('input[name="slide_transition[]"]'), jQuery(".slide-trans-example-inner .slotholder"), jQuery(".slide-trans-example-inner .oldslotholder");
            punchgs.TweenLite.to(jQuery(".slide-trans-example"), .2, {autoAlpha: 0, delay: .2})
        }), jQuery('input[name="slide_transition[]"]').on("change", function () {
            if (jQuery(this).attr("checked") === "checked") {
                var a = "";
                a += ' data-duration="default"', a += ' data-ease_in="default"', a += ' data-ease_out="default"', a += ' data-rotation="0"', a += ' data-slot="default"', jQuery(".slide-trans-cur-ul").append('<li value="' + jQuery(this).val() + '"' + a + ' class="justaddedtrans draggable-trans-element">' + jQuery(this).parent().text() + '<i class="remove-trans-from-list eg-icon-cancel"></i></li>'), jQuery(".justaddedtrans").data("animval", jQuery(this).val()), jQuery(".justaddedtrans").removeClass("justaddedtrans")
            } else jQuery(".remove-trans-from-list").length > 1 ? (jQuery(".slide-trans-cur-ul").find("li:data[value=" + jQuery(this).val() + "]").remove(), jQuery(".slide-trans-cur-ul li:first-child").click()) : (jQuery(this).attr("checked", !0), alert(rev_lang.cant_remove_last_transition));
            setFakeAnim()
        }), jQuery("body").on("click", ".slide-trans-cur-ul li", function () {
            jQuery(".slide-trans-cur-ul li").each(function () {
                jQuery(this).removeClass("selected")
            }), jQuery(this).addClass("selected"), jQuery('input[name="slot_amount"]').val(jQuery(this).data("slot")), jQuery('input[name="transition_rotation"]').val(jQuery(this).data("rotation")), jQuery('input[name="transition_duration"]').val(jQuery(this).data("duration")), jQuery('select[name="transition_ease_in"] option[value="' + jQuery(this).data("ease_in") + '"]').attr("selected", !0), jQuery('select[name="transition_ease_out"] option[value="' + jQuery(this).data("ease_out") + '"]').attr("selected", !0)
        }), jQuery(".slide-trans-cur-ul li:first-child").click(), jQuery('input[name="slot_amount"]').change(function () {
            jQuery(".slide-trans-cur-ul li.selected").data("slot", jQuery(this).val())
        }), jQuery('input[name="transition_rotation"]').change(function () {
            jQuery(".slide-trans-cur-ul li.selected").data("rotation", jQuery(this).val())
        }), jQuery("#transition_duration, #delay").change(function () {
            jQuery(".slide-trans-cur-ul li.selected").data("duration", jQuery(this).val()), t.setSlideTransitionTimerBar()
        }), jQuery('select[name="transition_ease_in"]').change(function () {
            jQuery(".slide-trans-cur-ul li.selected").data("ease_in", jQuery(this).val())
        }), jQuery('select[name="transition_ease_out"]').change(function () {
            jQuery(".slide-trans-cur-ul li.selected").data("ease_out", jQuery(this).val())
        }), jQuery(".slide-trans-cur-ul").sortable({
            containment: ".slide-trans-cur-selected", stop: function () {
                setTimeout(function () {
                    setFakeAnim()
                }, 200)
            }
        }), jQuery("#abs_rel_timeline").on("change", function () {
            t.timelinetype = jQuery(this).val(), t.updateAllLayerTimeline()
        }), jQuery(document).on("keydown", function (a) {
            var b = jQuery("input:focus").length > 0;
            if (a.ctrlKey || a.metaKey || a.shiftKey)switch (String.fromCharCode(a.which).toLowerCase()) {
                case"s":
                    a.shiftKey || (a.preventDefault(), jQuery("#button_save_static_slide-tb").length > 0 ? jQuery("#button_save_static_slide-tb").click() : jQuery("#button_save_slide-tb").click());
                    break;
                case"z":
                    !a.metaKey && !a.ctrlKey || b || (a.preventDefault(), a.shiftKey ? u.oneStepRedo() : u.oneStepUndo());
                    break;
                case"y":
                    !a.ctrlKey && !a.metaKey || b || (a.preventDefault(), u.oneStepRedo())
            }
        }), jQuery("body").on("keydown keyup", function (a) {
            if (jQuery("#layer_text").is(":focus"))return !0;
            if (jQuery("#layer_text_toggle").is(":focus"))return !0;
            var c = a.keyCode ? a.keyCode : a.which, d = void 0 != jQuery(document.activeElement).data("steps") ? parseFloat(jQuery(document.activeElement).data("steps")) : 1;
            Number(parseInt(jQuery("#layer_left").val(), 0)), Number(parseInt(jQuery("#layer_top").val(), 0));
            switch (a.shiftKey && (d *= 10), jQuery(document.activeElement).get(0).tagName.toLowerCase()) {
                case"INPUT":
                case"input":
                    var g = parseFloat(jQuery(document.activeElement).val());
                    if (void 0 != jQuery(document.activeElement).data("suffix") && !jQuery(document.activeElement).data("suffix").match(/auto/g) && (g = Number(g), jQuery.isNumeric(g)))switch (c) {
                        case 38:
                            return "keyup" == a.type && reBlurFocus(d, g, jQuery(document.activeElement)), !1;
                        case 40:
                            return "keyup" == a.type && reBlurFocus(-d, g, jQuery(document.activeElement)), !1
                    }
                    break;
                case"textarea":
                    return !0;
                default:
                    switch (c) {
                        case 8:
                        case 46:
                            a.preventDefault(), "keydown" == a.type && (jQuery("#button_delete_layer").click(), window.deletecalled = !0)
                    }
                    if (b)switch (c) {
                        case 40:
                            return "keyup" == a.type ? setTimeout(function () {
                                u.updateMovedLayers()
                            }, 50) : u.adjustSelectedLayerPositions("top", d), !1;
                        case 38:
                            return "keyup" == a.type ? setTimeout(function () {
                                u.updateMovedLayers()
                            }, 50) : u.adjustSelectedLayerPositions("top", -1 * d), !1;
                        case 37:
                            return "keyup" == a.type ? setTimeout(function () {
                                u.updateMovedLayers()
                            }, 50) : u.adjustSelectedLayerPositions("left", -1 * d), !1;
                        case 39:
                            return "keyup" == a.type ? setTimeout(function () {
                                u.updateMovedLayers()
                            }, 50) : u.adjustSelectedLayerPositions("left", d), !1
                    }
            }
        }), t.deepSelection(), jQuery(".input-deepselects").each(function () {
            var a = jQuery(this);
            a.wrap('<span class="inp-deep-wrapper"></span>'), a.parent().append('<div class="inp-deep-list"></div>');
            var b = a.parent().find(".inp-deep-list"), c = '<span class="inp-deep-listitems">', d = a.data("reverse"), e = a.data("deepwidth"), f = void 0 != a.data("selects") ? a.data("selects").split("||") : "", g = void 0 != a.data("svalues") ? a.data("svalues").split("||") : "", h = void 0 != a.data("icons") ? a.data("icons").split("||") : "", i = a.attr("id");
            void 0 !== e && punchgs.TweenLite.set(b, {minWidth: e + "px"}), "on" == d && (c = c + "<span class='reverse_input_wrapper'><span class='reverse_input_text'>Direction Auto Reverse</span><input class='reverse_input_check tp-moderncheckbox' name='" + i + "_reverse' id='" + i + "_reverse' type='checkbox'></span>"), void 0 !== f && "" != f && jQuery.each(f, function (a) {
                var b = g[a] || "", d = f[a] || "", a = h[a] || "";
                c = c + "<span class='inp-deep-prebutton' data-val='" + b + "'><i class='eg-icon-" + a + "'></i>" + d + "</span>"
            }), c += "</span>", b.append(c), "on" == d && RevSliderSettings.onoffStatus(jQuery('input[name="' + i + '_reverse"]'))
        }), jQuery("body").on("click", ".inp-deep-prebutton", function () {
            var a = jQuery(this), b = a.closest(".inp-deep-wrapper").find("input");
            b.val(a.data("val")), b.blur(), b.focus(), b.trigger("change")
        }), jQuery("body").on("click", ".input-deepselects", function () {
            jQuery(this).closest(".inp-deep-wrapper").find(".inp-deep-list").addClass("visible"), jQuery(this).closest(".inp-deep-wrapper").addClass("selected-deep-wrapper")
        }), jQuery(".inp-deep-wrapper").on("mouseleave", function () {
            jQuery(this).find(".inp-deep-list").removeClass("visible"), jQuery(this).removeClass("selected-deep-wrapper")
        }), jQuery('input[name="masking-start"]').on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".mask-start-settings").show() : jQuery(".mask-start-settings").hide()
        }), jQuery('input[name="masking-end"]').on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".mask-end-settings").show() : jQuery(".mask-end-settings").hide()
        }), jQuery("#use_text_color_start").on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".use_text_color_wrap_start").show() : jQuery(".use_text_color_wrap_start").hide()
        }), jQuery("#use_bg_color_start").on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".use_bg_color_wrap_start").show() : jQuery(".use_bg_color_wrap_start").hide()
        }), jQuery("#use_text_color_end").on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".use_text_color_wrap_end").show() : jQuery(".use_text_color_wrap_end").hide()
        }), jQuery("#use_bg_color_end").on("change", function () {
            "checked" === jQuery(this).attr("checked") ? jQuery(".use_bg_color_wrap_end").show() : jQuery(".use_bg_color_wrap_end").hide()
        }), jQuery("body").on("click", ".show_timeline_helper", function () {
            var a = jQuery(this), b = a.closest("li"), c = a.closest(".timeline_frame"), d = jQuery("#timline-manual-dialog"), e = c.position().left, g = (b.width(), c.data("frameindex")), h = u.getLayerByUniqueId(b.data("uniqueid")), i = h.frames["frame_" + g].time, j = h.frames["frame_" + g].speed;
            d.appendTo(b), e = 999 === g ? e - d.width() + c.width() - 20 : 0 === g ? e : e - d.width() / 2 + 10, e = e < 20 ? 20 : e, d.css({left: e}), jQuery("#clayer_start_time").val(i), jQuery("#clayer_start_speed").val(j), d.data("frameindex", g), d.data("uniqueid", h.unique_id), d.show()
        }), jQuery("body").on("click", "#timline-manual-closer", function () {
            var a = jQuery("#timline-manual-dialog");
            a.hide(), a.appendTo(jQuery("#thelayer-editor-wrapper"))
        }), jQuery("body").on("click", "#timline-manual-apply", function () {
            var b = (jQuery(this), jQuery("#timline-manual-dialog")), c = b.data("frameindex"), d = document.getElementById("tl_" + b.data("uniqueid") + "_frame_" + c);
            objLayer = u.getLayerByUniqueId(b.data("uniqueid")), objUpdate = {frames: {}}, t.recordFrameStatus(d), objUpdate.frames["frame_" + c] = {}, objUpdate.frames["frame_" + c].time = jQuery("#clayer_start_time").val(), objUpdate.frames["frame_" + c].speed = jQuery("#clayer_start_speed").val(), b.hide(), b.appendTo(jQuery("#thelayer-editor-wrapper")), u.updateLayer(objLayer.serial, objUpdate), t.updateLayerTimeline(objLayer), t.updateTLFrame(d, "trigger"), t.updateAllSelectedLayerTimeline(d), t.updateAllLayerTimeline()
        }), jQuery("body").on("click", "#timing-all-onoff-checkbox", function () {
            var a = jQuery(this);
            "checked" != a.attr("checked") || jQuery(".mastertimer-timeline-selector-row.selected").length == jQuery(".layer-on-timeline-selector").length ? (jQuery(".mastertimer-timeline-selector-row.selected").removeClass("selected"), jQuery(".layer-on-timeline-selector").removeAttr("checked")) : (jQuery(".layer-on-timeline-selector").attr("checked", "checked"), jQuery(".sortable_elements .mastertimer-timeline-selector-row").addClass("selected")), t.checkMultipleSelectedItems(), checkAvailableAutoTimes()
        }), jQuery("body").on("click", ".list-of-layer-links", function () {
            jQuery(this).toggleClass("showmenow")
        }), jQuery("body").on("click", ".timing-layer-link-type-element", function () {
            var a = jQuery(this).data("linktype");
            u.selectedLayers = [], jQuery(".layer-on-timeline-selector").each(function () {
                var b = jQuery(this), c = b.closest(".mastertimer-layer").data("uniqueid"), d = u.getLayerByUniqueId(c);
                d.groupLink == a ? (b.attr("checked", "checked"), u.selectedLayers.push(c), d.references.htmlLayer.addClass("multiplelayerselected")) : (b.removeAttr("checked", "checked"), d.references.htmlLayer.removeClass("multiplelayerselected"))
            })
        }), jQuery("body").on("change", ".layer-on-timeline-selector", function () {
            t.checkMultipleSelectedItems()
        })
    }, t.deepSelection = function (a) {
        jQuery(".input-deepselects").each(function () {
            var a = jQuery(this);
            if (!a.hasClass("deepselection_ready")) {
                a.addClass("deepselection_ready"), a.wrap('<span class="inp-deep-wrapper"></span>'), a.parent().append('<span class="inp-deep-list"></span>');
                var b = a.parent().find(".inp-deep-list"), c = '<span class="inp-deep-listitems">', d = a.data("reverse"), e = a.data("deepwidth"), f = void 0 != a.data("selects") ? a.data("selects").split("||") : "", g = void 0 != a.data("svalues") ? a.data("svalues").split("||") : "", h = void 0 != a.data("icons") ? a.data("icons").split("||") : "", i = a.attr("id");
                void 0 !== e && punchgs.TweenLite.set(b, {minWidth: e + "px"}), "on" == d && (c = c + "<span class='reverse_input_wrapper'><span class='reverse_input_text'>Direction Auto Reverse</span><input class='reverse_input_check tp-moderncheckbox' name='" + i + "_reverse' id='" + i + "_reverse' type='checkbox'></span>"), void 0 !== f && "" != f && jQuery.each(f, function (a) {
                    var b = g[a] || "", d = f[a] || "", a = h[a] || "";
                    c = c + "<span class='inp-deep-prebutton' data-val='" + b + "'><i class='eg-icon-" + a + "'></i>" + d + "</span>"
                }), c += "</span>", b.append(c), "on" == d && RevSliderSettings.onoffStatus(jQuery('input[name="' + i + '_reverse"]')), a.parent().on("mouseleave", function () {
                    jQuery(this).find(".inp-deep-list").removeClass("visible"), jQuery(this).removeClass("selected-deep-wrapper")
                })
            }
        }), !0 !== a && (jQuery("body").on("click", ".inp-deep-prebutton", function () {
            var a = jQuery(this), b = a.closest(".inp-deep-wrapper").find("input");
            b.val(a.data("val")), b.blur(), b.focus(), b.trigger("change")
        }), jQuery("body").on("click", ".input-deepselects", function () {
            jQuery(this).closest(".inp-deep-wrapper").find(".inp-deep-list").addClass("visible"), jQuery(this).closest(".inp-deep-wrapper").addClass("selected-deep-wrapper")
        }))
    }, t.checkMultipleSelectedItems = function (a) {
        u.selectedLayers = [];
        jQuery(".layer-on-timeline-selector").each(function () {
            var b = jQuery(this), c = u.getLayerByUniqueId(b.closest(".mastertimer-layer").data("uniqueid"));
            b.attr("checked") && !0 !== a ? (c.references.htmlLayer.addClass("multiplelayerselected"), u.selectedLayers.push(c.unique_id)) : (b.removeAttr("checked"), c.references.htmlLayer.removeClass("multiplelayerselected"))
        })
    }, t.compareLayerEndsVSSlideEnd = function () {
        var a = 10 * t.mainMaxTimeLeft;
        jQuery.each(u.arrLayers, function (b, c) {
            (c.endWithSlide || a < c.frames.frame_999.time - c.frames.frame_999.speed) && (c.frames.frame_999.time = a + c.frames.frame_999.speed)
        }), t.updateAllLayerTimeline()
    }, t.resetIdleSelector = function () {
        jQuery("#toggle-idle-hover").addClass("idleisselected").removeClass("hoverisselected"), jQuery("#tp-idle-state-advanced-style").show(), jQuery("#tp-hover-state-advanced-style").hide()
    }, t.checkAnimationTab = function () {
        return !jQuery("#layeranimation-playpause").hasClass("inpause") && jQuery("#rs-animation-tab-button").hasClass("selected")
    }, t.checkLoopTab = function () {
        return !jQuery("#loopanimation-playpause").hasClass("inpause") && jQuery("#rs-loopanimation-tab-button").hasClass("selected")
    }, t.stopAllLayerAnimation = function () {
        document.getElementById("mastertimer-playpause-wrapper").innerHTML = '<i class="eg-icon-play"></i><span>PLAY</span>', punchgs.TweenLite.set(document.getElementsByClassName("tp-mask-wrap"), {
            clearProps: "transform",
            overwrite: "all"
        }), jQuery("#divbgholder").find(".tp-blockmask_in, .tp-blockmask_out").remove(), jQuery(".tp-showmask").removeClass("tp-showmask");
        for (var a = document.getElementsByClassName("innerslide_layer"), b = 0; b < a.length; b++) {
            var c = jQuery(a[b]);
            if ((a[b].parentNode.classList.contains("rs-preview-inside-looper") || a[b].parentNode.parentNode.classList.contains("rs-preview-inside-looper")) && c.unwrap(), void 0 != c.data("tl")) {
                var d = c.data("tl");
                d.clear(), d.kill();
                try {
                    c.data("mySplitText") && c.data("mySplitText").revert()
                } catch (a) {
                }
                punchgs.TweenLite.set(c[0].parentNode, {autoAlpha: 1}), t.rebuildLayerIdle(c.closest(".slide_layer")), u.removeCurrentLayerRotatable()
            }
        }
        punchgs.TweenLite.set(document.getElementById("startanim_wrapper"), {autoAlpha: 0}), punchgs.TweenLite.set(document.getElementById("endanim_wrapper"), {autoAlpha: 0})
    }, t.callCaptionLoops = function () {
        t.stopAllLayerAnimation();
        var a = jQuery(".slide_layer.layer_selected"), b = a.find(".innerslide_layer").first();
        if (0 == b.length)return !1;
        var c = u.getSerialFromID(a.attr("id"));
        params = u.getLayer(c), loopanim = params.loop_animation, b.closest(".rs-preview-inside-looper").length > 0 && b.unwrap(), b.wrap('<div class="rs-preview-inside-looper" style="width:100%;height:100%;position:relative"></div>');
        var d = a.find(".rs-preview-inside-looper"), e = params.loop_startdeg, f = params.loop_enddeg, g = params.loop_speed, h = params.loop_xorigin + "% " + params.loop_yorigin + "%", i = params.loop_easing, j = params.loop_angle, k = parseInt(params.loop_radius, 0), l = params.loop_xstart, m = params.loop_ystart, n = params.loop_xend, o = params.loop_yend, p = params.loop_zoomstart, q = params.loop_zoomend;
        factor = 1;
        var r = new punchgs.TimelineLite;
        switch (r.pause(), loopanim) {
            case"rs-pendulum":
                r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", rotation: e, transformOrigin: h}, {
                    rotation: f,
                    ease: i
                })), r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", rotation: f}, {
                    rotation: e,
                    ease: i,
                    onComplete: function () {
                        r.restart()
                    }
                }));
                break;
            case"rs-rotate":
                r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", rotation: e, transformOrigin: h}, {
                    rotation: f,
                    ease: i,
                    onComplete: function () {
                        r.restart()
                    }
                }));
                break;
            case"rs-slideloop":
                r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", x: l, y: m}, {
                    x: n,
                    y: o,
                    ease: i
                })), r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", x: n, y: o}, {
                    x: l,
                    y: m,
                    onComplete: function () {
                        r.restart()
                    }
                }));
                break;
            case"rs-pulse":
                r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", scale: p}, {
                    scale: q,
                    ease: i
                })), r.add(punchgs.TweenLite.fromTo(d, g, {force3D: "auto", scale: q}, {
                    scale: p,
                    onComplete: function () {
                        r.restart()
                    }
                }));
                break;
            case"rs-wave":
                var s = (parseInt(params.loop_xorigin, 0) / 100 - .5) * d.width(), v = (parseInt(params.loop_yorigin, 0) / 100 - .5) * d.height(), w = -1 * k + v, x = 0 + s, y = {
                    a: 0,
                    ang: j,
                    element: d,
                    unit: k,
                    xoffset: x,
                    yoffset: w
                }, z = parseInt(j, 0);
                r.add(punchgs.TweenLite.fromTo(y, g, {a: 0 + z}, {
                    a: 360 + z,
                    force3D: "auto",
                    ease: punchgs.Linear.easeNone,
                    onUpdate: function () {
                        var a = y.a * (Math.PI / 180), b = y.yoffset + y.unit * (1 - Math.sin(a)), c = y.xoffset + Math.cos(a) * y.unit;
                        punchgs.TweenLite.to(y.element, .1, {force3D: "auto", x: c, y: b})
                    },
                    onComplete: function () {
                        r.restart()
                    }
                }))
        }
        r.play(), a.data("tl", r)
    }, t.rebuildLayerIdle = function (a, b, c) {
        if (b = void 0 == b ? 50 : b, c = void 0 != c && c, 0 == g_rebuildTimer && (b = 0, g_rebuildTimer = 999), void 0 == a || 0 == jQuery(a).length || a[0].classList.contains("layer-deleted"))return !1;
        var d = jQuery(a);
        clearTimeout(d.data("idlerebuildtimer")), t.rebuildLayerIdleProgress(a);
        var e = u.getSerialFromID(a.attr("id")), f = u.getLayer(e, c), g = a.find(".tp-caption img");
        if (u.updateHtmlLayerPosition(!1, f, u.getVal(f, "top"), u.getVal(f, "left"), u.getVal(f, "align_hor"), u.getVal(f, "align_vert")), g.length > 0 && !jQuery(g).hasClass("loaded")) {
            jQuery(g).addClass("loaded");
            var h = new Image;
            h.onload = function () {
                f.originalWidth = this.width, f.originalHeight = this.height, u.updateHtmlLayerPosition(!1, f, u.getVal(f, "top"), u.getVal(f, "left"), u.getVal(f, "align_hor"), u.getVal(f, "align_vert"))
            }, h.onerror = function () {
                g[0].src = f.image_url = g_revslider_url + "/admin/images/tp-brokenimage.png", u.updateHtmlLayerPosition(!1, f, u.getVal(f, "top"), u.getVal(f, "left"), u.getVal(f, "align_hor"), u.getVal(f, "align_vert"))
            }, h.onabort = function () {
                u.updateHtmlLayerPosition(!1, f, u.getVal(f, "top"), u.getVal(f, "left"), u.getVal(f, "align_hor"), u.getVal(f, "align_vert"))
            }, h.src = g[0].src
        } else u.updateHtmlLayerCorners(f), u.updateCrossIconPosition(f);
        return u.extendSlideHeightBasedOnRows(), !0
    }, t.rebuildLayerIdleProgress = function (caption) {
        if (void 0 !== caption) {
            var is_demo = caption.attr("id") !== caption.attr("id").replace("demo_layer_");
            if (void 0 == caption || 0 == jQuery(caption).length)return !1;
            var id = u.getSerialFromID(caption.attr("id")), params = u.getLayer(id, is_demo);
            if (void 0 == params || 0 == params)return !1;
            punchgs.TweenLite.set(caption.find(".tp-mask-wrap"), {
                clearProps: "all",
                visibility: "visible",
                opacity: 1
            }), "column" === params.type && punchgs.TweenLite.set(caption.find(".column_background").first(), {
                clearProps: "all",
                visibility: "visible",
                opacity: 1
            });
            var inlayer = jQuery(caption[0].getElementsByClassName("innerslide_layer")[0]), deform = params.deformation, deformidle = params.deformation, deformhover = params["deformation-hover"], ss = params.static_styles, fontcolor = window.RevColor.get(u.getVal(ss, "color")), fonttrans = deform["color-transparency"], bgcolor = window.RevColor.get(deform["background-color"]), bordercolor = deform["border-color"], bordertrans = deform["border-transparency"];
            if ("audio" == params.type)return params.video_data.video_show_visibility ? caption.addClass("invisible-audio") : caption.removeClass("invisible-audio"), !1;
            if (is_demo && params.alias, void 0 != inlayer.data("mySplitText")) {
                try {
                    inlayer.data("mySplitText").revert()
                } catch (a) {
                }
                "text" != params.type && "button" != params.type || (inlayer[0].innerHTML = params.text, u.makeCurrentLayerRotatable()), inlayer.removeData("mySplitText")
            }
            if (Number(bordertrans) < 1) {
                var rgb = UniteAdminRev.convertHexToRGB(bordercolor);
                bordercolor = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + bordertrans + ")"
            }
            var mwidth = u.getVal(params, "max_width"), mheight = u.getVal(params, "max_height"), cmode = u.getVal(params, "cover_mode"), loc_position = "absolute";
            switch (params.type) {
                case"image":
                    mwidth = u.getVal(params, "scaleX"), mheight = u.getVal(params, "scaleY");
                    break;
                case"video":
                    mwidth = !0 === params.video_data.cover || !0 === params.video_data.fullwidth ? "100%" : u.getVal(params, "video_width"), mheight = !0 === params.video_data.cover || !0 === params.video_data.fullwidth ? "100%" : u.getVal(params, "video_height"), caption.find(".slide_layer_video").css({
                        width: parseInt(mwidth, 0) + "px",
                        height: parseInt(mheight, 0) + "px"
                    });
                    break;
                case"row":
                    mwidth = "100%", "bottom" === u.getVal(params, "align_vert") ? caption[0].style.position = "absolute" : caption[0].style.position = "relative", "mobile" === params.column_break_at && "mobile" === t.layout || "tablet" === params.column_break_at && ("tablet" === t.layout || "mobile" === t.layout) || "notebook" === params.column_break_at && "desktop" !== t.layout ? caption.addClass("rev_breakcolumns") : caption.removeClass("rev_breakcolumns");
                    break;
                case"column":
                    mwidth = 100 * eval(params.column_size) + "%", mheight = "auto", caption[0].style.position = "relative", caption[0].style.display = "table_cell", caption[0].style.minHeight = parseInt(u.getVal(params, "min_height"), 0) + "px", caption[0].style.verticalAlign = deform["vertical-align"], caption[0].cb = void 0 === caption[0].cb ? caption.find(".column_background") : caption[0].cb, void 0 !== params.bgimage_url && params.bgimage_url.length > 0 ? caption[0].cb.css({
                        backgroundImage: "url('" + params.bgimage_url + "')",
                        backgroundSize: params.layer_bg_size,
                        backgroundPosition: params.layer_bg_position,
                        backgroundRepeat: params.layer_bg_repeat
                    }) : caption[0].cb.css({backgroundImage: "", background: bgcolor});
                    break;
                case"group":
                    switch (mwidth) {
                        case"#1/1#":
                            mwidth = "100%";
                            break;
                        case"#1/2#":
                            mwidth = "50%";
                            break;
                        case"#1/3#":
                            mwidth = "33.333333%";
                            break;
                        case"#2/3#":
                            mwidth = "66.666666%";
                            break;
                        case"#1/4#":
                            mwidth = "25%";
                            break;
                        case"#3/4#":
                            mwidth = "75%";
                            break;
                        case"#1/5#":
                            mwidth = "20%";
                            break;
                        case"#2/5#":
                            mwidth = "40%";
                            break;
                        case"#3/5#":
                            mwidth = "60%";
                            break;
                        case"#4/5#":
                            mwidth = "80%";
                            break;
                        case"#1/6#":
                            mwidth = "16.666666%";
                            break;
                        case"#4/6#":
                            mwidth = "66.666666%";
                            break;
                        case"#5/6#":
                            mwidth = "83.333333%"
                    }
            }
            void 0 !== deform.overflow && "group" === params.type || (deform.overflow = "visible"), void 0 == mwidth && (mwidth = ""), void 0 == mheight && (mheight = ""), -1 !== params.p_uid && "column" === u.getObjLayerType(params.p_uid) ? punchgs.TweenLite.set(caption, {
                position: "relative",
                display: u.getVal(params, "display"),
                top: "auto",
                left: "auto",
                right: "auto",
                bottom: "auto"
            }) : "column" === params.type ? punchgs.TweenLite.set(caption, {
                position: "absolute",
                display: "table-cell"
            }) : punchgs.TweenLite.set(caption, {
                position: "absolute",
                display: "block"
            }), "column" === params.type && (bgcolor = "transparent"), mwidth = void 0 === cmode || "custom" === cmode ? jQuery.isNumeric(mwidth) ? mwidth + "px" : mwidth.match(/px/g) ? parseInt(mwidth, 0) + "px" : mwidth.match(/%/g) ? parseFloat(mwidth) + "%" : mwidth : "fullwidth" === cmode || "cover" === cmode || "cover-proportional" === cmode ? "100%" : mwidth, mheight = void 0 === cmode || "custom" === cmode ? jQuery.isNumeric(mheight) ? mheight + "px" : mheight.match(/px/g) ? parseInt(mheight, 0) + "px" : mheight.match(/%/g) ? parseFloat(mheight, 0) + "%" : mheight : "fullheight" === cmode || "cover" === cmode || "cover-proportional" === cmode ? "100%" : mheight, caption[0].style.width = mwidth, caption[0].style.height = mheight, "row" === params.type && (caption[0].style.minHeight = mheight);
            var fw = parseInt(u.getVal(ss, "font-weight"), 0) || 400, bgimage = "";
            punchgs.TweenLite.set(inlayer, {
                clearProps: "all",
                visibility: "visible",
                opacity: 1
            }), void 0 !== params.bgimage_url && params.bgimage_url.length > 0 && "column" !== params.type ? inlayer.css({
                backgroundImage: "url('" + params.bgimage_url + "')",
                backgroundSize: params.layer_bg_size,
                backgroundPosition: params.layer_bg_position,
                backgroundRepeat: params.layer_bg_repeat
            }) : inlayer.css({
                backgroundImage: "",
                backgroundSize: params.layer_bg_size,
                backgroundPosition: params.layer_bg_position,
                backgroundRepeat: params.layer_bg_repeat
            });
            var inlay_object_anim = {
                z: deform.z,
                scaleX: parseFloat(deform.scalex),
                scaleY: parseFloat(deform.scaley),
                textAlign: u.getVal(params, "text-align"),
                rotationX: parseFloat(deform.xrotate),
                rotationY: parseFloat(deform.yrotate),
                rotationZ: parseFloat(params["2d_rotation"]),
                skewX: parseFloat(deform.skewx),
                skewY: parseFloat(deform.skewy),
                transformPerspective: parseFloat(deform.pers),
                transformOrigin: params.layer_2d_origin_x + "%" + params.layer_2d_origin_y + "%",
                autoAlpha: deform.opacity,
                paddingTop: parseInt(u.getVal(params, "padding")[0], 0) + "px",
                paddingRight: parseInt(u.getVal(params, "padding")[1], 0) + "px",
                paddingBottom: parseInt(u.getVal(params, "padding")[2], 0) + "px",
                paddingLeft: parseInt(u.getVal(params, "padding")[3], 0) + "px",
                fontSize: parseInt(u.getVal(ss, "font-size"), 0) + "px",
                lineHeight: parseInt(u.getVal(ss, "line-height"), 0) + "px",
                fontWeight: fw,
                color: fontcolor,
                letterSpacing: parseInt(u.getVal(ss, "letter-spacing"), 0) + "px",
                fontStyle: deformidle["font-style"],
                textDecoration: deform["text-decoration"],
                textTransform: deform["text-transform"],
                borderColor: bordercolor,
                borderRadius: deform["border-radius"][0] + " " + deform["border-radius"][1] + " " + deform["border-radius"][2] + " " + deform["border-radius"][3],
                borderWidth: deform["border-width"][0] + " " + deform["border-width"][1] + " " + deform["border-width"][2] + " " + deform["border-width"][3],
                borderStyle: deform["border-style"],
                whiteSpace: u.getVal(params, "whitespace"),
                maxWidth: "100%",
                maxHeight: "100%"
            };
            if (bgcolor.indexOf("gradient") >= 0 ? inlay_object_anim.background = bgcolor : inlay_object_anim.backgroundColor = bgcolor, void 0 !== deform.blurfilter && parseInt(deform.blurfilter, 0) > 0 || void 0 !== deformhover.blurfilter && parseInt(deformhover.blurfilter, 0) > 0) {
                var bf = "blur(" + parseInt(deform.blurfilter, 0) + "px)";
                inlay_object_anim["-webkit-filter"] = bf, inlay_object_anim.filter = bf
            }
            if (void 0 !== deform.grayscalefilter && parseInt(deform.grayscalefilter, 0) > 0 || void 0 !== deformhover.grayscalefilter && parseInt(deformhover.grayscalefilter, 0) > 0) {
                var gf = "grayscale(" + parseInt(deform.grayscalefilter, 0) + "%)";
                inlay_object_anim["-webkit-filter"] = void 0 === inlay_object_anim["-webkit-filter"] ? gf : inlay_object_anim["-webkit-filter"] + " " + gf, inlay_object_anim.filter = void 0 === inlay_object_anim.filter ? gf : inlay_object_anim.filter + " " + gf
            }
            if (void 0 !== deform.brightnessfilter && 100 !== parseInt(deform.brightnessfilter, 0) || void 0 !== deformhover.brightnessfilter && 100 != parseInt(deformhover.brightnessfilter, 0)) {
                var brf = "brightness(" + parseInt(deform.brightnessfilter, 0) + "%)";
                inlay_object_anim["-webkit-filter"] = void 0 === inlay_object_anim["-webkit-filter"] ? brf : inlay_object_anim["-webkit-filter"] + " " + brf, inlay_object_anim.filter = void 0 === inlay_object_anim.filter ? brf : inlay_object_anim.filter + " " + brf
            }
            switch (deformidle["font-family"] && (inlay_object_anim.fontFamily = deformidle["font-family"]), "group" === params.type && punchgs.TweenLite.set(inlayer.find(".tp_layer_group_inner_wrapper").first(), {overflow: deform.overflow}), "row" === params.type && punchgs.TweenLite.set(inlayer.find(".tp_layer_group_inner_wrapper").first(), {minHeight: mheight}), void 0 !== params.layer_blend_mode && jQuery.inArray(params.type, ["image", "shape", "text", "svg"] >= 0) && punchgs.TweenLite.set(inlayer.closest(".slide_layer"), {mixBlendMode: params.layer_blend_mode}), params.type) {
                case"shape":
                case"svg":
                    punchgs.TweenLite.set(caption, {
                        marginTop: parseInt(u.getVal(params, "margin")[0], 0) + "px",
                        marginRight: parseInt(u.getVal(params, "margin")[1], 0) + "px",
                        marginBottom: parseInt(u.getVal(params, "margin")[2], 0) + "px",
                        marginLeft: parseInt(u.getVal(params, "margin")[3], 0) + "px"
                    });
                    break;
                case"column":
                    punchgs.TweenLite.set(caption.find(".column_background"), {
                        borderTopWidth: parseInt(u.getVal(params, "margin")[0], 0) + "px",
                        borderRightWidth: parseInt(u.getVal(params, "margin")[1], 0) + "px",
                        borderBottomWidth: parseInt(u.getVal(params, "margin")[2], 0) + "px",
                        borderLeftWidth: parseInt(u.getVal(params, "margin")[3], 0) + "px"
                    }), inlay_object_anim.marginTop = parseInt(u.getVal(params, "margin")[0], 0) + "px", inlay_object_anim.marginRight = parseInt(u.getVal(params, "margin")[1], 0) + "px", inlay_object_anim.marginBottom = parseInt(u.getVal(params, "margin")[2], 0) + "px", inlay_object_anim.marginLeft = parseInt(u.getVal(params, "margin")[3], 0) + "px";
                    break;
                default:
                    punchgs.TweenLite.set(caption, {
                        marginTop: parseInt(u.getVal(params, "margin")[0], 0) + "px",
                        marginRight: parseInt(u.getVal(params, "margin")[1], 0) + "px",
                        marginBottom: parseInt(u.getVal(params, "margin")[2], 0) + "px",
                        marginLeft: parseInt(u.getVal(params, "margin")[3], 0) + "px"
                    })
            }
            if ("image" === params.type && (params.scaleProportional ? (punchgs.TweenLite.set(inlayer.find("img"), {
                    width: "100%",
                    height: "auto"
                }), inlay_object_anim.width = "100%", inlay_object_anim.height = "auto") : (punchgs.TweenLite.set(inlayer.find("img"), {
                    width: "100%",
                    height: "100%"
                }), inlay_object_anim.width = "100%", inlay_object_anim.height = "100%")), "video" === params.type && (punchgs.TweenLite.set(inlayer.find(".slide_layer_video"), {
                    width: "100%",
                    height: "100%"
                }), inlay_object_anim.width = "100%", inlay_object_anim.height = "100%"), "svg" === params.type && void 0 != params.svg) {
                var svgstrokecolor = window.RevColor.get(params.svg["svgstroke-color"]) || "transparent", svgstrokewidth = params.svg["svgstroke-width"] || 0, svgstrokedasharray = params.svg["svgstroke-dasharray"] || 0, svgstrokedashoffset = params.svg["svgstroke-dashoffset"] || 0;
                punchgs.TweenLite.set(inlayer.find("svg"), {
                    fill: fontcolor,
                    stroke: svgstrokecolor,
                    strokeWidth: svgstrokewidth,
                    strokeDasharray: svgstrokedasharray,
                    strokeDashoffset: svgstrokedashoffset
                }), punchgs.TweenLite.set(inlayer.find("svg path"), {fill: fontcolor})
            }
            if (punchgs.TweenLite.set(inlayer, inlay_object_anim), void 0 != params.inline && void 0 != params.inline.idle && jQuery.each(params.inline.idle, function (a, b) {
                    inlayer.css(a, b)
                }), !0 === params.hover) {
                deform = params["deformation-hover"];
                var fontcolor = window.RevColor.get(deform.color), fonttrans = deform["color-transparency"], bgcolor = window.RevColor.get(deform["background-color"]), bgtrans = deform["background-transparency"], bordercolor = deform["border-color"], bordertrans = deform["border-transparency"];
                if (Number(bordertrans) < 1) {
                    var rgb = UniteAdminRev.convertHexToRGB(bordercolor);
                    bordercolor = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + bordertrans + ")"
                }
                var tl = new punchgs.TimelineLite;
                tl.pause();
                var hoverspeed = parseFloat(deform.speed) / 1e3;
                hoverspeed = 0 === hoverspeed ? .001 : hoverspeed;
                var hover_object_anim = {
                    scaleX: parseFloat(deform.scalex),
                    scaleY: parseFloat(deform.scaley),
                    rotationX: parseFloat(deform.xrotate),
                    rotationY: parseFloat(deform.yrotate),
                    rotationZ: parseFloat(deform["2d_rotation"]),
                    skewX: parseFloat(deform.skewx),
                    skewY: parseFloat(deform.skewy),
                    autoAlpha: deform.opacity,
                    color: fontcolor,
                    textDecoration: deform["text-decoration"],
                    borderColor: bordercolor,
                    borderRadius: parseInt(deform["border-radius"][0], 0) + "px " + parseInt(deform["border-radius"][1], 0) + "px " + parseInt(deform["border-radius"][2], 0) + "px " + parseInt(deform["border-radius"][3], 0) + "px",
                    borderWidth: parseInt(deform["border-width"][0], 0) + "px " + parseInt(deform["border-width"][1], 0) + "px " + parseInt(deform["border-width"][2], 0) + "px " + parseInt(deform["border-width"][3], 0) + "px",
                    borderStyle: deform["border-style"],
                    onComplete: function () {
                        params.inline && void 0 != params.inline.hover && jQuery.each(params.inline.hover, function (a, b) {
                            inlayer.css(a, b)
                        })
                    },
                    ease: deform.easing
                };
                if (bgcolor.indexOf("gradient") >= 0 ? hover_object_anim.background = bgcolor : hover_object_anim.backgroundColor = bgcolor, void 0 !== deform.blurfilter && parseInt(deform.blurfilter, 0) > 0 || void 0 !== deformidle.blurfilter && parseInt(deformidle.blurfilter, 0) > 0) {
                    var bf = "blur(" + parseInt(deform.blurfilter, 0) + "px)";
                    hover_object_anim["-webkit-filter"] = bf, hover_object_anim.filter = bf
                }
                if (void 0 !== deform.grayscalefilter && parseInt(deform.grayscalefilter, 0) > 0 || void 0 !== deformidle.grayscalefilter && parseInt(deformidle.grayscalefilter, 0) > 0) {
                    var gf = "grayscale(" + parseInt(deform.grayscalefilter, 0) + "%)";
                    hover_object_anim["-webkit-filter"] = void 0 === hover_object_anim["-webkit-filter"] ? gf : hover_object_anim["-webkit-filter"] + " " + gf, hover_object_anim.filter = void 0 === hover_object_anim.filter ? gf : hover_object_anim.filter + " " + gf
                }
                if (void 0 !== deform.brightnessfilter && 100 != parseInt(deform.brightnessfilter, 0) || void 0 !== deformidle.brightnessfilter && 100 != parseInt(deformidle.brightnessfilter, 0)) {
                    var brf = "brightness(" + parseInt(deform.brightnessfilter, 0) + "%)";
                    hover_object_anim["-webkit-filter"] = void 0 === hover_object_anim["-webkit-filter"] ? brf : hover_object_anim["-webkit-filter"] + " " + brf, hover_object_anim.filter = void 0 === hover_object_anim.filter ? brf : hover_object_anim.filter + " " + brf
                }
                if (tl.add(punchgs.TweenLite.to(inlayer, hoverspeed, hover_object_anim)), "svg" === params.type && void 0 != params.svg) {
                    var svgstrokecolor = window.RevColor.get(params.svg["svgstroke-hover-color"]) || "transparent", svgstrokewidth = params.svg["svgstroke-hover-width"] || 0, svgstrokedasharray = params.svg["svgstroke-hover-dasharray"] || 0, svgstrokedashoffset = params.svg["svgstroke-hover-dashoffset"] || 0;
                    tl.add(punchgs.TweenLite.to(inlayer.find("svg"), hoverspeed, {
                        fill: fontcolor,
                        stroke: svgstrokecolor,
                        strokeWidth: svgstrokewidth,
                        strokeDasharray: svgstrokedasharray,
                        strokeDashoffset: svgstrokedashoffset,
                        ease: deform.easing
                    }), 0), tl.add(punchgs.TweenLite.to(inlayer.find("svg path"), hoverspeed, {fill: fontcolor}), 0)
                }
                inlayer.data("hoveranim", tl), void 0 !== caption.data("hoverexist") && !1 !== caption.data("hoverexist") || (caption.hover(function () {
                    if (jQuery("#rs-style-tab-button").hasClass("selected") && jQuery("#toggle-idle-hover").hasClass("idleisselected")) {
                        var a = jQuery(this).find(".innerslide_layer").first();
                        if (a.length > 0 && void 0 != a.data("hoveranim")) {
                            a.data("hoveranim").play(0)
                        }
                    }
                }, function () {
                    if (jQuery("#rs-style-tab-button").hasClass("selected") && jQuery("#toggle-idle-hover").hasClass("idleisselected")) {
                        var a = jQuery(this).find(".innerslide_layer").first();
                        if (a.length > 0 && void 0 != a.data("hoveranim")) {
                            a.data("hoveranim").reverse()
                        }
                    }
                }), caption.data("hoverexist", !0)), document.getElementById("toggle-idle-hover").classList.contains("hoverisselected") ? tl.seek(tl.endTime()) : (tl.seek(0), tl.pause(0), setTimeout(function () {
                    tl.pause(0)
                }, 109))
            } else caption.unbind("hover"), caption.data("hoverexist", !1)
        }
    }, t.animateCurrentSelectedLayer = function (a) {
        u.removeCurrentLayerRotatable();
        var b = jQuery(".slide_layer.layer_selected").find(".innerslide_layer").first();
        if (0 == b.length)return !1;
        if (void 0 == b.data("tl"))var c = new punchgs.TimelineLite; else var c = b.data("tl");
        c.clear(), c.kill(), c.pause(), b.data("inanim", theLayerInAnimation(b)), b.data("outanim", theLayerOutAnimation(b)), c.addLabel("inanimation"), c.add(b.data("inanim"), "=+0.2"), c.addLabel("outanimation"), c.add(punchgs.TweenLite.fromTo(jQuery("#startanim_timerunner"), 1, {
            x: 0,
            y: 0
        }, {y: 41}), "outanimation"), c.add(punchgs.TweenLite.fromTo(jQuery("#startanim_timerunnerbox"), 1, {
            x: 0,
            y: 0
        }, {y: 41}), "outanimation"), c.add(punchgs.TweenLite.fromTo(jQuery("#endanim_timerunnerbox"), 1, {
            x: 0,
            y: -41
        }, {x: 0, y: 0}), "outanimation"), c.add(punchgs.TweenLite.fromTo(jQuery("#endanim_timerunner"), 1, {
            x: 0,
            y: -41
        }, {y: 0}), "outanimation"), c.add(punchgs.TweenLite.set(jQuery("#endanim_wrapper"), {
            width: 67,
            autoAlpha: 1
        }), "outanimation"), c.add(b.data("outanim")), c.eventCallback("onComplete", function () {
            c.restart()
        }), c.play(), b.data("tl", c)
    };
    var checkAnimValue = function (a, b, c, d, e) {
        var f = a, g = b;
        if (jQuery.isNumeric(parseFloat(f)))return parseFloat(f);
        if (void 0 === f || "inherit" === f)return g;
        if (f.split("{").length > 1) {
            var h = f.split(",");
            if (max = h[1].split("}")[0], h = h[0].split("{")[1], void 0 !== e && e > 1) {
                f = "[" + (parseInt(Math.random() * (max - h), 0) + parseInt(h, 0));
                for (var i = 0; i < e; i++)f = f + "|" + (parseInt(Math.random() * (max - h), 0) + parseInt(h, 0));
                f += "]"
            } else f = Math.random() * (max - h) + h;
            return f
        }
        var j = jQuery("#divLayers").width(), k = jQuery("#divLayers").height(), l = c.closest(".slide_layer"), m = l.width(), n = l.height(), o = l.position();
        if (f.match(/%]/g)) f = f.split("[")[1].split("]")[0], "horizontal" == d ? f = m * parseInt(f, 0) / 100 : "vertical" == d && (f = n * parseInt(f, 0) / 100); else switch (f.toLowerCase()) {
            case"top":
            case"stage_top":
                f = 0 - n - o.top;
                break;
            case"bottom":
            case"stage_bottom":
                f = k;
                break;
            case"stage_left":
            case"left":
                f = 0 - m - o.left;
                break;
            case"right":
            case"stage_right":
                f = j;
                break;
            case"center":
            case"stage_center":
                f = j / 2 - o.left - m / 2;
                break;
            case"middle":
            case"stage_middle":
                f = k / 2 - o.top - n / 2;
                break;
            case"layer_top":
                f = 0 - n;
                break;
            case"layer_bottom":
                f = n;
                break;
            case"layer_left":
                f = 0 - m;
                break;
            case"layer_right":
                f = m;
                break;
            case"layer_center":
                f = m / 2;
                break;
            case"layer_middle":
                f = n / 2
        }
        return f
    }, initSlideDuration = function () {
        var a = jQuery("#delay").val();
        void 0 != a && 0 != a && "undefined" != a || (a = g_slideTime), jQuery("#mastertimer-maxtime").css({left: a / 10})
    };
    t.masterTimerPositionChange = function (a) {
        var b = jQuery(document.getElementById("mastertimer-position")), c = (b[0].getBoundingClientRect().left - document.getElementById("master-rightheader").getBoundingClientRect().left + t.timercorrectur) / 100, d = jQuery(document.getElementById("divbgholder")).data("slidetimeline");
        if (b[0].className = b[0].classList.contains("hovering") ? b[0].className : b[0].className + " hovering", c <= 0 && ("wasnotidle" == b.data("wasidle") || void 0 == b.data("wasidle")) && (t.stopAllLayerAnimation(), b.data("wasidle", "wasidle"), void 0 != b.data("tl") && b.data("tl").kill(), void 0 != d && (d.stop(), d.seek(1e5)), t.allLayerToIdle()), c > 0 && ("wasidle" == b.data("wasidle") || void 0 == b.data("wasidle")) && (b.data("wasidle", "wasnotidle"), createGlobalTimeline(!0), document.getElementById("mastertimer-playpause-wrapper").innerHTML = '<i class="eg-icon-play"></i><span>PLAY</span>', b[0].className = b[0].classList.contains("inaction") ? b[0].className : b[0].className + " inaction"), c > 0 && "wasnotidle" == b.data("wasidle")) {
            a && createGlobalTimeline(!1);
            var e = b.data("tl");
            e.stop(), d.stop(), e.seek(c), d.seek(c)
        }
        if (c > 0) {
            var f = document.getElementById("mastertimer-poscurtime");
            f.className = f.classList.contains("movedalready") ? f.className : f.className + " movedalready", f.innerHTML = t.convToTime(100 * c), b.removeClass("timerinidle")
        } else {
            var f = document.getElementById("mastertimer-poscurtime");
            f.classList.contains("movedalready") && (f.innerHTML = "Idle", b.addClass("timerinidle"))
        }
        b.trigger("poschanged")
    }, t.convToTime = function (a) {
        var b = Math.floor(a / 6e3), c = Math.floor(Math.ceil(a - 6e3 * b) / 100), d = Math.round(a - 100 * c - 6e3 * b);
        return 0 == b ? b = "00" : b < 10 && (b = "0" + b.toString()), 0 == c ? c = "00" : c < 10 && (c = "0" + c.toString()), 0 == d ? d = "00" : d < 10 && (d = "0" + d.toString()), b.toString() + ":" + c.toString() + "." + d.toString()
    }, t.allLayerToIdle = function (a) {
        var b = void 0 != a && void 0 != a.type ? "slide_layer_type_" + a.type : "slide_layer";
        elements = document.getElementsByClassName(b);
        for (var c = 0; c < elements.length; c++)t.rebuildLayerIdle(jQuery(elements[c]))
    };
    var initMasterTimer = function () {
        function b() {
            __coffset = parseInt(jQuery("#layers-right").offset().left, 0)
        }

        jQuery("#master-rightheader");
        jQuery("#mastertimer-position").on("poschanged", function () {
            var a = jQuery(this), b = Math.round(a.position().left + t.timercorrectur), c = t.convToTime(b);
            b < 0 && (c = "IDLE"), document.getElementById("master-timer-time").innerHTML = c
        }), jQuery("#mastertimer-backtoidle").click(function () {
            jQuery("#mastertimer-position").removeClass("inaction"), document.getElementById("mastertimer-playpause-wrapper").innerHTML = '<i class="eg-icon-play"></i><span>PLAY</span>', document.getElementById("master-timer-time").innerHTML = "IDLE", t.stopAllLayerAnimation();
            var a = jQuery("#mastertimer-position"), b = jQuery("#divbgholder").data("slidetimeline");
            a.css({left: "-15px"}), void 0 != a.data("tl") && a.data("tl").kill(), void 0 != b && (b.stop(), b.seek(1e5)), t.allLayerToIdle()
        }), jQuery("#divLayers").hover(function () {
            var a = jQuery(document.getElementById("mastertimer-position")), b = document.getElementById("mastertimer-playpause-wrapper"), c = jQuery(document.getElementById("divbgholder")).data("slidetimeline");
            void 0 != a.data("tl") && a.data("tl").stop(), void 0 != c && (c.stop(), c.seek(1e5)), a.removeClass("inaction"), b.innerHTML = '<i class="eg-icon-play"></i><span>PLAY</span>', a.hasClass("hovering") && (a.removeClass("hovering"), t.stopAllLayerAnimation(), t.allLayerToIdle(), jQuery("#layeranimation-playpause").hasClass("inpuase") || t.checkAnimationTab() && t.animateCurrentSelectedLayer(1), jQuery("#loopanimation-playpause").hasClass("inpuase") || t.checkLoopTab() && t.animateCurrentSelectedLayer(2))
        }), jQuery("#mastertimer-wrapper").hover(function () {
            jQuery(this).hasClass("overme") || (jQuery(this).addClass("overme"), t.masterTimerPositionChange(!0))
        }, function () {
            jQuery(this).removeClass("overme")
        }), jQuery("#mastertimer-position").draggable({
            axis: "x", start: function (a, b) {
                punchgs.TweenLite.set(document.getElementById("mastertimer-curtime"), {
                    autoAlpha: 0,
                    x: -3,
                    y: -10
                }), punchgs.TweenLite.set(document.getElementById("mastertimer-curtime-b"), {autoAlpha: 0}), t.deactivatePerfectScrollBars()
            }, drag: function (a, b) {
                b.position.left = Math.max(-15, b.position.left), t.masterTimerPositionChange(!1)
            }, stop: function (a, b) {
                punchgs.TweenLite.set(document.getElementById("mastertimer-curtime"), {
                    autoAlpha: 1,
                    x: -1,
                    y: 0,
                    ease: punchgs.Power2.easeInOut
                }), punchgs.TweenLite.set(document.getElementById("mastertimer-curtime-b"), {autoAlpha: 1})
            }
        }), jQuery("#mastertimer-linear").click(function (a) {
            var b = jQuery("#mastertimer-linear").offset().left, c = jQuery("#master-rightheader").scrollLeft();
            jQuery("#mastertimer-position").css({left: a.pageX - b + c + "px"}), t.masterTimerPositionChange()
        }), jQuery("#mastertimer-maxtime").draggable({
            axis: "x",
            containment: "#master-rightheader",
            create: function (a, b) {
                t.mainMaxTimeLeft = jQuery("#mastertimer-maxtime").position().left, document.getElementById("mastertimer-maxcurtime").innerHTML = t.convToTime(t.mainMaxTimeLeft), t.setIdleZones()
            },
            start: function (a, b) {
                punchgs.TweenLite.set(document.getElementById("mastertimer-curtime"), {
                    autoAlpha: 0,
                    x: -3,
                    y: -10
                }), punchgs.TweenLite.set(document.getElementById("mastertimer-curtime-b"), {autoAlpha: 0}), document.getElementById("mastertimer-maxcurtime").innerHTML = t.convToTime(t.mainMaxTimeLeft), t.setIdleZones(), t.deactivatePerfectScrollBars()
            },
            drag: function (a, b) {
                t.mainMaxTimeLeft = b.position.left, document.getElementById("mastertimer-maxcurtime").innerHTML = t.convToTime(t.mainMaxTimeLeft), document.getElementById("delay").value = 10 * t.mainMaxTimeLeft, t.setIdleZones(), t.compareLayerEndsVSSlideEnd(), t.setSlideTransitionTimerBar()
            },
            stop: function (a, b) {
                punchgs.TweenLite.set(document.getElementById("mastertimer-curtime"), {
                    autoAlpha: 1,
                    x: -1,
                    y: 0,
                    ease: punchgs.Power2.easeInOut
                }), punchgs.TweenLite.set(document.getElementById("mastertimer-curtime-b"), {autoAlpha: 1}), t.mainMaxTimeLeft = b.position.left, document.getElementById("mastertimer-maxcurtime").innerHTML = t.convToTime(t.mainMaxTimeLeft), document.getElementById("delay").value = 10 * t.mainMaxTimeLeft, t.setIdleZones(), g_slideTime = 10 * t.mainMaxTimeLeft, u.setMaintime(g_slideTime), t.compareLayerEndsVSSlideEnd(), t.rerenderAllAudioMap(), t.setSlideTransitionTimerBar()
            }
        }), __ctime = jQuery("#mastertimer-curtime"), __ctimeb = jQuery("#mastertimer-curtime-b"), __ctimei = jQuery("#mastertimer-curtimeinner"), jQuery(window).resize(function () {
            b()
        }), b(), __ctime.data("offset", 0), jQuery(".master-rightcell").on("mousemove", function (a) {
            var b = a.pageX - __coffset - jQuery(document.getElementById("master-rightheader")).data("left");
            0 == __ctime.data("offset") && (punchgs.TweenLite.set(__ctime, {left: b}), punchgs.TweenLite.set(__ctimeb, {left: b + 15}), __ctimei[0].innerHTML = t.convToTime(b - 10))
        }), jQuery("#mastertimer-playpause-wrapper").click(function () {
            var a = jQuery(this);
            if (punchgs.TweenLite.to(jQuery("#mastertimer-poscurtime"), .3, {
                    autoAlpha: 0,
                    x: -3,
                    y: -10,
                    ease: punchgs.Power2.easeInOut
                }), a.find(".eg-icon-pause").length > 0) {
                document.getElementById("mastertimer-playpause-wrapper").innerHTML = '<i class="eg-icon-play"></i><span>PLAY</span>', t.stopAllLayerAnimation();
                var b = jQuery("#mastertimer-position");
                void 0 != b.data("tl") && b.data("tl").kill()
            } else {
                createGlobalTimeline(!0), document.getElementById("mastertimer-playpause-wrapper").innerHTML = '<i class="eg-icon-pause"></i><span>PAUSE</span>', jQuery("#mastertimer-position").addClass("inaction");
                var b = jQuery("#mastertimer-position"), c = b.data("tl"), d = jQuery("#divbgholder").data("slidetimeline"), e = b.position().left / 100;
                c.play(e), d.play(e), jQuery("#divbgholder").data("slidetimeline").play(e), c.eventCallback("onComplete", function () {
                    c.play(0), d.play(0)
                }), c.eventCallback("onUpdate", function () {
                    b.css({left: 100 * c.time()}), b.trigger("poschanged")
                })
            }
        })
    };
    t.setIdleZones = function () {
        for (var a = document.getElementsByClassName("slide-idle-section"), b = 0; b < a.length; b++)a[b].style.left = t.mainMaxTimeLeft + 15 + "px"
    };
    var setFakeAnim = function () {
        var b = jQuery(".slide-trans-cur-ul li").first(), c = b.data("animval"), d = b.text();
        if ("random-selected" != c && "random" != c && "random-static" != c && "random-premium" != c || (c = "fade", d = "Fade"), document.getElementById("fake-select-label").innerHTML = '"' + d + '"', jQuery("#fake-select-label").data("valu", c), removeAllSlots(), slideAnimation(), !0)return !1
    };
    t.setSlideTransitionTimerBar = function () {
        var a = document.getElementById("slide_in_sort_time"), b = a.getElementsByClassName("timeline_frame")[0], c = a.getElementsByClassName("timeline_full")[0], d = document.getElementById("transition_duration") ? document.getElementById("transition_duration").value : 0;
        a.getElementsByClassName("duration_cont")[0].innerHTML = d, jQuery.isNumeric(d) || (d = 500), punchgs.TweenLite.set(b, {width: d / 10}), punchgs.TweenLite.set(c, {
            left: 15,
            width: t.mainMaxTimeLeft
        })
    };
    var addSlideToSortbox = function () {
        t.setSlideTransitionTimerBar();
        var a = document.getElementById("slide_in_sort_time"), b = a.getElementsByClassName("timeline_frame")[0], c = a.getElementsByClassName("duration_cont")[0];
        jQuery(b).resizable({
            minWidth: 0, handles: "e", start: function (a, b) {
            }, stop: function (a, b) {
                document.getElementById("transition_duration").value = 10 * b.size.width, c.innerHTML = 10 * b.size.width, jQuery(".slide-trans-cur-ul li.selected").data("duration", 10 * b.size.width), t.resetSlideAnimations(!0)
            }, resize: function (a, b) {
                document.getElementById("transition_duration").value = 10 * b.size.width, jQuery(".slide-trans-cur-ul li.selected").data("duration", 10 * b.size.width), c.innerHTML = 10 * b.size.width
            }
        })
    };
    t.rerenderAllAudioMap = function () {
        jQuery.each(u.arrLayers, function (a, b) {
            "audio" == b.type && t.drawAudioMap(b)
        })
    }, t.drawAudioMap = function (a) {
        var b = a.references.sorttable.timeline;
        if (b.data("lastaudio") == a.video_data.urlAudio && void 0 != b.data("audiobuffer") ? displayAudioBuffer(a, b.data("audiobuffer")) : loadMusicTimeLine(a, a.video_data.urlAudio), b.data("lastaudio", a.video_data.urlAudio), !AudioContext)return console.log("Audio Map cannot be drawn  in your Browser. Try a recent Chrome or Firefox. "), !1
    }, t.addToSortbox = function (a, b) {
        if (1 === document.getElementById("layers-right-ul").children.length && addSlideToSortbox(), void 0 === a)return !1;
        var c = "", e = (t.isLayerVisible(b.references.htmlLayer), ""), f = "", g = t.getSortboxText(b.alias), h = Number(b.order) + 5, i = "", j = "";
        switch (visibleclass = "in-on", groupLink = void 0 !== b.groupLink ? b.groupLink : 0, b.type) {
            case"group":
                e = " sortable_elements sortable_group", f = " droppable_sortable_group";
                break;
            case"row":
                e = "  sortable_elements sortable_group sortable_row", f = " droppable_sortable_row";
                break;
            case"column":
                e = " sortable_elements sortable_column", f = " droppable_sortable_column";
                break;
            default:
                e = " sortable_elements sortable_layers"
        }
        switch (b.deleted && (e += " layer-deleted"), i += '<li data-uniqueid="' + b.unique_id + '" id="layer_sort_' + a + '" data-type="' + b.type + '" class="mastertimer-layer ui-state-default' + e + '" data-grouptype="' + b.grouptype + '" data-pid="' + b.p_uid + '">', i += '\t<div class="layer_sort_inner_wrapper ' + f + '">', i += '\t\t<span class="mastertimer-timeline-selector-row tipsy_enabled_top" title="Select Layer in Timeline">', i += '\t\t\t<input data-uniqueid="' + b.unique_id + '"  id="lots_id_' + b.unique_id + '" class="layer-on-timeline-selector" style="margin:0px" type="checkbox"/>', i += "\t\t</span>", i += '\t\t<span data-uniqueid="' + b.unique_id + '" class="list-of-layer-links tipsy_enabled_top" title="Choose Layers Group Link">', i += '\t\t\t<span class="layer-link-type-element layer-link-type-element-cs layer-link-type-' + groupLink + '"></span>', i += '\t\t\t<span class="list-of-layer-links-inner">', i += '\t\t\t\t<span data-linktype="1" class="layer-link-type-element layer-link-type-1"></span>', i += '\t\t\t\t<span data-linktype="2" class="layer-link-type-element layer-link-type-2"></span>', i += '\t\t\t\t<span data-linktype="3" class="layer-link-type-element layer-link-type-3"></span>', i += '\t\t\t\t<span data-linktype="4" class="layer-link-type-element layer-link-type-4"></span>', i += '\t\t\t\t<span data-linktype="5" class="layer-link-type-element layer-link-type-5"></span>', i += '\t\t\t\t<span data-linktype="0" class="layer-link-type-element layer-link-type-0"></span>', i += "\t\t\t</span>", i += "\t\t</span>", "column" != b.type ? "row" !== b.type ? (i += '\t<span  class="mastertimer-timeline-zindex-row tipsy_enabled_top" title="z-Index">', i += '\t\t<i style="margin-left:15px;margin-right:0px;" class="layersortclass eg-icon-sort"></i>', i += '\t\t<span class="sortbox_depth" title="z-Index">' + h + "</span>", i += "\t</span>") : i += '\t<span  class="mastertimer-timeline-zindex-row tipsy_enabled_top" style="cursor:default !important" title="z-Index"></span>' : i += ' \t<span class="column_sort_row_spacer"></span>', i += '\t\t<span class="mastertimer-timeline-tillendcontainer" style="">', i += '\t\t\t<span data-uniqueid="' + b.unique_id + '" data-serial="' + a + '" class="till_slideend tipsy_enabled_top ' + c + '" title="Wait till Slides End / Custom End"><i class="eg-icon-back-in-time"></i><i class="eg-icon-download-2"></i></span>', i += "\t\t</span>", i += '\t\t<span class="sort-hover-part layer_sort_layer_text_field">', i += '\t\t\t<span class="sortbox_text"><i class="layertypeclass ', b.type) {
            case"group":
                i += "fa-icon-object-group";
                break;
            case"row":
                i += "rs-icon-layergroup";
                break;
            case"column":
                i += "rs-icon-layercolumns";
                break;
            case"text":
                i += "rs-icon-layerfont";
                break;
            case"image":
                i += "rs-icon-layerimage";
                break;
            case"video":
                i += "rs-icon-layervideo";
                break;
            case"audio":
                i += "rs-icon-layeraudio";
                break;
            case"button":
                i += "rs-icon-layerbutton";
                break;
            case"shape":
                i += "rs-icon-layershape";
                break;
            case"svg":
                i += "rs-icon-layersvg"
        }
        i += '"></i>', i += '\t\t\t\t<input class="timer-layer-text" style="margin-top:-1px !important" type="text" enabled value="' + g + '">', i += "\t\t\t</span>", i += "\t\t</span>", "group" != b.type && "row" != b.type && "column" != b.type || (i += '\t\t<span class="sort_group_collapser"><i class="eg-icon-down-dir"></i><i class="eg-icon-right-dir"></i></span>'), "column" != b.type && (i += '\t\t<span class="timer-manual-edit"><i class="eg-icon-pencil"></i></span>'), i += "\t</div>", "group" != b.type && "row" != b.type || (i += '<ul id="sortable_group_' + b.unique_id + '" class="sortable_groups_wrap sgw_def"></ul>'), "column" == b.type && (i += '<ul id="sortable_columns_' + b.unique_id + '" class="sortable_layers_in_columns sgw_def"></ul>'), i += "</li>";
        var k = "";
        void 0 != b.p_uid && -1 !== b.p_uid && "row" !== b.type && "group" !== b.type && (k = " quick_in_group"), "row" === b.type && (k += " quick_in_row"), j += '<li id="layer_quicksort_' + a + '" data-serial="' + a + '" class="quicksortlayer ui-state-default layer-toolbar-li' + k + '">';
        var l = '<span class="quick-edit-toolbar-in-list">';
        switch (b.type) {
            case"text":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layerfont_n"></i>', l += '<span id="button_edit_layer_' + a + '" class="button_edit_layer layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span id="button_reset_size_' + a + '" class="button_reset_size layer-short-tool revblue"><i class="eg-icon-resize-normal"></i></span>';
                break;
            case"group":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="fa-icon-object-group"></i>', l += '<span  class="layer-short-tool revdarkgray"></span>', l += '<span  class="layer-short-tool revdarkgray"></span>';
                break;
            case"row":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layergroup_n"></i>', l += '<span  class="layer-short-tool revdarkgray"></span>', l += '<span  class="layer-short-tool revdarkgray"></span>';
                break;
            case"column":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layercolumns_n"></i>', l += '<span  class="layer-short-tool revdarkgray"></span>', l += '<span  class="layer-short-tool revdarkgray"></span>', l += '<span  class="layer-short-tool revdarkgray"></span>', l += '<span  class="layer-short-tool revdarkgray"></span>';
                break;
            case"shape":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layershape_n"></i>', l += '<span id="button_edit_shape_' + a + '" class="button_edit_shape layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span  class="layer-short-tool revdarkgray"></span>';
                break;
            case"button":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layerbutton_n"></i>', l += '<span id="button_edit_layer_' + a + '" class="button_edit_layer layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span id="button_reset_size_' + a + '" class="button_reset_size layer-short-tool revblue"><i class="eg-icon-resize-normal"></i></span>';
                break;
            case"image":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layerimage_n"></i>', l += '<span  id="button_change_image_source_' + a + '" class="button_change_image_source layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span id="button_reset_size_' + a + '" class="button_reset_size layer-short-tool revblue"><i class="eg-icon-resize-normal"></i></span>';
                break;
            case"video":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layervideo_n"></i>', l += '<span  id="button_change_video_settings_' + a + '" class="button_change_video_settings layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span  class="layer-short-tool revdarkgray"></span>';
                break;
            case"audio":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layeraudio_n"></i>', l += '<span  id="button_changeaudio_settings_' + a + '" class="button_change_audio_settings layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span  class="layer-short-tool revdarkgray"></span>', e = " layer-sort-audio-item";
                break;
            case"svg":
                j += '<span class="layer-short-tool revdarkgray layer-title-with-icon"><i class="rs-icon-layersvg_n"></i>', l += '<span  id="button_changesvg_settings_' + a + '" class="button_change_svg_settings layer-short-tool revblue"><i class="eg-icon-pencil"></i></span>', l += '<span  class="layer-short-tool revdarkgray"></span>'
        }
        j += '<input type="text" class="layer-title-in-list" value="' + g + '"></span>', j += l, "column" !== b.type && (j += '<span id="button_delete_layer_' + a + '" class="button_delete_layer layer-short-tool revred"><i class="rs-lighttrash"></i></span>', j += '<span id="button_duplicate_layer_' + a + '" class="button_duplicate_layer layer-short-tool revyellow" data-isstatic=""><i class="rs-lightcopy"></i></span>'), j += '<span style="display:block;float:none;clear:both"></span></span>', j += '<span class="quick-layer-view layer-short-tool revdarkgray ' + visibleclass + '"><i class="eg-icon-eye"></i></span>', j += '<span class="quick-layer-lock layer-short-tool revdarkgray"><i class="eg-icon-lock-open"></i></span>', j += '<div style="clear:both;display:block"></div>', j += "</li>", document.getElementById("quick-layers-list-id").childNodes.length > 1 && (document.getElementById("nolayersavailable").style.display = "none");
        var m = "", n = "logical_o" === b.grouptype ? " hide_timeline" : "";
        m += '<li data-uniqueid="' + b.unique_id + '" data-serial="' + a + '" id="layer_sort_time_' + a + '" class="sortable_elements mastertimer-layer ui-state-default' + e + n + '" data-grouptype="' + b.grouptype + '" data-pid="' + b.p_uid + '">', m += '\t\t<div class="timeline_full"></div>', m += '  <div class="timeline">', m += '  \t<div class="timeline-relative-marker trm-groupandrowmarker"></div>', m += '\t\t<div data-frameindex="0" id="tl_' + b.unique_id + '_frame_0" class="timeline_frame tf_startframe tl_layer_frame" data-uniqueid="' + b.unique_id + '" data-serial="' + a + '" style="z-index:50;">', m += ' \t\t\t<span class="timebefore_cont"></span>', m += '\t\t\t<div class="tl_speed_wrapper">', m += '\t\t\t\t<div class="tlf_speed"><span class="duration_cont"></span></div>', m += '\t\t\t\t<div class="tlf_splitdelay"></div>', m += "\t\t\t</div>", m += '\t\t\t<span class="show_timeline_helper">EDIT</span>', m += "\t\t</div>", m += '\t\t<div data-frameindex="999" id="tl_' + b.unique_id + '_frame_999" class="timeline_frame tf_endframe tl_layer_frame" data-uniqueid="' + b.unique_id + '" data-serial="' + a + '" style="z-index:48;">', m += ' \t\t\t<span class="timebefore_cont"></span>', m += '\t\t\t<div class="tl_speed_wrapper">', m += '\t\t\t\t<div class="tlf_speed"><span class="duration_cont"></span></div>', m += '\t\t\t\t<div class="tlf_splitdelay"></div>', m += "\t\t\t</div>", m += '\t\t\t<span class="show_timeline_helper">EDIT</span>', m += "\t\t</div>", m += " </div>", m += ' <div class="slide-idle-section"></div>', m += "</li>";
        var o = !0;
        "row" === b.type && document.getElementById("layers-left-ul").getElementsByClassName("sortable_row").length > 0 && (o = !1, document.getElementById("layers-left-ul").getElementsByClassName("sortable_row")[0].insertAdjacentHTML("afterend", i), document.getElementById("quick-layers-list-id").getElementsByClassName("quick_in_row")[0].insertAdjacentHTML("afterend", j), document.getElementById("layers-right-ul").getElementsByClassName("sortable_row")[0].insertAdjacentHTML("afterend", m)), o && (document.getElementById("layers-left-ul").insertAdjacentHTML("beforeend", i), document.getElementById("quick-layers-list-id").insertAdjacentHTML("beforeend", j), document.getElementById("layers-right-ul").insertAdjacentHTML("beforeend", m)), jQuery("#layer_quicksort_" + a).on("mouseenter", function (a) {
            jQuery(".layer_due_list_element_selected").removeClass("layer_due_list_element_selected"), jQuery("#slide_layer_" + jQuery(this).data("serial")).addClass("layer_due_list_element_selected")
        }), jQuery("#layer_quicksort_" + a).on("mouseleave", function (a) {
            jQuery(".layer_due_list_element_selected").removeClass("layer_due_list_element_selected")
        }), jQuery("#layers-left .tipsy_enabled_top").tipsy({gravity: "s", delayIn: 70}), reinitSortBox();
        var p = document.getElementById("layer_sort_time_" + a), q = jQuery(p), r = p.getElementsByClassName("timeline")[0];
        jQuery(r);
        b.references.sorttable = void 0 === b.references.sorttable ? {} : b.references.sorttable, b.references.sorttable.layer = jQuery(document.getElementById("layer_sort_" + a)), b.references.sorttable.timeline = q, b.references.quicklayer = jQuery(document.getElementById("layer_quicksort_" + a)), "audio" == b.type && (q.data("objref", b), t.drawAudioMap(b), q.on("mousemove", function (a) {
            try {
                var b = jQuery(this), c = b.data("objref"), d = b.data("serial"), e = jQuery("#slide_layer_" + d + " audio")[0];
                if (!b.hasClass("ui-state-hover"))return !1;
                clearTimeout(b.data("audiopreview")), b.find(".audio-progress").remove(), e.pause(), b.data("audiopreview", setTimeout(function () {
                    var d = b.find(".timeline_full"), f = d.position().left, g = d.width(), h = a.pageX - b.offset().left, i = h - f;
                    if (!(h < f || h > f + g)) {
                        b.find(".audio-progress").remove(), b.append('<div class="audio-progress"></div>');
                        var j = b.find(".audio-progress"), k = getStartSec(c.video_data.start_at), l = getStartSec(c.video_data.end_at);
                        k = -1 == k ? 0 : k, l = -1 == l ? 999999999 : l, k /= 60, l /= 60, l = l > e.duration ? e.duration : l;
                        var m = l - k, n = Math.floor(i / (100 * m));
                        i > 100 * m && (i -= 100 * m * n), i > 0 && (restw = 100 * (m - i / 100), punchgs.TweenLite.fromTo(j, m - i / 100, {
                            left: f + i + n * (100 * m),
                            transformOrigin: "0% 50%",
                            width: restw,
                            scaleX: 0
                        }, {
                            scale: 1, ease: punchgs.Linear.easeNone, onUpdate: function () {
                            }, onComplete: function () {
                                e.pause()
                            }
                        })), i > 0 && (e.play(), e.currentTime = i / 100)
                    }
                }, 400))
            } catch (a) {
            }
        }), q.on("mouseleave", function (a) {
            try {
                var b = jQuery(this), c = b.data("serial"), d = jQuery("#slide_layer_" + c + " audio")[0];
                clearTimeout(b.data("audiopreview")), b.find(".audio-progress").remove(), d.pause()
            } catch (a) {
            }
        }));
        for (var u = p.getElementsByClassName("timeline_frame"), v = 0; v < u.length; v++)jQuery(u[v]).resizable({
            handles: "e,w",
            minWidth: 1,
            create: function (a, b) {
                var c = this;
                t.setTLFrame(c), setTimeout(function () {
                    t.frameLimitations(c)
                }, 25)
            },
            start: function (a, b) {
                t.deactivatePerfectScrollBars(), t.updateTLFrame(this, "trigger", void 0, b.size.width)
            },
            resize: function (a, b) {
                t.updateTLFrame(this, "trigger", void 0, b.size.width)
            },
            stop: function (a, b) {
                t.updateTLFrame(this, "trigger")
            }
        }), jQuery(u[v]).draggable({
            axis: "x", start: function (a, b) {
                t.recordFrameStatus(this, b)
            }, drag: function (a, b) {
                t.frameLimitations(this, b), t.updateTLFrame(this, "trigger"), t.updateAllSelectedLayerTimeline(this)
            }, stop: function (a, b) {
                t.frameLimitations(this, b), t.updateTLFrame(this, "trigger"), t.updateAllSelectedLayerTimeline(this)
            }
        });
        t.resetTimeLineHeight(), t.setIdleZones()
    }, t.deactivatePerfectScrollBars = function () {
        jQuery(".revolution-template-groups").perfectScrollbar("destroy")
    }, t.activatePerfectScrollBars = function () {
        jQuery(".revolution-template-groups").perfectScrollbar()
    };
    var checkTillSlideEnd = function (a) {
        var b = 10 * t.mainMaxTimeLeft, c = document.getElementById("layer_sort_" + a.serial);
        a.frames.frame_999.time >= b ? (a.endWithSlide = !0, c.classList.contains("tillendon") || (c.className += " tillendon")) : (a.endWithSlide = !1, jQuery(c).removeClass("tillendon"))
    };
    t.setTLFrame = function (a) {
        var b = a.getElementsByClassName("tlf_speed")[0], c = a.getElementsByClassName("tlf_splitdelay")[0], d = a.getElementsByClassName("duration_cont")[0], e = a.getElementsByClassName("timebefore_cont")[0], f = a.parentNode.parentNode.getElementsByClassName("timeline-relative-marker")[0], a = jQuery(a), g = u.getLayerByUniqueId(a.data("uniqueid")), h = u.checkLayerTriggered(g), i = u.getObjectLength(g.frames);
        g.frames.frame_0.time = Math.max(0, g.frames.frame_0.time), g.frames.frame_999.time = Math.min(10 * t.mainMaxTimeLeft, g.frames.frame_999.time);
        var j = a.data("frameindex"), k = g.frames["frame_" + j].speed, l = g.frames["frame_" + j].time, m = getSplitCounts(g.text, g.frames["frame_" + j].split, g.frames["frame_" + j].splitdelay), n = l;
        if (g.frames["frame_" + j].split_extratime = m, 0 !== m ? (punchgs.TweenLite.set(b, {width: k / 10 - m}), punchgs.TweenLite.set(c, {width: m})) : (punchgs.TweenLite.set(b, {width: k / 10}), punchgs.TweenLite.set(c, {width: 0})), punchgs.TweenLite.set(a, {
                left: l / 10,
                width: m + k / 10
            }), d.innerHTML = k, void 0 !== g.p_uid && -1 !== g.p_uid && void 0 !== u.getLayerByUniqueId(g.p_uid) && "object" == typeof u.getLayerByUniqueId(g.p_uid)) {
            var o = u.getLayerByUniqueId(g.p_uid);
            f.style.display = "block", f.style.width = o.frames.frame_0.time / 10 - 1 + "px", n = l - o.frames.frame_0.time
        } else if (f.style.display = "none", f.style.width = "0px", 0 !== j) {
            var p = 999 === j ? g.frames["frame_" + (i - 2)] : g.frames["frame_" + (j - 1)];
            void 0 !== p && (n = l - (p.time + p.speed + 10 * p.split_extratime))
        }
        l == 10 * t.mainMaxTimeLeft && (e.innerHTML = '<span class="wait_slide_end">WAIT</span>'), g.frames["frame_" + j].time_relative = n, 0 == j && h.in && (e.innerHTML = '<span class="triggered_layer_on_timeline">a</span>'), 999 == j && h.out && (e.innerHTML = '<span class="triggered_layer_on_timeline">a</span>'), t.updateFullTime(g), checkTillSlideEnd(g)
    }, t.updateTLFrame = function (a, b, c, d) {
        t.recordFrameStatusForce && t.recordFrameStatus(a);
        var e = u.getCurrentLayer().serial, f = a.getElementsByClassName("tlf_speed")[0], g = a.getElementsByClassName("tlf_splitdelay")[0], h = a.getElementsByClassName("duration_cont")[0], i = a.getElementsByClassName("timebefore_cont")[0], j = a.parentNode.parentNode.getElementsByClassName("timeline-relative-marker")[0], a = jQuery(a), k = u.getLayerByUniqueId(a.data("uniqueid")), l = {frames: {}}, m = u.getObjectLength(k.frames), n = u.checkLayerTriggered(k);
        if (fi = a.data("frameindex"), speed = 10 * a.outerWidth(), time = 10 * a.position().left, splitdelay = getSplitCounts(k.text, k.frames["frame_" + fi].split, k.frames["frame_" + fi].splitdelay), currentframe = k.frames["frame_" + fi], updateTimerText = !0, timedif = time, l.frames["frame_" + fi] = {}, speed - 10 * splitdelay < 0 && (speed = 10 * splitdelay, punchgs.TweenLite.set(a, {width: splitdelay})), 0 !== splitdelay ? (punchgs.TweenLite.set(f, {width: speed / 10 - splitdelay}), punchgs.TweenLite.set(g, {width: splitdelay})) : (punchgs.TweenLite.set(f, {width: speed / 10}), punchgs.TweenLite.set(g, {width: 0})), h.innerHTML = speed, (time == 10 * t.mainMaxTimeLeft || 0 == fi && n.in || 999 == fi && n.out) && (updateTimerText = !1), void 0 !== k.p_uid && -1 !== k.p_uid && void 0 !== u.getLayerByUniqueId(k.p_uid) && "object" == typeof u.getLayerByUniqueId(k.p_uid)) {
            var o = u.getLayerByUniqueId(k.p_uid);
            timedif = time - o.frames.frame_0.time, j.style.display = "block"
        } else if (j.style.display = "none", j.style.width = "0px", 0 !== fi) {
            var p = 999 === fi ? k.frames["frame_" + (m - 2)] : k.frames["frame_" + (fi - 1)];
            p && (timedif = time - (p.time + p.speed + 10 * p.split_extratime))
        }
        if (time == 10 * t.mainMaxTimeLeft && (i.innerHTML = '<span class="wait_slide_end">WAIT</span>'), 0 == fi && n.in && (i.innerHTML = '<span class="triggered_layer_on_timeline">a</span>'), 999 == fi && n.out && (i.innerHTML = '<span class="triggered_layer_on_timeline">a</span>'), currentframe.time_relative = timedif, l.frames["frame_" + fi].speed = speed - 10 * splitdelay, l.frames["frame_" + fi].time = time, l.frames["frame_" + fi].time_relative = timedif, l.frames["frame_" + fi].split_extratime = splitdelay, k.serial == e && (0 === fi && (document.getElementById("layer_speed").value = l.frames.frame_0.speed), 999 === fi && (document.getElementById("layer_endspeed").value = l.frames.frame_999.speed)), "trigger" !== b && (currentframe.speed = l.frames["frame_" + fi].speed, currentframe.time = l.frames["frame_" + fi].time), 0 === fi && ("row" === k.type || "column" === k.type || "group" == k.type)) {
            for (var q = u.getLayersInGroup(k.unique_id), r = 0; r < q.columns.length; r++) {
                var s = q.columns[r].references.sorttable.timeline, j = s[0].getElementsByClassName("timeline-relative-marker")[0];
                j.style.width = time / 10 - 1 + "px"
            }
            for (r = 0; r < q.layers.length; r++) {
                var s = q.layers[r].references.sorttable.timeline, j = s[0].getElementsByClassName("timeline-relative-marker")[0];
                if ("row" === k.type) {
                    var v = document.getElementById("tl_" + q.layers[r].p_uid + "_frame_0");
                    null !== v && void 0 !== v && (j.style.width = v.style.left)
                } else j.style.width = time / 10 - 1 + "px"
            }
        }
        if (999 !== fi) {
            var w = fi + 1 >= m - 1 ? 999 : fi + 1, x = k.frames["frame_" + w];
            void 0 != x && (x.time_relative = x.time - (currentframe.time + currentframe.speed + 10 * currentframe.split_extratime), l.frames["frame_" + w] = {time_relative: x.time_relative}, k.frames["frame_" + w].time_relative = x.time_relative)
        } else {
            var w = "frame_0";
            for (var y in k.frames)"frame_999" !== y && (w = y);
            var p = k.frames[w];
            if (void 0 != p) {
                var z = k.frames["frame_" + fi].time - (p.time + p.speed + 10 * p.split_extratime);
                l.frames.frame_999.time_relative = z, k.frames.frame_999.time_relative = z
            }
        }
        "trigger" == b ? u.updateLayer(k.serial, l) : currentframe.split_extratime = l.frames["frame_" + fi].split_extratime, t.frameLimitations(a, !1, c, {
            update: updateTimerText,
            triggered: n,
            timecont: i
        }), t.updateFullTime(k), checkTillSlideEnd(k)
    }, t.addLayersColumnsToSelectedElements = function (a, b) {
        var c = u.getLayersInGroup(a.unique_id);
        if ("row" === a.type || "column" == a.type || "group" === a.type) {
            for (var d = 0; d <= c.layers.length - 1; d++) {
                var e = c.layers[d].unique_id;
                if (-1 == jQuery.inArray(e, u.selectedLayers) && -1 == jQuery.inArray(e, u.currentGroupElements)) {
                    var f = document.getElementById("tl_" + e + "_frame_" + b);
                    u.currentGroupElementsPositionLeftReset.push(parseInt(f.style.left, 0)), u.currentGroupElements.push(e)
                }
            }
            if ("row" === a.type)for (var d = 0; d <= c.columns.length - 1; d++) {
                var e = c.columns[d].unique_id;
                if (-1 == jQuery.inArray(e, u.selectedLayers) && -1 == jQuery.inArray(e, u.currentGroupElements)) {
                    var f = document.getElementById("tl_" + e + "_frame_" + b);
                    u.currentGroupElementsPositionLeftReset.push(parseInt(f.style.left, 0)), u.currentGroupElements.push(e)
                }
            }
        }
        return !0
    }, t.recordFrameStatus = function (a, b) {
        var a = jQuery(a), c = a.data("frameindex"), d = u.getLayerByUniqueId(a.data("uniqueid"));
        d.positionLeftReset = void 0 !== b ? b.position.left : a.position().left, u.selectedLayersPositionLeftReset = [], u.currentGroupElements = [], u.currentGroupElementsPositionLeftReset = [];
        for (var e = 0; e <= u.selectedLayers.length - 1; e++) {
            var f = u.selectedLayers[e], g = -1 !== f ? u.getLayerByUniqueId(f) : -1, h = document.getElementById("tl_" + f + "_frame_" + c);
            u.selectedLayersPositionLeftReset.push(parseInt(h.style.left, 0)), -1 !== g && t.addLayersColumnsToSelectedElements(g, 0)
        }
        t.addLayersColumnsToSelectedElements(d, 0), t.recordFrameStatusForce = !1
    }, t.frameLimitations = function (a, b, c, d) {
        t.recordFrameStatusForce && t.recordFrameStatus(a);
        var a = jQuery(a), e = u.getLayerByUniqueId(a.data("uniqueid")), f = a.prev(), g = a.next(), h = g.data("frameindex"), i = a.data("frameindex"), j = void 0 !== b && !1 !== b ? b.position.left : a.position().left, k = a.outerWidth(), l = u.getObjectLength(e.frames), m = e.frames["frame_" + i];
        if (f.length > 0 && (j = Math.max(f.position().left + f.outerWidth(), j)), j = Math.max(0, j), g.length > 0 && 999 !== i && (j = Math.min(g.position().left - k, j)), j = Math.min(t.mainMaxTimeLeft, j), void 0 !== d && d.update) {
            var n = 0;
            if (void 0 !== e.p_uid && 0 === i && -1 !== e.p_uid && void 0 !== u.getLayerByUniqueId(e.p_uid) && "object" == typeof u.getLayerByUniqueId(e.p_uid)) {
                n = 10 * j - u.getLayerByUniqueId(e.p_uid).frames.frame_0.time
            } else if (0 !== i) {
                var p = 999 === i ? e.frames["frame_" + (l - 2)] : e.frames["frame_" + (i - 1)];
                p && (n = 10 * j - (p.time + p.speed + 10 * p.split_extratime))
            }
            "absolute" === t.timelinetype ? d.timecont.innerHTML = 10 * j : d.timecont.innerHTML = n
        }
        if (999 !== i && "absolute" !== t.timelinetype) {
            var q = e.frames["frame_" + h];
            q.time_relative = q.time - (m.time + 10 * m.split_extratime + m.speed), g.find(".timebefore_cont").html(q.time_relative)
        }
        if (void 0 !== b && !1 !== b && (b.position.left = j), punchgs.TweenLite.set(a, {left: j}), u.selectedLayers.length > 0 && !c || void 0 != u.currentGroupElements && u.currentGroupElements.length > 0 && !c) {
            for (var r = j - e.positionLeftReset, s = 0; s <= u.selectedLayers.length - 1; s++) {
                var v = u.selectedLayers[s];
                if (v != e.unique_id) {
                    var w = document.getElementById("tl_" + v + "_frame_" + i);
                    w.style.left = u.selectedLayersPositionLeftReset[s] + r + "px", t.updateFullTime(u.getLayerByUniqueId(v), u.selectedLayersPositionLeftReset[s] + r)
                }
            }
            if (0 === i && void 0 !== u.currentGroupElements && u.currentGroupElements.length > 0)for (var s = 0; s <= u.currentGroupElements.length - 1; s++) {
                var v = u.currentGroupElements[s];
                if (v != e.unique_id) {
                    var w = document.getElementById("tl_" + v + "_frame_" + i);
                    w.style.left = u.currentGroupElementsPositionLeftReset[s] + r + "px", t.updateFullTime(u.getLayerByUniqueId(v), u.currentGroupElementsPositionLeftReset[s] + r)
                }
            }
        }
        t.updateFullTime(e), checkTillSlideEnd(e)
    }, t.updateFullTime = function (a, b) {
        var c = a.references.sorttable.timeline[0].getElementsByClassName("timeline_full")[0], d = jQuery(a.references.sorttable.timeline[0]).find(".timeline_audio"), b = void 0 === b ? 15 + a.frames.frame_0.time / 10 : b + 15, e = 10 * (b - 15);
        punchgs.TweenLite.set(c, {
            left: b,
            width: (a.frames.frame_999.time - e + a.frames.frame_999.split_extratime + a.frames.frame_999.speed) / 10
        }), void 0 !== d && d.length > 0 && punchgs.TweenLite.set(d, {
            left: b,
            width: (a.frames.frame_999.time - e + a.frames.frame_999.split_extratime + a.frames.frame_999.speed) / 10
        })
    }, t.updateLayerTimeline = function (a) {
        for (var b = a.references.sorttable.timeline[0].getElementsByClassName("timeline_frame"), c = 0; c < b.length; c++)t.setTLFrame(b[c]), t.updateTLFrame(b[c], !1, !0)
    }, t.updateCurrentLayerTimeline = function () {
        for (var a = document.getElementById("layer_sort_time_" + u.getCurrentLayer().serial), b = a.getElementsByClassName("timeline_frame"), c = 0; c < b.length; c++)t.setTLFrame(b[c], !1, !0)
    }, t.updateAllLayerTimeline = function () {
        for (var a = document.getElementsByClassName("timeline_frame tl_layer_frame"), b = 0; b < a.length; b++)t.updateTLFrame(a[b], !1, !0)
    }, t.updateAllSelectedLayerTimeline = function (a) {
        var a = jQuery(a), b = a.data("uniqueid"), c = a.data("frameindex");
        if (u.selectedLayers.length > 0)for (var d = 0; d <= u.selectedLayers.length - 1; d++) {
            var e = u.selectedLayers[d];
            e != b && t.updateTLFrame(document.getElementById("tl_" + e + "_frame_" + c), !1, !0)
        }
        if (0 === c && void 0 !== u.currentGroupElements && u.currentGroupElements.length > 0)for (var d = 0; d <= u.currentGroupElements.length - 1; d++) {
            var e = u.currentGroupElements[d];
            e != b && t.updateTLFrame(document.getElementById("tl_" + e + "_frame_" + c), !1, !0)
        }
    }, t.showTimeLineDirectInput = function (a) {
        jQuery("#clayer_start_time").val(a.time), jQuery("#clayer_start_speed").val(a.speed)
    }, t.manageTimeLineDirectInput = function () {
        jQuery("#clayer_start_time, #clayer_end_time").on("change blur", function () {
            var a = t.getLayer(selectedLayerSerial);
            a.time = jQuery("#clayer_start_time").val(), a.frames.frame_999.time = jQuery("#clayer_end_time").val(), a.speed = jQuery("#clayer_start_speed").val(), a.frames.frame_999.speed = jQuery("#clayer_end_speed").val(), jQuery("#layer_speed").val(a.speed), jQuery("#layer_endspeed").val(a.frames.frame_999.speed), t.updateLayerFromFields(), u.updateCurrentLayerTimeline()
        })
    };
    var msToSec = function (a) {
        var b = Math.floor(a / 1e3);
        a -= 1e3 * b;
        var c = b + ".";
        return a < 100 && (c += "0"), c += Math.round(a / 10)
    }, getSplitCounts = function (a, b, c) {
        if (void 0 == a)return 0;
        var d = new Object;
        switch (ht = jQuery("<div>" + a + "</div>"), w = 1, d.c = ht.text().replace(/ /g, "").length, d.w = a.split(" ").length, d.l = a.split("<br").length, b) {
            case"chars":
                w = d.c;
                break;
            case"words":
                w = d.w;
                break;
            case"lines":
                w = d.l
        }
        return (w - 1) * c
    }, showHideTimeines = function () {
        jQuery("#button_sort_timing").click(function () {
            var a = jQuery(this);
            a.hasClass("off") ? (a.removeClass("off"), a.find(".onoff").html("- on"), punchgs.TweenLite.to(jQuery(".sortlist .timeline"), .5, {
                autoAlpha: .5,
                overwrite: "auto"
            })) : (punchgs.TweenLite.to(jQuery(".sortlist .timeline"), .5, {
                autoAlpha: 0,
                overwrite: "auto"
            }), a.addClass("off"), a.find(".onoff").html("- off"))
        })
    };
    t.deleteLayerFromSortbox = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        try {
            b.remove(), c.remove(), d.remove()
        } catch (a) {
        }
        jQuery(".quick-layers-list li").length < 2 && jQuery(".nolayersavailable").show()
    }, t.unselectSortboxItems = function () {
        jQuery(".sortlist li,#layers-right li, .quick-layers-list li").removeClass("ui-state-hover").addClass("ui-state-default")
    }, t.organiseGroupsAndLayer = function (a, b, c) {
        var d = b ? u.arrLayersDemo : u.arrLayers, e = !1;
        for (var f in d) {
            var g = d[f];
            if ("group" != g.type && "row" != g.type && void 0 != g.p_uid && -1 != g.p_uid) {
                var h = b ? null : g.references.sorttable.layer, i = u.getLayerByUniqueId(g.p_uid), j = !b && i ? i.references.sorttable.layer[0].getElementsByClassName("sgw_def")[0] : void 0, k = g.references.htmlLayer, l = i ? i.references.htmlLayer : void 0;
                if (l && k && !l[0].contains(k[0])) {
                    var m = l[0].getElementsByClassName("tp_layer_group_inner_wrapper")[0];
                    if (void 0 !== m && void 0 !== k[0])if ("column" !== g.type) {
                        var p, o = 99999;
                        for (var q in d) {
                            var r = d[q];
                            g.p_uid === r.p_uid && void 0 !== r.references.htmlLayer && void 0 !== r.groupOrder && r.groupOrder > g.groupOrder && r.groupOrder < o && (o = r.groupOrder, !1, p = r.references.htmlLayer)
                        }
                        void 0 !== p && o < 99999 && p[0].parentNode == m ? m.insertBefore(k[0], p[0]) : m.appendChild(k[0])
                    } else m.appendChild(k[0])
                }
                b || a || void 0 === j || j.contains(h[0]) || (e = !0, j.appendChild(h[0])), b || void 0 !== j || "column" !== g.type || u.deleteLayer(g.serial)
            } else {
                g.p_uid = -1;
                var k = g.references.htmlLayer, h = b ? null : g.references.sorttable.layer;
                if ("row" === g.type) {
                    var x, s = "row-zone-" + u.getVal(g, "align_vert"), w = 99999, y = document.getElementById(s);
                    for (var z in d) {
                        var r = d[z];
                        "row" === r.type && r.unique_id !== g.unique_id && u.getVal(g, "align_vert") === u.getVal(r, "align_vert") && void 0 !== r.references.htmlLayer && void 0 !== r.groupOrder && r.groupOrder >= g.groupOrder && r.groupOrder < w && (w = r.groupOrder, !1, x = r.references.htmlLayer)
                    }
                    void 0 !== x && w < 99999 && x[0].parentNode == y ? y.insertBefore(k[0], x[0]) : y.appendChild(k[0]), u.checkRowZoneContents()
                } else"divLayers" != k[0].parentNode.id && document.getElementById("divLayers").appendChild(k[0]);
                b || "layers-left-ul" == h[0].parentNode.id || (document.getElementById("layers-left-ul").insertBefore(h[0], document.getElementById("last_drop_zone_layers")), e = !0)
            }
        }
        u.setMiddleRowZone(), e && t.updateOrderFromSortbox(c)
    }, t.updateOrderFromSortbox = function (a) {
        for (j in u.arrLayers) {
            var b = u.arrLayers[j];
            if ("column" != b.type && "row" != b.type && "group" != b.type) {
                var c = b.references.sorttable.layer, d = c[0].parentNode.parentNode.classList.contains("sortable_column"), e = c[0].parentNode.parentNode.classList.contains("sortable_group"), f = -1;
                if (!d && !e || "layers-left-ul" == c[0].parentNode.parentNode.id); else {
                    var g = jQuery(c[0].parentNode.parentNode);
                    if (!d) {
                        c.data("pid", g.data("uniqueid"));
                        "row" === g.data("type") && (g = c.prev(), 0 == g.length && (g = c.next()), g[0].getElementsByClassName("sortable_layers_in_columns")[0].appendChild(c[0]))
                    }
                    f = g.data("uniqueid")
                }
                c.data("pid", f), c.attr("pid", f), b.p_uid != f && (b.p_uid = f, u.add_layer_change())
            }
        }
        for (var i = jQuery("#layers-left-ul").sortable("toArray", {attribute: "data-uniqueid"}), j = 0; j < i.length; j++) {
            var b = u.getLayerByUniqueId(i[j]), k = j + 5;
            u.arrLayers[b.serial].order = j, u.arrLayers[b.serial].zIndex = k, b.references.sorttable.layer[0].getElementsByClassName("sortbox_depth")[0] && (b.references.sorttable.layer[0].getElementsByClassName("sortbox_depth")[0].innerHTML = k), document.getElementById("layers-right-ul").appendChild(b.references.sorttable.timeline[0]), document.getElementById("quick-layers-list-id").appendChild(b.references.quicklayer[0]), -1 != b.p_uid && void 0 !== b.p_uid && "row" !== b.type && "group" !== b.type ? b.references.quicklayer.addClass("quick_in_group") : b.references.quicklayer.removeClass("quick_in_group")
        }
        t.updateZIndexByOrder(), 1 != a && t.updateAllLayerTimeline()
    }, t.resetTimeLineHeight = function () {
        var a = document.getElementById("layers-right-ul").clientHeight;
        punchgs.TweenLite.set(jQuery("#mastertimer-position"), {height: a + 40})
    }, t.timeLineTableDimensionUpdate = function () {
        clearTimeout(timeline_timer), timeline_timer = setTimeout(function () {
            t.resetTimeLineHeight();
            var a = 30 * (jQuery("#layers-right ul li").length + 1) - 30 * (jQuery("#layers-right ul li.layer-deleted").length + 1);
            punchgs.TweenLite.set(jQuery(".layers-wrapper"), {height: a + 3}), punchgs.TweenLite.set(jQuery("#mastertimer-wrapper"), {height: a + 3}), jQuery(".master-rightcell .layers-wrapper, .master-leftcell .layers-wrapper, #divLayers-wrapper, .quick-layers-list").perfectScrollbar("update")
        }, 50)
    }, t.updateZIndexByOrder = function () {
        for (var a in u.arrLayers) {
            var b = u.arrLayers[a], c = void 0 !== b.order ? b.order + 5 : 5, d = {zIndex: c};
            void 0 !== b.order && punchgs.TweenLite.set(b.references.htmlLayer, {zIndex: Number(b.order) + 100}), u.updateLayer(b.serial, d, !1, !0)
        }
    };
    var shiftOrder = function (a) {
        for (key in u.arrLayers) {
            var b = u.arrLayers[key];
            b.order >= a && (b.order = Number(b.order) + 1, u.arrLayers[key] = b)
        }
    };
    t.getSortboxText = function (a) {
        sorboxTextSize = 20;
        var b = void 0 === a ? "NoText" : UniteAdminRev.stripTags(a);
        return b.length < 2 && (b = UniteAdminRev.htmlspecialchars(a)), b.length > sorboxTextSize && (b = b.slice(0, sorboxTextSize) + "..."), b
    }, t.redrawSortbox = function (a) {
        void 0 == a && (a = sortMode), emptySortbox();
        var b = getLayersSorted("depth");
        if (0 == b.length)return !1;
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            t.addToSortbox(d.serial, d)
        }
        -1 != u.selectedLayerSerial && t.setSortboxItemSelected(u.selectedLayerSerial)
    };
    var reinitSortBox = function (a) {
        jQuery("#last_drop_zone_layers").appendTo("#layers-left-ul"), a && jQuery(".layer_sortbox ul").sortable({
            refreshPositions: !0,
            placeholder: "silent-placeholder",
            cancel: "#slide_in_sort, input",
            handle: ".mastertimer-timeline-zindex-row",
            items: ".sortable_elements",
            connectWith: "#layers-left-ul, .sortable_groups_wrap, .sortable_layers_in_columns",
            update: function (a, b) {
                var c = jQuery(b.item);
                c.hasClass("sortable_row") && jQuery(this).sortable("cancel");
                var d = c.parent(), e = d.closest(".sortable_group"), f = jQuery("#layers-left-ul");
                if (!d.hasClass("sortable_groups_wrap") && !d.hasClass("sortable_layers_in_columns") || c.hasClass("sortable_layers") || (c.index() < d.children().length / 2 ? c.insertBefore(e) : c.insertAfter(e)), "layers-left-ul" === d.attr("id") || "layers-left-ul" === d.parent().attr("id") || c.hasClass("sortable_group")) {
                    var g = f.find(".sortable_row"), h = g.first().index(), i = g.last().index(), j = c.index();
                    j > h && j < i && c.insertAfter(g.last())
                }
                onSortboxSorted(), t.organiseGroupsAndLayer()
            }
        }), jQuery(".droppable_sortable_group,.droppable_sortable_row, .droppable_sortable_column").droppable({
            tolerance: "intersect",
            greedy: !0,
            over: function (a) {
                jQuery(a.target).addClass("readytodrop")
            },
            out: function (a) {
                jQuery(a.target).removeClass("readytodrop")
            },
            drop: function (a, b) {
                jQuery("#layers-left-ul");
                jQuery(a.target).removeClass("readytodrop");
                var f, d = jQuery(a.target).attr("class"), e = jQuery(a.srcElement).closest(".sortable_elements.sortable_layers");
                if (!e.length)return !1;
                d.indexOf("droppable_sortable_group") >= 0 && (f = jQuery(a.target).closest("li.sortable_group").find(".sortable_groups_wrap")), d.indexOf("droppable_sortable_row") >= 0 && (f = jQuery(a.target).closest("li.sortable_group.sortable_row").find(".sortable_layers_in_columns").first()), d.indexOf("droppable_sortable_column") >= 0 && (f = jQuery(a.target).closest("li.sortable_column").find(".sortable_layers_in_columns").first()), setTimeout(function () {
                    e.appendTo(f), onSortboxSorted(), t.organiseGroupsAndLayer()
                }, 50)
            }
        })
    }, initSortbox = function () {
        t.redrawSortbox(), reinitSortBox(!0), jQuery("body").delegate(".layer_sort_inner_wrapper", "mousedown", function (a) {
            var b = jQuery(this).closest(".sortable_elements");
            if (b.hasClass("ui-state-hover"))return !0;
            if (!b.hasClass("mastertimer-slide")) {
                var c = u.getSerialFromSortID(b.attr("id"));
                return u.setLayerSelected(c), !1
            }
        }), jQuery("body").on("click", ".sort_group_collapser", function (a) {
            var b = jQuery(this), c = b.closest(".sortable_column"), d = c.length ? c : b.closest(".sortable_group"), e = c.length ? d.find(".sortable_layers_in_columns") : d.find(".sortable_groups_wrap");
            b.toggleClass("collapsed"), b.hasClass("collapsed") ? e.css({
                maxHeight: "0px",
                overflow: "hidden"
            }) : e.css({maxHeight: "none", overflow: "visible"}), e.find(".sortable_elements").each(function (a, c) {
                var c = jQuery(c), d = c.data("uniqueid");
                b.hasClass("collapsed") ? jQuery('#layers-right-ul li[data-uniqueid="' + d + '"]').addClass("unvisibletimeline") : jQuery('#layers-right-ul li[data-uniqueid="' + d + '"]').removeClass("unvisibletimeline")
            })
        }), jQuery("#layers-right").delegate("li", "mousedown", function (a) {
            var b = jQuery(this);
            if (t.recordFrameStatusForce = !0, b.hasClass("ui-state-hover"))return !0;
            if (!b.hasClass("mastertimer-slide")) {
                var c = u.getSerialFromSortID(this.id);
                return u.setLayerSelected(c), !1
            }
        }), jQuery(".quick-layer-all-lock").click(function () {
            var a = jQuery(this), b = a.find("i");
            b.hasClass("eg-icon-lock") ? (jQuery(".quick-layer-lock i").each(function () {
                jQuery(this).removeClass("eg-icon-lock-open").addClass("eg-icon-lock")
            }), b.addClass("eg-icon-lock-open").removeClass("eg-icon-lock"), u.lockAllLayers()) : (jQuery(".quick-layer-lock i").each(function () {
                jQuery(this).removeClass("eg-icon-lock").addClass("eg-icon-lock-open")
            }), b.removeClass("eg-icon-lock-open").addClass("eg-icon-lock"), u.unlockAllLayers())
        }), jQuery(".quick-layer-all-view").click(function () {
            var a = jQuery(this), b = a.find("i");
            b.hasClass("eg-icon-eye") ? (jQuery(".quick-layer-view i").each(function () {
                jQuery(this).addClass("eg-icon-eye").removeClass("eg-icon-eye-off")
            }), b.removeClass("eg-icon-eye").addClass("eg-icon-eye-off"), u.showAllLayers()) : (jQuery(".quick-layer-view i").each(function () {
                jQuery(this).removeClass("eg-icon-eye").addClass("eg-icon-eye-off")
            }), b.addClass("eg-icon-eye").removeClass("eg-icon-eye-off"), u.hideAllLayers())
        }), jQuery(".sortlist").delegate(".till_slideend", "mousedown", function (a) {
            var b = jQuery(this), c = b.closest("li"), d = b.data("serial"), e = u.getLayer(d), f = 10 * t.mainMaxTimeLeft;
            c.hasClass("tillendon") ? (c.removeClass("tillendon"), e.frames.frame_999.time = e.frames.frame_999.time - 200, t.updateLayerTimeline(e)) : (c.addClass("tillendon"), e.frames.frame_999.time = f, t.updateLayerTimeline(e))
        })
    }, getLayersSorted = function (a) {
        void 0 == a && (a = "time");
        var b = [];
        for (key in u.arrLayers) {
            var c = u.arrLayers[key];
            c.serial = key, b.push(c)
        }
        return 0 == b.length ? b : (b.sort(function (b, c) {
            switch (a) {
                case"time":
                    if (Number(b.time) == Number(c.time))return b.order == c.order ? 0 : b.order > c.order ? 1 : -1;
                    if (Number(b.time) > Number(c.time))return 1;
                    break;
                case"depth":
                    if (b.order == c.order)return 0;
                    if (b.order > c.order)return 1;
                    break;
                default:
                    trace("wrong sort type: " + a)
            }
            return -1
        }), b)
    };
    t.hideLayer = function (a, b) {
        if (void 0 !== a.references && void 0 !== a.references.htmlLayer) {
            var c = a.references.htmlLayer;
            c.css({visibility: "hidden"}), c.addClass("currently_not_visible"), a.isDemo || setSortboxItemHidden(a.serial), 1 != b && t.isAllLayersHidden() && jQuery("#button_sort_visibility").addClass("e-disabled")
        }
    }, t.showLayer = function (a, b) {
        if (void 0 !== a.references && void 0 !== a.references.htmlLayer) {
            var c = a.references.htmlLayer;
            c.css({visibility: "visible"}), c.removeClass("currently_not_visible"), a.isDemo || setSortboxItemVisible(a.serial), 1 != b && jQuery("#button_sort_visibility").removeClass("e-disabled")
        }
    }, t.isLayerVisible = function (a) {
        var b = !0;
        return void 0 != a && a[0].classList.contains("currently_not_visible") && (b = !1), b
    }, t.isAllLayersHidden = function () {
        var a = 0;
        for (serial in u.arrLayers) {
            if (void 0 !== u.arrLayers[a] && 1 == t.isLayerVisible(u.arrLayers[a].references.htmlLayer))return !1;
            a++
        }
        return !0
    }, t.isLayerLocked = function (a) {
        return a.hasClass("layer_on_lock")
    }, t.lockLayer = function (a) {
        setSortboxItemLocked(a), u.getHtmlLayerFromSerial(a).addClass("layer_on_lock")
    }, t.unlockLayer = function (a) {
        setSortboxItemUnlocked(a), u.getHtmlLayerFromSerial(a).removeClass("layer_on_lock")
    }, t.setSortboxItemSelected = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        t.unselectSortboxItems(), b && b.removeClass("ui-state-default").addClass("ui-state-hover"), c && c.removeClass("ui-state-default").addClass("ui-state-hover"), d && d.removeClass("ui-state-default").addClass("ui-state-hover")
    };
    var setSortboxItemHidden = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        b && b.addClass("sortitem-hidden"), c && c.addClass("sortitem-hidden"), d && (d.addClass("sortitem-hidden"), d.find(".eg-icon-eye").addClass("eg-icon-eye-off").removeClass("eg-icon-eye"), d.find(".quick-layer-view").addClass("in-off"))
    }, setSortboxItemVisible = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        b && b.removeClass("sortitem-hidden"), c && c.removeClass("sortitem-hidden"), d && d.removeClass("sortitem-hidden")
    }, setSortboxItemLocked = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        b && b.addClass("sortitem-locked"), c && c.addClass("sortitem-locked"), d && d.addClass("sortitem-locked")
    }, setSortboxItemUnlocked = function (a) {
        var b = t.getHtmlSortItemFromSerial(a), c = t.getHtmlSortTimeItemFromSerial(a), d = t.getHtmlQuickTimeItemFromSerial(a);
        b && b.removeClass("sortitem-locked"), c && c.removeClass("sortitem-locked"), d && d.removeClass("sortitem-locked")
    };
    t.getHtmlSortItemFromSerial = function (a) {
        var b = jQuery("#layer_sort_" + a);
        return 0 == b.length ? (UniteAdminRev.showErrorMessage("Html sort field with serial: " + a + " not found!"), !1) : b
    }, t.getHtmlSortTimeItemFromSerial = function (a) {
        var b = jQuery("#layer_sort_time_" + a);
        return 0 == b.length ? (UniteAdminRev.showErrorMessage("Html sort field with serial: " + a + " not found!"), !1) : b
    }, t.getHtmlQuickTimeItemFromSerial = function (a) {
        var b = jQuery("#layer_quicksort_" + a);
        return 0 == b.length ? (UniteAdminRev.showErrorMessage("Html sort field with serial: " + a + " not found!"), !1) : b
    };
    var emptySortbox = function () {
        jQuery(".sortlist ul").find(".sortable_elements").remove(), jQuery("#layers-right ul").find(".sortable_elements").remove()
    }, onSortboxSorted = function () {
        t.updateOrderFromSortbox()
    }, prepareOneSlide = function (a, b, c, d, e, f) {
        var g = a, k = (g.find(".defaultimg"), g.data("zoomstart"), g.data("rotationstart"), g.find(".defaultimg").css("backgroundImage")), l = g.find(".defaultimg").css("backgroundColor"), m = 0, n = g.find(".defaultimg").css("backgroundSize"), o = g.find(".defaultimg").css("backgroundRepeat"), p = g.find(".defaultimg").css("backgroundPosition");
        k = k.replace('"', ""), k = k.replace('"', ""), void 0 == n && (n = "cover"), void 0 == o && (o = "no-repeat"), void 0 == p && (p = "center center");
        var e = void 0 != e ? e : jQuery("#divbgholder").width(), f = void 0 != f ? f : jQuery("#divbgholder").height();
        b.slotw = Math.ceil(e / b.slots), b.sloth = Math.ceil(f / b.slots);
        var q = 0, r = 0, s = 0;
        q = b.sloth > b.slotw ? b.sloth : b.slotw, b.slotw = q, b.sloth = q;
        var r = 0, s = 0, t = 0, u = 0;
        switch (d) {
            case"box":
                for (var v = 0; v < b.slots; v++) {
                    s = 0;
                    for (var w = 0; w < b.slots; w++)g.append('<div class="slot" style="position:absolute;top:' + (u + s) + "px;left:" + (t + r) + "px;width:" + q + "px;height:" + q + 'px;overflow:hidden;"><div class="slotslide" data-x="' + r + '" data-y="' + s + '" style="position:absolute;top:0px;left:0px;width:' + q + "px;height:" + q + 'px;overflow:hidden;"><div class="slotslidebg" style="position:absolute;top:' + (0 - s) + "px;left:" + (0 - r) + "px;width:" + e + "px;height:" + f + "px;background-color:" + l + ";background-image:" + k + ";background-repeat:" + o + ";background-size:" + n + ";background-position:" + p + ';"></div></div></div>'), s += q;
                    r += q
                }
                break;
            case"vertical":
            case"horizontal":
                if ("horizontal" == d) {
                    if (!c)var m = 0 - b.slotw;
                    for (var w = 0; w < b.slots; w++)g.append('<div class="slot" style="position:absolute;top:' + (0 + u) + "px;left:" + (t + w * b.slotw) + "px;overflow:hidden;width:" + (b.slotw + .6) + "px;height:" + f + 'px"><div class="slotslide" style="position:absolute;top:0px;left:' + m + "px;width:" + (b.slotw + .6) + "px;height:" + f + 'px;overflow:hidden;"><div class="slotslidebg" style="background-color:' + l + ";position:absolute;top:0px;left:" + (0 - w * b.slotw) + "px;width:" + e + "px;height:" + f + "px;background-image:" + k + ";background-repeat:" + o + ";background-size:" + n + ";background-position:" + p + ';"></div></div></div>')
                } else {
                    if (!c)var m = 0 - b.sloth;
                    for (var w = 0; w < b.slots + 2; w++)g.append('<div class="slot" style="position:absolute;top:' + (u + w * b.sloth) + "px;left:" + t + "px;overflow:hidden;width:" + e + "px;height:" + b.sloth + 'px"><div class="slotslide" style="position:absolute;top:' + m + "px;left:0px;width:" + e + "px;height:" + b.sloth + 'px;overflow:hidden;"><div class="slotslidebg" style="background-color:' + l + ";position:absolute;top:" + (0 - w * b.sloth) + "px;left:0px;width:" + e + "px;height:" + f + "px;background-image:" + k + ";background-repeat:" + o + ";background-size:" + n + ";background-position:" + p + ';"></div></div></div>')
                }
        }
    }, slideAnimation = function (a, b, c, d, e) {
        function A() {
            z && jQuery.each(z, function (a, b) {
                b[0] != c && b[8] != c || (u = b[1], v = b[2], w = x), x += 1
            })
        }

        if (void 0 != a) {
            var f = a, g = b, h = new Object, i = new Object;
            i.width = a.width(), i.height = a.height()
        } else {
            var a = f = jQuery("#divbgholder").find(".slotholder"), b = g = jQuery("#divbgholder").find(".oldslotholder"), h = new Object, c = jQuery("#fake-select-label").data("valu"), i = new Object;
            i.width = jQuery("#divbgholder").width(), i.height = jQuery("#divbgholder").height()
        }
        "slidingoverlayvertical" == c && (c = "slidingoverlayup"), "slidingoverlayhorizontal" == c && (c = "slidingoverlayleft"), "slideoverhorizontal" == c && (c = "slideoverleft"), "slideoververtical" == c && (c = "slideoverup"), "slideremovehorizontal" == c && (c = "slideremoveleft"), "slideremovevertical" == c && (c = "slideremoveup"), "slidehorizontal" == c && (c = "slideleft"), "slidevertical" == c && (c = "slideup"), "parallaxhorizontal" == c && (c = "parallaxtoleft"), "parallaxvertical" == c && (c = "parallaxtotop");
        var j = punchgs.Power1.easeIn, k = punchgs.Power1.easeOut, l = punchgs.Power1.easeInOut, m = punchgs.Power2.easeIn, n = punchgs.Power2.easeOut, o = punchgs.Power2.easeInOut, q = (punchgs.Power3.easeIn, punchgs.Power3.easeOut), r = punchgs.Power3.easeInOut, u = 0, v = 1, w = 0, x = 0, y = new Array, z = [["boxslide", 0, 1, 10, 0, "box", !1, null, 0, k, k, 500, 6], ["boxfade", 1, 0, 10, 0, "box", !1, null, 1, l, l, 700, 5], ["slotslide-horizontal", 2, 0, 0, 200, "horizontal", !0, !1, 2, o, o, 700, 3], ["slotslide-vertical", 3, 0, 0, 200, "vertical", !0, !1, 3, o, o, 700, 3], ["curtain-1", 4, 3, 0, 0, "horizontal", !0, !0, 4, k, k, 300, 5], ["curtain-2", 5, 3, 0, 0, "horizontal", !0, !0, 5, k, k, 300, 5], ["curtain-3", 6, 3, 25, 0, "horizontal", !0, !0, 6, k, k, 300, 5], ["slotzoom-horizontal", 7, 0, 0, 400, "horizontal", !0, !0, 7, k, k, 300, 7], ["slotzoom-vertical", 8, 0, 0, 0, "vertical", !0, !0, 8, n, n, 500, 8], ["slotfade-horizontal", 9, 0, 0, 500, "horizontal", !0, null, 9, n, n, 500, 25], ["slotfade-vertical", 10, 0, 0, 500, "vertical", !0, null, 10, n, n, 500, 25], ["fade", 11, 0, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["crossfade", 11, 1, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["fadethroughdark", 11, 2, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["fadethroughlight", 11, 3, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["fadethroughtransparent", 11, 4, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["slideleft", 12, 0, 1, 0, "horizontal", !0, !0, 12, r, r, 1e3, 1], ["slideup", 13, 0, 1, 0, "horizontal", !0, !0, 13, r, r, 1e3, 1], ["slidedown", 14, 0, 1, 0, "horizontal", !0, !0, 14, r, r, 1e3, 1], ["slideright", 15, 0, 1, 0, "horizontal", !0, !0, 15, r, r, 1e3, 1], ["slideoverleft", 12, 7, 1, 0, "horizontal", !0, !0, 12, r, r, 1e3, 1], ["slideoverup", 13, 7, 1, 0, "horizontal", !0, !0, 13, r, r, 1e3, 1], ["slideoverdown", 14, 7, 1, 0, "horizontal", !0, !0, 14, r, r, 1e3, 1], ["slideoverright", 15, 7, 1, 0, "horizontal", !0, !0, 15, r, r, 1e3, 1], ["slideremoveleft", 12, 8, 1, 0, "horizontal", !0, !0, 12, r, r, 1e3, 1], ["slideremoveup", 13, 8, 1, 0, "horizontal", !0, !0, 13, r, r, 1e3, 1], ["slideremovedown", 14, 8, 1, 0, "horizontal", !0, !0, 14, r, r, 1e3, 1], ["slideremoveright", 15, 8, 1, 0, "horizontal", !0, !0, 15, r, r, 1e3, 1], ["papercut", 16, 0, 0, 600, "", null, null, 16, r, r, 1e3, 2], ["3dcurtain-horizontal", 17, 0, 20, 100, "vertical", !1, !0, 17, l, l, 500, 7], ["3dcurtain-vertical", 18, 0, 10, 100, "horizontal", !1, !0, 18, l, l, 500, 5], ["cubic", 19, 0, 20, 600, "horizontal", !1, !0, 19, r, r, 500, 1], ["cube", 19, 0, 20, 600, "horizontal", !1, !0, 20, r, r, 500, 1], ["flyin", 20, 0, 4, 600, "vertical", !1, !0, 21, q, r, 500, 1], ["turnoff", 21, 0, 1, 500, "horizontal", !1, !0, 22, r, r, 500, 1], ["incube", 22, 0, 20, 200, "horizontal", !1, !0, 23, o, o, 500, 1], ["cubic-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 24, n, n, 500, 1], ["cube-horizontal", 23, 0, 20, 500, "vertical", !1, !0, 25, n, n, 500, 1], ["incube-horizontal", 24, 0, 20, 500, "vertical", !1, !0, 26, o, o, 500, 1], ["turnoff-vertical", 25, 0, 1, 200, "horizontal", !1, !0, 27, o, o, 500, 1], ["fadefromright", 12, 1, 1, 0, "horizontal", !0, !0, 28, o, o, 1e3, 1], ["fadefromleft", 15, 1, 1, 0, "horizontal", !0, !0, 29, o, o, 1e3, 1], ["fadefromtop", 14, 1, 1, 0, "horizontal", !0, !0, 30, o, o, 1e3, 1], ["fadefrombottom", 13, 1, 1, 0, "horizontal", !0, !0, 31, o, o, 1e3, 1], ["fadetoleftfadefromright", 12, 2, 1, 0, "horizontal", !0, !0, 32, o, o, 1e3, 1], ["fadetorightfadefromleft", 15, 2, 1, 0, "horizontal", !0, !0, 33, o, o, 1e3, 1], ["fadetobottomfadefromtop", 14, 2, 1, 0, "horizontal", !0, !0, 34, o, o, 1e3, 1], ["fadetotopfadefrombottom", 13, 2, 1, 0, "horizontal", !0, !0, 35, o, o, 1e3, 1], ["parallaxtoright", 12, 3, 1, 0, "horizontal", !0, !0, 36, o, m, 1500, 1], ["parallaxtoleft", 15, 3, 1, 0, "horizontal", !0, !0, 37, o, m, 1500, 1], ["parallaxtotop", 14, 3, 1, 0, "horizontal", !0, !0, 38, o, j, 1500, 1], ["parallaxtobottom", 13, 3, 1, 0, "horizontal", !0, !0, 39, o, j, 1500, 1], ["scaledownfromright", 12, 4, 1, 0, "horizontal", !0, !0, 40, o, m, 1e3, 1], ["scaledownfromleft", 15, 4, 1, 0, "horizontal", !0, !0, 41, o, m, 1e3, 1], ["scaledownfromtop", 14, 4, 1, 0, "horizontal", !0, !0, 42, o, m, 1e3, 1], ["scaledownfrombottom", 13, 4, 1, 0, "horizontal", !0, !0, 43, o, m, 1e3, 1], ["zoomout", 13, 5, 1, 0, "horizontal", !0, !0, 44, o, m, 1e3, 1], ["zoomin", 13, 6, 1, 0, "horizontal", !0, !0, 45, o, m, 1e3, 1], ["slidingoverlayup", 27, 0, 1, 0, "horizontal", !0, !0, 47, l, k, 2e3, 1], ["slidingoverlaydown", 28, 0, 1, 0, "horizontal", !0, !0, 48, l, k, 2e3, 1], ["slidingoverlayright", 30, 0, 1, 0, "horizontal", !0, !0, 49, l, k, 2e3, 1], ["slidingoverlayleft", 29, 0, 1, 0, "horizontal", !0, !0, 50, l, k, 2e3, 1], ["notransition", 26, 0, 1, 0, "horizontal", !0, null, 46, o, m, 1e3, 1], ["grayscale", 11, 5, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["grayscalecross", 11, 6, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["brightness", 11, 7, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["brightnesscross", 11, 8, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["blurlight", 11, 9, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["blurlightcross", 11, 10, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["blurstrong", 11, 9, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1], ["blurstrongcross", 11, 10, 1, 300, "horizontal", !0, null, 11, o, o, 1e3, 1]];
        "random-selected" != c && "random" != c && "random-static" != c && "random-premium" != c || (c = 11), A();
        var C = jQuery("#transition_duration").val();
        u > 30 && (u = 30), u < 0 && (u = 0), y = z[w];
        var D = new punchgs.TimelineLite;
        D.add(punchgs.TweenLite.set(a.find(".defaultimg"), {autoAlpha: 0})), D.pause(), D.add(punchgs.TweenLite.set(b, {
            autoAlpha: 1,
            force3D: "auto",
            zIndex: 0
        }), 0), D.add(punchgs.TweenLite.set(a, {
            autoAlpha: 1,
            force3D: "auto",
            zIndex: 1
        }), 0), i.slots = jQuery("#slot_amount").val(), i.rotate = jQuery("#transition_rotation").val(), C = "default" === C ? y[11] : "random" === C ? Math.round(1e3 * Math.random() + 300) : void 0 != C ? parseInt(C, 0) : y[11], C = C > i.delay ? i.delay : C, C += y[4], i.slots = void 0 == i.slots || "default" == i.slots ? y[12] : "random" == i.slots ? Math.round(12 * Math.random() + 4) : y[12], i.slots = i.slots < 1 ? "boxslide" == c ? Math.round(6 * Math.random() + 3) : "flyin" == c ? Math.round(4 * Math.random() + 1) : i.slots : i.slots, i.slots = (4 == u || 5 == u || 6 == u) && i.slots < 3 ? 3 : i.slots, i.slots = 0 != y[3] ? Math.min(i.slots, y[3]) : i.slots, i.slots = 9 == u ? i.width / 20 : 10 == u ? i.height / 20 : i.slots, i.rotate = void 0 == i.rotate || "default" == i.rotate ? 0 : 999 == i.rotate || "random" == i.rotate ? Math.round(360 * Math.random()) : i.rotate, i.rotate = !jQuery.support.transition || i.ie || i.ie9 ? 0 : i.rotate, i.slotw = Math.ceil(i.width / jQuery("#slot_amount").val()), i.sloth = Math.ceil(i.height / jQuery("#slot_amount").val()), null != y[7] && prepareOneSlide(b, i, y[7], y[5], i.width, i.height), null != y[6] && prepareOneSlide(a, i, y[6], y[5], i.width, i.height);
        var E = jQuery("select[name=transition_ease_in]").val(), F = jQuery("select[name=transition_ease_out]").val(), G = 1;
        if (E = "default" === E ? y[9] || punchgs.Power2.easeInOut : E || y[9] || punchgs.Power2.easeInOut, F = "default" === F ? y[10] || punchgs.Power2.easeInOut : F || y[10] || punchgs.Power2.easeInOut, 0 == u) {
            var H = Math.ceil(i.height / i.sloth), I = 0;
            a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                I += 1, I == H && (I = 0), D.add(punchgs.TweenLite.from(b, C / 600, {
                    opacity: 0,
                    top: 0 - i.sloth,
                    left: 0 - i.slotw,
                    rotation: i.rotate,
                    force3D: "auto",
                    ease: E
                }), (15 * a + 30 * I) / 1500)
            })
        }
        if (1 == u) {
            var J, K = 0;
            a.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = Math.random() * C + 300, d = 500 * Math.random() + 200;
                c + d > J && (J = d + d, K = a), D.add(punchgs.TweenLite.from(b, c / 1e3, {
                    autoAlpha: 0,
                    force3D: "auto",
                    rotation: i.rotate,
                    ease: E
                }), d / 1e3)
            })
        }
        if (2 == u) {
            var L = new punchgs.TimelineLite;
            b.find(".slotslide").each(function () {
                var a = jQuery(this);
                L.add(punchgs.TweenLite.to(a, C / 1e3, {
                    left: i.slotw,
                    ease: E,
                    force3D: "auto",
                    rotation: 0 - i.rotate
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function () {
                var a = jQuery(this);
                L.add(punchgs.TweenLite.from(a, C / 1e3, {
                    left: 0 - i.slotw,
                    ease: E,
                    force3D: "auto",
                    rotation: i.rotate
                }), 0), D.add(L, 0)
            })
        }
        if (3 == u) {
            var L = new punchgs.TimelineLite;
            b.find(".slotslide").each(function () {
                var a = jQuery(this);
                L.add(punchgs.TweenLite.to(a, C / 1e3, {
                    top: i.sloth,
                    ease: E,
                    rotation: i.rotate,
                    force3D: "auto",
                    transformPerspective: 600
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function () {
                var a = jQuery(this);
                L.add(punchgs.TweenLite.from(a, C / 1e3, {
                    top: 0 - i.sloth,
                    rotation: i.rotate,
                    ease: F,
                    force3D: "auto",
                    transformPerspective: 600
                }), 0), D.add(L, 0)
            })
        }
        if (4 == u || 5 == u) {
            setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100);
            var M = C / 1e3, L = new punchgs.TimelineLite;
            b.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = a * M / i.slots;
                5 == u && (c = (i.slots - a - 1) * M / i.slots / 1.5), L.add(punchgs.TweenLite.to(b, 3 * M, {
                    transformPerspective: 600,
                    force3D: "auto",
                    top: 0 + i.height,
                    opacity: .5,
                    rotation: i.rotate,
                    ease: E,
                    delay: c
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = a * M / i.slots;
                5 == u && (c = (i.slots - a - 1) * M / i.slots / 1.5), L.add(punchgs.TweenLite.from(b, 3 * M, {
                    top: 0 - i.height,
                    opacity: .5,
                    rotation: i.rotate,
                    force3D: "auto",
                    ease: punchgs.eo,
                    delay: c
                }), 0), D.add(L, 0)
            })
        }
        if (6 == u) {
            i.slots < 2 && (i.slots = 2), i.slots % 2 && (i.slots = i.slots + 1);
            var L = new punchgs.TimelineLite;
            setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100), b.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                if (a + 1 < i.slots / 2)var c = 90 * (a + 2); else var c = 90 * (2 + i.slots - a);
                L.add(punchgs.TweenLite.to(b, (C + c) / 1e3, {
                    top: 0 + i.height,
                    opacity: 1,
                    force3D: "auto",
                    rotation: i.rotate,
                    ease: E
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                if (a + 1 < i.slots / 2)var c = 90 * (a + 2); else var c = 90 * (2 + i.slots - a);
                L.add(punchgs.TweenLite.from(b, (C + c) / 1e3, {
                    top: 0 - i.height,
                    opacity: 1,
                    force3D: "auto",
                    rotation: i.rotate,
                    ease: F
                }), 0), D.add(L, 0)
            })
        }
        if (7 == u) {
            C *= 2, C > i.delay && (C = i.delay);
            var L = new punchgs.TimelineLite;
            setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100), b.find(".slotslide").each(function () {
                var a = jQuery(this).find("div");
                L.add(punchgs.TweenLite.to(a, C / 1e3, {
                    left: 0 - i.slotw / 2 + "px",
                    top: 0 - i.height / 2 + "px",
                    width: 2 * i.slotw + "px",
                    height: 2 * i.height + "px",
                    opacity: 0,
                    rotation: i.rotate,
                    force3D: "auto",
                    ease: E
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function (a) {
                var b = jQuery(this).find("div");
                L.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    left: 0,
                    top: 0,
                    opacity: 0,
                    transformPerspective: 600
                }, {
                    left: 0 - a * i.slotw + "px",
                    ease: F,
                    force3D: "auto",
                    top: "0px",
                    width: i.width,
                    height: i.height,
                    opacity: 1,
                    rotation: 0,
                    delay: .1
                }), 0), D.add(L, 0)
            })
        }
        if (8 == u) {
            C *= 3, C > i.delay && (C = i.delay);
            var L = new punchgs.TimelineLite;
            b.find(".slotslide").each(function () {
                var a = jQuery(this).find("div");
                L.add(punchgs.TweenLite.to(a, C / 1e3, {
                    left: 0 - i.width / 2 + "px",
                    top: 0 - i.sloth / 2 + "px",
                    width: 2 * i.width + "px",
                    height: 2 * i.sloth + "px",
                    force3D: "auto",
                    ease: E,
                    opacity: 0,
                    rotation: i.rotate
                }), 0), D.add(L, 0)
            }), a.find(".slotslide").each(function (b) {
                var c = jQuery(this).find("div");
                L.add(punchgs.TweenLite.fromTo(c, C / 1e3, {left: 0, top: 0, opacity: 0, force3D: "auto"}, {
                    left: "0px",
                    top: 0 - b * i.sloth + "px",
                    width: a.find(".defaultimg").data("neww") + "px",
                    height: a.find(".defaultimg").data("newh") + "px",
                    opacity: 1,
                    ease: F,
                    rotation: 0
                }), 0), D.add(L, 0)
            })
        }
        if (9 == u || 10 == u) {
            var O = 0;
            a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                O++, D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    autoAlpha: 0,
                    force3D: "auto",
                    transformPerspective: 600
                }, {autoAlpha: 1, ease: E, delay: 5 * a / 1e3}), 0)
            })
        }
        if (11 == u || 26 == u) {
            var O = 0, P = 2 == v ? "#000000" : 3 == v ? "#ffffff" : "transparent";
            if (26 == u && (C = 0), e)switch (D.add(punchgs.TweenLite.set(a.parent(), {
                backgroundColor: P,
                force3D: "auto"
            }), 0), v) {
                case 0:
                    D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {autoAlpha: 0, zIndex: 1}, {
                        autoAlpha: 1,
                        zIndex: 1,
                        force3D: "auto",
                        ease: E
                    }), 0), D.add(punchgs.TweenLite.set(a, {autoAlpha: 1, force3D: "auto", zIndex: 0}), 0);
                    break;
                case 1:
                    D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {autoAlpha: 0}, {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: E
                    }), 0), D.add(punchgs.TweenLite.fromTo(a, C / 1e3, {autoAlpha: 1}, {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: E
                    }), 0);
                    break;
                case 2:
                case 3:
                case 4:
                    D.add(punchgs.TweenLite.fromTo(a, C / 2e3, {autoAlpha: 1}, {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: E
                    }), 0), D.add(punchgs.TweenLite.set(b, {
                        autoAlpha: 0,
                        force3D: "auto"
                    }), 0), D.add(punchgs.TweenLite.fromTo(b, C / 2e3, {autoAlpha: 0}, {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: E
                    }), C / 2e3);
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    var Q = jQuery.inArray(v, [9, 10]) >= 0 ? 5 : jQuery.inArray(v, [11, 12]) >= 0 ? 10 : 0, R = jQuery.inArray(v, [5, 6, 7, 8]) >= 0 ? 100 : 0, S = jQuery.inArray(v, [7, 8]) >= 0 ? 300 : 0, T = "blur(" + Q + "px) grayscale(" + R + "%) brightness(" + S + "%)", U = "blur(0px) grayscale(0%) brightness(100%)";
                    D.add(punchgs.TweenLite.fromTo(a, C / 1e3, {
                        autoAlpha: 0,
                        filter: T,
                        "-webkit-filter": T
                    }, {
                        autoAlpha: 1,
                        filter: U,
                        "-webkit-filter": U,
                        force3D: "auto",
                        ease: E
                    }), 0), jQuery.inArray(v, [6, 8, 10]) >= 0 && D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                        autoAlpha: 1,
                        filter: U,
                        "-webkit-filter": U
                    }, {autoAlpha: 0, force3D: "auto", ease: E, filter: T, "-webkit-filter": T}), 0)
            } else a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                if (v < 5) D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {autoAlpha: 0}, {
                    autoAlpha: 1,
                    force3D: "auto",
                    ease: E
                }), 0); else {
                    var c = jQuery.inArray(v, [9, 10]) >= 0 ? 5 : jQuery.inArray(v, [11, 12]) >= 0 ? 10 : 0, d = jQuery.inArray(v, [5, 6, 7, 8]) >= 0 ? 100 : 0, e = jQuery.inArray(v, [7, 8]) >= 0 ? 300 : 0, f = "blur(" + c + "px) grayscale(" + d + "%) brightness(" + e + "%)", g = "blur(0px) grayscale(0%) brightness(100%)";
                    D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                        autoAlpha: 0,
                        filter: f,
                        "-webkit-filter": f
                    }, {autoAlpha: 1, filter: g, "-webkit-filter": g, force3D: "auto", ease: E}), 0)
                }
            })
        }
        if (27 == u || 28 == u || 29 == u || 30 == u) {
            var V = a.find(".slot"), W = 27 == u || 28 == u ? 1 : 2, X = 27 == u || 29 == u ? "-100%" : "+100%", Y = 27 == u || 29 == u ? "+100%" : "-100%", Z = 27 == u || 29 == u ? "-80%" : "80%", $ = 27 == u || 29 == u ? "80%" : "-80%", _ = 27 == u || 29 == u ? "10%" : "-10%", aa = {overwrite: "all"}, ba = {
                autoAlpha: 0,
                zIndex: 1,
                force3D: "auto",
                ease: punchgs.Power1.easeInOut
            }, ca = {position: "inherit", autoAlpha: 0, overwrite: "all"}, da = {
                autoAlpha: 1,
                force3D: "auto",
                ease: punchgs.Power1.easeOut
            }, ea = {overwrite: "all", zIndex: 2}, fa = {
                autoAlpha: 1,
                force3D: "auto",
                overwrite: "all",
                ease: punchgs.Power1.easeInOut
            }, ga = {overwrite: "all", zIndex: 2}, ha = {
                autoAlpha: 1,
                force3D: "auto",
                ease: punchgs.Power1.easeInOut
            }, ia = 1 == W ? "y" : "x";
            aa[ia] = "0px", ba[ia] = X, ca[ia] = _, da[ia] = "0%", ea[ia] = Y, fa[ia] = X, ga[ia] = Z, ha[ia] = $, V.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'), D.add(punchgs.TweenLite.fromTo(b, C / 1e3, aa, ba), 0), D.add(punchgs.TweenLite.fromTo(a.find(".defaultimg"), C / 2e3, ca, da), C / 2e3), D.add(punchgs.TweenLite.fromTo(V, C / 1e3, ea, fa), 0), D.add(punchgs.TweenLite.fromTo(V.find(".slotslide div"), C / 1e3, ga, ha), 0)
        }
        if (12 == u || 13 == u || 14 == u || 15 == u) {
            C = C, C > i.delay && (C = i.delay), setTimeout(function () {
                punchgs.TweenLite.set(b.find(".defaultimg"), {autoAlpha: 0})
            }, 100);
            var ja = i.width, ka = i.height, la = a.find(".slotslide"), ma = 0, na = 0, oa = 1, pa = 1, qa = 1, ra = C / 1e3, sa = ra;
            "fullwidth" != i.sliderLayout && "fullscreen" != i.sliderLayout || (ja = la.width(), ka = la.height()), 12 == u ? ma = ja : 15 == u ? ma = 0 - ja : 13 == u ? na = ka : 14 == u && (na = 0 - ka), 1 == v && (oa = 0), 2 == v && (oa = 0), 3 == v && (ra = C / 1300), 4 != v && 5 != v || (pa = .6), 6 == v && (pa = 1.4), 5 != v && 6 != v || (qa = 1.4, oa = 0, ja = 0, ka = 0, ma = 0, na = 0), 6 == v && (qa = .6);
            7 == v && (ja = 0, ka = 0);
            var ua = a.find(".slotslide"), va = b.find(".slotslide");
            if (D.add(punchgs.TweenLite.set(g, {zIndex: 15}), 0), D.add(punchgs.TweenLite.set(f, {zIndex: 20}), 0), 8 == v ? (D.add(punchgs.TweenLite.set(g, {zIndex: 20}), 0), D.add(punchgs.TweenLite.set(f, {zIndex: 15}), 0), D.add(punchgs.TweenLite.set(ua, {
                    left: 0,
                    top: 0,
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    ease: E,
                    force3D: "auto"
                }), 0)) : D.add(punchgs.TweenLite.from(ua, ra, {
                    left: ma,
                    top: na,
                    scale: qa,
                    opacity: oa,
                    rotation: i.rotate,
                    ease: E,
                    force3D: "auto"
                }), 0), 4 != v && 5 != v || (ja = 0, ka = 0), 1 != v)switch (u) {
                case 12:
                    D.add(punchgs.TweenLite.to(va, sa, {
                        left: 0 - ja + "px",
                        force3D: "auto",
                        scale: pa,
                        opacity: oa,
                        rotation: i.rotate,
                        ease: F
                    }), 0);
                    break;
                case 15:
                    D.add(punchgs.TweenLite.to(va, sa, {
                        left: ja + "px",
                        force3D: "auto",
                        scale: pa,
                        opacity: oa,
                        rotation: i.rotate,
                        ease: F
                    }), 0);
                    break;
                case 13:
                    D.add(punchgs.TweenLite.to(va, sa, {
                        top: 0 - ka + "px",
                        force3D: "auto",
                        scale: pa,
                        opacity: oa,
                        rotation: i.rotate,
                        ease: F
                    }), 0);
                    break;
                case 14:
                    D.add(punchgs.TweenLite.to(va, sa, {
                        top: ka + "px",
                        force3D: "auto",
                        scale: pa,
                        opacity: oa,
                        rotation: i.rotate,
                        ease: F
                    }), 0)
            }
        }
        if (16 == u) {
            var L = new punchgs.TimelineLite;
            D.add(punchgs.TweenLite.set(g, {
                position: "absolute",
                "z-index": 20
            }), 0), D.add(punchgs.TweenLite.set(f, {
                position: "absolute",
                "z-index": 15
            }), 0), g.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'), g.find(".tp-half-one").clone(!0).appendTo(g).addClass("tp-half-two"), g.find(".tp-half-two").removeClass("tp-half-one");
            var ja = i.width, ka = i.height;
            "on" == i.autoHeight && (ka = h.height()), g.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:' + ja + "px;height:" + ka + 'px;"></div>'), g.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:' + ja + "px;height:" + ka + 'px;"></div>'), g.find(".tp-half-two .defaultimg").css({
                position: "absolute",
                top: "-50%"
            }), g.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'), D.add(punchgs.TweenLite.set(g.find(".tp-half-two"), {
                width: ja,
                height: ka,
                overflow: "hidden",
                zIndex: 15,
                position: "absolute",
                top: ka / 2,
                left: "0px",
                transformPerspective: 600,
                transformOrigin: "center bottom"
            }), 0), D.add(punchgs.TweenLite.set(g.find(".tp-half-one"), {
                width: ja,
                height: ka / 2,
                overflow: "visible",
                zIndex: 10,
                position: "absolute",
                top: "0px",
                left: "0px",
                transformPerspective: 600,
                transformOrigin: "center top"
            }), 0);
            var xa = (g.find(".defaultimg"), Math.round(20 * Math.random() - 10)), ya = Math.round(20 * Math.random() - 10), za = Math.round(20 * Math.random() - 10), Aa = .4 * Math.random() - .2, Ba = .4 * Math.random() - .2, Ca = 1 * Math.random() + 1, Da = 1 * Math.random() + 1, Ea = .3 * Math.random() + .3;
            D.add(punchgs.TweenLite.set(g.find(".tp-half-one"), {overflow: "hidden"}), 0), D.add(punchgs.TweenLite.fromTo(g.find(".tp-half-one"), C / 800, {
                width: ja,
                height: ka / 2,
                position: "absolute",
                top: "0px",
                left: "0px",
                force3D: "auto",
                transformOrigin: "center top"
            }, {
                scale: Ca,
                rotation: xa,
                y: 0 - ka - ka / 4,
                autoAlpha: 0,
                ease: E
            }), 0), D.add(punchgs.TweenLite.fromTo(g.find(".tp-half-two"), C / 800, {
                width: ja,
                height: ka,
                overflow: "hidden",
                position: "absolute",
                top: ka / 2,
                left: "0px",
                force3D: "auto",
                transformOrigin: "center bottom"
            }, {
                scale: Da, rotation: ya, y: ka + ka / 4, ease: E, autoAlpha: 0, onComplete: function () {
                    punchgs.TweenLite.set(g, {
                        position: "absolute",
                        "z-index": 15
                    }), punchgs.TweenLite.set(f, {
                        position: "absolute",
                        "z-index": 20
                    }), g.find(".tp-half-one").length > 0 && (g.find(".tp-half-one .defaultimg").unwrap(), g.find(".tp-half-one .slotholder").unwrap()), g.find(".tp-half-two").remove()
                }
            }), 0), L.add(punchgs.TweenLite.set(a.find(".defaultimg"), {autoAlpha: 1}), 0), null != g.html() && D.add(punchgs.TweenLite.fromTo(f, (C - 200) / 1e3, {
                scale: Ea,
                x: i.width / 4 * Aa,
                y: ka / 4 * Ba,
                rotation: za,
                force3D: "auto",
                transformOrigin: "center center",
                ease: F
            }, {autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0}), 0), D.add(L, 0)
        }
        if (17 == u && a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                D.add(punchgs.TweenLite.fromTo(b, C / 800, {
                    opacity: 0,
                    rotationY: 0,
                    scale: .9,
                    rotationX: -110,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: "center center"
                }, {
                    opacity: 1,
                    top: 0,
                    left: 0,
                    scale: 1,
                    rotation: 0,
                    rotationX: 0,
                    force3D: "auto",
                    rotationY: 0,
                    ease: E,
                    delay: .06 * a
                }), 0)
            }), 18 == u && a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                D.add(punchgs.TweenLite.fromTo(b, C / 500, {
                    autoAlpha: 0,
                    rotationY: 110,
                    scale: .9,
                    rotationX: 10,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: "center center"
                }, {
                    autoAlpha: 1,
                    top: 0,
                    left: 0,
                    scale: 1,
                    rotation: 0,
                    rotationX: 0,
                    force3D: "auto",
                    rotationY: 0,
                    ease: E,
                    delay: .06 * a
                }), 0)
            }), 19 == u || 22 == u) {
            var L = new punchgs.TimelineLite;
            D.add(punchgs.TweenLite.set(g, {zIndex: 20}), 0), D.add(punchgs.TweenLite.set(f, {zIndex: 20}), 0), setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100);
            var Fa = 90, oa = 1, Ga = "center center ";
            1 == G && (Fa = -90), 19 == u ? (Ga = Ga + "-" + i.height / 2, oa = 0) : Ga += i.height / 2, punchgs.TweenLite.set(h, {
                transformStyle: "flat",
                backfaceVisibility: "hidden",
                transformPerspective: 600
            }), a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                L.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    left: 0,
                    rotationY: i.rotate,
                    z: 10,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: Ga,
                    rotationX: Fa
                }, {
                    left: 0,
                    rotationY: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    rotationX: 0,
                    delay: 50 * a / 1e3,
                    ease: E
                }), 0), L.add(punchgs.TweenLite.to(b, .1, {autoAlpha: 1, delay: 50 * a / 1e3}), 0), D.add(L)
            }), b.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = -90;
                1 == G && (c = 90), L.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    autoAlpha: 1,
                    rotationY: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: Ga,
                    rotationX: 0
                }, {
                    autoAlpha: 1,
                    rotationY: i.rotate,
                    top: 0,
                    z: 10,
                    scale: 1,
                    rotationX: c,
                    delay: 50 * a / 1e3,
                    force3D: "auto",
                    ease: F
                }), 0), D.add(L)
            }), D.add(punchgs.TweenLite.set(g, {zIndex: 18}), 0)
        }
        if (20 == u) {
            if (setTimeout(function () {
                    b.find(".defaultimg").css({opacity: 0})
                }, 100), 1 == G)var Ha = -i.width, Fa = 80, Ga = "20% 70% -" + i.height / 2; else var Ha = i.width, Fa = -80, Ga = "80% 70% -" + i.height / 2;
            a.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = 50 * a / 1e3;
                D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    left: Ha,
                    rotationX: 40,
                    z: -600,
                    opacity: oa,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: Ga,
                    transformStyle: "flat",
                    rotationY: Fa
                }, {left: 0, rotationX: 0, opacity: 1, top: 0, z: 0, scale: 1, rotationY: 0, delay: c, ease: E}), 0)
            }), b.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = 50 * a / 1e3;
                if (c = a > 0 ? c + C / 9e3 : 0, 1 != G)var d = -i.width / 2, e = 30, f = "20% 70% -" + i.height / 2; else var d = i.width / 2, e = -30, f = "80% 70% -" + i.height / 2;
                F = punchgs.Power2.easeInOut, D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    opacity: 1,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    left: 0,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: f,
                    transformStyle: "flat",
                    rotationY: 0
                }, {
                    opacity: 1,
                    rotationX: 20,
                    top: 0,
                    z: -600,
                    left: d,
                    force3D: "auto",
                    rotationY: e,
                    delay: c,
                    ease: F
                }), 0)
            })
        }
        if (21 == u || 25 == u) {
            setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100);
            var Fa = 90, Ha = -i.width, Ia = -Fa;
            if (1 == G)if (25 == u) {
                var Ga = "center top 0";
                Fa = i.rotate
            } else {
                var Ga = "left center 0";
                Ia = i.rotate
            } else if (Ha = i.width, Fa = -90, 25 == u) {
                var Ga = "center bottom 0";
                Ia = -Fa, Fa = i.rotate
            } else {
                var Ga = "right center 0";
                Ia = i.rotate
            }
            a.find(".slotslide").each(function (a) {
                var b = jQuery(this), c = C / 1.5 / 3;
                D.add(punchgs.TweenLite.fromTo(b, 2 * c / 1e3, {
                    left: 0,
                    transformStyle: "flat",
                    rotationX: Ia,
                    z: 0,
                    autoAlpha: 0,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 1200,
                    transformOrigin: Ga,
                    rotationY: Fa
                }, {
                    left: 0,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    autoAlpha: 1,
                    scale: 1,
                    rotationY: 0,
                    force3D: "auto",
                    delay: c / 1e3,
                    ease: E
                }), 0)
            }), 1 != G ? (Ha = -i.width, Fa = 90, 25 == u ? (Ga = "center top 0", Ia = -Fa, Fa = i.rotate) : (Ga = "left center 0", Ia = i.rotate)) : (Ha = i.width, Fa = -90, 25 == u ? (Ga = "center bottom 0", Ia = -Fa, Fa = i.rotate) : (Ga = "right center 0", Ia = i.rotate)), b.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    left: 0,
                    transformStyle: "flat",
                    rotationX: 0,
                    z: 0,
                    autoAlpha: 1,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 1200,
                    transformOrigin: Ga,
                    rotationY: 0
                }, {
                    left: 0,
                    rotationX: Ia,
                    top: 0,
                    z: 0,
                    autoAlpha: 1,
                    force3D: "auto",
                    scale: 1,
                    rotationY: Fa,
                    ease: F
                }), 0)
            })
        }
        if (23 == u || 24 == u) {
            setTimeout(function () {
                b.find(".defaultimg").css({opacity: 0})
            }, 100);
            var Fa = -90, oa = 1, Ja = 0;
            if (1 == G && (Fa = 90), 23 == u) {
                var Ga = "center center -" + i.width / 2;
                oa = 0
            } else var Ga = "center center " + i.width / 2;
            punchgs.TweenLite.set(h, {
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                perspective: 2500
            }), a.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    left: Ja,
                    rotationX: i.rotate,
                    force3D: "auto",
                    opacity: oa,
                    top: 0,
                    scale: 1,
                    transformPerspective: 1200,
                    transformOrigin: Ga,
                    rotationY: Fa
                }, {
                    left: 0,
                    rotationX: 0,
                    autoAlpha: 1,
                    top: 0,
                    z: 0,
                    scale: 1,
                    rotationY: 0,
                    delay: 50 * a / 500,
                    ease: E
                }), 0)
            }), Fa = 90, 1 == G && (Fa = -90), b.find(".slotslide").each(function (a) {
                var b = jQuery(this);
                D.add(punchgs.TweenLite.fromTo(b, C / 1e3, {
                    left: 0,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    transformStyle: "flat",
                    transformPerspective: 1200,
                    transformOrigin: Ga,
                    rotationY: 0
                }, {
                    left: Ja,
                    rotationX: i.rotate,
                    top: 0,
                    scale: 1,
                    rotationY: Fa,
                    delay: 50 * a / 500,
                    ease: F
                }), 0), 23 == u && D.add(punchgs.TweenLite.fromTo(b, C / 2e3, {autoAlpha: 1}, {
                    autoAlpha: 0,
                    delay: 50 * a / 500 + C / 3e3,
                    ease: F
                }), 0)
            })
        }
        if (D.add(punchgs.TweenLite.set(a.find(".defaultimg"), {autoAlpha: 1})), D.add(punchgs.TweenLite.set(a.find(".slot"), {autoAlpha: 0})), D.seek(1e5), void 0 != d)return D;
        jQuery("#divbgholder").data("slidetimeline", D)
    }, removeAllSlots = function () {
        void 0 != jQuery("#divbgholder").data("slidetimeline") && (jQuery("#divbgholder").data("slidetimeline").kill(), jQuery("#divbgholder").find(".slot").each(function () {
            jQuery(this).remove()
        }))
    };
    t.resetSlideAnimations = function (a) {
        removeAllSlots(), slideAnimation();
        var b = jQuery("#divbgholder").data("slidetimeline"), c = jQuery("#mastertimer-position"), d = c.position().left / 100;
        void 0 != b && (b.stop(), a && b.seek(d))
    }
};
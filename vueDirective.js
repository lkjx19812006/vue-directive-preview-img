//以插件的方式 申明自定义指令集
var anyiDirective = {};
anyiDirective.install = function (Vue, options) {
  //1.自定义动画指令
  //需要配合animated.css
  //暂时支持的几种属性
  //v-animate="{value: 'slideInRight', duration: 300, delay: 300}"
  Vue.directive('animate', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding, vNode) {
      if (binding && binding.value) {
        //添加动画名称
        var delay = binding.value.delay || 0;
        el.classList.add("animated");
        //先隐藏后显示 防止页面闪烁
        el.style.opacity = 0;
        setTimeout(function () {
          //动画持续时间
          //后期如果需要添加的话 可以继续添加
          if (binding.value.duration) {
            el.style['animation-duration'] = binding.value.duration + 'ms';
            el.style['-webkit-animation-duration'] = binding.value.duration + 'ms';
          }
          el.classList.add(binding.value.value);
          el.style.opacity = 1;
        }, delay)
      }
    }

  });


  //2.自定义加载指令【该指令是定义在全局】
  //暂时支持的几种属性
  //v-loading="{value: true or false, msg: '加载文字'}"
  //或者 v-loading="true or false"
  Vue.directive('loading', {
    //初始化的时候 如果传入的值为true 
    //则显示loading
    inserted: function (el, binding, vNode) {
      _initLoading(el, binding, vNode)
    },

    //组件里面的值更新时 根据更新的值对齐进行处理
    componentUpdated: function (el, binding, vNode) {
      _initLoading(el, binding, vNode)
    }

  })

  //2.1添加loading
  var _initLoading = function (el, binding, vNode) {
    var hasLoading = false;
    var msg = ''
    if (binding && typeof binding.value === 'boolean') {
      hasLoading = binding.value;
      msg = '加载中...';
    } else {
      hasLoading = binding.value.value;
      msg = binding.value.msg || '加载中...';
    }
    if (hasLoading) {
      loading = document.createElement('div');
      loading.classList.add('yd-dialog-white-mask');
      loading.classList.add('yd-dialog-loading');
      loading.innerHTML =
        '<div class="yd-toast" style="padding-bottom: 20px;">' +
        '<div style="display: flex; flex-direction: column; justify-content: center; align-items: center">' +
        '<img style="height: 30px; width: 30px; animation: rotate-loading 2s linear forwards infinite" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4="/>' +
        '<div style="font-size: 15px; margin-top: 8px;">' + msg + '</div>' +
        '</div>' +
        '</div>'
      body.appendChild(loading)
    } else {
      if (!loading) {
        loading = document.querySelector('.yd-dialog-loading');
      }
      if (loading) {
        body.removeChild(loading)
        loading = null;
      }
    }
  };


  //3.自定义页面滚动事件
  //注意 页面布局时一定要将图片的盒子设置高度 防止图片没加载完成盒子高度为0的情况
  //这里将指令绑定在 
  //v-scrollfixed="{el: '#scrollView', fixedEl: '#navBar'}"
  //注意布局问题 一定要yd-layout 并且 el 为yd-layout里面滚动的内容 
  //fixedEl 一点要有个包裹盒子 注意 插入到不同位置时回出现样式的问题 所以样式一点要写在 layout 第一级下才能在盒子移动时生效
  Vue.directive('scrollfixed', {
    inserted: function (el, binding, vNode) {
      setTimeout(function () {

        var scrillView = el.querySelector(binding.value.el);
        var fixedView = el.querySelector(binding.value.fixedEl);
        var fixedPreNode = fixedView.parentNode;
        var temp = fixedView.offsetTop;
        scrillView.addEventListener('scroll', function (e) {
          if (e.target.scrollTop >= temp) {
            fixedView.style['border-bottom'] = '1px solid #eee';
            el.prepend(fixedView);
          } else {
            fixedPreNode.prepend(fixedView);
          }
        });

      }, 0)
    },
  })

  //4.点击元素 滚动到指定位置
  //v-scrollto="{'wrapEl': '#scrollView', 'toEl': '#FAQ', active: 'nav-item-active'}"
  // wrapEl 可滚动的盒子 
  // toEl 需要滚动到哪里 
  // active 滚动到后激活样式
  Vue.directive('scrollto', {
    inserted: function (el, binding, vNode) {
      setTimeout(function () {

        var scrollView = document.querySelector(binding.value.wrapEl);
        var targetView = document.querySelector(binding.value.toEl);

        //通过父元素 查找包括自己的所有兄弟元素
        var parentNode = el.parentNode;
        var children = parentNode.children;


        //监听点击事件
        el.addEventListener('click', function () {
          //先干掉定时器
          clearInterval(config.timer);
          //这里不需要减控件去自身高度
          // var temp = targetView.offsetTop;

          if (config.hasScroll) {
            config.hasScroll = false;
            //排他
            for (var i = 0; i < children.length; i++) {
              var item = children[i];
              item.classList.remove(binding.value.active);
            };
            el.classList.add(binding.value.active);
            _scrollAnimated(scrollView, targetView, function () {
              config.hasScroll = true;
            })
          }

        });

        var scrollActive = function (e) {
          if (!config.hasScroll) return;
          var temp = targetView.offsetTop;
          //高亮当前滚动到的类型
          if (e.target.scrollTop >= temp) {
            //排他
            for (var i = 0; i < children.length; i++) {
              var item = children[i];
              item.classList.remove(binding.value.active);
            };
            el.classList.add(binding.value.active);
          };
        }
        scrollView.addEventListener('scroll', scrollActive);


      }, 0)
    },
  })

  //4.1执行滚动动画 
  var _scrollAnimated = function (scrollView, targetView, callback) {
    //解决页面闪烁情况
    scrollView.style['-webkit-overflow-scrolling'] = 'hidden'
    scrollView.style['overflow'] = 'hidden'

    var count = 0;//记录上次滚动的值 用于解决 滚动高度不够 死循环的情况
    config.timer = setInterval(function () {
      var step = targetView.offsetTop - scrollView.scrollTop;
      var direction = step < 0 ? -1 : 1;
      if (Math.abs(step) > 0 && count !== step) {
        var temp = Math.abs(step) <= 1 ? direction * 1 : direction * Math.abs(step) / 2;
        scrollView.scrollTop = scrollView.scrollTop + temp;
        //用于解决 滚动高度不够 死循环的情况
        count = step;
      } else {
        scrollView.style['-webkit-overflow-scrolling'] = 'touch'
        scrollView.style['overflow'] = 'auto'
        count = 0;//还原
        callback();
        clearInterval(config.timer);
      }
    }, 25)
  }

  //5.自定义指令 折叠面板 
  //默认绑定了指令的 统统都先隐藏内容
  //v-accordion="{active: '头部激活样式', animate: '动画名称 配合ainmated.css'}"
  Vue.directive('accordion', {
    inserted: function (el, binding, vNode) {
      setTimeout(function () {

        var header = el.children[0];//头部
        var content = el.children[1];//内容
        var hasShow = false;
        content.style.display = 'none';
        header.addEventListener('click', function () {
          if (!hasShow) {
            content.style.display = 'block';
            header.classList.add(binding.value.active)
            if (binding.value.animate) {
              content.classList.add('animated');
              content.classList.add(binding.value.animate);
            }

            hasShow = true;
          } else {
            content.style.display = 'none';
            header.classList.remove(binding.value.active);
            if (binding.value.animate) {
              content.classList.remove('animated');
              content.classList.remove(binding.value.animate);
            }
            hasShow = false;
          }
        })

      }, 0)
    }
  })


  //6.自定义back 返回指令
  //暂未做传参功能 后期可增加
  //{value:showtbsm, position: 'right' }
  //目前只支持从右往左滑动 时间禁止 后期可以自己加
  Vue.directive('back', {
    inserted: function (el, binding, vNode) {
      el.addEventListener('click', function () {
        window.history.back(-1);
      })
    }
  })

  //7.自定义指令 显示页面功能 显示类似与协议 等
  Vue.directive('showpage', {
    inserted: function (el, binding, vNode) {
      //初始化位置
      el.style.background = '#fff';
      el.style.position = 'fixed';
      el.style['z-index'] = '-1';
      el.style.top = 0;
      el.style.left = 0;
      el.classList.add('animated');
    },
    componentUpdated: function (el, binding, vNode) {
      if (binding.value.value) {
        _addAnimated(el, binding, vNode)
      } else {
        _removeAnimated(el, binding, vNode)
      }

    },
  })

  var _addAnimated = function (el, binding, vNode) {
    el.classList.remove('slideOutRight');
    setTimeout(function () {
      el.style['z-index'] = '999';
      el.style['animation-duration'] = '300ms';
      el.style['-webkit-animation-duration'] = '300ms';
      el.classList.add('slideInRight');
    }, 0)

  }
  var _removeAnimated = function (el, binding, vNode) {
    el.classList.remove('slideInRight');
    setTimeout(function () {
      el.classList.add('slideOutRight');
      setTimeout(function () {
        el.style['z-index'] = '-1';
      }, 300)
    }, 0)
  }





  //8.自定义图片预览功能
  Vue.directive('preview', {
    inserted: function (el, binding, vNode) {
      el.addEventListener('click', function () {
        var imgData = _getAllImgPreviewDom(el.getAttribute('src'));

        _createDomByImgList(imgData);
      })
    }
  })

  //8.1查找所有有img-preview 的标签
  var _getAllImgPreviewDom = function (indexSrc) {
    var srcs = document.querySelectorAll('.img-preview') || [];
    var result = {
      imgList: [],
      nowIndex: 0//当前点击的图片再数组里面的index值
    };
    for (var i = 0; i < srcs.length; i++) {
      //找到img标签所有的src属性拼成数组返回
      var src = srcs[i].getAttribute('src');
      if (src && src !== 'null') {
        result.imgList.push(src);
        if (indexSrc === src) {
          result.nowIndex = i;
        }
      }
    }
    return result
  }

  //8.2根据img数据源 创建DOM
  var _createDomByImgList = function (imgData) {
    var imgList = imgData.imgList;

    var wrap = _createDomWrap(imgData);

    var wrapSlide = document.createElement('div');
    wrapSlide.setAttribute('id', 'img-preview-slide');
    var wrapSlideStyle = {
      height: '100%',
      width: imgList.length * window.screen.width + 'px',
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      transform: `translate3d(${-imgData.nowIndex * window.screen.width}px, 0, 0)`
    }
    var wrapChildDom = '';
    for (var i = 0; i < imgList.length; i++) {
      var strTemp = `<div style="flex: 0 0 ${window.screen.width}px; display: flex; flex-direction: row; justify-content: center; align-items: center; height: 100%;" class="img-preview-item">
                       <img style="width: 100%;height: auto;" class="img-preview-img" src="${imgList[i]}" />
                     </div>`;
      wrapChildDom += strTemp;
    }
    //将图片加入到 包裹盒子中
    wrapSlide.innerHTML = wrapChildDom;
    wrap.appendChild(wrapSlide);
    _setDomStyleByStyles(wrapSlide, wrapSlideStyle);
  }

  //8.3创建预览盒子DOM
  var _createDomWrap = function (imgData) {
    var wrap = document.createElement('div');
    wrap.setAttribute('id', 'img-preview-wrap');
    var wrapStyle = {
      position: 'fixed',
      'z-index': 9999,
      height: '100vh',
      width: '100vw',
      top: 0,
      left: 0,
      background: 'black',
      overflow: 'hidden'
    }
    //设置DOM 样式
    _setDomStyleByStyles(wrap, wrapStyle);

    //声明手势事件对象
    var zoomConfig = {
      ratio: 0,//缩放比例
      nowImgDom: null,
      tempRatio: 1,//
      isZoom: false,
      touchObj1: {
        time: 0,
        startX: 0,
        moveX: 0,
        tempX: window.screen.width * imgData.nowIndex,
        showIndex: imgData.nowIndex
      },
      //放大时的触摸数据
      zoomTouch: {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        tempX: 0,
        tempY: 0,
        padding: 30,//边距回弹
        hasMaxLeft: false,//是否在左边界
        hasMaxRight: false,//是否在右边界
        hasMaxTop: false,//是否在顶边界
        hasMaxBottom: false,//是否在底边界
      },
      lines: [0, 0],
      stepLines: [0, 0],
      boxItems: []
    }

    //中心点
    var origin = {
      x: window.screen.width / 2,
      y: window.innerHeight / 2
    }

    wrap.addEventListener('touchstart', function (e) {
      zoomConfig.touchCount = e.touches.length;
      e.stopPropagation();
      e.preventDefault();
      //关闭过渡
      var wrapSlide = document.getElementById('img-preview-slide');
      if (wrapSlide) {
        wrapSlide.style.transition = '';
      }
      if (zoomConfig.touchCount === 1) {
        //记录当前时间做关闭按钮使用
        zoomConfig.touchObj1.time = new Date().getTime()
        zoomConfig.touchObj1.startX = e.touches[0].pageX;

        //缩放时的数据
        zoomConfig.zoomTouch.startX = e.touches[0].pageX;
        zoomConfig.zoomTouch.startY = e.touches[0].pageY;
        if (zoomConfig.nowImgDom) {
          zoomConfig.nowImgDom.style.transition = '';
        }
        // zoomConfig.boxItems = document.getElementById('img-preview-slide').querySelectorAll('.img-preview-item') || [];
        // setNowImgRatio(2);
      } else if (zoomConfig.touchCount > 1) {
        //开始时 两个点距离中心点的距离
        zoomConfig.lines[0] = getOriginLine(e.touches[0]);
        zoomConfig.lines[1] = getOriginLine(e.touches[1]);
        zoomConfig.boxItems = document.getElementById('img-preview-slide').querySelectorAll('.img-preview-item') || [];
        //多个触摸点 开启缩放
        zoomConfig.isZoom = true;
      }
    })
    wrap.addEventListener('touchmove', function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (zoomConfig.touchCount === 1) {
        if (!zoomConfig.isZoom) {
          //不处于缩放状态中 移动盒子
          zoomConfig.touchObj1.moveX =
            zoomConfig.touchObj1.startX - e.touches[0].pageX + zoomConfig.touchObj1.tempX;

          if (this.children[0]) {
            this.children[0].style.transform = `translate3d(${-zoomConfig.touchObj1.moveX}px, 0, 0)`
          }
        } else {
          //处于缩放状态中 移动图片
          zoomConfig.zoomTouch.moveX = zoomConfig.zoomTouch.startX - e.touches[0].pageX + zoomConfig.zoomTouch.tempX;
          zoomConfig.zoomTouch.moveY = zoomConfig.zoomTouch.startY - e.touches[0].pageY + zoomConfig.zoomTouch.tempY;
          if (zoomConfig.nowImgDom) {
            //拿到当前图片的宽高
            var imgHeight = zoomConfig.nowImgDom.offsetHeight * zoomConfig.tempRatio;
            var imgWidth = zoomConfig.nowImgDom.offsetWidth * zoomConfig.tempRatio
            // //计算是否移动到了边界
            var maxW = (imgWidth - window.screen.width) / (zoomConfig.tempRatio * 2);
            if (zoomConfig.zoomTouch.moveX <= - maxW) {
              //x朝右移动
              zoomConfig.zoomTouch.moveX = -maxW;
              zoomConfig.zoomTouch.hasMaxLeft = true;
              zoomConfig.zoomTouch.hasMaxRight = false;
            } else if (zoomConfig.zoomTouch.moveX >= maxW) {
              zoomConfig.zoomTouch.moveX = maxW;
              zoomConfig.zoomTouch.hasMaxRight = true;
              zoomConfig.zoomTouch.hasMaxLeft = false;
            } else {
              zoomConfig.zoomTouch.hasMaxRight = false;
              zoomConfig.zoomTouch.hasMaxLeft = false;
            }
            //这里获取的是浏览器窗口的大小 不是屏幕大小
            var maxH = (imgHeight - window.innerHeight) / (zoomConfig.tempRatio * 2);
            if (zoomConfig.zoomTouch.moveY <= - maxH && imgHeight >= window.screen.height) {
              //y向下移动
              zoomConfig.zoomTouch.moveY = -maxH;
              zoomConfig.zoomTouch.hasMaxTop = true;
              zoomConfig.zoomTouch.hasMaxBottom = false;
            } else if (zoomConfig.zoomTouch.moveY >= maxH && imgHeight >= window.screen.height) {
              zoomConfig.zoomTouch.moveY = maxH;
              zoomConfig.zoomTouch.hasMaxBottom = true;
              zoomConfig.zoomTouch.hasMaxTop = false;
            } else if (imgHeight < window.screen.height) {
              zoomConfig.zoomTouch.moveY = 0;
              zoomConfig.zoomTouch.hasMaxTop = false;
              zoomConfig.zoomTouch.hasMaxBottom = false;
            }
            setTimeout(function () {
              zoomConfig.nowImgDom.style.transform = `scale(${zoomConfig.tempRatio}, ${zoomConfig.tempRatio}) translate3d(${-zoomConfig.zoomTouch.moveX}px, ${-zoomConfig.zoomTouch.moveY}px, 0)`;
            })
          }
        }

      } else if (zoomConfig.touchCount > 1) {
        //移动时 两个点距离中心点的距离
        zoomConfig.stepLines[0] = getOriginLine(e.touches[0]);
        zoomConfig.stepLines[1] = getOriginLine(e.touches[1]);

        //思路 开始两点距离中心距离和 与移动时两个点距离中心距离之和做比较
        var startLine = zoomConfig.lines[0] + zoomConfig.lines[1];
        var moveLine = zoomConfig.stepLines[0] + zoomConfig.stepLines[1];

        //计算放大比例
        var ratio = zoomConfig.tempRatio + (moveLine - startLine) / 200;
        if (ratio > 3) {
          zoomConfig.ratio = 3;
        } else if (ratio < 0.5) {
          zoomConfig.ratio = 0.5;
        } else {
          zoomConfig.ratio = ratio
        }
        //设置当前盒子的图片的放大比例
        setNowImgRatio(zoomConfig.ratio);
      }
    })
    wrap.addEventListener('touchend', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var time = new Date().getTime()
      var direction = e.changedTouches[0].pageX > zoomConfig.touchObj1.startX ? 1 : -1;
      var step = Math.abs(e.changedTouches[0].pageX - zoomConfig.touchObj1.startX);
      if (zoomConfig.touchCount > 1) {
        if (zoomConfig.ratio <= 1 && zoomConfig.ratio) {
          //还原
          zoomConfig.ratio = 0;
          zoomConfig.tempRatio = 1;
          setNowImgRatio(1, true);
        } else if (zoomConfig.ratio) {
          zoomConfig.tempRatio = zoomConfig.ratio;
          zoomConfig.ratio = 0;
        }
      } else if (!zoomConfig.isZoom) {
        //不处于缩放处于缩放状态中
        //判断滑动方向 1向右 -1 向左
        //点击还原
        if (time - zoomConfig.touchObj1.time < 300 && step <= 50) {
          //单击事件
          //删除预览
          var _self = this;
          setTimeout(function () {
            document.body.removeChild(_self);
          });
          return;
        }

        if (direction > 0) {
          if (step > 50) {
            //显示上一张
            showUpPage()
          } else {
            //还原
            resetTransform()
          }

        } else {
          if (step > 50) {
            //显示下一张
            showNextPage()
          } else {
            //还原
            resetTransform()
          }
        }
      } else if (zoomConfig.isZoom) {
        //点击还原
        if (time - zoomConfig.touchObj1.time < 300 && step <= 50) {
          //单击事件
          resetZoomTouchData();
          return;
        }

        //处于缩放状态中
        //如果左右达到边界
        if (zoomConfig.zoomTouch.hasMaxLeft || zoomConfig.zoomTouch.hasMaxRight) {
          //重置所有缩放数据       

          //还原图片大小
          //还原所有缩放数据          
          if (zoomConfig.zoomTouch.hasMaxLeft) {
            //显示上一张
            showUpPage()
            resetZoomTouchData()
          } else if (zoomConfig.zoomTouch.hasMaxRight) {
            //显示下一张
            showNextPage()
            resetZoomTouchData()
          };

        } else {
          zoomConfig.zoomTouch.tempX = zoomConfig.zoomTouch.moveX;
          zoomConfig.zoomTouch.tempY = zoomConfig.zoomTouch.moveY;
        }
      }

    })

    //还原所有缩放数据
    var resetZoomTouchData = function () {
      //干掉所有的过渡
      for (var i = 0; i < zoomConfig.boxItems.length; i++) {
        var item = zoomConfig.boxItems[i];
        var itemImg = item.querySelector('img');
        if (itemImg) {
          itemImg.style.transition = 'all 0.3s ease-out';
          itemImg.style.transform = `scale(1, 1) translate3d(0, 0, 0)`
        }
      };
      zoomConfig.isZoom = false;
      zoomConfig.zoomTouch.startX = 0;
      zoomConfig.zoomTouch.startY = 0;
      zoomConfig.zoomTouch.moveX = 0;
      zoomConfig.zoomTouch.moveY = 0;
      zoomConfig.zoomTouch.tempX = 0;
      zoomConfig.zoomTouch.tempY = 0;
      zoomConfig.zoomTouch.padding = 30;
      zoomConfig.zoomTouch.hasMaxLeft = false;
      zoomConfig.zoomTouch.hasMaxRight = false;
      zoomConfig.zoomTouch.hasMaxTop = false;
      zoomConfig.zoomTouch.hasMaxBottom = false;
      zoomConfig.tempRatio = 1;
    }

    //根据触摸点获取到中心的长度
    var getOriginLine = function (eventTouche) {
      return Math.sqrt(Math.pow(eventTouche.clientX - origin.x, 2) + Math.pow(eventTouche.clientY - origin.y, 2));
    }

    //设置当前图片的放大比例
    var setNowImgRatio = function (ratio, isTran) {
      zoomConfig.nowImgDom = zoomConfig.boxItems[zoomConfig.touchObj1.showIndex].querySelector('img');
      if (zoomConfig.nowImgDom) {
        if (isTran) {
          zoomConfig.nowImgDom.style.transition = 'all 0.3s ease-in-out';
          zoomConfig.zoomTouch.tempX = 0;
          zoomConfig.zoomTouch.tempY = 0;
        } else {
          zoomConfig.nowImgDom.style.transition = '';
        }
        zoomConfig.nowImgDom.style['z-index'] = 9999;
        zoomConfig.nowImgDom.style.transform = `scale(${ratio}, ${ratio}) translate3d(${-zoomConfig.zoomTouch.tempX}px, ${-zoomConfig.zoomTouch.tempY}px, 0)`;
      }
    }

    //显示下一张
    var showNextPage = function () {
      //开启过过渡
      var wrapSlide = document.getElementById('img-preview-slide');
      if (!wrapSlide) {
        return;
      }
      wrapSlide.style.transition = 'all .3s ease-in-out';
      if (wrapSlide && zoomConfig.touchObj1.showIndex < imgData.imgList.length - 1) {
        zoomConfig.touchObj1.showIndex = zoomConfig.touchObj1.showIndex + 1;
        wrapSlide.style.transform = `translate3d(${-window.screen.width * zoomConfig.touchObj1.showIndex}px, 0, 0)`
      } else {
        //还原
        wrapSlide.style.transform = `translate3d(${-window.screen.width * zoomConfig.touchObj1.showIndex}px, 0, 0)`
      }
      zoomConfig.touchObj1.tempX = window.screen.width * zoomConfig.touchObj1.showIndex;
    }

    //显示上一张
    var showUpPage = function () {
      var wrapSlide = document.getElementById('img-preview-slide');
      if (!wrapSlide) {
        return;
      }
      wrapSlide.style.transition = 'all .3s ease-in-out';
      if (zoomConfig.touchObj1.showIndex > 0) {
        zoomConfig.touchObj1.showIndex = zoomConfig.touchObj1.showIndex - 1;
        wrapSlide.style.transform = `translate3d(${-window.screen.width * zoomConfig.touchObj1.showIndex}px, 0, 0)`
      } else {
        //还原
        wrapSlide.style.transform = `translate3d(${-window.screen.width * zoomConfig.touchObj1.showIndex}px, 0, 0)`
      }
      zoomConfig.touchObj1.tempX = window.screen.width * zoomConfig.touchObj1.showIndex;
    }

    //还原位置
    var resetTransform = function () {
      var wrapSlide = document.getElementById('img-preview-slide');
      if (!wrapSlide) {
        return;
      }
      wrapSlide.style.transition = 'all .3s ease-in-out';
      wrapSlide.style.transform = `translate3d(${-window.screen.width * zoomConfig.touchObj1.showIndex}px, 0, 0)`
      zoomConfig.touchObj1.tempX = window.screen.width * zoomConfig.touchObj1.showIndex;
    }

    //取消默认事件
    //加入到body标签中
    document.body.appendChild(wrap);
    return wrap
  }

  //8.4根据样式对象 设置DOM样式
  var _setDomStyleByStyles = function (dom, styles) {
    for (var k in styles) {
      dom.style[k] = styles[k];
    }
  }

}
export default anyiDirective;




一、HTML5新增了哪些内容或API，使用过哪些？
1、document.querySelector()和document.querySelectorAll()方法
document.querySelector()：根据css选择器返回第一个匹配的元素，如果没有匹配返回null；
document.querySelectorAll()：querySelectorAll和querySelector作用一样的，只是querySelectorAll返回的是元素数组，querySelector返回的是一个元素。如果querySelectorAll没有匹配的内容返回的是一个空数组。
2、HTML5之classList属性
classList属性没有出现之前js操作元素class都是使用className，在开发一个网站的时候标签的class不只是一个，有可能多个，这个时候使用className操作多个类就比较麻烦了，需要进行拆分、删除等。
<body>
  <ul class="class1 class2 class3 ">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
  <script>
    var ul = document.getElementsByTagName("ul")[0];
    console.log(ul.classList.item(0));
    ul.classList.add("class4");
    ul.classList.remove("class4");
    console.log(ul.classList.contains("class1"));
  </script>
</body>
3、HTML5 全屏
FullScreen API 是一个新的JavaScript API,简单而又强大. FullScreen 让我们可以通过编程的方式来向用户请求全屏显示,如果交互完成,随时可以退出全屏状态.
FullScreen是HTML5的一个新特征，现在主流的浏览器已经支持：
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    html:-moz-full-screen {
      background: red;
    }

    html:-webkit-full-screen {
      background: red;
    }

    html:fullscreen {
      background: red;
    }
  </style>
</head>
<body>
<ul class="class1 class2 class3 ">
  <li onclick="launchFullScreen()">全屏</li>
  <input type="text">
</ul>
<button onclick="exitFullscreen()">click me</button>
<script>
  // 找到支持的方法, 使用需要全屏的 element 调用
  function launchFullScreen(element) {

    var element=element||document.documentElement;
    alert(element.nodeName);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  //请注意: exitFullscreen 只能通过 document 对象调用 —— 而不是使用普通的 DOM element.
  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozExitFullScreen) {
      document.mozExitFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);//全屏状态允许键盘输入

  /*有的时候为了用户友好体验，在进入全屏或者退出全屏的时候，需要给用户提示，
  这个时候我们可以使用FullScreen的screenchange事件进行监控。事件监听没作用？？？？？*/
  document.addEventListener("fullscreenchange", function () {
   fullscreenState.innerHTML = (document.fullscreen)? "" : "not ";
  }, false);

  document.addEventListener("mozfullscreenchange", function () {
    fullscreenState.innerHTML = (document.mozFullScreen)? "" : "not ";
  }, false);

  document.addEventListener("webkitfullscreenchange", function () {
    fullscreenState.innerHTML = (document.webkitIsFullScreen)? "" : "not ";
  }, false);


</script>
</body>
</html>

4、HTML5 页面可见性(Page Visibility)
H5 引入的 Page Visibility API这个 API 本身非常简单，由以下三部分组成。
document.hidden：表示页面是否隐藏的布尔值。页面隐藏包括 页面在后台标签页中 或者 浏览器最小化（注意，页面被其他软件遮盖并不算隐藏，比如打开的 sublime 遮住了浏览器）
document.visibilityState：表示下面 4 个可能状态的值
hidden：页面在后台标签页中或者浏览器最小化
visible：页面在前台标签页中
prerender：页面在屏幕外执行预渲染处理 document.hidden 的值为 true
unloaded：页面正在从内存中卸载
Visibilitychange 事件：当文档从可见变为不可见或者从不可见变为可见时，会触发该事件。
这样，我们可以监听 Visibilitychange 事件，当该事件触发时，获取 document.hidden 的值，根据该值进行页面一些事件的处理。

document.addEventListener('visibilitychange', function() {
  var isHidden = document.hidden;
  if (isHidden) {
    // 动画停止
    // 服务器轮询停止 等等
  } else {
    // 动画开始
    // 服务器轮询
  }
});
提供一个兼容各高级浏览器以及低版本 IE 写法（低版本 IE 用 onfocus/onblur 兼容）：

(function() {
  var hidden = "hidden";

  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide
    = window.onfocus = window.onblur = onchange;

  function onchange (evt) {
    var v = "visible", h = "hidden",
        evtMap = {
          focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
        };

    evt = evt || window.event;
    if (evt.type in evtMap)
      document.body.className = evtMap[evt.type];
    else
      document.body.className = this[hidden] ? "hidden" : "visible";
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if( document[hidden] !== undefined )
    onchange({type: document[hidden] ? "blur" : "focus"});
})();

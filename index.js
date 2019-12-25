
////////////////////////////////////////////////   原生方法     ////////////////////////////////////////////////
// var num = document.getElementsByTagName('img').length;
// var img = document.getElementsByTagName("img");
// var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

// lazyload(); //页面载入完毕加载可是区域内的图片
// window.onscroll = lazyload;

// function lazyload() { //监听页面滚动事件
//     var seeHeight = document.documentElement.clientHeight; //可见区域高度
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
//     for (var i = n; i < num; i++) {
//         if (img[i].offsetTop < seeHeight + scrollTop) {
//             if (img[i].getAttribute("src") == "default.jpg") {
//                 img[i].src = img[i].getAttribute("data-src");
//             }
//             n = i + 1;
//         }
//     }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////   jq方法     ////////////////////////////////////////////////
// var num = document.getElementsByTagName('img').length;
// var img = document.getElementsByTagName("img");
// var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

// lazyload(); //页面载入完毕加载可是区域内的图片

// window.onscroll = lazyload;

// function lazyload() { //监听页面滚动事件
//     var seeHeight = document.documentElement.clientHeight; //可见区域高度
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
//     for (var i = n; i < num; i++) {
//         if (img[i].offsetTop < seeHeight + scrollTop) {
//             if (img[i].getAttribute("src") == "default.jpg") {
//                 img[i].src = img[i].getAttribute("data-src");
//             }
//             n = i + 1;
//         }
//     }
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var num = document.getElementsByTagName('img').length;
var img = document.getElementsByTagName("img");
var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历


lazyload() // 先调用一次，加载当前页面

// 简单的节流函数
//fun 要执行的函数
//delay 延迟
//time  在time时间内必须执行一次
function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();

    return function() {
        curTime = new Date();

        // 将之前的定时器清理掉
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        // 判断当前事件是否是
        if (curTime - startTime >= time) {
            fun.apply();
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
// 实际想绑定在 scroll 事件上的 handler
function lazyload() { //监听页面滚动事件
    var seeHeight = document.documentElement.clientHeight; //可见区域高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
    
    // 加载完成后卸载滚动事件，避免一直触发
    if(n == num ) $(window).off("scroll");
    
    for (var i = n; i < num; i++) {
        if (img[i].offsetTop < seeHeight + scrollTop) {
            if (img[i].getAttribute("src") == "default.jpg") {
                img[i].src = img[i].getAttribute("data-src");
            }
            n = i + 1;
        }
    }
}

// 采用了节流函数
$(window).on("scroll", throttle(lazyload,300,500));  //绑定滚动事件
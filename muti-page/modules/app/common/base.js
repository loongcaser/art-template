/**
 * Created by longks on 2017/4/24.
 */
 define([],function(){
    //滚动
    window.onscroll = function(){
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        var header = document.getElementById( "header" );
        var top_div = document.getElementById( "gotop" );
        if( t >= 100 ) {
            header.className = "header fixed"
            top_div.style.display = "block";
            top_div.onclick = function (event) {
                window.scroll(0, 0)
            }
        } else {
            header.className = "header"
            top_div.style.display = "none";
        }
    }
})
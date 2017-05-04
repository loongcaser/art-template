/**
 * Created by longks on 2017/4/24.
 */
 define(['jquery','page'], function ($) {
    $(function () {
        var GG = {
			    "kk":function(mm){
			        $.ajax({
			            type:"GET",
			            url:"./resource/data/news2.json",
			            dataType: "json",
			            success: function(data){
			                var str="<ul>";
			                $.each(data.list[mm],function(i,n){
			                    str+="<li>"+
			                        "<h3 class=\"body-title\"><a href=\"news-detail.html\">"+n["title"]+"</a></h3>" +
			                        "<span class=\"body-date\">"+n["date"]+"</span>"+
			                        "<img src="+n["url"]+" alt=\"news-list\">" +
			                        "<p>"+n["desc"]+"</p><hr>" +
			                        "</li>";
			                })
			                str+="</ul>";
			                $("#news-body").html(str);
			            }
			        });
			    }
			}
			$("#page").initPage(20,1,GG.kk);
    });
});

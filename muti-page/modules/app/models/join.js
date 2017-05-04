/**
 * Created by longks on 2017/4/24.
 */
 define(['jquery','page'], function ($) {
    $(function () {
        var GG = {
            "kk":function(mm){
                $.ajax({
                    //请求方式为get
                    type:"GET",
                    //json文件位置
                    url:"./resource/data/join.json",
                    //返回数据格式为json
                    dataType: "json",
                    //请求成功完成后要执行的方法
                    success: function(data){
                        var str="";
                        $.each(data.list[mm],function(i,n){
                            str+="<tr>"+
                                "<td><a href=\"join-detail.html\">"+n["name"]+"</a></td>"+
                                "<td>"+n["section"]+"</td>"+
                                "<td>"+n["place"]+"</td>"+
                                "<td>"+n["num"]+"</td>"+
                                "<td>"+n["date"]+"</td>"+
                                "</tr>";
                        })
                        $("#result").html(str);
                    }
                });
            }
        }
        $("#page").initPage(10,1,GG.kk);
    });
});

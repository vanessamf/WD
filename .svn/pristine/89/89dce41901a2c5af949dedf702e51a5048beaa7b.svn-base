/**
 * Created by Administrator on 2017-4-6.
 */
function request(url,paras){
    var j;
    var paraString = url.split("&");
    var paraObj = {};
    for (var i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(function(){
    /*根据参数设置选中的费用*/
    $(".exp-nav-list li").each(function(){
        var _this = $(this),
            nav_index = _this.index();
        if(nav_index == getQueryString("nav_index")){
            _this.addClass("active").siblings().removeClass("active");
            var  cur_sub_v = $(".exp-switch-view dd").eq(getQueryString("nav_index"));
            if(!cur_sub_v.hasClass("current-view")){
                cur_sub_v.addClass("current-view").siblings().removeClass("current-view")
            }
            return false;
        }
    })
    $('.exp-nav-list').on('click','li',function(){
        var _this = $(this),
            index = _this.index();
        _this.addClass("active").siblings().removeClass("active");
        var cur_sub_v = $(".exp-switch-view dd").eq(index);
        if(!cur_sub_v.hasClass("current-view")){
            cur_sub_v.addClass("current-view").siblings().removeClass("current-view")
        }
    })

    $(".tip-box,.dis-whole-box").on('click','.exp-item',function(e){
        var _this = $(this)
        _this.addClass("active").siblings().removeClass("active")
    });

    $(".exp-switch-view").swipe({
        swipeLeft:function(){
            $(".exp-switch-view dd").each(function(){
                var _this = $(this),
                    _index =_this.index();
                if(_this.hasClass("current-view")){
                    if(_index == 2)
                        _index =-1;
                    _index++;
                    _this.removeClass("current-view").parent().children().eq(_index).addClass("current-view");
                    $(".exp-nav-list li").removeClass("active").eq(_index).addClass("active");
                    return false;
                }
            })
        },
        swipeRight:function(){
            $(".exp-switch-view dd").each(function(){
                var _this = $(this),
                    _index =_this.index();
                if(_this.hasClass("current-view")){
                    if(_index == 0)
                        _index = 3;
                    _index--;
                    _this.removeClass("current-view").parent().children().eq(_index).addClass("current-view");
                    $(".exp-nav-list li").removeClass("active").eq(_index).addClass("active");
                    return false;
                }
            })
        }
    })
})
/**
 * Created by chaoyue on 2017/4/5.
 */
function stopPp(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}
$(function() {
    var bg = $(".pop-bg"),
       pm_box = $(".pm-box"),
        sel_food_container = $(".pm-box .sel-food-container"),
        pm_cash_box = $(".pm-cash-box"),
        sel_pm_box = $(".sel-pm-box"),
        sel_pm_wrapper = $("#sel_pm_wrapper"),
        sel_pm_main = sel_pm_wrapper.children("main"),
        expense_dt_box = $(".expense-dt-box"),
        del_alert_box = $(".sweet-del-alert"),
        del_alert = $(".sweet-del"),
        cancel_alert = $(".sweet-cancel"),
        sel_last_index = 0;


    $(".pm-cash").on('click', function() {
        bg.addClass("priority");
        pm_cash_box.addClass("priority")
    });
    $(".close,.a-btn-confirm").on('click', function(e) {
        if (pm_cash_box.hasClass("priority")) {
            pm_cash_box.removeClass("priority");
            bg.removeClass("priority")
        }
    });
    //关闭折扣
    $(".expense-dt-box .back-box").on('click', function (e) {
        expense_dt_box.removeClass("priority");
        pm_box.addClass("priority");
    });
    bg.on({
        'click':function(e){
            e.preventDefault();
            if(pm_cash_box.hasClass("priority"))
                pm_cash_box.removeClass("priority");

            if(del_alert_box.hasClass("priority"))
                del_alert_box.removeClass("priority");

            bg.removeClass("priority");
        }
    });

    $(".item-color").on({
        touchstart:function(){
            $(this).css({
                background:"#e6e7e8"
            })
        },
        touchend:function(){
            $(this).css({
                background:"#fff"
            })
        }
    })

    //小费的长按事件  --- 删除当前对象
    var time = 0; //初始化起始时间
   /* pm_box.on('touchstart','.sel-last-item .del-box',function(e){
        stopPp(e);
        sel_last_index = $(this).index();
        time = setTimeout(function(){
            bg.addClass("priority");
            del_alert_box.addClass("priority")
        },700);//设置长按时间
    });
    pm_box.on('touchend','.sel-last-item',function(e){
        stopPp(e)
        clearTimeout(time)
    })*/


    //Enable swiping...
    var itemSwipe = function(selector) {
        $(selector).swipe({
            swipeLeft:function(e){
                $(this).addClass("sw-lt");
            },
            swipeRight:function(e){
                $(this).removeClass("sw-lt");
            }
        });
    };
    //往左滑出现删除图标
    pm_box.on('click',function(e){
        itemSwipe(".sel-f-item > .lay-cover,.del-box > .lay-cover");
    });

    sel_food_container.on('click','.sel-f-item > .lay-cover',function(e){
        var $this = $(this),
            $siblings = $this.parent().siblings();
        $this.addClass("active").end();
        $siblings.each(function(){
            if($(this).find(".lay-cover").hasClass("active")){
                $(this).find(".lay-cover").removeClass("active");
                return;
            }
        })
    });



    //点击删除 清除当前的单品折扣！
    sel_food_container.on('click','.sel-f-item > .lay-delete',function(e){
        if($(this).next().hasClass("sw-lt")){
            $(this).next().removeClass("sw-lt")
        //    清除相应的单品折扣
        }
    });

    //删除小费
    sel_food_container.on('click','.del-box > .lay-delete',function(e){
        $(this).parent().remove();
    });

    /*//移除小费！！！
    del_alert.click(function(){
        $(".del-box").eq(sel_last_index).remove();
        del_alert_box.removeClass("priority");
        bg.removeClass("priority")
    })

    //取消删除事件
    cancel_alert.click(function(){
        del_alert_box.removeClass("priority");
        bg.removeClass("priority")
    })*/

    //点击更多
    $(".pm-box .pm-other").click(function() {
        pm_box.removeClass("priority");
        sel_pm_box.addClass("priority");
    });
    $(".sel-pm-box .back-box").click(function() {
        sel_pm_box.removeClass("priority");
        pm_box.addClass("priority");
    });
    //小费
    $(".pm .tip-box").on('click', function () {
        openTab(0);
    });
    //折扣
    $(".dis-list").on('click', '.item-dis,.whole-dis', function () {
        var index = $(this).index()+1;
        openTab(index);
    });
   
    //更多的选择方式
    sel_pm_main.on('click', '.item-pm-mtd', function(e) {
        var _this = $(this);
        _this.addClass("active").siblings().removeClass("active");
    });

    //打开tab
    function openTab(disIndex) {
        pm_box.removeClass("priority");
        expense_dt_box.addClass("priority");
        //默认选中折扣类型tab
        $(".exp-nav-list li").each(function () {
            var item = $(this);
            if (item.index() == disIndex) {
                item.addClass("active").siblings().removeClass("active");
                var cur_sub_v = $(".exp-switch-view dd").eq(disIndex);
                if (!cur_sub_v.hasClass("current-view")) {
                    cur_sub_v.addClass("current-view").siblings().removeClass("current-view");
                }
                return false;
            }
        });
    }
});

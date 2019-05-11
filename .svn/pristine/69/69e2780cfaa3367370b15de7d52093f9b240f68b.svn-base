/**
 * Created by chaoyue on 2017/4/12.
 */
function stopPp(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}

$(function(){
    var tb_footer = $(".tb-footer")
        ,$parent_ft = tb_footer.parent()
        ,search_view = $("#search_view"),
        search_form =$("#search_form"),
        del_search = $("#del_search"),
        tb_more_list = $(".tb-more-list"),
        more_dt_list = $(".more-detail-list"),
        chk_ud_box = $(".chk-update-box"),
        pop_bg = $(".pop-bg");

    $(".tb-more-list,.more-detail-list").on('click',function(e){
        e = e||event;
        stopPp(e);
    })
    more_dt_list.click(function(e){

    })
    search_view.on({
        'touchstart':function(event){
            event.preventDefault();
            $(this).addClass("next-view")
            search_form.addClass("active")
            $("#searchform_ipt").focus();
        }
    })
    del_search.on({
        'touchstart':function(e){
            e.preventDefault();
            search_view.removeClass("next-view")
            search_form.removeClass("active");
        }
    });

    $(".local-tab-list").on('click','li',function(e){

        $(this).addClass("active").siblings().removeClass("active")
        if(!$parent_ft.hasClass("priority")){
            $parent_ft.parent().addClass('priority')
        }
    });

    $(".co-pt-one").click(function(e){
        var cur_e = $(e.target)
        if(cur_e.hasClass("scan-box")){
        //    调用扫一扫接口
        }else{
            // footer
            if($parent_ft.hasClass("priority"))
                $parent_ft.removeClass("priority")
            // footer张开
            else
                $parent_ft.addClass("priority")
        }
    });

    tb_footer.swipe({
        //往上滑屏 footer张开
        swipeUp:function(e){
            $parent_ft.addClass("priority")
        },
        //下滑 footer 关闭
        swipeDown:function(){
            $parent_ft.removeClass("priority")
        }
    })

    //检查更新
    $(".chk-update-item").click(function(){
        pop_bg.addClass("priority");
        chk_ud_box.addClass("priority")
    })
    $(".pop-bg,.pm-a-part-right").on('click',function(){
        if(chk_ud_box.hasClass("priority")){
            pop_bg.removeClass("priority");
            chk_ud_box.removeClass("priority")
        }
    })
})
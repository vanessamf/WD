/**
 * Created by chaoyue on 2017/4/6.
 */
$(function(){
    $(".ing-list dl").on("click","dd>.ing-item-container ul li",function(e){
        e.preventDefault();
        var _this = $(this),
            index = _this.index(),
            e_target = $(e.target),
            sm = 0;

        if(!_this.hasClass("active")){

            _this.siblings().each(function(){
                var pre_li = $(this);
                if(pre_li.hasClass("active")){
                    pre_li.children(".hm-several").text(1)
                    pre_li.children(".ing-dt-delete").removeClass("priority");
                    return false;
                }
            })

            _this.addClass("active").siblings().removeClass("active");
            if(_this.hasClass("have-sub-ing")){

                _this.parent().next().addClass("priority")

            }else if(_this.parent().next().hasClass("priority")){

                _this.parent().next().removeClass("priority")
            }

        }else{

            if(e_target.hasClass("ing-dt-delete")){
                if(e_target.parent().hasClass("have-sub-ing"))
                    e_target.parent().parent().next().removeClass("priority")

                e_target.removeClass("priority")
                    .prev().text(1).end()
                    .parent().removeClass("active");

            }else if(e_target.hasClass("hm-several")){

                e_target.next().addClass("priority")
            }else{
                sm = _this.children(".hm-several").text();
                _this.children(".hm-several").text( parseInt(sm)+parseInt(1))
            }

        }

    })
})
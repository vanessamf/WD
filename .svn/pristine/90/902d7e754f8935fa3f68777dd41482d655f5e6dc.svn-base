+function($) {
    "use strict";
    var backdrop = '.dropdown-backdrop',
        toggle = '[data-toggle=dropdown]';

    var Dropdown = function(element) {
        var $el = $(element).on('click.bs.dropdown', this.toggle)
    };
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this);
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        clearMenus();
        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }
            $parent.trigger(e = $.Event('show.bs.dropdown'))
            if (e.isDefaultPrevented())
                return
            $parent
                .toggleClass('open')
                .trigger('shown.bs.dropdown')

            // 如果有输入框 则展开时被focus
            if($parent.hasClass('sel-add-group')){
                var ipt_add = $parent.children(".dropdown-select").children(".sel-add-item");
                ipt_add.children("input").focus()

            }else $this.focus()
        }
        return false
    }
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode))
            return
        var $this = $(this)
        e.preventDefault()
        e.stopPropagation()
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27)
                $parent.find(toggle).focus()
            return $this.click()
        }
        var $items = $('[role=menu] li:not(.divider):visible a', $parent)
        if (!$items.length)
            return
        var index = $items.index($items.filter(':focus'))
        if (e.keyCode == 38 && index > 0)
            index--
        if (e.keyCode == 40 && index < $items.length - 1)
            index++
        if (!~index)
            index = 0
        $items.eq(index).focus()
    }
    function clearMenus() {
        $(backdrop).remove();
        $(toggle).each(function(e) {
            var $parent = getParent($(this))
            if (!$parent.hasClass('open'))
                return
            $parent.trigger(e = $.Event('hide.bs.dropdown'))
            if (e.isDefaultPrevented())
                return
            $parent.removeClass('open').trigger('hidden.bs.dropdown')
        })
    }
    function getParent($this) {
        var selector = $this.attr('data-target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        var $parent = selector && $(selector)
        return $parent && $parent.length ? $parent : $this.parent()
    }
    var old = $.fn.dropdown
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('dropdown')
            if (!data)
                $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    $.fn.dropdown.Constructor = Dropdown;
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }
    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
            e.stopPropagation()
        })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)
}(jQuery);
+function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options
        this.$element = $(element)
        this.$backdrop = this.isShown = null
        if (this.options.remote)
            this.$element.load(this.options.remote)
    }
    Modal.DEFAULTS = {backdrop: true,keyboard: true,show: true}
    Modal.prototype.toggle = function(_relatedTarget) {
        return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
    }
    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget})
        this.$element.trigger(e)
        if (this.isShown || e.isDefaultPrevented())
            return
        this.isShown = true
        this.escape()
        this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')
            if (!that.$element.parent().length) {
                that.$element.appendTo(document.body)
            }
            that.$element.show()
            if (transition) {
                that.$element[0].offsetWidth
            }
            that.$element
                .addClass('in')
                .attr('aria-hidden', false)
            that.enforceFocus()
            var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget})
            transition ? that.$element.find('.modal-dialog')
                .one($.support.transition.end, function() {
                    that.$element.focus().trigger(e)
                })
                .emulateTransitionEnd(300) : that.$element.focus().trigger(e)
        })
    }
    Modal.prototype.hide = function(e) {
        if (e)
            e.preventDefault()
        e = $.Event('hide.bs.modal')
        this.$element.trigger(e)
        if (!this.isShown || e.isDefaultPrevented())
            return
        this.isShown = false
        this.escape()
        $(document).off('focusin.bs.modal')
        this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.modal')
        $.support.transition && this.$element.hasClass('fade') ? this.$element
            .one($.support.transition.end, $.proxy(this.hideModal, this))
            .emulateTransitionEnd(300) : this.hideModal()
    }
    Modal.prototype.enforceFocus = function() {
        $(document)
            .off('focusin.bs.modal')
            .on('focusin.bs.modal', $.proxy(function(e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                    this.$element.focus()
                }
            }, this))
    }
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keyup.dismiss.bs.modal')
        }
    }
    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.removeBackdrop()
            that.$element.trigger('hidden.bs.modal')
        })
    }
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }
    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
                .appendTo(document.body)
            this.$element.on('click.dismiss.modal', $.proxy(function(e) {
                if (e.target !== e.currentTarget)
                    return
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this))
            if (doAnimate)
                this.$backdrop[0].offsetWidth
            this.$backdrop.addClass('in')
            if (!callback)
                return
            doAnimate ? this.$backdrop
                .one($.support.transition.end, callback)
                .emulateTransitionEnd(150) : callback()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop
                .one($.support.transition.end, callback)
                .emulateTransitionEnd(150) : callback()
        } else if (callback) {
            callback()
        }
    }
    var old = $.fn.modal
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data)
                $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string')
                data[option](_relatedTarget)
            else if (options.show)
                data.show(_relatedTarget)
        })
    }
    $.fn.modal.Constructor = Modal
    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')))
        var option = $target.data('modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data())
        e.preventDefault()
        $target
            .modal(option, this)
            .one('hide', function() {
                $this.is(':visible') && $this.focus()
            })
    })
    $(document)
        .on('show.bs.modal', '.modal', function() {
            $(document.body).addClass('modal-open')
        })
        .on('hidden.bs.modal', '.modal', function() {
            $(document.body).removeClass('modal-open')
        })
}(jQuery);

/*
( function($){
    var $body = $('body')
        ,$modal = $('.modal')

    //显示弹框 及 遮罩层 操作如下
    // $body.append('<div class="modal-backdrop in"></div>') &&
    $modal.show();

    //点击关闭按钮或其他遮罩区域   则遮罩层及弹框消失
    $modal.not('.modal-box').click(function(e){
        $('.modal-backdrop').remove() && $modal.hide()
    })

    $modal.on('click','.modal-close',function(e){
        $('.modal-backdrop').remove() && $modal.hide()
    })
})(jQuery);*/

(function($){

    $('#modal_msg_alert .obtn-submit').click(function(e){
        window.location.href = 'tableList.html'
    })
})(jQuery)
var Sharing = {

    api: null,

    webUser: null,

    selector: '.social-buttons',

    params: null,

    init: function(params) {
        log('starting sharing')
        var t = this;

        this.params = params;
        this.container = $(this.selector);
        this.container.show();

        vkApi.init(this.container);
        fbApi.init(this.container);

        t.container.on('vkApi.login', function() {
            log('vkapi.on');

            t.webUser = vkApi.vkUser;
            if (fbApi.isLoaded()) {
                fbApi.logout();
            }
            t.bindEvents();
        });

        t.container.on('fbApi.login', function() {
            log('fbapi.on');

            t.webUser = fbApi.fbUser;
            if (vkApi.isLoaded()) {
                vkApi.logout();
            }
            t.bindEvents();
        });

        t.container.on('vkApi.logout', function() {
            log('vkapi.off');
            t.showHideButtons();
        });

        t.container.on('fbApi.logout', function() {
            log('fbapi.off');
            t.showHideButtons();
        });
    },

    bindEvents: function() {
        var t = this;

        this.showHideButtons();

        $('.share').unbind('click').click(function() {
            var message,
                link = 'http://www.tonyspb.ru/limonhahaton/reflect/game/',
                picture;

            if (vkApi.isLoaded()) {
                message = 'I\'m number ' + global.place + ' at Hahaton! I\'ve scored ' + global.points + ' points! Try to beat me!';
                picture = 'photo-46533758_294427131';
                vkApi.wallPost(message, link, picture);
            }

            if (fbApi.isLoaded()) {
                message = {
                    name: 'Hahaton Game',
                    caption: 'Try to beat me!',
                    description: 'I\'m number ' + global.place + ' at Hahaton! I\'ve scored ' + global.points + ' points!'
                };
                picture = 'http://cs421820.userapi.com/v421820242/1fc4/tR5XXtY2JEs.jpg';

                fbApi.wallPost(message, link, picture);
            }
        });

        $('.logout').click(function() {
            if (vkApi.isLoaded()) {
                vkApi.logout();
            }
            if (fbApi.isLoaded()) {
                fbApi.logout();
            }
        });
    },

    showHideButtons: function() {
        var vkButton = this.container.find('.vk');
        var fbButton = this.container.find('.fb');
        var shareTitle = this.container.find('.share-title');
        var infoWrap = this.container.find('.share-info');
        var shareWrap = this.container.find('.share-wrap');

        if (vkApi.isLoaded() || fbApi.isLoaded()) {
            vkButton.hide();
            fbButton.hide();
            shareTitle.hide();

            infoWrap.find('span').text('signed in as ' + this.webUser.firstName);
            infoWrap.find('img').attr('src', this.webUser.photo);
            infoWrap.show();
            shareWrap.show();
        } else {
            vkButton.show();
            fbButton.show();
            shareTitle.show();
            infoWrap.hide();
            shareWrap.hide();
        }
    }

};

/**
 * логирование
 * можно убрать все логи и эту функцию
 */
var log = function() {
    if (typeof console !=="undefined" && console.log) {
        var args = $.makeArray(arguments.callee.arguments);
        $.each(args, function(k, v) {
            console.log(v);
        });
    }
};
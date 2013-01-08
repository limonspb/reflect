/**
 * Отправляем пост на стену ВК или FB после авторизации
 *
 * @author anisimov
 * @type {Object}
 */
global.Sharing = {

    /**
     * подключенное апи
     */
    api: null,

    /**
     * авторизованный пользователь
     */
    webUser: null,

    /**
     * селектор контейнера кнопок
     */
    selector: '.social-buttons',

    /**
     * инитим апи
     */
    init: function() {
        var t = this;

        this.container = $(this.selector);
        this.container.show();

        t.vkApi.init(this.container);
        t.fbApi.init(this.container);

        t.container.on('vkApi.login', function() {
            log('vkapi.on');

            t.webUser = t.vkApi.vkUser;
            if (t.fbApi.isLoaded()) {
                t.fbApi.logout();
            }
            t.bindEvents();
        });

        t.container.on('fbApi.login', function() {
            log('fbapi.on');

            t.webUser = t.fbApi.fbUser;
            if (t.vkApi.isLoaded()) {
                t.vkApi.logout();
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

    /**
     * биндим события
     */
    bindEvents: function() {
        var t = this;

        this.showHideButtons();

        $('.share').unbind('click').click(function() {
            var message,
                link = global.gameUrl,
                picture;

            if (t.vkApi.isLoaded()) {
                message = 'I\'m number ' + global.place + ' at Hahaton! I\'ve scored ' + global.points + ' points! Try to beat me!';
                picture = 'photo-46533758_294427131';
                t.vkApi.wallPost(message, link, picture);
            }

            if (t.fbApi.isLoaded()) {
                message = {
                    name: 'Hahaton Game',
                    caption: 'Try to beat me!',
                    description: 'I\'m number ' + global.place + ' at Hahaton! I\'ve scored ' + global.points + ' points!'
                };
                picture = 'http://cs421820.userapi.com/v421820242/1fc4/tR5XXtY2JEs.jpg';

                t.fbApi.wallPost(message, link, picture);
            }
        });

        $('.logout').click(function() {
            if (t.vkApi.isLoaded()) {
                t.vkApi.logout();
            }
            if (t.fbApi.isLoaded()) {
                t.fbApi.logout();
            }
        });
    },

    /**
     * играем с кнопками
     */
    showHideButtons: function() {
        var vkButton = this.container.find('.vk');
        var fbButton = this.container.find('.fb');
        var shareTitle = this.container.find('.share-title');
        var infoWrap = this.container.find('.share-info');
        var shareWrap = this.container.find('.share-wrap');

        if (this.vkApi.isLoaded() || this.fbApi.isLoaded()) {
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
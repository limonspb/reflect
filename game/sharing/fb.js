/**
 * @author anisimov
 * @type {Object}
 */
global.Sharing.fbApi = {

    /**
     * контейнер кнопок
     * на него тригерим события
     */
    container: null,

    /**
     * готово ли апи FB
     */
    fbApiLoaded: false,

    /**
     * авторизованный пользователь FB
     */
    fbUser: null,

    /**
     * начинаем танцы
     *
     * @param container
     */
    init: function(container) {
        this.container = container;

        this.initFbApi();
    },

    /**
     * асинхронный инит апи FB
     */
    initFbApi: function() {
        var t = this;

        window.fbAsyncInit = function() {
            FB.init({
                appId: '576632212352083',
                status: true,
                cookie: true,
                xfbml: true
            });

            FB.Event.subscribe('auth.login', function(response) {
                t.setFbUser();
            });

            FB.Event.subscribe('auth.logout', function(response) {
                t.fbApiLoaded = false;
                t.container.trigger('fbApi.logout');
            });
        };

        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    },

    /**
     * логаут из FB
     */
    logout: function() {
        FB.logout();
    },

    /**
     * готово ли апи FB
     *
     * @return {Boolean}
     */
    isLoaded: function() {
        return this.fbApiLoaded;
    },

    /**
     * получаем данные о пользователе FB
     *
     * @return $.Deferred
     */
    getUserInfo: function() {
        var def = $.Deferred();
        FB.api('/me', function(response) {
            var fbUser = {
                firstName: response.first_name,
                lastName: response.last_name,
                sex: response.gender
            };
            FB.api('/me/picture', function(response) {
                fbUser.photo = response.data.url
                def.resolve(fbUser);
            });
        });
        return def.promise();
    },

    /**
     * получаем пользователя FB
     * тригерим, что апи готово к работе
     */
    setFbUser: function() {
        var t = this;
        $.when(t.getUserInfo()).then(function(data) {
            t.fbApiLoaded = true;

            t.fbUser = data;
            t.container.trigger('fbApi.login');
        });
    },

    /**
     * отправляем пост на стену FB
     *
     * @param {Object} message
     * @param {String} link
     * @param {String} picture
     */
    wallPost: function(message, link, picture) {
        FB.ui(
            {
                method: 'feed',
                display: 'popup',
                name: message.name,
                caption: message.caption,
                description: message.description,
                link: link,
                picture: picture
            },
            function(response) {
                if (response && response.post_id) {
                    log('Post was published.');
                } else {
                    log('Post was not published.');
                }
            }
        );
    }

};
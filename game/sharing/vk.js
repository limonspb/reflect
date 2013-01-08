/**
 * @author anisimov
 * @type {Object}
 */
global.Sharing.vkApi = {

    /**
     * контейнер кнопок
     * на него тригерим события
     */
    container: null,

    /**
     * готово ли апи ВК
     */
    vkApiLoaded: false,

    /**
     * авторизованный пользователь ВК
     */
    vkUser: null,

    /**
     * начинаем танцы
     *
     * @param container
     */
    init: function(container) {
        this.container = container;

        this.initVkApi();
        this.bindEvents();
    },

    /**
     * асинхронный инит апи ВК
     */
    initVkApi: function() {
        window.vkAsyncInit = function() {
            VK.init({
                apiId: 3308430
            });

            VK.UI.button('login-vk');
        };

        setTimeout(function() {
            var el = document.createElement('script');
            el.type = 'text/javascript';
            el.src = '//vk.com/js/api/openapi.js';
            el.async = true;
            document.getElementById('vk_api_transport').appendChild(el);
        }, 0);

    },

    /**
     * готово ли апи ВК
     *
     * @return {Boolean}
     */
    isLoaded: function() {
        return this.vkApiLoaded;
    },

    /**
     * биндим события
     */
    bindEvents: function() {
        var t = this;

        $('#login-vk').click(function() {
            VK.Observer.subscribe('auth.login', function(response) {
                if (response.session) {
                    t.setVkUser(response.session);
                }
            });

            VK.Auth.login();
        });
    },

    /**
     * логаут из ВК
     */
    logout: function() {
        var t = this;

        VK.Observer.subscribe('auth.logout', function() {
            t.vkApiLoaded = false;
            t.container.trigger('vkApi.logout');
        });

        VK.Auth.logout();
    },

    /**
     * обертка для вызова метода апи ВК
     *
     * @param method
     * @param params
     * @return $.Deferred
     */
    request: function(method, params) {
        var def = $.Deferred();
        VK.Api.call(method, params, function(data) {
            if (data) {
                def.resolve(data);
            }
        });
        return def.promise();
    },

    /**
     * получаем данные о пользователе ВК
     *
     * @param uid
     * @return $.Deferred
     */
    getUserInfo: function(uid) {
        var def = $.Deferred();
        $.when(this.request('users.get', {uids: uid, fields: 'sex, photo_50, can_post'})).then(function(data) {
            if (data && data.response) {
                var userInfo = data.response;
                def.resolve({
                    firstName: userInfo[0].first_name,
                    lastName: userInfo[0].last_name,
                    sex: (userInfo[0].sex == 1) ? 'female' : 'male',
                    photo: userInfo[0].photo_50
                });
            }
        });
        return def.promise();
    },

    /**
     * получаем пользователя ВК
     * тригерим, что апи готово к работе
     *
     * @param session
     */
    setVkUser: function(session) {
        var t = this;
        $.when(t.getUserInfo(session.mid)).then(function(data) {
            t.vkApiLoaded = true;
            t.vkUser = data;
            t.container.trigger('vkApi.login');
        });
    },

    /**
     * отправляем пост на стену ВК
     *
     * @param {String} message
     * @param {String} link
     * @param {String} picture
     */
    wallPost: function(message, link, picture) {
        var params = {
            message: message + ' ' + link,
            attachments: picture + ',' + link
        };

        $.when(this.request('wall.post', params)).then(function(data) {
            if (data && data.response) {
                log('Post was published.');
            } else {
                log('Post was not published.');
            }
        });
    }

};
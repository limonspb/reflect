var vkApi = {

    container: null,

    vkApiLoaded: false,

    /**
     * авторизованный пользователь Вконтакте
     */
    vkUser: null,

    init: function(container) {
        this.container = container;

        this.initVkApi();
        this.bindEvents();
    },

    initVkApi: function() {
        var t = this;

        window.vkAsyncInit = function() {
            VK.init({
                apiId: 3308430
            });

            VK.Observer.subscribe('auth.login', function(response) {
                if (response.session) {
                    t.setVkUser(response.session);
                }
            });

            VK.Observer.subscribe('auth.logout', function() {
                t.vkApiLoaded = false;
                t.container.trigger('vkApi.logout');
            });

//            t.checkVkLoginStatus();

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

    checkVkLoginStatus: function() {
        var t = this;

        VK.Auth.getLoginStatus(function(response) {
//            if (response.session) {
//                t.setVkUser(response.session);
//            } else {
            if (!response.session) {
                t.vkApiLoaded = false;
                t.container.trigger('vkApi.logout');
            }
        });
    },

    isLoaded: function() {
        return this.vkApiLoaded;
    },

    bindEvents: function() {
        $('#login-vk').click(function() {
            VK.Auth.login();
        });
    },

    logout: function() {
        VK.Auth.logout();
    },

    /**
     * обертка для вызова метода апи Вконтакте
     *
     * @param method
     * @param params
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

    setVkUser: function(session) {
        var t = this;
        $.when(t.getUserInfo(session.mid)).then(function(data) {
            t.vkApiLoaded = true;
            t.vkUser = data;
            t.container.trigger('vkApi.login');
        });
    },

    /**
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
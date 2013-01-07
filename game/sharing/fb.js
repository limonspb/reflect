var fbApi = {

    container: null,

    fbApiLoaded: false,

    fbUser: null,

    init: function(container) {
        this.container = container;

        this.initFbApi();
    },

    initFbApi: function() {
        var t = this;

        window.fbAsyncInit = function() {
            log('initing fb')
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

//            t.checkFbLoginStatus();
        };

        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    },

    checkFbLoginStatus: function() {
        var t = this;

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
//                var uid = response.authResponse.userID;
//                var accessToken = response.authResponse.accessToken;
                t.setFbUser();
            } else {
                t.fbApiLoaded = false;
                t.container.trigger('fbApi.logout');
            }
        });
    },

    logout: function() {
        FB.logout();
    },

    isLoaded: function() {
        return this.fbApiLoaded;
    },

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

    setFbUser: function() {
        var t = this;
        $.when(t.getUserInfo()).then(function(data) {
            t.fbApiLoaded = true;

            t.fbUser = data;
            t.container.trigger('fbApi.login');
        });
    },

    /**
     *
     * @param {Object} message
     * @param {String} link
     * @param {String} picture
     */
    wallPost: function(message, link, picture) {
        log('wallpost fb')
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
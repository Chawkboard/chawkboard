var chawkboard = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (chawkboard[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    chawkboard[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

chawkboard.Router = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "contact":          "contact",
        "nodes/:id":    "nodeDetails"
    },

    initialize: function () {
        chawkboard.searchView = new chawkboard.SearchView();
        //$('body').html(chawkboard.searchView.render().el);
        this.$content = $("#content");
    },

    home: function () {
        if (!chawkboard.homeView) {
            chawkboard.homeView = new chawkboard.HomeView();
            chawkboard.homeView.render();
        } else {
            console.log('reusing home view');
            chawkboard.homeView.delegateEvents();
        }
        this.$content.html(chawkboard.homeView.el);
        chawkboard.searchView.selectMenuItem('home-menu');
    },

    nodeDetails: function (id) {
        var node = new chawkboard.NodeView({id: id});
        var self = this;
        node.fetch({
            success: function (data) {
                console.log(data);
                self.$content.html(new chawkboard.NodeView({model: data}).render().el);
            }
        });
        chawkboard.searchView.selectMenuItem();
    }

});

$(document).on("ready", function () {
    chawkboard.loadTemplates(["HomeView", "NodeView", "NodeListView", "NodeListItemView"],
        function () {
            chawkboard.router = new chawkboard.Router();
            Backbone.history.start();
        });
});
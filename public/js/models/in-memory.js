chawkboard.Node = Backbone.Model.extend({

    initialize:function () {
        this.reports = new chawkboard.ReportsCollection();
        this.reports.parent = this;
    },

    sync: function(method, model, options) {
        if (method === "read") {
            chawkboard.store.findById(parseInt(this.id), function (data) {
                options.success(data);
            });
        }
    }

});

chawkboard.NodeCollection = Backbone.Collection.extend({

    model: chawkboard.Node,

    sync: function(method, model, options) {
        if (method === "read") {
            chawkboard.store.findByKey(options.data.name, function (data) {
                options.success(data);
            });
        }
    }

});

chawkboard.MemoryStore = function (successCallback, errorCallback) {

    this.findByKey = function (searchKey, callback) {
        var nodes = this.nodes.filter(function (element) {
            return  -1;
        });
        callLater(callback, nodes);
    }

    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    }

    this.nodes = [
        {"key": "bob", "image":"bob.png"},
        {"key": "jim", "image":"bob.png"},
        {"key": "roger", "image":"bob.png"},
        {"key": "all", "image":"bob.png"}
    ];

    callLater(successCallback);

}

chawkboard.store = new chawkboard.MemoryStore();
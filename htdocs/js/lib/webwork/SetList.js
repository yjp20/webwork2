define(['Backbone', 'underscore', 'WeBWorK', 'Set'], function(Backbone, _, webwork, Set){
    
    
    
    
    /**
     *
     * @type {*}
     */
    var SetList = Backbone.Collection.extend({
        model:Set,
    
        initialize: function(){
            var self = this;
            this.defaultRequestObject = {};
    
            _.defaults(this.defaultRequestObject, webwork.requestObject);
            this.syncing = false;
            this.on('syncing', function(value){self.syncing = value});
        },
    
        fetch:function () {
            var self = this;
    
            var requestObject = {
                xml_command: "listSets"
            };
            _.defaults(requestObject, this.defaultRequestObject);
            self.trigger('syncing', true);
            $.post(webwork.webserviceURL, requestObject, function (data) {
                var response = $.parseJSON(data);
    
                var setNames = response.result_data;
                setNames.sort();
    
                var newSets = new Array();
                for (var i = 0; i < setNames.length; i++) {
                    //workAroundSetList.renderList(workAroundSetList.setNames[i]);
                    newSets.push({name:setNames[i]})
                }
                self.reset(newSets);
                self.trigger('syncing', false);
            });
        }
    });
    
    return SetList;
});
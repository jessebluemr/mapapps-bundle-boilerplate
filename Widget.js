define([
    "dojo/_base/declare", "dijit/_Widget", "dijit/_TemplatedMixin"
], function(declare, _Widget, _TemplatedMixin) {

    return declare([_Widget, _TemplatedMixin], {
        baseClass: "my-widget",
        templateString: "<div>Hello World</div>",        
    });
});
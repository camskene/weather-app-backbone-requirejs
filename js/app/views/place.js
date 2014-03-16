define([
    'jquery',
    'underscore',
    'backbone',
    'app/templates',
    'app/collections/days'
], function ($, _, Backbone, Templates, DaysCollection) {

    'use strict';

    var PlaceView = Backbone.View.extend({

        template: Templates['place'],

        collection: new DaysCollection([]),

        events: {
            'click #btn-remove': 'removePlace',
            'click #btn-expand': 'openDetail'
        },

        initialize: function() {
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            this.$bodyEl = this.$('.panel-body');
        },

        render: function() {
            var that = this;
            this.collection.url = [
                'http://api.wunderground.com/api/',
                '9fc07c189a4f88f1/',
                'forecast/q/',
                this.model.get('countryCode'),
                '/',
                this.model.get('name'),
                '.json'
            ].join('');

            this.collection.fetch({
                success: function (collection, response, options) {
                    that.renderDays();
                },
                error: function (collection, response, options) {
                    console.log('There was an error');
                }
            })

            return this;
        },

        renderDays: function() {
            var daysHtml = [];
            this.collection.each(function (element, index, list) {
                daysHtml.push(
                    Templates['day'](element.toJSON())
                );
            });
            this.$bodyEl.html(daysHtml.join(''));
        },

        removePlace: function (e) {
            this.model.destroy();
        },

        openDetail: function (e) {
            this.$('.panel').toggleClass('detail');
        }

    });

    return PlaceView;
})
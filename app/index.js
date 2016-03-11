/*global define*/

/* 
 *  Layout
 */
'use strict';
var Layout = Backbone.Marionette.LayoutView.extend({
    template: '#layout-template',
    regions: {
        header: '.header',
        content: '.content'
    }
});

var layout = new Layout();

/*
 *Data to render dynamically.
 */
var data = [{
    id: 0,
    question: 'Would you recommend a Tesla to a friend?',
    options: [{
        id: 0,
        text: 'Definetely Yes'
    }, {
        id: 1,
        text: 'May Be'
    }, {
        id: 2,
        text: 'Defintely No'
    }, {
        id: 3,
        text: 'No Opinion'
    }]
}, {
    id: 1,
    question: 'Do you agree that Tesla is the best EV in the market?',
    options: [{
        id: 0,
        text: 'Definetely Yes'
    }, {
        id: 1,
        text: 'May Be'
    }, {
        id: 2,
        text: 'Defintely No'
    }, {
        id: 3,
        text: 'No Opinion'
    }]
}, {
    id: 2,
    question: 'Do you agree that Tesla has the best after sales support?',
    options: [{
        id: 0,
        text: 'Definetely Yes'
    }, {
        id: 1,
        text: 'May Be'
    }, {
        id: 2,
        text: 'Defintely No'
    }, {
        id: 3,
        text: 'No Opinion'
    }]
}, {
    id: 3,
    question: 'Do You agree that Tesla has best in its class?',
    options: [{
        id: 0,
        text: 'Definetely Yes'
    }, {
        id: 1,
        text: 'May Be'
    }, {
        id: 2,
        text: 'Defintely No'
    }, {
        id: 3,
        text: 'No Opinion'
    }]
}];
localStorage.setItem('questData', JSON.stringify(data));
var question;
var Home = Backbone.Marionette.ItemView.extend({
    template: '#home-template',
    ui: {
        rateSelector: '#rate-selector',
        vote: '#vote'
    },
    events: {
        'click @ui.vote': 'clickedButtonVote'
    },

    clickedButtonVote: function() {
        var selectedAns = this.ui.rateSelector.val();

        if (question.answer[selectedAns] == undefined && question.answer[selectedAns] == null) {
            question.answer[selectedAns] = 1;
        } else {
            question.answer[selectedAns] = question.answer[selectedAns] + 1;
        }
        question.selected = question.options[selectedAns];
        data[question.id] = question;
        localStorage.setItem('questData', JSON.stringify(data));
        localStorage.setItem('selectedQuestion', JSON.stringify(question));

    }
});
var results = Backbone.Marionette.ItemView.extend({
    template: '#results-template',
    region: {
        questionAnswer: '.question-text',
        chartDiv: '#chart-div'
    }
});


var Header = Backbone.Marionette.ItemView.extend({
    template: '#header-template',
});

/*
 *  defines route
 */

var Route = Backbone.Marionette.AppRouter.extend({
    /*
     * map path to function
     */
    routes: {
        'home': 'goHome',
        'results': 'viewResults'
    },


    goHome: function() {
        /*
         *Home page renders  a random question picked from data
         */
        var max = data.length - 1,
            min = 0,
            id = Math.floor(Math.random() * (max - min + 1)) + min,
            Questions = JSON.parse(localStorage.getItem('questData'));

        question = _.find(Questions, function(d) {
            if (d.id == id) {
                return d;
            }
        });
        if (question.answer == undefined && question.answer == null) {
            question.answer = {};
        }

        layout.content.show(new Home({
            model: new Backbone.Model(question)
        }));

    },
    viewResults: function() {
        // shows results View in the content region
        var question = JSON.parse(localStorage.getItem('selectedQuestion'));
        layout.content.show(new results({
            model: new Backbone.Model(question)
        }));
    }
});



$(function() {
    // Render and append the layout
    $('body').append(layout.render().el);
    // Show inner view
    layout.header.show(new Header());

    var route = new Route();
    Backbone.history.start();
});

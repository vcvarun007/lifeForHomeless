/************************************************
Revision History
Version       Name          Date            Description 
1.0         Aman Das      09/02/2023        Testing  
***********************************************/

let express = require("express");
var expect  = require("chai").expect;
var request = require("request");




describe("Restaurant API check", function() {
    var url = "http://localhost:3000/restaurants/1011";
    it("returns status 200 to check Restaurant Details", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

});

describe("Profile API check", function() {
    var url = "http://localhost:3000/CreateHPProfile/1022";
    it("returns status 200 to check Profile", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

});

describe("Dashboard API check", function() {
    var url = "http://localhost:3000/dashboard/1033";
    it("returns status 200 to check Food details", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

});

describe("logout API check", function() {
    var url = "http://localhost:3000/logout/1044";
    it("returns status 200 to check Food details", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

});

describe("Display Food API check", function() {
    var url = "http://localhost:3000/displayFoods/1055";
    it("returns status 200 to check Food details", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

});


@ignore
Feature: See list of profiles
	As a user
	I want to see the list of profiles
	So that I can see the users already registered

	Scenario: Display list of users
	  Given that the API server is running
	  When I access the '/listUsers'
	  Then the reply status code should be 200
	    And it should send an array of users
@ignore
Feature: Viewing a Profile
	As a user
	I want to select a profile
	So that I can view all information for it

	Scenario: Viewing a profile
	  Given that the API server is running
	  When I send parameter id=1 to '/viewUser'
	  Then the reply status code should be 200
	    And it should return an array of profile information
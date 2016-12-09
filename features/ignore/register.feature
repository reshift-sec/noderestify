@ignore
Feature: Register Profile
	As a user
	I want to register my profile
	So that it can be added to the list of users

	Scenario: Registering a new profile
	  Given that the API server is running
	  When I send parameters firstname='Cielo' and lastname='Muyot' and birthdate='1993-10-07' to '/register'
	  Then the reply status code should be 200
	    And the status message should be 'success'
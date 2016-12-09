@ignore
Feature: Updating Profile
	As a user
	I want to edit profile information
	So that it can be up to date

	Scenario: Updating a profile
	  Given that the API server is running
	  When I send parameters to update id=1 firstname='Cielo Agnes' and lastname='Muyot' and birthdate='1993-10-07' to '/update'
	  Then the reply status code should be 200
	    And the status message should be 'success'
	    And result.affectedRows should be 1
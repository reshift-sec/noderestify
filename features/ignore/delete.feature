@ignore
Feature: Delete a profile
	As a user
	I want to delete a profile
	So that it would not appear in the list anymore

	Scenario: Delete a profile
	  Given that the API server is running
	  When I send the parameter id=1 to '/delete'
	  Then the reply status code should be 200
	    And the status message should be 'success'
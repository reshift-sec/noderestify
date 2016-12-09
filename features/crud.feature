@CRUD

@positive
Feature: CRUD Features
	As a user
	I want to have a basic CRUD for profiles
	So that it can be added, viewed, updated and deleted

	@register
	Scenario: Registering a new profile
	  Given that the API server is running
	  When I send parameters firstname='Cielo' and lastname='Muyot' and birthdate='1993-10-07' to '/register'
	  Then the reply status code should be 200
	    And the status message should be 'success'

	@update
	Scenario: Updating a profile
	  Given that the API server is running
	  When I send parameters to update id=1 firstname='Cielo Agnes' and lastname='Muyot' and birthdate='1993-10-07' to '/update'
	  Then the reply status code should be 200
	    And the status message should be 'success'
	    And result.affectedRows should be 1

	@listing
	Scenario: Display list of users
	  Given that the API server is running
	  When I access the '/listUsers'
	  Then the reply status code should be 200
	    And it should send an array of users

	@viewing
	Scenario: Viewing a profile
	  Given that the API server is running
	  When I send parameter id=1 to '/viewUser'
	  Then the reply status code should be 200
	    And it should return an array of profile information

	@deleting
	Scenario: Delete a profile
	  Given that the API server is running
	  When I send the parameter id=1 to '/delete'
	  Then the reply status code should be 200
	    And the status message should be 'success'

@negative
	Scenario Outline: Viewing inexistent user
	  Given that the API server is running
	  When I send the non-existing id=0 and firstname='Inexistent' and lastname='User' and birthdate='1990-10-10' to url='/<url>' with method='<method>'
	  Then the reply status code should be 404
	    And the status message should be 'not found'
	  
	  Examples:
	  	|url|method|
	  	|viewUser|GET|
	  	|delete|DEL|
	  	|update|PUT|

@negative
	@invalid
	Scenario Outline: Invalid inputs
	  Given that the API server is running
	  When I send invalid characters for firstname='<firstname>' and lastname='<lastname>' and birthdate='<birthdate>' and id=1 to register
	  Then the reply status code should be 406
	    And the status message should be 'not acceptable'
	  
	  Examples:
	  	|firstname|lastname|birthdate|
	  	|1234|56789|12034|
	  	|Cielo|Muyot|1935|
	  	|52523|561461|1990-10-10|

	@invalid
	Scenario Outline: Invalid inputs
	  Given that the API server is running
	  When I send invalid characters for firstname='<firstname>' and lastname='<lastname>' and birthdate='<birthdate>' and id=1 to update
	  Then the reply status code should be 406
	    And the status message should be 'not acceptable'
	  
	  Examples:
	  	|firstname|lastname|birthdate|
	  	|1234|56789|12034|
	  	|Cielo|Muyot|1935|
	  	|52523|561461|1990-10-10|
<?php

Route::group(['prefix' => 'api'] ,function()
{	
	Route::group(['prefix'=>'user'], function ()
	{
		Route::get('', ['uses' => 'UsersController@allUsers']);
		Route::get('{id}', ['uses' => 'UsersController@getUser']);
		Route::get('{id}/{password}', ['uses' => 'UsersController@verifyPassword']);
		Route::post('', ['uses' => 'UsersController@saveUser']);
		Route::put('{id}', ['uses' => 'UsersController@updateUser']);
		Route::delete('{id}', ['uses' => 'UsersController@deleteUser']);
	});
});



Route::get('/', 'UsersController@index');

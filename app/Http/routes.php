<?php

Route::group(['prefix' => 'api'] ,function()
{	
	Route::group(['prefix'=>'user'], function ()
	{
		Route::get('', ['uses' => 'UsersController@allUsers']);
		Route::get('{id}', ['uses' => 'UsersController@getUser']);
		Route::post('', ['uses' => 'UsersController@saveUser']);
		Route::put('{id}', ['uses' => 'UsersController@updateUser']);
		Route::put('{id}/changepw', ['uses' => 'UsersController@updateUserPassword']);
		Route::delete('{id}', ['uses' => 'UsersController@deleteUser']);
	});
});

Route::get('/', 'UsersController@index');

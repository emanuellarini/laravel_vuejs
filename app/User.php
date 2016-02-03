<?php

namespace App;

use Illuminate\Support\Facades\Input;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class User extends Model
{

	protected $fillable = [
		'email',
		'first_name',
		'last_name',
		'mobile',
		'birth_date',
        'password'
	];

    public function allUsers()
    {
    	return self::all();
    }
    public function getUser($id)
    {
    	$user = self::find($id);
    	if (is_null($user)){
    		return false;
    	}
    	return $user;
    }
    public function saveUser()
    {
    	$input = Input::all();
    	$input['password'] = Hash::make($input['password']);
    	$user = new User();
    	$user->fill($input);
    	$user->save();
    	return $user;
    }
    public function updateUser($id)
    {
    	$user = self::find($id);
    	if (is_null($user))
    		return false;

		$input = Input::all();
		if (isset($input['password']))
    		$input['password'] = Hash::make($input['password']);
    	$user->fill($input);
    	$user->save();
    	return $user;
    }
    public function deleteUser($id)
    {
    	$user = self::find($id);
    	if (is_null($user)){
    		return false;
    	}
    	return $user->delete();
    }
    public function verifyPassword($id, $password)
    {
        $user = self::find($id);
        if (is_null($user)){
            return false;
        }
        if (Hash::check($password, $user->password))
        {
            return $user;
        }
    }    
}

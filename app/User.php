<?php

namespace App;

use Illuminate\Support\Facades\Input;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class User extends Model
{

	protected $fillable = [
		'email',
		'first_name',
		'last_name',
		'mobile',
		'birth_date',
        'password',
        'password_confirmation',
        'new_password',
        'new_password_confirmation',
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
        $input['birth_date'] = Carbon::createFromFormat('d/m/Y', $input['birth_date']);
        unset($input['password_confirmation']);
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
        $input['birth_date'] = Carbon::createFromFormat('d/m/Y', $input['birth_date']);
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

    public function updateUserPassword($id)
    {
        $user = self::find($id);
        if (is_null($user)) {
            return false;
        }
        $input = Input::all();
        $input['new_password'] = Hash::make($input['new_password']);
        $input['password'] = $input['new_password'];
        unset($input['new_password']);
        unset($input['new_password_confirmation']);
        $user->fill($input);
        $user->save();
        return $user;
    }
}

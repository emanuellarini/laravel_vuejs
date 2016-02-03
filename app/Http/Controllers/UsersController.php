<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    protected $user = null;

    public function __construct(User $user)
    {
    	$this->user = $user;
    }

	public function index()
    {
    	return view('users.index');
    }
    
    public function allUsers()
    {
    	return response()->json($this->user->allUsers(), 200);
    }

    public function saveUser()
    {
    	return $this->user->saveUser();
    }
    
    public function getUser($id)
    {
    	$user = $this->user->getUser($id);
    	if (!$user)
    		return response()->json(['response' => 'User not found'], 400);
    	return response()->json($user, 200);
    }

    public function deleteUser($id)
    {
    	$user = $this->user->deleteUser($id);
    	if (!$user)
    		return response()->json(['response' => 'User not found'], 400);
    	return response()->json($user, 200);
    }

    public function updateUser($id)
    {
    	$user = $this->user->updateUser($id);
    	if (!$user)
    		return response()->json(['response' => 'User not found'], 400);
    	return response()->json($user, 200);
    }

    public function verifyPassword($id, $password)
    {
        $user = $this->user->verifyPassword($id, $password);
        if (!$user)
            return response()->json(false, 200);
        return response()->json(true, 200);
    }

}

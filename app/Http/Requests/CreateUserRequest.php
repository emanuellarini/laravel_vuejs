<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateUserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|unique:users,email',
            'first_name' => 'required',
            'last_name' => 'required',
            'mobile' => 'required|unique:users,mobile',
            'birth_date' => 'required',
            'password' => 'required|confirmed',
        ];
    }
    public function messages()
    {
        return [
            'email.required' => 'O campo E-mail é obrigatório!',
            'first_name.required' => 'O campo Nome é obrigatório!',
            'last_name.required' => 'O campo Sobrenome é obrigatório!',
            'mobile.required' => 'O campo Telefone é obrigatório!',
            'birth_date.required' => 'O campo Data de Nascimento é obrigatório!',
            'password.required' => 'O campo Senha é obrigatório!',
            'password.confirmed' => 'Os campos de Senha devem ser iguais!',
            'email.unique' => 'Este e-mail já possui um registro!',
            'mobile.unique' => 'Este telefone já possui um registro!'
        ];
    }
}

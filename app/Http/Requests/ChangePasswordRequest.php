<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;


class ChangePasswordRequest extends Request
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
            'password' => 'required|same_as_db_password:'.$this->route('id'),
            'new_password' => 'required|confirmed',
            'new_password_confirmation' => 'required',
        ];
    }   

    public function messages()
    {
        return [
            'password.required' => 'O campo Senha é obrigatório.',
            'new_password.required' => 'O campo Nova Senha é obrigatório.',
            'new_password_confirmation.required' => 'O campo Confirmar Nova Senha é obrigatório.',
            'confirmed' => 'A Confirmação de Senha está incorreta.',
            'same_as_db_password' => 'Senha do Usuário incorreta!',
        ];
    }
}

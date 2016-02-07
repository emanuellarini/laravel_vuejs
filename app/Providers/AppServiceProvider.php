<?php

namespace App\Providers;
use Validator;
use Illuminate\Support\ServiceProvider;
use App\Providers\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('sameAsDbPassword', function($attribute, $value, $parameter, $validator) {
            $user = \DB::table('users')->where('id', $parameter)->first();
            if (\Hash::check($value, $user->password))
                return true;
            else
                return false;
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

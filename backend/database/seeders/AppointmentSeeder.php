<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
       
        $user = User::updateOrCreate(
            ['email' => 'aluno@teste.com'],
            [
                'name' => 'Aluno de ADS',
                'password' => Hash::make('12345678'),
            ]
        );

        
        Appointment::create([
            'user_id' => $user->id,
            'date' => now()->format('Y-m-d'),
            'time' => '14:00',
            'status' => 'scheduled',
            'observation' => 'Dúvida sobre o projeto de Laravel'
        ]);

        Appointment::create([
            'user_id' => $user->id,
            'date' => now()->addDay()->format('Y-m-d'),
            'time' => '10:00',
            'status' => 'scheduled',
            'observation' => 'Entrega da Aula 3'
        ]);
    }
}
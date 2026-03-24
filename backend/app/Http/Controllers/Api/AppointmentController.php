<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    
   public function index()
{
 
    return Appointment::where('user_id', auth()->id())
                        ->orderBy('date', 'asc')
                        ->orderBy('time', 'asc')
                        ->get();
}

   public function store(Request $request)
{
   $request->validate([
    'date' => 'required|date|after_or_equal:today', 
    'time' => 'required',
]);

  
    $userId = auth()->id(); 

   
    $exists = Appointment::where('date', $request->date)
                         ->where('time', $request->time)
                         ->exists();

    if ($exists) {
        return response()->json(['message' => 'Horário ocupado!'], 422);
    }

   
    $appointment = Appointment::create([
        'user_id' => $userId,
        'date' => $request->date,
        'time' => $request->time,
        'observation' => $request->observation
    ]);

    return response()->json($appointment, 201);
}
}
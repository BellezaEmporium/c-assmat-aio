<?php

namespace App\Services;

use App\Models\Payroll;
use App\Models\Planning;
use App\Providers\AppServiceProvider;

class PayrollService extends AppServiceProvider
{
    public function calculate($user, $month): Payroll
    {
        $totalHours = Planning::where('user_id', $user->id)
                        ->whereMonth('date', $month)
                        ->sum(\DB::raw("TIMESTAMPDIFF(HOUR, start_time, end_time)"));

        // TODO récupérer informations de l'assmat automatiquement (depuis contrat ou paramètres pré-définis)
        // sauf si différent par employeur/enfant, auquel cas le contrat prévaudra sur les paramètres par défaut.
        $gross = $totalHours * 4.5;
        $net = $gross * 0.9;

        return Payroll::create([
            'user_id' => $user->id,
            'month' => $month,
            'total_hours' => $totalHours,
            'gross_salary' => $gross,
            'net_salary' => $net,
            'exported' => false
        ]);
    }
}

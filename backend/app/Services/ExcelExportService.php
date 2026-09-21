<?php

namespace App\Services;

use App\Models\Payroll;
use App\Providers\AppServiceProvider;

class ExcelExportService extends AppServiceProvider
{
    public function exportPayroll(Payroll $payroll)
    {
        // TODO: use laravel-excel to export payroll, need to define with caretaker what to expect
        // or xlsx ?
    }
}

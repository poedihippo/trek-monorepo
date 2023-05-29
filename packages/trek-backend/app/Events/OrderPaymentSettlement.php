<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Foundation\Events\Dispatchable;

class OrderPaymentSettlement
{
    use Dispatchable;

    public function __construct(public Order $order)
    {
        //
    }
}

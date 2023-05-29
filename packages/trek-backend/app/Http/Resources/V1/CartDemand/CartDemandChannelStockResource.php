<?php

namespace App\Http\Resources\V1\CartDemand;

use App\Classes\DocGenerator\BaseResource;
use App\Classes\DocGenerator\ResourceData;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;

class CartDemandChannelStockResource extends BaseResource
{
    public static function data(): array
    {
        return [
            ResourceData::make('id', Schema::TYPE_INTEGER, 1),
            ResourceData::make('name', Schema::TYPE_STRING, 'Zulfi Channel'),
            ResourceData::make('channel_stocks_sum_stock', Schema::TYPE_INTEGER, 1000),
        ];
    }
}

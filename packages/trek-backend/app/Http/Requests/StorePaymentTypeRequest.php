<?php

namespace App\Http\Requests;

use App\Rules\HasCompanyAccess;
use Gate;
use Illuminate\Foundation\Http\FormRequest;

class StorePaymentTypeRequest extends FormRequest
{
    public function authorize()
    {
        return Gate::allows('payment_type_create');
    }

    public function rules()
    {
        return [
            'orlan_id' => 'required|string',
            'name'                => [
                'string',
                'required',
            ],
            'payment_category_id' => [
                'required',
                'exists:payment_categories,id',
            ],
            'company_id'          => 'required', new HasCompanyAccess,
        ];
    }
}

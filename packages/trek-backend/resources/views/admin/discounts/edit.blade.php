@extends('layouts.admin')
@section('content')
<div class="card">
	<div class="card-header">
		{{ trans('global.edit') }} {{ trans('cruds.discount.title_singular') }}
	</div>
	<div class="card-body">
		<form method="POST" action="{{ route("admin.discounts.update", [$discount->id]) }}"
			enctype="multipart/form-data">
			@method('PUT')
			@csrf
            <div class="form-group">
                <label class="required" for="company_id">{{ trans('cruds.generic.fields.company') }}</label>
                <select wire:model="company_id" class="form-control {{ $errors->has('company_id') ? 'is-invalid' : '' }}"
                    name="company_id" id="company_id">
                    <option disabled selected value="">-- select company --</option>
                    @foreach(App\Models\Company::tenanted()->get() as $company)
                    <option value="{{ $company->id }}" {{ $company->id == $discount->company_id ? 'selected' : '' }}>{{ $company->name }}</option>
                    @endforeach
                </select>
                @if($errors->has('company_id'))
                <span class="text-danger">{{ $errors->first('company_id') }}</span>
                @endif
                <span class="help-block">{{ trans('cruds.generic.fields.company_helper') }}</span>
            </div>
            <div class="form-group">
                <label for="orlan_id" class="required">Orlansoft ID (Promo type)</label>
                <input class="form-control {{ $errors->has('orlan_id') ? 'is-invalid' : '' }}" type="text" name="orlan_id" id="orlan_id" value="{{ $discount->orlan_id }}" required>
                @if($errors->has('orlan_id'))
                    <span class="text-danger">{{ $errors->first('orlan_id') }}</span>
                @endif
            </div>
			<x-input key='name' :model='$discount'></x-input>
			<x-input key='description' :model='$discount' required="0"></x-input>
			<x-enum key='type' :model='$discount'></x-enum>
			<x-input key='activation_code' :model='$discount' required="0"></x-input>
            <div class="form-group">
                <label class="required" for="stock">Value</label>
                <input class="form-control {{ $errors->has('value') ? 'is-invalid' : '' }}" type="number" name="value" id="value" value="{{ $discount->value }}" step="any" required>
                @if($errors->has('value'))
                    <span class="text-danger">{{ $errors->first('value') }}</span>
                @endif
            </div>
			<x-enum key='scope' :model='$discount'></x-enum>

            <div wire:ignore class="form-group" id="product_brand_div">
				<label class="" id="product_brand_label" for="product_brand">{{ trans('cruds.discount.fields.product_brand') }}</label>
				<select class="form-control {{ $errors->has('product_brand_id') ? 'is-invalid' : '' }}" name="product_brand_id" id="product_brand" disabled>
					<option selected value=""> </option>
					@foreach(\App\Models\ProductBrand::where('company_id', $discount->company_id)->get() as $productBrand)
						<option value="{{ $productBrand->id }}" {{ $productBrand->id == old('product_brand_id', $discount->product_brand_id) ? 'selected' : '' }}>{{ $productBrand->name }}</option>
					@endforeach
				</select>
				@if($errors->has('product_brand_id'))
				<span class="text-danger">{{ $errors->first('product_brand_id') }}</span>
				@endif
				<span class="help-block">{{ trans('cruds.discount.fields.product_brand_helper') }}</span>
			</div>

			<div class="form-group" id="select_product_unit_ids" style="display: none">
				<label>{{ trans('global.product_units') }}</label>
				<select name="product_unit_ids[]" class="form-control" id="selectProduct" multiple style="width: 100%;">
					@foreach($selectedProducts as $id => $name)
					<option value="{{ $id }}" selected>{{ $name }}</option>
					@endforeach
				</select>
				@if($errors->has('product_unit_ids'))
				<span class="text-danger">{{ $errors->first('product_unit_ids') }}</span>
				@endif
				<span class="help-block">{{ trans('cruds.discount.fields.discount_by_products_helper') }}</span>
			</div>

			<div wire:ignore class="form-group" id="product_unit_category_div" style="{{ $discount->scope == \App\Enums\DiscountScope::CATEGORY() ? null : 'display: none;' }}">
				<label class="" id="product_unit_category_label" for="product_unit_category">{{ trans('cruds.discount.fields.product_unit_category') }}</label>
				<select class="form-control {{ $errors->has('product_unit_category') ? 'is-invalid' : '' }}"
					name="product_unit_category" id="product_unit_category" style="width: 100%">
					<option value="">-- Select Product Unit Category --</option>
					@foreach(\App\Enums\ProductUnitCategory::getInstances() as $productUnitCategory)
						<option value="{{ $productUnitCategory->value }}" {{ $productUnitCategory == old('product_unit_category', $discount->product_unit_category) ? 'selected' : '' }}>{{ $productUnitCategory->description }}</option>
					@endforeach
				</select>
				@if($errors->has('product_unit_category'))
				<span class="text-danger">{{ $errors->first('product_unit_category') }}</span>
				@endif
				<span class="help-block">{{ trans('cruds.discount.fields.product_unit_category_helper') }}</span>
			</div>

			<x-input key='start_time' :model='$discount' type="datetime"></x-input>
			<x-input key='end_time' :model='$discount' type="datetime"></x-input>
			<div class="form-group">
				<div class="form-check {{ $errors->has('is_active') ? 'is-invalid' : '' }}">
					<input type="hidden" name="is_active" value="0">
					<input class="form-check-input" type="checkbox" name="is_active" id="is_active"
					value="1" {{ $discount->is_active || old('is_active', 0) === 1 ? 'checked' : '' }}>
					<label class="form-check-label"
					for="is_active">{{ trans('cruds.discount.fields.is_active') }}</label>
				</div>
				@if($errors->has('is_active'))
				<span class="text-danger">{{ $errors->first('is_active') }}</span>
				@endif
				<span class="help-block">{{ trans('cruds.discount.fields.is_active_helper') }}</span>
			</div>
			<x-input key='max_discount_price_per_order' :model='$discount' type="number" required="0"></x-input>
			<x-input key='max_use_per_customer' :model='$discount' type="number" required="0"></x-input>
			<x-input key='min_order_price' :model='$discount' type="number" required="0"></x-input>
			<div class="form-group">
				<button class="btn btn-danger" type="submit">
					{{ trans('global.save') }}
				</button>
			</div>
		</form>
	</div>
</div>
@endsection
@push('js')
<script type="text/javascript">
	$(function() {
        var companyId = '{{$discount->company_id}}';
        var productBrandId = '{{$discount->product_brand_id}}';
        $('#scope').on('change', function(){
            if($(this).val() == 1){
                $('#select_product_unit_ids').show();
                $('#company_id').change();
            } else {
                $('#selectProduct').val('').change();
                $('#select_product_unit_ids').hide();
            }

            if($(this).val() == 3){
                $('#product_unit_category_div').show();
                $('#product_unit_category_label').addClass('required');
                $('#product_unit_category').attr('required');
            } else {
                $('#product_unit_category').val('').change();
                $('#product_unit_category_label').removeClass('required');
                $('#product_unit_category').removeAttr('required');
                $('#product_unit_category_div').hide();
            }

            if($(this).val() == 4){
                $('#product_brand_label').addClass('required');
                $('#company_id').change();
                $('#product_brand').attr('required');
            } else {
                $('#product_brand').val('').change();
                $('#product_brand_label').removeClass('required');
                $('#product_brand').removeAttr('required');
            }
        });

        initializeProductUnits(companyId, productBrandId);
        initializeProductBrand(companyId);

        $('#company_id').on('change', function(){
            if($(this).val()){
                $('#selectProduct').val('').change();
                $('#product_brand').val('').change();
                initializeProductUnits();
                initializeProductBrand($(this).val());
            } else {
                $('#product_brand').attr('disabled', true).val('').change();
            }
        });

        $('#product_brand').on('change', function(){
            $('#selectProduct').val('').change();
            initializeProductUnits();
        });

        function initializeProductUnits(company_id = null, product_brand = null){
            companyId = company_id == null ? $('#company_id').val() : company_id;
            productBrandId = product_brand == null ? $('#product_brand').val() : product_brand;
            $('#selectProduct').select2({
                placeholder: 'Select an product units',
                minimumInputLength: 4,
                ajax: {
                    url: '{{ route("admin.orders.getproduct") }}'+'?company_id='+companyId+'&product_brand='+productBrandId,
                    dataType: 'json',
                    delay: 250,
                    processResults: function (data) {
                        return {
                            results:  $.map(data, function (item) {
                                return {
                                    text: item.name,
                                    id: item.id
                                }
                            })
                        };
                    },
                    cache: true
                }
            });

            if($('#scope').val() == 1){
                $('#select_product_unit_ids').show();
            } else {
                $('#selectProduct').val('').change();
                $('#select_product_unit_ids').hide();
            }
        }

        function initializeProductBrand(company_id){
            $('#product_brand').attr('disabled', false).select2({
                placeholder: 'Select Product Brand',
                allowClear: true,
                ajax: {
                    url: '{{ route("admin.orders.get.product-brand") }}'+'?company_id='+company_id,
                    dataType: 'json',
                    delay: 250,
                    processResults: function (data) {
                        return {
                            results:  $.map(data, function (item) {
                                return {
                                    text: item.name,
                                    id: item.id
                                }
                            })
                        };
                    },
                    cache: true
                }
            });
        }
	});
</script>
@endpush

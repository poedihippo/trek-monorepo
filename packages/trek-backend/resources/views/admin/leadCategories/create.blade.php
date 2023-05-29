@extends('layouts.admin')
@section('content')

<div class="card">
    <div class="card-header">
        {{ trans('global.create') }} {{ trans('cruds.leadCategory.title_singular') }}
    </div>

    <div class="card-body">
        <form method="POST" action="{{ route("admin.lead-categories.store") }}" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="orlan_id">Orlansoft ID</label>
                <input class="form-control {{ $errors->has('orlan_id') ? 'is-invalid' : '' }}" type="text" name="orlan_id" id="orlan_id" value="{{ old('orlan_id', '') }}">
                @if($errors->has('orlan_id'))
                    <span class="text-danger">{{ $errors->first('orlan_id') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label class="required" for="name">{{ trans('cruds.leadCategory.fields.name') }}</label>
                <input required class="form-control {{ $errors->has('name') ? 'is-invalid' : '' }}" type="text" name="name" id="name" value="{{ old('name', '') }}" required>
                @if($errors->has('name'))
                    <span class="text-danger">{{ $errors->first('name') }}</span>
                @endif
                <span class="help-block">{{ trans('cruds.leadCategory.fields.name_helper') }}</span>
            </div>
            <div class="form-group">
                <label for="description">{{ trans('cruds.leadCategory.fields.description') }}</label>
                <textarea class="form-control {{ $errors->has('description') ? 'is-invalid' : '' }}"
                    name="description" id="description">{!! old('description') !!}</textarea>
                @if($errors->has('description'))
                    <span class="text-danger">{{ $errors->first('description') }}</span>
                @endif
                <span class="help-block">{{ trans('cruds.leadCategory.fields.description_helper') }}</span>
            </div>
            <div class="form-group">
                <button class="btn btn-danger" type="submit">
                    {{ trans('global.save') }}
                </button>
            </div>
        </form>
    </div>
</div>

@endsection

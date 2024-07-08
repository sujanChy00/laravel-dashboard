<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'assigned_user_id');
    }
}

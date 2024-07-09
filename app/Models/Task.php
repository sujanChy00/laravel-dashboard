<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory;

    protected $guarded = [];
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'task_user');
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'task_project');
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}

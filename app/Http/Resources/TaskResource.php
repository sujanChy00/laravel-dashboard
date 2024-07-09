<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => $this->due_date,
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path,
            'updated_by' => json_decode($this->updated_by),
            'created_by' => json_decode($this->created_by),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'project_id' => $this->project_id,
            'assigned_user_id' => $this->assigned_user_id,
        ];
    }
}

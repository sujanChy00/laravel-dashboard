<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use function Pest\Laravel\json;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    // NOTE: without this line the response will look like {data:{} }
    // NOTE: with this line it removes the data key and sends the data as it is i.e {}
    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "created_at" => (new Carbon($this->created_at))->format("Y-m-d"),
            "due_date" => (new Carbon($this->due_date))->format("Y-m-d"),
            "status" => $this->status,
            "image_path" => $this->image_path,
            "updated_by" => json_decode($this->updated_by),
            "created_by" => json_decode($this->created_by),
            "user_id" =>  $this->user->id
        ];
    }
}

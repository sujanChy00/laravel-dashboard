<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = [
            'name' => 'sujan chaudhary',
            'email' => 'sujan@gmail.com',
            "password" => bcrypt("Admin@123"),
            "email_verified_at" => time()
        ];
        return [
            "name" => fake()->sentence(),
            "description" => fake()->realText(),
            "due_date" => fake()->dateTimeBetween("now", " +1 year"),
            "status" => fake()->randomElement(['pending', 'in_progress', 'completed']),
            "priority" => fake()->randomElement(['low', 'medium', 'high']),
            "image_path" => fake()->imageUrl(),
            'created_by' => json_encode($user),
            'updated_by' => json_encode($user),
            'created_at' => time(),
            'updated_at' => time(),
            "assigned_user_id" => 1
        ];
    }
}

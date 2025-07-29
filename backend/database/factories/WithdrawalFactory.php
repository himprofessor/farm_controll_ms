<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class WithdrawalFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 100),
            'request_date' => $this->faker->date(),
            'approval_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
            'approved_by' => User::factory(),
            'approved_at' => now(),
            'notes' => $this->faker->optional()->sentence,
        ];
    }
}

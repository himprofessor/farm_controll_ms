<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalaryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 100, 500),
            'month' => $this->faker->monthName,
            'year' => $this->faker->year,
            'paid_at' => $this->faker->dateTimeThisYear(),
        ];
    }
}
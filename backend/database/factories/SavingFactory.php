<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SavingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'amount_saved' => $this->faker->randomFloat(2, 10, 200),
            'date_saved' => $this->faker->dateTimeThisYear(),
            'remarks' => $this->faker->sentence,
        ];
    }
}

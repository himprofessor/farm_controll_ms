<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
<<<<<<< HEAD
            'email' => $this->faker->unique()->safeEmail(),
            'role' => $this->faker->randomElement(['admin', 'manager', 'employee']),
            'password' => bcrypt('password'), 
=======
            'phone' => $this->faker->unique()->phoneNumber(),
            'role' => $this->faker->randomElement(['manager', 'worker']),
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return $this
     */
}

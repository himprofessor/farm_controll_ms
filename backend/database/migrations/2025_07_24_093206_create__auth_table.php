<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auth', function (Blueprint $table) {
            $table->id();
            $table->string('name');
<<<<<<< HEAD:backend/database/migrations/2014_10_12_000000_create_users_table.php
            $table->string('password')->nullable();
            $table->enum('role', ['admin', 'manager', 'worker']);
=======
            $table->enum('role', ['admin']);
            $table->string('email')->unique();
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e:backend/database/migrations/2025_07_24_093206_create__auth_table.php
            $table->timestamp('email_verified_at')->nullable();
            $table->string('email')->unique();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auth');
    }
};

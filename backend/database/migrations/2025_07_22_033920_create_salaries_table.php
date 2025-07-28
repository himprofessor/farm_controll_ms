<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
<<<<<<< HEAD
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
=======
            $table->foreignId('staff_id')->constrained()->onDelete('cascade');
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
            $table->decimal('base_salary', 10, 2);
            $table->string('salary_month'); // e.g., "2025-07"
            $table->enum('status', ['paid', 'unpaid', 'pending'])->default('unpaid');
            $table->decimal('paid_amount', 10, 2)->default(0);
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};

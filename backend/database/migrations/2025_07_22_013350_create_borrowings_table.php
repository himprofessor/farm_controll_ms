<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('borrowings', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->text('purpose');
            $table->date('borrowed_date');
            $table->date('retunred_date')->nullable();
            $table->foreignId('material_id')->constrained()->onDelete('cascade');
<<<<<<< HEAD
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
=======
            $table->foreignId('staff_id')->constrained()->onDelete('cascade');
>>>>>>> 35d2ca88b3636045e623314f506fa0d26581854e
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowings');
    }
};

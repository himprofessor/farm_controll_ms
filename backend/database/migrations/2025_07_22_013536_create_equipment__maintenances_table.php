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
        Schema::create('equipment__maintenances', function (Blueprint $table) {
            $table->id();
            $table->date('maintenance_date');
            $table->text('description');
            $table->decimal('cost');
            $table->string('performed_by');
            $table->foreignId('equiment_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment__maintenances');
    }
};

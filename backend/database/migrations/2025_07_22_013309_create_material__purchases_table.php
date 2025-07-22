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
        Schema::create('material__purchases', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->decimal('price_per_unit');
            $table->decimal('total_cost');
            $table->date('purchase_date');
            $table->foreignId('material_id')->constrained()->onDelete('cascade');
            $table->foreignId('supplire_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('material__purchases');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('materials', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('expires')->nullable();
        $table->string('category');
        $table->integer('currentStock');
        $table->integer('minStock');
        $table->string('unit');
        $table->enum('status', ['critical', 'low', 'ok']);
        $table->decimal('value', 10, 2);
        $table->decimal('pricePerUnit', 10, 2);
        $table->string('supplier');
        $table->date('lastUpdated');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};

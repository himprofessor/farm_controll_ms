<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBorrowingsTable extends Migration
{
    public function up()
    {
        Schema::create('borrowings', function (Blueprint $table) {
            $table->id();
            $table->integer('quantity');
            $table->string('purpose');
            $table->date('borrowed_date');
            $table->date('retunred_date')->nullable();
            $table->unsignedBigInteger('material_id');
            $table->unsignedBigInteger('staff_id');
            $table->timestamps();

            $table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
            $table->foreign('staff_id')->references('id')->on('staffs')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('borrowings');
    }
}

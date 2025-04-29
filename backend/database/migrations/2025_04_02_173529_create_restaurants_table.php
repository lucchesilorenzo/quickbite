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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');

            $table->string('street_address')->nullable();
            $table->string('building_number')->nullable();
            $table->string('road')->nullable();
            $table->string('neighbourhood')->nullable();
            $table->string('suburb')->nullable();
            $table->string('island')->nullable();
            $table->string('city')->nullable();
            $table->string('county')->nullable();
            $table->string('state')->nullable();
            $table->string('postcode')->nullable();
            $table->string('country')->default('Italy');

            $table->string('full_address')->nullable();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();

            $table->string('phone_number')->unique();
            $table->string('email')->unique();
            $table->string('vat_id')->nullable()->unique();
            $table->float('min_amount')->nullable();
            $table->float('shipping_cost')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->float('discount')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};

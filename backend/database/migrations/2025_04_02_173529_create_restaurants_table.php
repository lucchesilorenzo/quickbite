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
            $table->string('description');
            $table->string('street_address');
            $table->string('postal_code');
            $table->string('city');
            $table->string('region')->nullable();
            $table->string('country')->default('Italy');
            $table->string('phone_number')->unique();
            $table->string('email')->unique();
            $table->string('vat_id')->nullable()->unique();
            $table->float('min_amount')->nullable();
            $table->float('shipping_cost')->nullable();
            $table->string('image')->nullable();
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

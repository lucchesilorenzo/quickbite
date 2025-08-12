<?php

declare(strict_types=1);

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
            $table->text('description')->nullable();

            $table->string('street_address');
            $table->string('building_number');
            $table->string('road')->nullable();
            $table->string('neighbourhood')->nullable();
            $table->string('suburb')->nullable();
            $table->string('island')->nullable();
            $table->string('city')->nullable();
            $table->string('county')->nullable();
            $table->string('state');
            $table->string('postcode');
            $table->string('country')->default('Italy');

            $table->string('full_address')->nullable();
            $table->float('latitude');
            $table->float('longitude');

            $table->string('phone_number')->nullable()->unique();
            $table->string('email')->nullable()->unique();
            $table->string('vat_id')->nullable()->unique();
            $table->decimal('min_amount')->default(0);

            $table->decimal('delivery_fee')->default(0);
            $table->decimal('service_fee')->default(0);

            $table->unsignedSmallInteger('delivery_time_min')->nullable();
            $table->unsignedSmallInteger('delivery_time_max')->nullable();

            $table->string('logo')->nullable();
            $table->string('cover')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->boolean('force_close')->default(false);
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

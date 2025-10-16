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
        Schema::create('restaurants', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('street_address');
            $table->string('building_number');
            $table->string('postcode');
            $table->string('city');
            $table->string('state');
            $table->string('country')->default('Italy');
            $table->float('latitude');
            $table->float('longitude');
            $table->string('phone_number')->nullable()->unique();
            $table->string('email')->nullable()->unique();
            $table->decimal('min_amount')->default(0);
            $table->decimal('delivery_fee')->default(0);
            $table->decimal('service_fee')->default(0);
            $table->unsignedSmallInteger('min_delivery_time')->nullable();
            $table->unsignedSmallInteger('max_delivery_time')->nullable();
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

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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('restaurant_id')->constrained()->cascadeOnDelete();
            $table->integer('order_code')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone_number');
            $table->string('street_address');
            $table->string('building_number');
            $table->string('postcode');
            $table->string('city');
            $table->string('country')->default('Italy');
            $table->time('delivery_time');
            $table->string('notes', 160)->nullable();
            $table->string('payment_method');
            $table->decimal('subtotal');
            $table->decimal('delivery_fee')->default(0);
            $table->decimal('service_fee')->default(0);
            $table->decimal('discount_rate')->default(0);
            $table->decimal('discount')->default(0);
            $table->decimal('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

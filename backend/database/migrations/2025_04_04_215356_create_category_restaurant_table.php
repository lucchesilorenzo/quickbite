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
        Schema::create('category_restaurant', function (Blueprint $table): void {
            $table->foreignUuid('category_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('restaurant_id')->constrained()->cascadeOnDelete();

            $table->primary(['category_id', 'restaurant_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_restaurant');
    }
};

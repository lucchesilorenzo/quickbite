<?php

declare(strict_types=1);

use App\Enums\EmploymentType;
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
        Schema::create('job_posts', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('restaurant_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->longText('description');
            $table->enum('employment_type', EmploymentType::values());
            $table->string('salary')->nullable();
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_posts');
    }
};

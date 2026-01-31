<?php

declare(strict_types=1);

use App\Enums\EmploymentType;
use App\Enums\JobPostStatus;
use App\Enums\VehicleType;
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
            $table->longText('description_html');
            $table->longText('description_text');
            $table->enum('employment_type', EmploymentType::values());
            $table->enum('vehicle_type', VehicleType::values());
            $table->decimal('salary', 10, 2)->nullable();
            $table->enum('status', JobPostStatus::values())->default(JobPostStatus::OPEN);
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
